'use client'

import { useState, FormEvent } from 'react'
import { X, Mail, Lock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { isDemoMode } from '@/lib/demo-data'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!isOpen) return null

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setError(null)
    setSuccess(null)
  }

  const switchTab = (newTab: 'login' | 'signup') => {
    setTab(newTab)
    resetForm()
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isDemoMode()) {
      setSuccess('Signed in successfully.')
      setTimeout(() => {
        onClose()
        resetForm()
      }, 800)
      setLoading(false)
      return
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (authError) throw authError
      onClose()
      resetForm()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (isDemoMode()) {
      setSuccess('Account created. Welcome to Biglabs.')
      setTimeout(() => {
        onClose()
        resetForm()
      }, 800)
      setLoading(false)
      return
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })
      if (authError) throw authError
      setSuccess('Account created. Check your email for verification.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-carbon-900 border border-carbon-800 max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-carbon-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-sans font-bold tracking-widest text-sm text-carbon-400">
            BIGLABS
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-carbon-800 mb-6">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 pb-3 text-sm font-sans font-semibold uppercase tracking-wider transition-colors ${
              tab === 'login'
                ? 'text-white border-b-2 border-horizon'
                : 'text-carbon-500 hover:text-carbon-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchTab('signup')}
            className={`flex-1 pb-3 text-sm font-sans font-semibold uppercase tracking-wider transition-colors ${
              tab === 'signup'
                ? 'text-white border-b-2 border-horizon'
                : 'text-carbon-500 hover:text-carbon-300'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Demo mode note */}
        {isDemoMode() && (
          <div className="mb-6 p-3 bg-carbon-950 border border-carbon-800 text-xs font-mono text-carbon-400">
            Running in local preview mode. Any credentials work.
          </div>
        )}

        {/* Error / Success messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 text-sm font-mono text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-900/20 border border-emerald-800/50 text-sm font-mono text-emerald-400">
            {success}
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <div className="text-center">
              <button
                type="button"
                className="text-xs font-mono text-carbon-500 hover:text-horizon transition-colors"
                onClick={() => {/* Could link to reset password */}}
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {tab === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First"
                    className="input pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last"
                  className="input"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-warmth w-full disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
