import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Terminal } from "lucide-react";
import {
  MockNorthwind,
  MockHalcyon,
  MockAtelier,
} from "@/components/shared/template-mock";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="overflow-hidden">
      <section className="bg-background relative">
        <div className="relative min-h-dvh flex items-center">
          {/* Background image — fades toward right side, clipped to visual half */}
          <div
            className="absolute inset-0 dark:opacity-5"
            style={{
              maskImage:
                "radial-gradient(60% 80% at 75% 40%, black 40%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(60% 80% at 75% 40%, black 40%, transparent 90%)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1740516367177-ae20098c8786?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              fill
              loading="eager"
              className="object-cover object-center"
              aria-hidden
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-32">
            {/* Editorial split: copy left, browser mocks right */}
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
              {/* Left: copy */}
              <div>
                <p className="text-muted-foreground mb-5 font-mono text-[10px] uppercase tracking-[0.22em]">
                  Free &amp; MIT-licensed
                </p>
                <h1 className="font-serif text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
                  Landing page templates,{" "}
                  <span className="opacity-50">ready to fork.</span>
                </h1>
                <p className="text-muted-foreground mt-6 leading-relaxed max-w-[46ch]">
                  A growing collection of clean, modern templates. Copy,
                  customize, and ship — no sign-ups, no fees.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <Button className="rounded-full pr-1.5" asChild>
                    <Link href="#templates">
                      <span className="text-nowrap">Browse Templates</span>
                      <span className="ml-1 flex size-6 items-center justify-center rounded-full bg-white/15">
                        <ChevronRight className="size-3.5" />
                      </span>
                    </Link>
                  </Button>
                  <Link
                    href="https://github.com/abdulrahmanasif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline transition-colors duration-200"
                  >
                    GitHub
                  </Link>
                </div>
              </div>

              {/* Right: floating browser mock cluster */}
              <div
                aria-hidden
                className="hidden lg:block relative h-105"
                style={{
                  perspective: "1200px",
                  maskImage:
                    "radial-gradient(75% 100% at 50% 50%, black 55%, transparent 90%)",
                  WebkitMaskImage:
                    "radial-gradient(75% 100% at 50% 50%, black 55%, transparent 90%)",
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
                    className="absolute -right-8 top-2 w-110"
                    url="atelier.preview"
                    accent="oklch(0.45 0.05 270)"
                    variant="atelier"
                  />
                  <div className="animate-float-a">
                    <BrowserWindow
                      className="absolute -right-2 top-14 w-110"
                      url="halcyon.preview"
                      accent="oklch(0.78 0.16 65)"
                      variant="halcyon"
                    />
                  </div>
                  <div className="bg-card ring-border shadow-foreground/10 absolute left-4 top-3 z-20 min-w-64 rounded-2xl p-1 shadow-xl ring-1 dark:shadow-black/40 animate-float-b">
                    <div className="border-border/60 mb-1 flex items-center gap-2 border-b px-3 py-2">
                      <Search className="size-3.5 opacity-60" />
                      <span className="text-muted-foreground text-xs">
                        Search templates…
                      </span>
                      <span className="border-border text-muted-foreground ml-auto rounded border px-1 py-0.5 font-mono text-[10px]">
                        ⌘K
                      </span>
                    </div>
                    <PickerRow swatch="oklch(0.85 0.16 159)" name="Northwind" cat="SaaS" />
                    <PickerRow swatch="oklch(0.45 0.05 270)" name="Atelier" cat="Portfolio" />
                    <PickerRow swatch="oklch(0.78 0.16 65)" name="Halcyon" cat="Agency" />
                    <PickerRow swatch="oklch(0.78 0.13 230)" name="Echo" cat="Mobile App" />
                    <PickerRow swatch="oklch(0.72 0.18 12)" name="RSVP" cat="Waitlist" />
                    <div className="border-border/60 mx-3 mt-1 border-t pt-2 pb-1">
                      <div className="bg-muted flex items-center gap-2 rounded-lg px-2.5 py-1.5">
                        <Terminal className="text-primary size-3 shrink-0" />
                        <span className="font-mono text-[9px] text-foreground/70 truncate">
                          bunx shadcn add ui.abdulrahmanasif.dev/r/northwind.json
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-2 z-10 w-115">
                    <BrowserWindow
                      url="templates"
                      accent="oklch(0.85 0.16 159)"
                      variant="northwind"
                    />
                  </div>
                </div>
              </div>
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
}: {
  swatch: string;
  name: string;
  cat: string;
}) {
  return (
    <div className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm">
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
}

function BrowserWindow({
  className = "",
  url,
  accent,
  variant,
}: {
  className?: string;
  url: string;
  accent: string;
  variant: "northwind" | "halcyon" | "atelier";
}) {
  return (
    <div
      className={`bg-card ring-border overflow-hidden rounded-2xl shadow-2xl shadow-black/15 ring-1 ${className}`}
    >
      <div className="border-border/60 bg-card flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <span className="bg-muted-foreground/30 size-2 rounded-full" />
        <div className="bg-muted ml-2 flex h-4 flex-1 items-center rounded px-2">
          <span className="text-muted-foreground font-mono text-[9px]">
            ui.abdulrahmanasif.dev/{url}
          </span>
        </div>
      </div>
      <div className="bg-background relative aspect-16/10">
        {variant === "northwind" && <MockNorthwind accent={accent} />}
        {variant === "halcyon" && <MockHalcyon accent={accent} />}
        {variant === "atelier" && <MockAtelier accent={accent} />}
      </div>
    </div>
  );
}
