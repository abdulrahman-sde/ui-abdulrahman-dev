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
      <div className="max-w-5xl mx-auto">
        <TemplateDetail slug={slug} />
      </div>
    </div>
  );
}
