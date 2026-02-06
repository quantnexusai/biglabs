'use client'

import { useEffect, useRef } from 'react'
import { demoTestimonials } from '@/lib/demo-data'

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

export default function TestimonialsSection() {
  return (
    <section className="section-warmth">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-horizon mb-4">
              Client Voices
            </p>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-void tracking-tight">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoTestimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} className={`delay-${index * 100}`}>
              <div className="flex flex-col h-full">
                {/* Quote Mark */}
                <div className="mb-4">
                  <svg
                    className="w-10 h-10 text-horizon"
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.7 29.4c-2.2-1.3-3.7-3.2-4.4-5.6-.7-2.4-.5-5 .7-7.7 1.2-2.7 3.3-5 6.3-6.8l1.7 2.6c-2.2 1.4-3.6 3-4.3 4.6-.7 1.7-.6 3.2.3 4.5 1-.5 2.1-.6 3.2-.4 1.1.2 2 .8 2.7 1.7.7.9 1 2 .9 3.1-.1 1.2-.6 2.2-1.5 3-1 .9-2.1 1.3-3.5 1.3-1 0-1.6-.1-2.1-.3zM26.7 29.4c-2.2-1.3-3.7-3.2-4.4-5.6-.7-2.4-.5-5 .7-7.7 1.2-2.7 3.3-5 6.3-6.8l1.7 2.6c-2.2 1.4-3.6 3-4.3 4.6-.7 1.7-.6 3.2.3 4.5 1-.5 2.1-.6 3.2-.4 1.1.2 2 .8 2.7 1.7.7.9 1 2 .9 3.1-.1 1.2-.6 2.2-1.5 3-1 .9-2.1 1.3-3.5 1.3-1 0-1.6-.1-2.1-.3z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <blockquote className="text-void font-sans text-xl leading-relaxed mb-6 flex-1">
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="pt-4 border-t border-void/10">
                  <p className="font-sans font-bold text-void text-sm">
                    {testimonial.author_name}
                  </p>
                  <p className="font-mono text-xs text-void/60 mt-0.5">
                    {testimonial.author_role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
