'use client'

import { useRef, useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { demoCaseStudies } from '@/lib/demo-data'
import { CaseStudy } from '@/lib/types'

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>{children}</div>
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="card p-8 lg:p-10">
      {/* Industry Badge */}
      <span className="badge mb-6 inline-block">{study.industry}</span>

      {/* Title & Client */}
      <h2 className="font-sans text-2xl font-bold text-white mb-2">
        {study.title}
      </h2>
      <p className="text-carbon-400 font-mono text-sm mb-8">
        {study.client_name}
      </p>

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-horizon mb-3">
            Challenge
          </h3>
          <p className="text-carbon-300 font-mono text-sm leading-relaxed">
            {study.challenge}
          </p>
        </div>
        <div>
          <h3 className="font-sans font-semibold text-xs uppercase tracking-widest text-horizon mb-3">
            Solution
          </h3>
          <p className="text-carbon-300 font-mono text-sm leading-relaxed">
            {study.solution}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-3xl text-warmth font-sans font-bold mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-carbon-400 font-mono uppercase tracking-wider">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      {study.testimonial_quote && (
        <div className="focus-zone">
          <Quote className="w-6 h-6 text-horizon mb-4 opacity-60" />
          <blockquote className="font-mono text-sm leading-relaxed mb-4">
            &ldquo;{study.testimonial_quote}&rdquo;
          </blockquote>
          <div className="font-sans text-sm font-semibold">
            {study.testimonial_author}
          </div>
          {study.testimonial_role && (
            <div className="font-mono text-xs text-void/60 mt-0.5">
              {study.testimonial_role}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-void py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 blueprint-grid" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(86,130,177,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <ScrollReveal>
              <span className="badge mb-6 inline-block">CASE STUDIES</span>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mt-4">
                Proven Results
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-6 text-carbon-300 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                A track record of measurable impact across industries. Each
                engagement is a blueprint for what disciplined execution can achieve.
              </p>
            </ScrollReveal>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />
        </section>

        {/* Case Studies */}
        <section className="section-elevated">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 space-y-12">
            {demoCaseStudies.map((study, i) => (
              <ScrollReveal key={study.id}>
                <CaseStudyCard study={study} />
                {i < demoCaseStudies.length - 1 && (
                  <div className="mt-12 h-px bg-gradient-to-r from-transparent via-carbon-700 to-transparent" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
