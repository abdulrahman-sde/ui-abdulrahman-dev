import Hero from "@/components/templates/nexora/sections/hero";
import CoreFeatures from "@/components/templates/nexora/sections/core-features";
import HowItWorks from "@/components/templates/nexora/sections/how-it-works";
import Pricing from "@/components/templates/nexora/sections/pricing";
import Footer from "@/components/templates/nexora/sections/footer";

export default function NexoraPage() {
  return (
    <div>
      <Hero />
      <CoreFeatures />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
