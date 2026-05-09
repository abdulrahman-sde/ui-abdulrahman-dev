"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

const PACKAGE_MANAGERS: { name: PackageManager; prefix: string }[] = [
  { name: "bun", prefix: "bunx --bun shadcn@latest add" },
  { name: "npm", prefix: "npx shadcn@latest add" },
  { name: "pnpm", prefix: "pnpm dlx shadcn@latest add" },
  { name: "yarn", prefix: "yarn shadcn@latest add" },
];

export default function TemplateRenderer({
  src,
  name,
  command,
}: {
  src: string;
  name: string;
  command: string;
}) {
  const [pm, setPm] = useState<PackageManager>("bun");
  const [copied, setCopied] = useState(false);

  const current = PACKAGE_MANAGERS.find((p) => p.name === pm)!;
  const fullCommand = `${current.prefix} ${command}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-md border border-border bg-muted/30 p-1">
          {PACKAGE_MANAGERS.map((p) => (
            <button
              key={p.name}
              onClick={() => setPm(p.name)}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                pm === p.name
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <code className="rounded bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground">
            {fullCommand}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "gap-2 text-xs transition-colors",
              copied && "border-green-500/50 text-green-600 dark:text-green-400"
            )}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
          <Link
            href={src}
            target="_blank"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Open <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted/30 p-2">
        <div className="h-[85dvh] w-full overflow-hidden rounded-xl">
          <iframe
            src={src}
            className="border-0"
            style={{
              width: "200%",
              height: "200%",
              transform: "scale(0.5)",
              transformOrigin: "top left",
            }}
            title={`${name} Preview`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
