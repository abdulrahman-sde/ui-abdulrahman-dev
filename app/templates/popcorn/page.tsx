import FAQSection from "@/components/templates/popcorn/sections/FAQSection";
import CoverageMapSection from "@/components/templates/popcorn/sections/CoverageMapSection";
import CTASection from "@/components/templates/popcorn/sections/CTASection";
import Footer from "@/components/templates/popcorn/sections/Footer";
import Header from "@/components/templates/popcorn/sections/Header";
import HeroSection from "@/components/templates/popcorn/sections/HeroSection";
import PeaceOfMindSection from "@/components/templates/popcorn/sections/PeaceOfMindSection";
import StatsSection from "@/components/templates/popcorn/sections/StatsSection";
import TestimonialsSection from "@/components/templates/popcorn/sections/TestimonialsSection";

export default function PopcornLandingPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-[#1a1a1a] antialiased selection:bg-[#1a1a1a]/20">
      <Header />
      <main className="flex flex-col pt-32 pb-0">
        <HeroSection />
        <StatsSection />
        <PeaceOfMindSection />
        <CoverageMapSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
