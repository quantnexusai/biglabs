'use client'

import { useRef, useState, useEffect } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { demoPricingPlans } from '@/lib/demo-data'
import { PricingPlan } from '@/lib/types'

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

function formatPrice(plan: PricingPlan): string {
  if (plan.price === 0) return 'Custom Pricing'
  return `$${plan.price.toLocaleString()}/mo`
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const isEnterprise = plan.price === 0
  const isHighlighted = plan.highlighted

  return (
    <div
      className={`relative flex flex-col ${
        isHighlighted
          ? 'card-highlight border-horizon'
          : 'card'
      } p-8`}
    >
      {/* Recommended Badge */}
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-warmth text-[10px] px-4 py-1">RECOMMENDED</span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="font-sans text-2xl font-bold text-white mb-2">
        {plan.name}
      </h3>

      {/* Description */}
      <p className="text-carbon-400 font-mono text-sm leading-relaxed mb-6">
        {plan.description}
      </p>

      {/* Price */}
      <div className="mb-8">
        <span
          className={`font-sans font-bold ${
            isHighlighted ? 'text-4xl text-warmth' : 'text-3xl text-white'
          }`}
        >
          {formatPrice(plan)}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-10 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-horizon mt-0.5 shrink-0" />
            <span className="text-carbon-300 font-mono text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isEnterprise ? (
        <Link href="/#consultation" className="btn-outline w-full text-center">
          Contact Us
        </Link>
      ) : (
        <Link
          href="/#consultation"
          className={`${isHighlighted ? 'btn-warmth' : 'btn-primary'} w-full text-center`}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

const faqs = [
  {
    q: 'What does an engagement typically look like?',
    a: 'We start with a scoping session to understand your challenges, then propose a tailored approach with clear milestones and deliverables.',
  },
  {
    q: 'Can I switch plans mid-engagement?',
    a: 'Absolutely. Our plans are designed to scale with your needs. Upgrading or adjusting scope is seamless.',
  },
  {
    q: 'Do you offer project-based pricing?',
    a: 'Yes. For defined-scope initiatives, we offer fixed-fee project pricing. Contact us for a custom quote.',
  },
]

export default function PricingPage() {
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
              <span className="badge mb-6 inline-block">PRICING</span>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mt-4">
                Transparent Value
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-6 text-carbon-300 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                An investment in outcomes, not hours. Choose the engagement model
                that fits your ambition.
              </p>
            </ScrollReveal>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />
        </section>

        {/* Pricing Cards */}
        <section className="section-elevated">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demoPricingPlans.map((plan) => (
                <ScrollReveal key={plan.id}>
                  <PlanCard plan={plan} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-dark">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-3xl text-white text-center mb-12">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <div className="space-y-8">
              {faqs.map((faq) => (
                <ScrollReveal key={faq.q}>
                  <div className="border-b border-carbon-800 pb-8">
                    <h3 className="font-sans font-semibold text-lg text-white mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-carbon-400 font-mono text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Custom Package CTA */}
            <ScrollReveal>
              <div className="mt-16 text-center">
                <h3 className="font-sans font-semibold text-xl text-white mb-4">
                  Need a custom package?
                </h3>
                <p className="text-carbon-400 font-mono text-sm mb-8">
                  Every organization is different. Let&apos;s design an engagement
                  that maps precisely to your goals.
                </p>
                <Link href="/#consultation" className="btn-warmth">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
