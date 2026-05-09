import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEMPLATES } from "@/constants/templates";
import { TemplateMock, colorToVariant } from "@/components/shared/template-mock";
import type { Template } from "@/types/template";

function TemplateThumb({ t }: { t: Template }) {
  return (
    <div className="absolute inset-0 scale-[1.2] origin-center">
      <TemplateMock accent={t.accent} variant={colorToVariant(t.color)} />
    </div>
  );
}

export default function TemplatesShowcase() {
  const featured = TEMPLATES.slice(0, 6);
  return (
    <section id="templates" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl font-medium">Templates</h2>
            <p className="text-muted-foreground mt-3 text-balance">Free to use. More added regularly.</p>
          </div>
          <Link href="/templates" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">
            View all <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group ring-border hover:ring-primary/30 relative flex flex-col overflow-hidden rounded-2xl ring-1 transition-all duration-200 text-left"
            >
              <div className="bg-muted relative h-44 overflow-hidden">
                <TemplateThumb t={t} />
                <div className="group-hover:opacity-100 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 bg-black/0 group-hover:bg-black/5">
                  <span className="bg-background ring-border flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1">
                    Preview <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>
              <div className="bg-card border-border flex items-center justify-between border-t px-4 py-3">
                <div>
                  <p className="text-foreground text-sm font-medium">{t.title}</p>
                  <p className="text-muted-foreground text-xs">{t.category}</p>
                </div>
                <span className="text-muted-foreground border-border rounded-full border px-2.5 py-0.5 text-xs">Free</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
