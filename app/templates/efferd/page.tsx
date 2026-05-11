import { Header } from "@/components/templates/efferd/sections/header";
import { HeroSection } from "@/components/templates/efferd/sections/hero";
import { LogosSection } from "@/components/templates/efferd/sections/logos-section";
import { FeatureSection } from "@/components/templates/efferd/sections/feature-section";
import { Integrations } from "@/components/templates/efferd/sections/integrations";
import { CallToAction } from "@/components/templates/efferd/sections/cta";
import { Footer } from "@/components/templates/efferd/sections/footer";

export default function EfferdDemoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <main className="flex w-full flex-col gap-20">
        <HeroSection />
        <LogosSection />
        <FeatureSection />
        <Integrations />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
