"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Check,
  Copy,
  ChevronDown,
  Monitor,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileTree,
  type FileTreeElement,
} from "@/components/unlumen-ui/file-tree";
import { cn } from "@/lib/utils";

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

const PACKAGE_MANAGERS: {
  name: PackageManager;
  prefix: string;
  icon: React.ReactNode;
}[] = [
  {
    name: "bun",
    prefix: "bunx --bun shadcn@latest add",
    icon: (
      <svg viewBox="0 0 100 100" className="size-4" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="55" r="38" fill="#FBF0DF" />
        <ellipse cx="38" cy="62" rx="9" ry="9" fill="#14120E" />
        <ellipse cx="58" cy="57" rx="10.5" ry="10.5" fill="#14120E" />
        <circle cx="36" cy="59" r="3" fill="#FBF0DF" />
        <circle cx="56" cy="54" r="3.5" fill="#FBF0DF" />
        <circle cx="50" cy="17" r="11" fill="#FBF0DF" stroke="#14120E" strokeWidth="4" />
        <line x1="50" y1="28" x2="50" y2="44" stroke="#14120E" strokeWidth="5" strokeLinecap="round" />
        <line x1="17" y1="55" x2="30" y2="55" stroke="#14120E" strokeWidth="5" strokeLinecap="round" />
        <line x1="70" y1="55" x2="83" y2="55" stroke="#14120E" strokeWidth="5" strokeLinecap="round" />
        <line x1="27" y1="35" x2="36" y2="44" stroke="#14120E" strokeWidth="5" strokeLinecap="round" />
        <line x1="73" y1="35" x2="64" y2="44" stroke="#14120E" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "npm",
    prefix: "npx shadcn@latest add",
    icon: (
      <svg viewBox="0 0 18 7" className="size-4" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="7" fill="#CB3837" rx="1" />
        <rect x="1" y="1" width="5" height="5" fill="white" />
        <rect x="7" y="1" width="5" height="5" fill="white" />
        <rect x="13" y="1" width="4" height="5" fill="white" />
        <rect x="2" y="2" width="1" height="3" fill="#CB3837" />
        <rect x="4" y="2" width="1" height="4" fill="#CB3837" />
        <rect x="8" y="2" width="1" height="3" fill="#CB3837" />
        <rect x="10" y="2" width="1" height="4" fill="#CB3837" />
        <rect x="14" y="2" width="2" height="3" fill="#CB3837" />
      </svg>
    ),
  },
  {
    name: "pnpm",
    prefix: "pnpm dlx shadcn@latest add",
    icon: (
      <svg viewBox="0 0 16 16" className="size-4" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
        <rect x="5.6" y="0" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
        <rect x="11.2" y="0" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
        <rect x="0" y="5.6" width="4.8" height="4.8" rx="0.6" fill="#9B9B9B" />
        <rect x="5.6" y="5.6" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
        <rect x="11.2" y="5.6" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
        <rect x="0" y="11.2" width="4.8" height="4.8" rx="0.6" fill="#9B9B9B" />
        <rect x="5.6" y="11.2" width="4.8" height="4.8" rx="0.6" fill="#9B9B9B" />
        <rect x="11.2" y="11.2" width="4.8" height="4.8" rx="0.6" fill="#F69220" />
      </svg>
    ),
  },
  {
    name: "yarn",
    prefix: "yarn shadcn@latest add",
    icon: (
      <svg viewBox="0 0 24 24" className="size-4" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#2C8EBB" />
        <path
          d="M6.5 6.5C6.5 6.5 9.5 10.5 10 12.5V17.5H14V12.5C14.5 10.5 17.5 6.5 17.5 6.5H15L12 10.5L9 6.5H6.5Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export type TemplateFile = {
  path: string;
  target: string;
  content: string;
  html: string;
};

function buildFileTree(files: TemplateFile[]): FileTreeElement[] {
  const root: FileTreeElement[] = [];

  for (const file of files) {
    const parts = file.target.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = {
          id: parts.slice(0, i + 1).join("/"),
          name: part,
          type: isFile ? "file" : "folder",
          ...(isFile ? {} : { children: [] }),
        };
        currentLevel.push(existingNode);
      }

      if (!isFile && existingNode.children) {
        currentLevel = existingNode.children;
      }
    }
  }

  const sortNodes = (nodes: FileTreeElement[]) => {
    nodes.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === "folder" ? -1 : 1;
    });
    for (const node of nodes) {
      if (node.children) sortNodes(node.children);
    }
  };
  sortNodes(root);

  return root;
}

