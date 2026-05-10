import CallToAction from "@/components/templates/nova/sections/call-to-action-1";
import Content from "@/components/templates/nova/sections/content-1";
import FAQs from "@/components/templates/nova/sections/faqs-1";
import Features from "@/components/templates/nova/sections/features-1";
import Footer from "@/components/templates/nova/sections/footer-1";
import HeroLogo from "@/components/templates/nova/sections/hero-logo";
import HeroSection from "@/components/templates/nova/sections/hero-section-1";
// import LogoCloud from "@/components/templates/nova/sections/logo-cloud-1";
import Pricing from "@/components/templates/nova/sections/pricing-1";

export const metadata = {
  title: "Landing 4 — Tailark",
  description:
    "Veil kit SaaS landing with hero, logo cloud, features, content, testimonials, pricing, FAQs, CTA, and footer.",
};

export default function Landing4() {
  return (
    <>
      <HeroSection />
      {/* <HeroLogo /> */}
      <Features />
      <Content />
      <Pricing />
      <FAQs />
      <CallToAction />
      <Footer />
    </>
  );
}
