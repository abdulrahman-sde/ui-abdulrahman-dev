"use client";
import { useState } from "react";
import { Copy, Code2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Feature = "free-forever" | "copy-paste" | "developer-first" | "always-growing";

export default function Features() {
  const [feature, setFeature] = useState<Feature>("free-forever");
  return (
    <section id="features" className="bg-background @container py-24">
      <div className="@2xl:grid-cols-2 mx-auto grid max-w-3xl gap-6 px-6">
        <div>
          <h2 className="text-balance font-serif text-4xl font-medium">Built for developers who ship</h2>
          <p className="text-muted-foreground mb-6 mt-4 text-balance">
            No sign-ups, no paywalls. Just templates you can drop into your project and customize.
          </p>
          <Button variant="secondary" size="sm" className="gap-1 pr-1.5" asChild>
            <Link href="#templates">
              Browse Templates <ChevronRight className="size-3.5" />
            </Link>
          </Button>
          <div className="mt-16 *:w-full">
            {(
              [
                {
                  id: "free-forever",
                  label: "Free Forever",
                  icon: (
                    <span className="flex size-4 items-center -space-x-2">
                      <span className="size-3 shrink-0 rounded-full border border-current" />
                      <span className="size-3 shrink-0 rounded-full border border-current" />
                    </span>
                  ),
                },
                { id: "copy-paste", label: "Copy & Paste Ready", icon: <Copy className="size-4" /> },
                { id: "developer-first", label: "Developer-first", icon: <Code2 className="size-4" /> },
                { id: "always-growing", label: "Always Growing", icon: <Sparkles className="size-4" /> },
              ] as { id: Feature; label: string; icon: React.ReactNode }[]
            ).map((it) => (
              <button
                key={it.id}
                onClick={() => setFeature(it.id)}
                className={cn(
                  "flex items-center gap-3 py-2 text-sm w-full",
                  feature === it.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="@max-xl:-mx-6 not-dark:bg-linear-to-b not-dark:via-muted relative flex items-center overflow-hidden rounded-3xl *:w-full">
          <div
            aria-hidden
            className={cn(
              "*:bg-linear-to-r not-dark:opacity-50 mask-y-from-65% *:to-muted dark:*:to-foreground/2 absolute inset-0 grid grid-cols-4 duration-300",
              feature === "free-forever" && "*:bg-linear-to-t grid-cols-1 grid-rows-12",
              feature === "developer-first" && "*:bg-linear-to-l grid-cols-2 dark:opacity-50",
              feature === "copy-paste" && "*:opacity-35",
            )}
          >
            <div /><div /><div /><div />
          </div>
          {feature === "free-forever" && <FreeForeverIllo />}
          {feature === "copy-paste" && <CopyPasteIllo />}
          {feature === "developer-first" && <DeveloperIllo />}
          {feature === "always-growing" && <GrowingIllo />}
        </div>
      </div>
    </section>
  );
}

function FreeForeverIllo() {
  return (
    <div aria-hidden className="flex h-44 flex-col justify-between pt-8">
      {([["v0", "$0"], ["FREE", "MIT"], ["NO ACCT", "OPEN"]] as [string, string][]).map((row, i) => (
        <div key={i} className={cn("relative flex h-10 items-center gap-12 px-6", i === 1 && "pl-17 pr-6", i === 2 && "px-8 gap-20")}>
          <div className="bg-border absolute inset-0 my-auto h-px" />
          {row.map((t, j) => (
            <div key={j} className="bg-card shadow-black/5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring-1 font-mono text-[10px]">
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CopyPasteIllo() {
  return (
    <div aria-hidden className="relative h-44 translate-y-6">
      <div className="bg-foreground/15 absolute inset-0 mx-auto w-px" />
      <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border" />
      <div
        className="border-primary absolute -inset-x-16 top-6 aspect-square rounded-full border"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
        }}
      />
      <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border" />
      <div
        className="absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500"
        style={{
          maskImage: "linear-gradient(to right, black, transparent 50%)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent 50%)",
        }}
      />
    </div>
  );
}

function DeveloperIllo() {
  const highlighted = [4, 9, 13, 18, 23, 31];
  return (
    <div aria-hidden className="flex h-44 justify-between pb-6 pt-12">
      {Array.from({ length: 32 }).map((_, i) => (
        <div
          key={i}
          className="h-full w-px"
          style={{
            background: highlighted.includes(i)
              ? "var(--color-primary)"
              : "color-mix(in oklch, var(--foreground) 15%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function GrowingIllo() {
  return (
    <div aria-hidden className="relative flex size-44 items-center justify-center mx-auto">
      <Sparkles className="absolute size-full opacity-10" strokeWidth={0.4} />
      <Sparkles className="size-32 fill-card dark:fill-foreground/10 stroke-border drop-shadow-xl" strokeWidth={0.6} />
    </div>
  );
}
