import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATES } from "@/constants/templates";
import { loadTemplateSource } from "@/lib/registry/load-source";
import { PreviewPanel } from "./tab-panel";
import {
  TemplateMock,
  colorToVariant,
} from "@/components/shared/template-mock";
import { ArrowUpRight } from "lucide-react";

interface TemplateDetailProps {
  slug: string;
}

export default async function TemplateDetail({ slug }: TemplateDetailProps) {
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) notFound();

  const source = await loadTemplateSource(slug);
  const hasRealPreview = source !== null;

  const related = TEMPLATES.filter(
    (x) => x.slug !== t.slug && x.category === t.category,
  ).slice(0, 3);
  const showRelated = related.length
    ? related
    : TEMPLATES.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <div className="pt-32 pb-28 px-4">
      {/* Title block */}
      <div className="mb-10">
        <h1 className="font-serif text-[2.6rem] font-medium leading-[1.1] tracking-tight mb-3">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg text-balance leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="border-border mb-10 h-px w-full" />

      {/* ── Preview / Code panel ── */}
      <div className="mb-4">
        {hasRealPreview ? (
          <PreviewPanel slug={slug} title={t.title} files={source!.files} />
        ) : (
          /* Static mock — double-bezel */
          <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            <div
              className="bg-muted relative w-full"
              style={{ aspectRatio: "16/10" }}
            >
              <div className="absolute inset-0 p-4">
                <div className="h-full rounded-[1.25rem] bg-card p-0.75 ring-1 ring-border shadow-sm">
                  <div className="relative h-full w-full overflow-hidden rounded-[calc(1.25rem-3px)] ring-1 ring-border/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
                    {t.thumbnail ? (
                      <Image
                        src={t.thumbnail}
                        alt={t.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 960px"
                      />
                    ) : (
                      <TemplateMock
                        accent={t.accent}
                        variant={colorToVariant(t.color)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Install command bar — fully separate ── */}

      {/* More like this */}
      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-medium">More like this</h2>
          <Link
            href="/templates"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
          >
            All templates
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground/8">
              <ArrowUpRight className="size-2.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {showRelated.map((r) => (
            <Link
              key={r.slug}
              href={`/templates/${r.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-primary/25 hover:shadow-lg hover:shadow-black/5"
            >
              <div
                className="relative w-full overflow-hidden bg-muted"
                style={{ aspectRatio: "16/10" }}
              >
                {r.thumbnail ? (
                  <Image
                    src={r.thumbnail}
                    alt={r.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                ) : (
                  <div className="absolute inset-0 origin-center scale-[1.15] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.2]">
                    <TemplateMock
                      accent={r.accent}
                      variant={colorToVariant(r.color)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {r.category}
                  </p>
                </div>
                <span className="ml-3 flex shrink-0 size-7 items-center justify-center rounded-full bg-foreground/5 opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:bg-primary/10">
                  <ArrowUpRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
