import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEMPLATES } from "@/constants/templates";
import {
  TemplateMock,
  colorToVariant,
} from "@/components/shared/template-mock";
import type { Template } from "@/types/template";
import Image from "next/image";

function TemplateThumb({ t }: { t: Template }) {
  return (
    <div className="absolute inset-0 scale-[1.2] origin-center">
      <TemplateMock accent={t.accent} variant={colorToVariant(t.color)} />
    </div>
  );
}

export default function TemplatesShowcase() {
  const featured = TEMPLATES.slice(0, 2);
  return (
    <section id="templates" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl font-medium">Templates</h2>
            <p className="text-muted-foreground mt-3 text-balance">
              Free to use. More added regularly.
            </p>
          </div>
          <Link
            href="/templates"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
          >
            View all <ArrowUpRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/template/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border text-left"
            >
              {/* Thumbnail with inner double-bezel */}
              <div className="bg-muted p-3 h-55">
                {/* Outer bezel shell */}
                <div className="h-full rounded-xl bg-foreground/10 p-1.5 ring-1 ring-foreground/10">
                  {/* Inner core — image clips here */}
                  <div className="relative h-full w-full overflow-hidden rounded-[calc(0.75rem-3px)]">
                    {t.thumbnail ? (
                      <Image
                        src={t.thumbnail}
                        alt={t.title}
                        fill
                        loading="lazy"
                        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 480px"
                      />
                    ) : (
                      <TemplateThumb t={t} />
                    )}
                    <div className="group-hover:opacity-100 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:bg-black/5">
                      <span className="bg-background ring-border flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1">
                        Preview <ArrowUpRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card border-border flex items-center justify-between border-t px-4 py-3">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {t.title}
                  </p>
                </div>
                <span className="text-muted-foreground border-border rounded-full border px-2.5 py-0.5 text-xs">
                  Free
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
