import Hero from "@/components/templates/lumina/sections/hero";
import LogoStrip from "@/components/templates/lumina/sections/logo-strip";
import Features from "@/components/templates/lumina/sections/features";
import Workflow from "@/components/templates/lumina/sections/workflow";
import Showcase from "@/components/templates/lumina/sections/showcase";
import Stats from "@/components/templates/lumina/sections/stats";
import Testimonials from "@/components/templates/lumina/sections/testimonials";
import Pricing from "@/components/templates/lumina/sections/pricing";
import FAQ from "@/components/templates/lumina/sections/faq";
import FinalCTA from "@/components/templates/lumina/sections/cta";
import Footer from "@/components/templates/lumina/sections/footer";

export default function LuminaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <LogoStrip />
      <Features />
      <Workflow />
      <Showcase />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
