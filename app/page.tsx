import CallToAction from "@/components/call-to-action-1";
import Features from "@/components/features-3";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section-4";
import Team from "@/components/team-1";
import TemplatesShowcase from "@/components/templates-showcase";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <TemplatesShowcase />
      <Features />
      <Team />
      <CallToAction />
    </div>
  );
}