export function TemplateViewer({
  files,
  command,
  src,
  name,
}: {
  files: TemplateFile[];
  command: string;
  src: string;
  name: string;
}) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [pm, setPm] = useState<PackageManager>("bun");
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeFileId, setActiveFileId] = useState<string>(
    files[0]?.target || "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fileTreeElements = useMemo(() => buildFileTree(files), [files]);

  const allFolderIds = useMemo(() => {
    const ids: string[] = [];
    const collect = (nodes: ReturnType<typeof buildFileTree>) => {
      for (const n of nodes) {
        if (n.type === "folder") {
          ids.push(n.id);
          if (n.children) collect(n.children);
        }
      }
    };
    collect(fileTreeElements);
    return ids;
  }, [fileTreeElements]);

  const activeFile = files.find((f) => f.target === activeFileId) || files[0];

  return (
    <div className="flex flex-col gap-4 mb-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/60 dark:bg-muted/30 p-2 border border-border rounded-lg">
        {/* Left side: Tabs */}
        <div className="flex items-center gap-1 rounded-md bg-background p-1 border border-border shadow-sm">
          <button
            onClick={() => setView("preview")}
            className={cn(
              "flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-colors",
              view === "preview"
                ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <Monitor className="size-3.5" /> Preview
          </button>
          <button
            onClick={() => setView("code")}
            className={cn(
              "flex items-center gap-2 rounded px-3 py-1.5 text-xs font-medium transition-colors",
              view === "code"
                ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <Code2 className="size-3.5" /> Code
          </button>
        </div>

        {/* Right side: Command block */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-muted/50 transition-colors"
            >
              {current.icon}
              <span className="capitalize">{current.name}</span>
              <ChevronDown className="size-3.5 opacity-50" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 rounded-md border border-border bg-background p-1 shadow-md z-50">
                {PACKAGE_MANAGERS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setPm(p.name);
                      setDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted transition-colors capitalize"
                  >
                    {p.icon} {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <code className="rounded bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground border border-border shadow-sm max-w-[340px] truncate hidden sm:block">
            {fullCommand}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "gap-2 text-xs transition-colors h-8",
              copied &&
                "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10",
            )}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {view === "preview" ? (
        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted/30 p-2">
          <div className="flex items-center justify-end pb-2 px-1">
            <Link
              href={src}
              target="_blank"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Open Preview <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="h-[85dvh] w-full overflow-hidden rounded-xl border border-border bg-background relative isolate">
            <iframe
              src={src}
              className="border-0 absolute inset-0"
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
      ) : (
        <div className="flex h-[600px] w-full rounded-xl border border-border bg-card shadow-sm">
          <div className="w-[280px] shrink-0 border-r border-border bg-muted/10 p-3 overflow-y-auto">
            <FileTree
              className="border-0 bg-transparent"
              elements={fileTreeElements}
              selectedId={activeFileId}
              onSelect={(node) => {
                if (node.type === "file") {
                  setActiveFileId(node.id);
                }
              }}
              defaultOpenIds={allFolderIds}
            />
          </div>
          <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-[#09090b] relative">
            {activeFile ? (
              <div className="p-4 text-[13px] leading-[1.6] font-mono [&_pre]:!bg-transparent [&_pre]:!m-0 shiki-wrapper">
                <div dangerouslySetInnerHTML={{ __html: activeFile.html }} />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Select a file to view code
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
