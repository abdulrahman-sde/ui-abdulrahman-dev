import CallToAction from "@/app/(main)/(landing)/_components/call-to-action";
import Features from "@/app/(main)/(landing)/_components/features";
import HeroSection from "@/app/(main)/(landing)/_components/hero-section";
import Team from "@/app/(main)/(landing)/_components/team";
import TemplatesShowcase from "@/app/(main)/(landing)/_components/templates-showcase";
import Footer from "@/components/layout/footer";
import { HeroHeader } from "@/components/layout/header";

export default function Home() {
  return (
    <div>
      <HeroHeader />
      <HeroSection />
      <TemplatesShowcase />
      <Features />
      <Team />
      <CallToAction />
      <Footer />
    </div>
  );
}
