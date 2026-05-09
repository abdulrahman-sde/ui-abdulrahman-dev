import Nav from "@/components/templates/launchui/sections/nav";
import Hero from "@/components/templates/launchui/sections/hero";
import Logos from "@/components/templates/launchui/sections/logos";
import Items from "@/components/templates/launchui/sections/items";
import Stats from "@/components/templates/launchui/sections/stats";
import Pricing from "@/components/templates/launchui/sections/pricing";
import FAQ from "@/components/templates/launchui/sections/faq";
import CTA from "@/components/templates/launchui/sections/cta";
import FooterSection from "@/components/templates/launchui/sections/footer";

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
