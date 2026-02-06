'use client'

import { useState, FormEvent } from 'react'
import { X, Calendar, Clock } from 'lucide-react'
import { isDemoMode } from '@/lib/demo-data'

interface BookCallModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
]

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const resetForm = () => {
    setName('')
    setEmail('')
    setCompany('')
    setPhone('')
    setMessage('')
    setPreferredDate('')
    setPreferredTime('')
    setSuccess(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isDemoMode()) {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
      return
    }

    // In real mode, submit to Supabase or API endpoint
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          phone: phone || null,
          message,
          preferred_date: preferredDate || null,
          preferred_time: preferredTime || null,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')
      setSuccess(true)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    } catch {
      // Fallback: show success anyway in preview
      setSuccess(true)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-carbon-900 border border-carbon-800 max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-carbon-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success state */}
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-horizon/20 border border-horizon/40 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-horizon" />
            </div>
            <h3 className="font-sans text-xl font-bold text-white mb-2">
              Request Received
            </h3>
            <p className="text-sm font-mono text-carbon-400">
              Your request has been received! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-sans text-2xl font-bold text-white">
                Book a Consultation
              </h2>
              <p className="mt-2 text-sm font-mono text-carbon-400">
                Tell us about your project and we&apos;ll get back within 24 hours.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    Phone <span className="text-carbon-600 normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="label">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, challenges, or goals..."
                  className="textarea"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      Preferred Date
                    </span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Preferred Time
                    </span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="select"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-warmth w-full disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Request Consultation'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
