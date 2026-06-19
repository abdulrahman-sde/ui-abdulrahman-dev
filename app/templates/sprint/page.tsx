import { Navbar } from "@/components/templates/sprint/sections/navbar"
import { Hero3DStage } from "@/components/templates/sprint/sections/hero-3d-stage"
import { LogoCloud } from "@/components/templates/sprint/sections/logo-cloud"
import { FeatureCardsSection } from "@/components/templates/sprint/sections/feature-cards-section"
import { AISection } from "@/components/templates/sprint/sections/ai-section"
import { ProductDirectionSection } from "@/components/templates/sprint/sections/product-direction-section"
import { WorkflowsSection } from "@/components/templates/sprint/sections/workflows-section"
import { CTASection } from "@/components/templates/sprint/sections/cta-section"
import { Footer } from "@/components/templates/sprint/sections/footer"

export default function SprintPage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: "#09090B" }}>
      <Navbar />
      <Hero3DStage />
      <LogoCloud />
      <FeatureCardsSection />
      <AISection />
      <ProductDirectionSection />
      <WorkflowsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
