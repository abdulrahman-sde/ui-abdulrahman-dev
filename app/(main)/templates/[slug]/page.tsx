import { HeroHeader } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TemplateDetail from "@/app/(main)/templates/[slug]/_components/template-detail";
import { TEMPLATES } from "@/constants/templates";

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-background min-h-screen">
      <HeroHeader />
      <TemplateDetail slug={slug} />
      <Footer />
    </div>
  );
}
