import Nav from "./components/sections/nav";
import Hero from "./components/sections/hero";
import Logos from "./components/sections/logos";
import Items from "./components/sections/items";
import Stats from "./components/sections/stats";
import Pricing from "./components/sections/pricing";
import FAQ from "./components/sections/faq";
import CTA from "./components/sections/cta";
import FooterSection from "./components/sections/footer";

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
