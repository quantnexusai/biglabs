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

const stats = [
  { value: '47+', label: 'Projects Completed' },
  { value: '18', label: 'Active Clients' },
  { value: '$2.4M+', label: 'Revenue Generated' },
  { value: '4.8/5', label: 'Client Satisfaction' },
]

export default function StatsSection() {
  return (
    <section className="bg-carbon-950 py-16 lg:py-20 border-y border-carbon-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-sans font-bold text-4xl lg:text-5xl text-warmth">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-carbon-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
