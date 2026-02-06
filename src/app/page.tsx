import DemoBanner from '@/components/DemoBanner'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import StatsSection from '@/components/landing/StatsSection'
import ServicesGrid from '@/components/landing/ServicesGrid'
import CaseStudyPreview from '@/components/landing/CaseStudyPreview'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <>
      <DemoBanner />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <CaseStudyPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
