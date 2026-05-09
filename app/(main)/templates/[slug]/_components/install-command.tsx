"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface InstallCommandProps {
  slug: string;
}

export default function InstallCommand({ slug }: InstallCommandProps) {
  const [manager, setManager] = useState<Manager>("bun");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://ui.abdulrahmanasif.dev/r/${slug}.json`;
  const cmd = buildCmd(manager, registryUrl);

  const copy = () => {
    navigator.clipboard?.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-border bg-background flex overflow-hidden rounded-xl border font-mono text-xs">
      {/* Package manager picker */}
      <div className="relative border-border border-r">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-full items-center gap-1.5 px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <span>{manager}</span>
          <ChevronDown className="size-3" />
        </button>
        {open && (
          <ul className="border-border bg-popover absolute left-0 top-full z-10 mt-1 min-w-[80px] overflow-hidden rounded-lg border shadow-lg">
            {MANAGERS.map((m) => (
              <li key={m}>
                <button
                  onClick={() => {
                    setManager(m);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full px-3 py-1.5 text-left text-xs hover:bg-muted transition-colors cursor-pointer",
                    manager === m ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Command */}
      <div className="flex flex-1 items-center px-3 py-2.5 text-[11px] overflow-x-auto whitespace-nowrap">
        <span className="text-muted-foreground mr-1">$</span>
        <span className="text-foreground">{cmd}</span>
      </div>

      {/* Copy */}
      <button
        onClick={copy}
        className="border-border flex items-center gap-1 border-l px-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Copy install command"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
