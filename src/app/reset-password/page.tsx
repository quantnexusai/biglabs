'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, Lock, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { isDemoMode } from '@/lib/demo-data'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)

    if (isDemoMode()) {
      await new Promise((r) => setTimeout(r, 600))
      setSuccess(true)
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })
      if (updateError) throw updateError
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-void blueprint-grid flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="card p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-900/30 border border-emerald-700/50 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="font-sans text-xl font-bold text-white mb-2">
                Password Updated
              </h2>
              <p className="text-sm font-mono text-carbon-400 mb-6">
                Your password has been successfully updated.
              </p>
              <Link href="/" className="btn-primary">
                Return Home
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="mb-4">
                  <span className="font-sans font-bold tracking-widest text-sm text-carbon-400">
                    BIGLABS
                  </span>
                </div>
                <h1 className="font-sans text-2xl font-bold text-white">
                  Reset Password
                </h1>
                <p className="mt-2 text-sm font-mono text-carbon-400">
                  Enter your new password below.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 text-sm font-mono text-red-400">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="input pl-10"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>

              {/* Back link */}
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-mono text-carbon-500 hover:text-horizon transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
