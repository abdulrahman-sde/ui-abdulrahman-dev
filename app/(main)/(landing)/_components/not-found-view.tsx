import Link from "next/link";
import { TEMPLATES } from "@/constants/templates";
import {
  TemplateMock,
  colorToVariant,
} from "@/components/shared/template-mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, ArrowUpRight } from "lucide-react";

export default function NotFoundView() {
  const suggestions = TEMPLATES.slice(0, 3);
  return (
    <div className="relative flex-1 overflow-hidden pt-32 pb-16">
      <div
        className="pointer-events-none absolute inset-0 -z-0 dark:opacity-30"
        style={{
          maskImage:
            "radial-gradient(60% 100% at 50% 0%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60% 100% at 50% 0%, black 40%, transparent 75%)",
          background:
            "radial-gradient(80% 60% at 50% -10%, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div
          className="mx-auto mb-10 max-w-md"
          style={{ perspective: "1200px" }}
        >
          <div
            className="bg-card ring-border overflow-hidden rounded-2xl shadow-2xl shadow-black/15 ring-1"
            style={{ transform: "rotateX(8deg) rotateY(-2deg) rotate(-3deg)" }}
          >
            <div className="border-border/60 flex items-center gap-1.5 border-b px-3 py-2">
              <span className="bg-muted-foreground/30 size-2 rounded-full" />
              <span className="bg-muted-foreground/30 size-2 rounded-full" />
              <span className="bg-muted-foreground/30 size-2 rounded-full" />
              <div className="bg-muted ml-2 flex h-4 flex-1 items-center rounded px-2">
                <span className="text-muted-foreground font-mono text-[9px]">
                  ui.abdulrahmanasif.dev/lost-in-the-grid
                </span>
              </div>
            </div>
            <div
              className="bg-background relative flex items-center justify-center"
              style={{ aspectRatio: "16/10" }}
            >
              <div
                className="text-foreground select-none font-serif font-medium leading-none"
                style={{ fontSize: 120, letterSpacing: "-0.04em" }}
              >
                404
              </div>
              <div className="text-muted-foreground absolute inset-x-6 bottom-4 flex items-center justify-between font-mono text-[10px]">
                <span>404 — Page not found</span>
                <span className="flex items-center gap-1">
                  <span className="bg-destructive size-1.5 rounded-full" /> No
                  route
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-serif text-4xl font-medium sm:text-5xl">
            This template doesn&apos;t exist.
          </h1>
          <p className="text-muted-foreground mt-4 text-balance">
            The page you&apos;re looking for has either moved, never existed, or
            is still on my to-build list. Try one of these instead.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button className="pr-1.5" asChild>
              <Link href="/">
                <ArrowLeft className="size-3.5 opacity-60" /> Back to home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">
                <Compass className="size-3.5 opacity-60" /> Browse templates
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-muted-foreground mb-4 text-center text-xs uppercase tracking-wide">
            Try these instead
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {suggestions.map((t) => (
              <Link
                key={t.slug}
                href={`/template/${t.slug}`}
                className="group ring-border hover:ring-primary/30 bg-card relative flex flex-col overflow-hidden rounded-2xl text-left ring-1"
              >
                <div className="bg-muted relative h-36 overflow-hidden">
                  <div className="absolute inset-0 origin-center scale-[1.2]">
                    <TemplateMock
                      accent={t.accent}
                      variant={colorToVariant(t.color)}
                    />
                  </div>
                </div>
                <div className="border-border flex items-center justify-between border-t px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {t.category}
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
