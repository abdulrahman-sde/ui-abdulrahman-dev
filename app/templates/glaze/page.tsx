import BottomCTASection from "@/components/templates/glaze/sections/BottomCTASection";
import DiscoverSection from "@/components/templates/glaze/sections/DiscoverSection";
import FAQSection from "@/components/templates/glaze/sections/FAQSection";
import Footer from "@/components/templates/glaze/sections/Footer";
import HeroSection from "@/components/templates/glaze/sections/HeroSection";
import MakeEveryIdeaSection from "@/components/templates/glaze/sections/MakeEveryIdeaSection";
import PublishAndTeamSection from "@/components/templates/glaze/sections/PublishAndTeamSection";

export default function GlazeLandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <HeroSection />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 pb-32">
        <MakeEveryIdeaSection />
        <PublishAndTeamSection />
        {/* <DiscoverSection /> */}
      </main>

      <FAQSection />
      <BottomCTASection />
      <Footer />
    </div>
  );
}
