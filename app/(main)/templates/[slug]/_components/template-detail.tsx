import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES } from "@/constants/templates";
import { loadTemplateSource } from "@/lib/registry/load-source";
import PreviewFrame from "./preview-frame";
import CodeViewer from "./code-viewer";
import InstallCommand from "./install-command";
import TabPanel from "./tab-panel";
import { TemplateMock, colorToVariant } from "@/components/shared/template-mock";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const GithubIcon = () => (
  <svg
    className="size-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface TemplateDetailProps {
  slug: string;
}

export default async function TemplateDetail({ slug }: TemplateDetailProps) {
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) notFound();

  // Check if this template has real source files in registry/ — returns null if not yet added
  const source = await loadTemplateSource(slug);
  const hasRealPreview = source !== null;

  const related = TEMPLATES.filter(
    (x) => x.slug !== t.slug && x.category === t.category
  ).slice(0, 3);
  const showRelated = related.length
    ? related
    : TEMPLATES.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <div className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/templates" className="hover:text-foreground">
            Templates
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{t.title}</span>
        </div>

        {/* Title block */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs uppercase tracking-wide">
              {t.category}
            </span>
            {t.featured && (
              <span className="bg-primary text-primary-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
                <Sparkles className="size-2.5" /> Featured
              </span>
            )}
            <span className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[10px]">
              Free · MIT
            </span>
          </div>
          <h1 className="font-serif text-5xl font-medium">{t.title}</h1>
          <p className="text-muted-foreground max-w-xl text-balance">
            {t.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {t.tags.map((tg) => (
              <span
                key={tg}
                className="border-border bg-card text-muted-foreground inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase"
              >
                {tg}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm">
              <GithubIcon /> View source
            </Button>
          </div>
        </div>

        {/* Install command */}
        <div className="mb-6">
          <InstallCommand slug={slug} />
        </div>

        {/* Preview / Code tabs */}
        <div className="border-border bg-card mb-10 overflow-hidden rounded-3xl border">
          {hasRealPreview ? (
            <TabPanel
              slug={slug}
              title={t.title}
              files={source!.files}
            />
          ) : (
            /* Fallback mock for templates not yet in registry */
            <div className="bg-muted flex min-h-[480px] items-center justify-center p-6">
              <div
                className="bg-card ring-border relative overflow-hidden rounded-2xl shadow-2xl shadow-black/15 ring-1"
                style={{ width: "100%", aspectRatio: "16/10" }}
              >
                <TemplateMock
                  accent={t.accent}
                  variant={colorToVariant(t.color)}
                />
              </div>
            </div>
          )}
        </div>

        {/* More like this */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-medium">More like this</h2>
            <Link
              href="/templates"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
            >
              All templates <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {showRelated.map((r) => (
              <Link
                key={r.slug}
                href={`/templates/${r.slug}`}
                className="group ring-border hover:ring-primary/30 bg-card relative flex flex-col overflow-hidden rounded-2xl text-left ring-1"
              >
                <div className="bg-muted relative h-40 overflow-hidden">
                  <div className="absolute inset-0 origin-center scale-[1.2]">
                    <TemplateMock
                      accent={r.accent}
                      variant={colorToVariant(r.color)}
                    />
                  </div>
                </div>
                <div className="border-border flex items-center justify-between border-t px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {r.category}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 opacity-30 transition group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
