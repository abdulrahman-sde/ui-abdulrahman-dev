import { HeroHeader } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TemplateGrid from "@/app/(main)/templates/_components/template-grid";

export default function TemplatesPage() {
  return (
    <div className="bg-background min-h-screen">
      <HeroHeader />
      <TemplateGrid />
      <Footer />
    </div>
  );
}
