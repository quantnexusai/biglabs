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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid" />

      {/* Radial glow behind content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(86,130,177,0.08)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center mb-8">
            <span className="badge">
              Consulting-Grade Intelligence
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal className="delay-100">
          <h1 className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05]">
            <span className="text-white">Complexity,</span>
            <br />
            <span className="text-warmth">Simplified.</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal className="delay-200">
          <p className="mt-8 text-carbon-300 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A modular consulting framework engineered for clarity, precision, and execution.
          </p>
        </ScrollReveal>

        <ScrollReveal className="delay-300">
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="btn-primary">
              Explore Services
            </a>
            <a href="#consultation" className="btn-warmth">
              Book a Consultation
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />
    </section>
  )
}
