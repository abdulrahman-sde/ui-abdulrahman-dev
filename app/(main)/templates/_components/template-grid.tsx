import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  TemplateMock,
  colorToVariant,
} from "@/components/shared/template-mock";
import { TEMPLATES } from "@/constants/templates";

export default function TemplateGrid() {
  return (
    <div className="pt-32 pb-28 px-4">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="font-serif text-[2.6rem] font-medium leading-[1.1] tracking-tight">
          All templates
        </h1>
        <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed text-balance">
          Free, open-source landing page templates built with Next.js and
          Tailwind. Pick one, run a single command, and it drops straight into
          your project.
        </p>
        <div className="border-border mt-8 h-px w-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {TEMPLATES.map((t) => (
          <Link
            key={t.slug}
            href={`/templates/${t.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border"
          >
            {/* Thumbnail with inner double-bezel */}
            <div className="bg-muted p-3" style={{ aspectRatio: "16/10" }}>
              {/* Outer bezel shell */}
              <div className="h-full rounded-xl bg-foreground/10 p-1.5 ring-1 ring-foreground/10">
                {/* Inner core — image clips here */}
                <div className="relative h-full w-full overflow-hidden rounded-[calc(0.75rem-3px)]">
                  {t.thumbnail ? (
                    <Image
                      src={t.thumbnail}
                      alt={t.title}
                      fill
                      placeholder="blur"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 600px"
                    />
                  ) : (
                    <div className="absolute inset-0 origin-center scale-[1.15] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.2]">
                      <TemplateMock
                        accent={t.accent}
                        variant={colorToVariant(t.color)}
                      />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-background px-4 py-2 text-xs font-medium ring-1 ring-border shadow-sm">
                      View template
                      <span className="flex size-5 items-center justify-center rounded-full bg-foreground/8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="size-2.5" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3">
              <p className="truncate text-sm font-medium text-foreground">
                {t.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
