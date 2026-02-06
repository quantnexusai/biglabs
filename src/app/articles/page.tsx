'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import { demoArticles } from '@/lib/demo-data'
import { Article } from '@/lib/types'

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

const categories = ['All', 'AI & Technology', 'Digital Transformation', 'Strategy', 'Cybersecurity']

function ArticleCard({ article }: { article: Article }) {
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="card micro-expand group">
      <div className="p-2">
        {/* Category Badge */}
        <span className="badge text-[10px] mb-4 inline-block">{article.category}</span>

        {/* Title */}
        <h3 className="font-sans text-xl font-semibold text-white mb-3 group-hover:text-warmth transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-carbon-300 font-mono text-sm leading-relaxed mb-4">
          {article.excerpt}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {publishedDate && (
            <span className="text-carbon-500 text-xs font-mono">
              {publishedDate}
            </span>
          )}
          <Link
            href={`/articles/${article.slug}`}
            className="text-horizon font-mono text-sm inline-flex items-center gap-1 hover:text-horizon-light transition-colors"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredArticles = activeCategory === 'All'
    ? demoArticles
    : demoArticles.filter((a) => a.category === activeCategory)

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
              <span className="badge mb-6 inline-block">INSIGHTS</span>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mt-4">
                The Biglabs Perspective
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="mt-6 text-carbon-300 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Analysis, frameworks, and perspectives from the front lines of
                enterprise consulting.
              </p>
            </ScrollReveal>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />
        </section>

        {/* Filter Bar & Articles */}
        <section className="section-elevated">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* Category Pills */}
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-horizon text-white border-horizon'
                        : 'bg-transparent text-carbon-400 border-carbon-700 hover:border-horizon hover:text-horizon'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <ScrollReveal key={article.id}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-carbon-500 font-mono text-sm">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
