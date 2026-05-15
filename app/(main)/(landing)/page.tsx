import CallToAction from "@/app/(main)/(landing)/_components/call-to-action";
import Faq from "@/app/(main)/(landing)/_components/faq";
import Features from "@/app/(main)/(landing)/_components/features";
import HeroSection from "@/app/(main)/(landing)/_components/hero-section";
import Team from "@/app/(main)/(landing)/_components/team";
import TemplatesShowcase from "@/app/(main)/(landing)/_components/templates-showcase";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TemplatesShowcase />
      <Features />
      <Team />
      <Faq />
      <CallToAction />
    </div>
  );
}
