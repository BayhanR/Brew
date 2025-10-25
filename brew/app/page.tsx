import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TeamSection } from "@/components/team-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TeamSection />
      <ServicesSection />
      <PortfolioPreview />
      <ContactSection />
      <Footer />
    </main>
  )
}
