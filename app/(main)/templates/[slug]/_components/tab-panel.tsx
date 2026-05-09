"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import PreviewFrame from "./preview-frame";
import CodeViewer from "./code-viewer";
import type { TemplateSourceFile } from "@/types/registry";

type Tab = "preview" | "code";
type Manager = "bun" | "pnpm" | "npm" | "yarn";

const MANAGERS: Manager[] = ["bun", "pnpm", "npm", "yarn"];

function buildCmd(manager: Manager, url: string): string {
  switch (manager) {
    case "bun":
      return `bunx --bun shadcn@latest add "${url}"`;
    case "pnpm":
      return `pnpm dlx shadcn@latest add "${url}"`;
    case "npm":
      return `npx shadcn@latest add "${url}"`;
    case "yarn":
      return `yarn dlx shadcn@latest add "${url}"`;
  }
}

function BunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="13" r="9" fill="#FBF0DF" />
      <ellipse cx="8.5" cy="11.5" rx="1.5" ry="2" fill="#1A1A1A" />
      <ellipse cx="15.5" cy="11.5" rx="1.5" ry="2" fill="#1A1A1A" />
      <path
        d="M9 16c.8 1.2 5.2 1.2 6 0"
        stroke="#1A1A1A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10 6c-.5-1.5-3-2-3.5-.5"
        stroke="#F97316"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M14 6c.5-1.5 3-2 3.5-.5"
        stroke="#F97316"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NpmIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="7" width="20" height="10" rx="1" fill="#CB3837" />
      <rect x="5" y="10" width="3" height="4" fill="white" />
      <rect x="10" y="10" width="3" height="4" fill="white" />
      <rect x="11" y="12" width="1" height="2" fill="#CB3837" />
      <rect x="15" y="10" width="3" height="4" fill="white" />
      <rect x="16" y="12" width="1" height="2" fill="#CB3837" />
    </svg>
  );
}

function PnpmIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="6" height="6" rx="1" fill="#F9AD00" />
      <rect x="9" y="2" width="6" height="6" rx="1" fill="#F9AD00" />
      <rect x="16" y="2" width="6" height="6" rx="1" fill="#F9AD00" />
      <rect x="2" y="9" width="6" height="6" rx="1" fill="#4D4D4D" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="#F9AD00" />
      <rect x="16" y="9" width="6" height="6" rx="1" fill="#4D4D4D" />
      <rect x="2" y="16" width="6" height="6" rx="1" fill="#4D4D4D" />
      <rect x="9" y="16" width="6" height="6" rx="1" fill="#F9AD00" />
      <rect x="16" y="16" width="6" height="6" rx="1" fill="#4D4D4D" />
    </svg>
  );
}

function YarnIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#2C8EBB" />
      <path
        d="M7 8c1-1 2.5-.5 3 .5l1 2 1-2c.5-1 2-1.5 3-.5.5.5.5 1.5 0 2l-2 4c-.5 1-1.5 1-2 0l-2-4c-.5-.5-.5-1.5 0-2z"
        fill="white"
      />
    </svg>
  );
}

const MANAGER_ICONS: Record<
  Manager,
  React.ComponentType<{ className?: string }>
> = {
  bun: BunIcon,
  npm: NpmIcon,
  pnpm: PnpmIcon,
  yarn: YarnIcon,
};

interface TabPanelProps {
  slug: string;
  title: string;
  files: TemplateSourceFile[];
}

/* ── Preview + Code panel (top block) ── */
export function PreviewPanel({ slug, title, files }: TabPanelProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const previewUrl = `/templates/${slug}/preview`;

  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
      {/* Toolbar — tabs left, install bar center, open right */}
      <div className="flex items-center justify-between gap-1 border-b border-border bg-card px-2 py-2">
        {/* Tabs */}
        <div className="flex items-center  shrink-0">
          <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>
            Preview
          </TabBtn>
          <TabBtn active={tab === "code"} onClick={() => setTab("code")}>
            <span className="opacity-50 mr-0.5 font-mono">&lt;&gt;</span> Code
          </TabBtn>
        </div>

        {/* <div className="bg-border mx-2 h-4 w-px shrink-0" /> */}

        <div className="flex">
          {/* Install bar — flex-1 fills remaining space */}
          <div className="flex-1 min-w-0">
            <InstallBar slug={slug} />
          </div>

          {/* Open link */}
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 shrink-0 flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-150"
          >
            Open <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Content — double-bezel on preview */}
      {tab === "preview" ? (
        <div className="bg-muted p-3">
          <div className="rounded-[1.25rem] bg-card p-0.75 ring-1 ring-border shadow-sm">
            <div className="overflow-hidden rounded-[calc(1.25rem-3px)] ring-1 ring-border/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <PreviewFrame slug={slug} title={title} />
            </div>
          </div>
        </div>
      ) : (
        <CodeViewer files={files} />
      )}
    </div>
  );
}

/* ── Install command bar (separate block below) ── */
export function InstallBar({ slug }: { slug: string }) {
  const [manager, setManager] = useState<Manager>("bun");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://ui.abdulrahmanasif.dev/r/${slug}.json`;
  const cmd = buildCmd(manager, registryUrl);

  const copy = () => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const ManagerIcon = MANAGER_ICONS[manager];

  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* Manager picker */}
      <div className="relative shrink-0">
        <button
          onClick={() => setPickerOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 font-mono text-[11px] text-foreground hover:bg-card transition-colors duration-150 cursor-pointer"
        >
          <ManagerIcon className="size-3.5" />
          <span>{manager}</span>
          <svg viewBox="0 0 8 5" className="size-2 opacity-40" fill="none">
            <path
              d="M1 1l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {pickerOpen && (
          <ul className="absolute left-0 top-full z-20 mt-1 min-w-24 overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/8 py-1">
            {MANAGERS.map((m) => {
              const Icon = MANAGER_ICONS[m];
              return (
                <li key={m}>
                  <button
                    onClick={() => {
                      setManager(m);
                      setPickerOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-1.5 font-mono text-[11px] transition-colors cursor-pointer hover:bg-muted",
                      manager === m
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    {m}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Command — flex-1 pill */}
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-lg border border-border bg-muted px-3 py-1.5">
        <span className="font-mono text-[11px] text-muted-foreground/50 shrink-0 select-none">
          $
        </span>
        <span className="font-mono text-[11px] text-muted-foreground shrink-0">
          shadcn@latest add
        </span>
        <span className="font-mono text-[11px] text-foreground truncate min-w-0">
          {registryUrl}
        </span>
        <button
          onClick={copy}
          aria-label="Copy install command"
          className="ml-auto shrink-0 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-pointer pl-2"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

/* Keep default export for any existing imports */
export default function TabPanel(props: TabPanelProps) {
  return (
    <>
      <PreviewPanel {...props} />
      <InstallBar slug={props.slug} />
    </>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-7 rounded-md px-3 font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer transition-all duration-150",
        active
          ? "bg-foreground/8 text-foreground shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
      )}
    >
      {children}
    </button>
  );
}
