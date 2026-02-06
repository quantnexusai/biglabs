'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Save, Check } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { useAuth } from '@/lib/auth-context'
import { isDemoMode, demoProfile } from '@/lib/demo-data'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const { user, profile, isDemo, signOut } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const source = isDemo ? demoProfile : profile
    if (source) {
      setFirstName(source.first_name || '')
      setLastName(source.last_name || '')
      setEmail(source.email || '')
      setCompanyName(source.company_name || '')
      setRole(source.role || '')
      setPhone(source.phone || '')
    }
  }, [profile, isDemo])

  const initials = (firstName?.[0] || '') + (lastName?.[0] || '')

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (isDemoMode()) {
      await new Promise((r) => setTimeout(r, 600))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      setSaving(false)
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          role,
          phone,
        })
        .eq('id', user?.id)

      if (error) throw error
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Failed to save profile:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-void pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Profile Card */}
          <div className="card p-8">
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-horizon text-white flex items-center justify-center font-sans font-bold text-2xl uppercase flex-shrink-0">
                {initials || '?'}
              </div>
              <div>
                <h1 className="font-sans text-xl font-bold text-white">
                  {firstName} {lastName}
                </h1>
                <p className="text-sm font-mono text-carbon-400">{email}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={email}
                  className="input opacity-60 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company"
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Your role"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="input"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:opacity-50"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" />
                      Saved
                    </>
                  ) : saving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="btn-danger"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
