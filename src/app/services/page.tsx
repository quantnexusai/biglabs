'use client'

import { useRef, useState, useEffect } from 'react'
import { Target, Cpu, Brain, BarChart3, Shield, Settings, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { demoServices } from '@/lib/demo-data'
import { Service } from '@/lib/types'

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

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Cpu,
  Brain,
  BarChart3,
  Shield,
  Settings,
}

function ServiceCard({ service }: { service: Service }) {
  const IconComponent = iconMap[service.icon] || Target

  return (
    <div className="card group micro-expand relative overflow-hidden">
      {/* Hover border glow */}
      <div className="absolute inset-0 border border-transparent group-hover:border-horizon/60 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center bg-horizon/10 border border-horizon/20 mb-6">
          <IconComponent className="w-6 h-6 text-horizon" />
        </div>

        <h3 className="font-sans font-semibold text-xl text-white mb-3">
          {service.title}
        </h3>

        <p className="text-carbon-300 font-mono text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span key={feature} className="badge text-[10px]">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
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
              <span className="badge mb-6 inline-block">OUR SERVICES</span>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mt-4">
                What We Build
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-6 text-carbon-300 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Six core practices designed for precision. Each one engineered to
                solve a specific class of enterprise challenge.
              </p>
            </ScrollReveal>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />
        </section>

        {/* Services Grid */}
        <section className="section-elevated">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoServices.map((service, i) => (
                <ScrollReveal key={service.id}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-dark">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-4">
                Need something custom?
              </h2>
              <p className="text-carbon-300 font-mono text-base leading-relaxed mb-8">
                Every engagement is tailored. Let&apos;s discuss your specific
                challenges and design a solution that fits.
              </p>
              <Link href="/#consultation" className="btn-warmth">
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
