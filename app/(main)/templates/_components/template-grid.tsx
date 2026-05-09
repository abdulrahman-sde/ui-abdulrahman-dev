import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { TemplateMock, colorToVariant } from "@/components/shared/template-mock";
import { TEMPLATES } from "@/constants/templates";

export default function TemplateGrid() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-muted-foreground mb-10 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Templates</span>
        </div>

        <div className="mb-10">
          <h1 className="font-serif text-5xl font-medium">All templates</h1>
          <p className="text-muted-foreground mt-3 text-balance">
            Free, MIT-licensed landing page templates. More added every month.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <Link
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group ring-border hover:ring-primary/30 bg-card relative flex flex-col overflow-hidden rounded-2xl text-left ring-1 transition-all duration-200"
            >
              {t.featured && (
                <span className="bg-primary text-primary-foreground absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
                  <Sparkles className="size-2.5" /> Featured
                </span>
              )}
              <div className="bg-muted relative h-44 overflow-hidden">
                <div className="absolute inset-0 origin-center scale-[1.2]">
                  <TemplateMock accent={t.accent} variant={colorToVariant(t.color)} />
                </div>
                <div className="group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-200">
                  <span className="bg-background ring-border flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1">
                    View template <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>
              <div className="border-border flex items-center justify-between border-t px-4 py-3">
                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-medium">{t.title}</p>
                  <p className="text-muted-foreground truncate text-xs">{t.category} · {t.tags[0]}</p>
                </div>
                <span className="text-muted-foreground border-border rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap">Free</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
