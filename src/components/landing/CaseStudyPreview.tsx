'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { demoCaseStudies } from '@/lib/demo-data'

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

export default function CaseStudyPreview() {
  return (
    <section id="case-studies" className="section-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-horizon mb-4">
              Track Record
            </p>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Proven Results
            </h2>
            <p className="mt-4 text-carbon-400 font-mono text-sm max-w-xl leading-relaxed">
              Real outcomes from real engagements. Every metric verified, every transformation documented.
            </p>
          </div>
        </ScrollReveal>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {demoCaseStudies.map((study, index) => (
            <ScrollReveal key={study.id} className={`delay-${index * 100}`}>
              <div className="card group h-full flex flex-col">
                {/* Industry Badge */}
                <div className="mb-4">
                  <span className="badge-warmth">{study.industry}</span>
                </div>

                {/* Title & Client */}
                <h3 className="font-sans font-semibold text-lg text-white mb-1 group-hover:text-warmth transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-xs font-mono text-carbon-500 uppercase tracking-wider mb-3">
                  {study.client_name}
                </p>

                {/* Challenge Summary */}
                <p className="text-carbon-400 font-mono text-sm leading-relaxed mb-6 line-clamp-2">
                  {study.challenge}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mt-auto mb-6">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="font-sans font-bold text-2xl text-warmth">
                        {metric.value}
                      </p>
                      <p className="text-[10px] font-mono text-carbon-300 uppercase tracking-wider mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <div className="pt-4 border-t border-carbon-800">
                  <a
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-mono text-horizon hover:text-horizon-light transition-colors group/link"
                  >
                    Read Full Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
