'use client'

import { useEffect, useRef } from 'react'
import { Target, Cpu, Brain, BarChart3, Shield, Settings } from 'lucide-react'
import { demoServices } from '@/lib/demo-data'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Cpu,
  Brain,
  BarChart3,
  Shield,
  Settings,
}

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

export default function ServicesGrid() {
  return (
    <section id="services" className="section-elevated">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-horizon mb-4">
              Our Capabilities
            </p>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              What We Build
            </h2>
            <p className="mt-4 text-carbon-400 font-mono text-sm max-w-xl leading-relaxed">
              Six core practices, each engineered for measurable impact across industries and scales.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Target

            return (
              <ScrollReveal
                key={service.id}
                className={`${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="card group h-full relative overflow-hidden">
                  {/* Hover border trace overlay */}
                  <div className="absolute inset-0 border border-horizon/0 group-hover:border-horizon/40 transition-all duration-500 pointer-events-none" />

                  <div className={`flex flex-col h-full ${index === 0 ? 'lg:flex-row lg:items-start lg:gap-8' : ''}`}>
                    {/* Icon */}
                    <div className="mb-4 lg:mb-0">
                      <div className="w-12 h-12 flex items-center justify-center border border-carbon-700 group-hover:border-horizon/50 transition-colors duration-300">
                        <IconComponent className="h-5 w-5 text-horizon" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-sans font-semibold text-lg text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-carbon-400 font-mono text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, index === 0 ? 5 : 3).map((feature) => (
                          <span key={feature} className="badge text-[10px]">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
