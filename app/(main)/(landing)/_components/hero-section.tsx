import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Terminal } from "lucide-react";
import Image from "next/image";
import { TEMPLATES } from "@/constants/templates";

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="bg-background relative">
        <div className="relative py-24 sm:py-26">
          <div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] mask-t-from-50% lg:aspect-9/4 absolute inset-0 hidden aspect-square sm:block lg:top-24 dark:opacity-30 dark:invert">
            <Image
              src="https://images.unsplash.com/photo-1740516367177-ae20098c8786?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero background"
              width={2268}
              height={1740}
              priority
              sizes="(max-width: 1280px) 100vw, 2268px"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
            <div
              aria-hidden
              className="min-w-2xl mb-6 ml-auto hidden max-w-3xl scale-90 py-12 pl-6 sm:mb-12 sm:block md:pl-12 lg:mb-20"
              style={{
                perspective: "1200px",
                maskImage:
                  "radial-gradient(75% 100% at 0% 50%, black 65%, transparent 90%)",
                WebkitMaskImage:
                  "radial-gradient(75% 100% at 0% 50%, black 65%, transparent 90%)",
              }}
            >
              <div
                className="bg-muted relative flex h-72 flex-col rounded-3xl border"
                style={{
                  transform:
                    "rotateX(12deg) rotateY(2deg) rotateZ(10deg) rotate(-12deg)",
                }}
              >
                <BrowserWindow
                  className="absolute -right-8 top-2 w-[440px]"
                  url="glaze"
                  accent="oklch(0.45 0.05 270)"
                  variant="atelier"
                  thumbnail={
                    TEMPLATES.find((t) => t.slug === "glaze")?.thumbnail
                  }
                />
                <div className="animate-float-a">
                  <BrowserWindow
                    className="absolute -right-2 top-14 w-[440px]"
                    url="popcorn"
                    accent="oklch(0.78 0.16 65)"
                    variant="halcyon"
                    thumbnail={
                      TEMPLATES.find((t) => t.slug === "popcorn")?.thumbnail
                    }
                  />
                </div>
                <div className="bg-card ring-border shadow-foreground/10 absolute left-4 top-4 z-20 min-w-64 rounded-2xl p-1 shadow-xl ring-1 dark:shadow-black/40 animate-float-b">
                  <div className="border-border/60 mb-1 flex items-center gap-2 border-b px-3 py-2">
                    <Search className="size-3.5 opacity-60" />
                    <span className="text-muted-foreground text-xs">
                      Search templates…
                    </span>
                    <span className="border-border text-muted-foreground ml-auto rounded border px-1 py-0.5 font-mono text-[10px]">
                      ⌘K
                    </span>
                  </div>
                  <PickerRow
                    swatch="oklch(0.75 0.16 45)"
                    name="Nova"
                    cat="SaaS"
                    featured
                    slug="nova"
                  />
                  <PickerRow
                    swatch="oklch(0.45 0.05 270)"
                    name="Glaze"
                    cat="Dashboard"
                    slug="glaze"
                  />
                  <PickerRow
                    swatch="oklch(0.85 0.16 159)"
                    name="Popcorn"
                    cat="Mobile App"
                    featured
                    slug="popcorn"
                  />
                  <PickerRow
                    swatch="oklch(0.72 0.18 142)"
                    name="Nexora"
                    cat="AI Tool"
                    slug="nexora"
                  />
                  <div className="border-border/60 mx-3 mt-1 border-t pt-2 pb-1">
                    <div className="bg-muted flex items-center gap-2 rounded-lg px-2.5 py-1.5">
                      <Terminal className="text-primary size-3 shrink-0" />
                      <span className="font-mono text-[9px] text-foreground/70 truncate">
                        bunx shadcn add kairoui.online/r/nova.json
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-2 z-10 w-[460px]">
                  <BrowserWindow
                    url="templates/nova"
                    accent="oklch(0.85 0.16 159)"
                    variant="northwind"
                    thumbnail={
                      TEMPLATES.find((t) => t.slug === "nova")?.thumbnail
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-balance font-serif text-4xl font-medium sm:text-5xl">
                Free landing page templates.
              </h1>
              <p className="text-muted-foreground mt-4 text-balance">
                A growing collection of modern landing page templates. Copy,
                customize, and ship.
              </p>
              <Button className="mt-6 pr-1.5" asChild>
                <Link href="/templates">
                  <span className="text-nowrap">Browse Templates</span>
                  <ChevronRight className="opacity-50" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float-a { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes float-b { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float-a { animation: float-a 6s ease-in-out infinite; }
        .animate-float-b { animation: float-b 7.5s ease-in-out infinite 0.6s; }
      `}</style>
    </main>
  );
}

function PickerRow({
  swatch,
  name,
  cat,
  featured,
  slug,
}: {
  swatch: string;
  name: string;
  cat: string;
  featured?: boolean;
  slug?: string;
}) {
  const content = (
    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors">
      <span
        className="border-border size-5 shrink-0 rounded-md border"
        style={{
          background: `linear-gradient(135deg, ${swatch} 0%, color-mix(in oklch, ${swatch} 60%, white) 100%)`,
        }}
      />
      <span className="font-medium">{name}</span>
      <span className="text-muted-foreground text-xs">{cat}</span>
    </div>
  );

  if (slug) {
    return <Link href={`/template/${slug}`}>{content}</Link>;
  }
  return content;
}

function BrowserWindow({
  className = "",
  url,
  accent,
  variant,
  thumbnail,
}: {
  className?: string;
  url: string;
  accent: string;
  variant: "northwind" | "halcyon" | "atelier";
  thumbnail?: any;
}) {
  return (
    <div
      className={`bg-card ring-border overflow-hidden rounded-2xl shadow-2xl shadow-black/15 ring-1 ${className}`}
    >
      <div className="border-border/60 bg-card/50 backdrop-blur-sm flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <div className="bg-muted/50 ml-2 flex h-4 flex-1 items-center rounded px-2">
          <span className="text-muted-foreground font-mono text-[9px]">
            kairoui.online/{url}
          </span>
        </div>
      </div>
      <div className="bg-background relative aspect-[16/10] w-full">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt="Preview"
            fill
            loading="lazy"
            sizes="460px"
            className="object-cover object-top opacity-90 transition-all dark:invert dark:hue-rotate-180"
          />
        )}
      </div>
    </div>
  );
}
