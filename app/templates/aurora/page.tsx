import Nav from "@/components/templates/aurora/sections/nav";
import Hero from "@/components/templates/aurora/sections/hero";
import LogoCloud from "@/components/templates/aurora/sections/logo-cloud";
import Features from "@/components/templates/aurora/sections/features";
import HowItWorks from "@/components/templates/aurora/sections/how-it-works";
import Showcase from "@/components/templates/aurora/sections/showcase";
import Testimonials from "@/components/templates/aurora/sections/testimonials";
import Pricing from "@/components/templates/aurora/sections/pricing";
import Footer from "@/components/templates/aurora/sections/footer";

export const metadata = {
  title: "Aurora — Build at the speed of light",
  description:
    "Aurora is the studio for teams that ship faster than the brief.",
};

export default function AuroraPage() {
  return (
    <>
      <Nav />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Showcase />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}
