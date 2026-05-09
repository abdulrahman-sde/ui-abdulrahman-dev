"use client";

import { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateSourceFile } from "@/types/registry";

interface CodeViewerProps {
  files: TemplateSourceFile[];
}

export default function CodeViewer({ files }: CodeViewerProps) {
  const [selected, setSelected] = useState(files[0]?.path ?? "");
  const [copied, setCopied] = useState(false);

  const activeFile = files.find((f) => f.path === selected) ?? files[0];

  const copy = () => {
    if (!activeFile) return;
    navigator.clipboard?.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!files.length) {
    return (
      <div className="flex min-h-[480px] items-center justify-center text-sm text-muted-foreground">
        No source files found.
      </div>
    );
  }

  return (
    <div className="flex min-h-[480px]">
      {/* File tree sidebar */}
      <div className="border-border bg-card w-48 shrink-0 border-r">
        <div className="border-border border-b px-3 py-2">
          <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">
            Files
          </span>
        </div>
        <ul className="py-1">
          {files.map((f) => (
            <li key={f.path}>
              <button
                onClick={() => setSelected(f.path)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-1.5 text-left text-[11px] transition-colors cursor-pointer",
                  selected === f.path
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileCode className="size-3 shrink-0" />
                <span className="truncate">{f.path}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Code pane */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* File header */}
        <div className="border-border bg-card flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-[11px]">
            {activeFile?.path}
          </span>
          <button
            onClick={copy}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" /> Copy
              </>
            )}
          </button>
        </div>

        {/* Highlighted source */}
        <div
          className="shiki-wrapper flex-1 overflow-auto p-4 font-mono text-xs leading-6"
          dangerouslySetInnerHTML={{ __html: activeFile?.html ?? "" }}
        />
      </div>
    </div>
  );
}
