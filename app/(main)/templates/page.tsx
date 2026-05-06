import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { templates } from "@/constants/templates";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Browse all free, open-source landing page templates built with Next.js and Tailwind CSS.",
};

export default function TemplatesPage() {
  return (
    <Container>
      <section className="py-14">
        <div className="mb-10">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {templates.length} templates
          </p>
          <h1 className="text-balance font-serif text-2xl font-semibold">
            All Templates
          </h1>
          <p className="mt-3 text-[15px] leading-[1.8] text-muted-foreground max-w-[60ch]">
            Free, open-source landing page templates. Preview live, grab the
            source code, ship faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {templates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>
    </Container>
  );
}
