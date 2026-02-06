'use client'

import { useRef, useState, useEffect } from 'react'
import { Rocket, Zap, Lightbulb, Users, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { demoCareers } from '@/lib/demo-data'
import { Career } from '@/lib/types'

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

const values = [
  {
    icon: Rocket,
    title: 'Growth',
    description: 'Accelerated career trajectory with mentorship from industry leaders and hands-on client exposure from day one.',
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'Work on engagements that transform how Fortune 500 companies operate. Your contributions move the needle.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Access cutting-edge tools, dedicated research time, and the freedom to experiment with emerging technologies.',
  },
  {
    icon: Users,
    title: 'Culture',
    description: 'A team of sharp, collaborative professionals who value precision, candor, and the craft of consulting.',
  },
]

function JobCard({ job }: { job: Career }) {
  return (
    <div className="card p-8">
      {/* Title */}
      <h3 className="text-xl font-sans font-semibold text-white mb-4">
        {job.title}
      </h3>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="badge inline-flex items-center gap-1.5">
          <Briefcase className="w-3 h-3" />
          {job.department}
        </span>
        <span className="badge inline-flex items-center gap-1.5">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="badge">
          {job.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-carbon-300 font-mono text-sm leading-relaxed mb-6">
        {job.description}
      </p>

      {/* Salary */}
      {job.salary_range && (
        <p className="text-warmth font-sans font-semibold text-base mb-6">
          {job.salary_range}
        </p>
      )}

      {/* Requirements */}
      <div className="mb-6">
        <h4 className="font-sans font-semibold text-xs uppercase tracking-widest text-horizon mb-3">
          Requirements
        </h4>
        <ul className="space-y-2">
          {job.requirements.map((req) => (
            <li key={req} className="text-carbon-300 font-mono text-sm flex items-start gap-2">
              <span className="text-horizon mt-1 shrink-0">&bull;</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-8">
        <h4 className="font-sans font-semibold text-xs uppercase tracking-widest text-horizon mb-3">
          Benefits
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.benefits.map((benefit) => (
            <span key={benefit} className="badge-warmth text-[10px]">
              {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* Apply CTA */}
      <button className="btn-primary">
        Apply Now
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-warmth relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <ScrollReveal>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight">
                Join the Team
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-6 text-void/70 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                We&apos;re building the future of enterprise consulting. If you
                thrive on complexity, precision, and impact, there&apos;s a seat
                at the table.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Why Biglabs */}
        <section className="section-dark">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-3xl text-white text-center mb-12">
                Why Biglabs?
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <ScrollReveal key={v.title}>
                  <div className="card text-center">
                    <div className="w-12 h-12 mx-auto flex items-center justify-center bg-horizon/10 border border-horizon/20 mb-5">
                      <v.icon className="w-6 h-6 text-horizon" />
                    </div>
                    <h3 className="font-sans font-semibold text-lg text-white mb-3">
                      {v.title}
                    </h3>
                    <p className="text-carbon-400 font-mono text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="section-elevated">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-3xl text-white text-center mb-4">
                Open Positions
              </h2>
              <p className="text-carbon-400 font-mono text-sm text-center mb-12">
                {demoCareers.length} role{demoCareers.length !== 1 ? 's' : ''} currently open
              </p>
            </ScrollReveal>

            <div className="space-y-8">
              {demoCareers.map((job) => (
                <ScrollReveal key={job.id}>
                  <JobCard job={job} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
