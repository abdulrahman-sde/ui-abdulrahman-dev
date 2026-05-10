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

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type PackageManager = "bun" | "npm" | "pnpm" | "yarn";

const PACKAGE_MANAGERS: {
  name: PackageManager;
  prefix: string;
  icon: string;
}[] = [
  {
    name: "bun",
    prefix: "bunx --bun shadcn@latest add",
    icon: "/icons/bun.svg",
  },
  {
    name: "npm",
    prefix: "npx shadcn@latest add",
    icon: "/icons/npm.svg",
  },
  {
    name: "pnpm",
    prefix: "pnpm dlx shadcn@latest add",
    icon: "/icons/pnpm.svg",
  },
  {
    name: "yarn",
    prefix: "yarn shadcn@latest add",
    icon: "/icons/yarn.svg",
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
    <div className="flex flex-col gap-3 mb-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        {/* Left side: Tabs */}
        <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg border border-border/50 relative">
          <button
            onClick={() => setView("preview")}
            className={cn(
              "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200",
              view === "preview"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {view === "preview" && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-background dark:bg-zinc-800/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] dark:shadow-none border border-border/50 rounded-md"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <Monitor className="relative z-10 size-3.5" />
            <span className="relative z-10">Preview</span>
          </button>
          <button
            onClick={() => setView("code")}
            className={cn(
              "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200",
              view === "code"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {view === "code" && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-background dark:bg-zinc-800/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] dark:shadow-none border border-border/50 rounded-md"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <Code2 className="relative z-10 size-3.5" />
            <span className="relative z-10">Code</span>
          </button>
        </div>

        {/* Right side: Command block */}
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.25 text-xs font-medium hover:bg-muted/50 transition-colors"
            >
              <Image
                src={current.icon}
                alt={current.name}
                width={20}
                height={20}
              />
              {/* <span className="capitalize">{current.name}</span> */}
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
                    <Image src={p.icon} alt={p.name} width={20} height={20} />
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <code className="rounded bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground border border-border max-w-[320px] truncate hidden sm:block">
            {fullCommand}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "gap-1.5 text-[11px] transition-colors h-7 px-2",
              copied &&
                "border-green-500/50 text-green-600 dark:text-green-400 bg-green-500/10",
            )}
          >
            {copied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </Button>
        </div>
      </div>

      {view === "preview" ? (
        <div className="relative w-full rounded-2xl border border-border bg-muted/30 p-2 overflow-hidden">
          <div className="flex items-center justify-end pb-2 px-1">
            <Link
              href={src}
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Open Preview <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <div className="h-[85dvh] w-full overflow-hidden rounded-xl border border-border bg-background relative isolate flex flex-col shadow-2xl shadow-black/5 dark:shadow-black/40">
            <div className="flex-1 relative overflow-hidden bg-muted/5">
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
        </div>
      ) : (
        <div className="flex h-[600px] w-full rounded-xl border border-border bg-card overflow-hidden">
          <div className="w-[260px] shrink-0 border-r border-border bg-muted/10 p-2.5 overflow-y-auto">
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
