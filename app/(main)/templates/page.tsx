import type { Metadata } from "next";
import TemplateGrid from "@/app/(main)/templates/_components/template-grid";
import { JsonLd } from "@/components/shared/json-ld";
import { TEMPLATES } from "@/constants/templates";

export const metadata: Metadata = {
  title: "Free Next.js Landing Page Templates — Browse All",
  description:
    "Browse free, MIT-licensed Next.js 16 landing page templates built with Tailwind CSS v4. SaaS, AI tools, mobile apps, and more. Install any template in one command via shadcn.",
  alternates: {
    canonical: "https://www.kairoui.online/templates",
  },
  openGraph: {
    title: "Free Next.js Landing Page Templates | Kairo UI",
    description:
      "Free, MIT-licensed Next.js templates for SaaS, AI products, mobile apps, and more.",
    url: "https://www.kairoui.online/templates",
    siteName: "Kairo UI",
  },
};

export default function TemplatesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Next.js Landing Page Templates",
    description:
      "Free, MIT-licensed Next.js 16 landing page templates built with Tailwind CSS v4.",
    url: "https://www.kairoui.online/templates",
    numberOfItems: TEMPLATES.length,
    hasPart: TEMPLATES.map((t) => ({
      "@type": "CreativeWork",
      name: t.title,
      url: `https://www.kairoui.online/template/${t.slug}`,
      description: t.description,
      license: "https://opensource.org/licenses/MIT",
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto">
          <TemplateGrid />
        </div>
      </div>
    </>
  );
}
