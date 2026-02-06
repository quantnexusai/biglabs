'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { isDemoMode } from '@/lib/demo-data'

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (!isDemoMode() || dismissed) return null

  return (
    <div className="bg-horizon text-white text-xs font-mono text-center py-1.5 relative z-[60]">
      <span>
        Local Preview Mode &mdash; Connect Supabase &amp; Anthropic to enable all features
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
