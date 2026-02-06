'use client'

import { useEffect, useRef } from 'react'

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

export default function CTASection() {
  return (
    <section id="consultation" className="relative bg-void py-24 lg:py-32 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(86,130,177,0.06)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Ready to Transform
            <br />
            <span className="text-warmth">Your Business?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mt-6 text-carbon-300 font-mono text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a complimentary consultation with our team. We will assess your challenges,
            identify opportunities, and outline a path to measurable results.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#consultation" className="btn-warmth">
              Book a Consultation
            </a>
            <a href="#pricing" className="btn-outline">
              View Pricing
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
