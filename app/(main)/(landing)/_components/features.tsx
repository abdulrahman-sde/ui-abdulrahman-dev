"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CopyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="12" height="12" rx="2" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1.5" />
    <rect x="4" y="4" width="12" height="12" rx="2" fill="#818CF8" fillOpacity="0.2" stroke="#818CF8" strokeWidth="1.5" />
    <path stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" d="M8 9h4M8 12h6" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7 3 12l5 5" />
    <path stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 7l5 5-5 5" />
    <path stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" d="M14 4 10 20" />
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F59E0B" d="M12 2 13.5 9.5 21 12l-7.5 2.5L12 22l-1.5-7.5L3 12l7.5-2.5Z" />
    <circle cx="19" cy="5" r="1.5" fill="#FCD34D" />
    <circle cx="5" cy="19" r="1" fill="#FCD34D" />
  </svg>
);

type Feature = "free-forever" | "copy-paste" | "developer-first" | "always-growing";

const TABS: { id: Feature; label: string; icon: React.ReactNode }[] = [
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
  { id: "copy-paste", label: "Copy & Paste Ready", icon: <CopyIcon className="size-4" /> },
  { id: "developer-first", label: "Developer-first", icon: <CodeIcon className="size-4" /> },
  { id: "always-growing", label: "Always Growing", icon: <SparkleIcon className="size-4" /> },
];

export default function Features() {
  const [feature, setFeature] = useState<Feature>("free-forever");

  return (
    <section id="features" className="bg-background @container py-24">
      <div className="@2xl:grid-cols-2 mx-auto grid max-w-3xl gap-6 px-6">
        <div>
          <h2 className="text-balance font-serif text-4xl font-medium">
            Built for developers who ship
          </h2>
          <p className="text-muted-foreground mb-6 mt-4 text-balance">
            No sign-ups, no paywalls. Just templates you can drop into your
            project and customize.
          </p>

          <div className="*:w-full">
            {TABS.map((it) => (
              <button
                key={it.id}
                onClick={() => setFeature(it.id)}
                className={cn(
                  "flex items-center gap-3 py-2 text-sm w-full",
                  feature === it.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
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
            <div />
            <div />
            <div />
            <div />
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
      {(
        [
          ["v0", "$0"],
          ["FREE", "MIT"],
          ["NO ACCT", "OPEN"],
        ] as [string, string][]
      ).map((row, i) => (
        <div
          key={i}
          className={cn(
            "relative flex h-4 items-center gap-12 px-6",
            i === 1 && "pl-17 pr-6",
            i === 2 && "px-8 gap-20",
          )}
        >
          <div className="bg-border absolute inset-0 my-auto h-px" />
          {row.map((t, j) => (
            <div
              key={j}
              className="bg-card shadow-black/5 ring-border relative flex h-5 items-center rounded-md px-3 shadow-sm ring-1 font-mono text-[10px]"
            >
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
    <div
      aria-hidden
      className="relative flex size-44 items-center justify-center mx-auto"
    >
      <svg viewBox="0 0 200 200" className="absolute size-full opacity-10" fill="none">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="100" y1="100"
              x2={100 + Math.cos(angle) * 95}
              y2={100 + Math.sin(angle) * 95}
              stroke="#F59E0B" strokeWidth="0.8" strokeLinecap="round"
            />
          );
        })}
      </svg>
      <svg viewBox="0 0 24 24" className="size-28 drop-shadow-xl" fill="none">
        <path fill="#F59E0B" fillOpacity="0.9" d="M12 2 13.8 9.2 21 12l-7.2 2.8L12 22l-1.8-7.2L3 12l7.2-2.8Z" />
        <path fill="#FCD34D" fillOpacity="0.6" d="M12 5 13.2 9.8 18 12l-4.8 1.8L12 19l-1.2-5.2L6 12l4.8-1.8Z" />
        <circle cx="19" cy="5" r="2" fill="#F59E0B" />
        <circle cx="5" cy="19" r="1.5" fill="#FCD34D" />
        <circle cx="20" cy="18" r="1" fill="#F59E0B" fillOpacity="0.6" />
      </svg>
    </div>
  );
}
