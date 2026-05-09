import Nav from "@/components/launchui/sections/nav";
import Hero from "@/components/launchui/sections/hero";
import Logos from "@/components/launchui/sections/logos";
import Items from "@/components/launchui/sections/items";
import Stats from "@/components/launchui/sections/stats";
import Pricing from "@/components/launchui/sections/pricing";
import FAQ from "@/components/launchui/sections/faq";
import CTA from "@/components/launchui/sections/cta";
import FooterSection from "@/components/launchui/sections/footer";

export default function LaunchUIPage() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Nav />
      <Hero />
      <Logos />
      <Items />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
      <FooterSection />
    </main>
  );
}
