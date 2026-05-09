import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEMPLATES } from "@/constants/templates";
import TemplateRenderer from "./_components/template-renderer";

const REGISTRY_BASE = "https://ui.abdulrahmanasif.dev";

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) return { title: "Template" };
  return { title: `${t.title} — ui.abdulrahmanasif.dev`, description: t.description };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20">
      <div className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t.category}
        </p>
        <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t.description}
        </p>
        {t.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/30 px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <TemplateRenderer
        src={`/templates/${t.slug}`}
        name={t.title}
        command={`${REGISTRY_BASE}/r/${t.slug}.json`}
      />
    </div>
  );
}
