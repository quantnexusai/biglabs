import Link from 'next/link'

const serviceLinks = [
  { label: 'Strategic Advisory', href: '/services/strategic-advisory' },
  { label: 'Digital Transformation', href: '/services/digital-transformation' },
  { label: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
  { label: 'Data & Analytics', href: '/services/data-analytics' },
  { label: 'Cybersecurity', href: '/services/cybersecurity' },
  { label: 'Operations Excellence', href: '/services/operations-excellence' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Articles', href: '/articles' },
  { label: 'Case Studies', href: '/case-studies' },
]

export default function Footer() {
  return (
    <footer className="bg-carbon-950 relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-horizon to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-sans font-bold text-xl tracking-[0.3em] text-white">
                BIGLABS
              </span>
            </Link>
            <p className="mt-4 text-carbon-400 font-mono text-sm leading-relaxed max-w-xs">
              A modular consulting framework engineered for clarity, precision, and execution.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-carbon-300 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-mono text-sm text-carbon-500 hover:text-warmth transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-carbon-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-mono text-sm text-carbon-500 hover:text-warmth transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-carbon-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@biglabs.io"
                  className="font-mono text-sm text-carbon-500 hover:text-warmth transition-colors duration-200"
                >
                  hello@biglabs.io
                </a>
              </li>
              <li>
                <span className="font-mono text-sm text-carbon-600">
                  New York &middot; San Francisco &middot; Remote
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-carbon-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-carbon-600">
            &copy; {new Date().getFullYear()} Biglabs. All rights reserved.
          </p>
          <p className="font-mono text-xs text-carbon-700 tracking-wider">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
