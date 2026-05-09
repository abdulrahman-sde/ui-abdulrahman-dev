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
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54.195 91.1351C66.1969 91.1351 75.9262 81.4058 75.9262 69.4039C75.9262 57.402 66.1969 47.6727 54.195 47.6727C42.1932 47.6727 32.4639 57.402 32.4639 69.4039C32.4639 81.4058 42.1932 91.1351 54.195 91.1351Z"
          fill="#FBF0DF"
        />
        <path
          d="M49.4975 72.827C52.7936 72.827 55.4655 70.1551 55.4655 66.859C55.4655 63.5629 52.7936 60.891 49.4975 60.891C46.2014 60.891 43.5295 63.5629 43.5295 66.859C43.5295 70.1551 46.2014 72.827 49.4975 72.827Z"
          fill="#202A25"
        />
        <path
          d="M57.6521 68.0416C61.4326 68.0416 64.4975 64.9767 64.4975 61.1962C64.4975 57.4157 61.4326 54.3508 57.6521 54.3508C53.8715 54.3508 50.8066 57.4157 50.8066 61.1962C50.8066 64.9767 53.8715 68.0416 57.6521 68.0416Z"
          fill="#202A25"
        />
        <path
          d="M49.691 63.9575C50.7093 63.9575 51.5348 63.132 51.5348 62.1137C51.5348 61.0954 50.7093 60.2699 49.691 60.2699C48.6727 60.2699 47.8472 61.0954 47.8472 62.1137C47.8472 63.132 48.6727 63.9575 49.691 63.9575Z"
          fill="#FBF0DF"
        />
        <path
          d="M58.7463 60.1837C59.7646 60.1837 60.5901 59.3582 60.5901 57.3216 59.7646 56.4961 58.7463 56.4961C57.728 56.4961 56.9025 57.3216 56.9025 58.3399C56.9025 59.3582 57.728 60.1837 58.7463 60.1837Z"
          fill="#FBF0DF"
        />
        <path
          d="M54.195 47.6727V36.2163M32.4639 69.4039H21.0074M75.9262 69.4039H87.3826M38.8242 54.0416L30.7248 45.9422M69.5659 54.0416L77.6653 45.9422"
          stroke="#202A25"
          strokeWidth="8.6258"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M54.195 40.5901C46.8856 40.5901 40.9571 34.6616 40.9571 27.3522C40.9571 20.0428 46.8856 14.1143 54.195 14.1143C61.5044 14.1143 67.4329 20.0428 67.4329 27.3522C67.4329 34.6616 61.5044 40.5901 54.195 40.5901Z"
          fill="#FBF0DF"
        />
        <path
          d="M54.195 38.6481C47.9571 38.6481 42.899 33.59 42.899 27.3522C42.899 21.1144 47.9571 16.0563 54.195 16.0563C60.4329 16.0563 65.491 21.1144 65.491 27.3522C65.491 33.59 60.4329 38.6481 54.195 38.6481Z"
          fill="#202A25"
        />
      </svg>
    ),
  },
  {
    name: "npm",
    prefix: "npx shadcn@latest add",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.285 2H1.71436V14H14.285V2Z" fill="#CB3837" />
        <path
          d="M12.5707 12.2857H10.8564V6.28571H9.14212V12.2857H3.42783V4.57143H12.5707V12.2857Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "pnpm",
    prefix: "pnpm dlx shadcn@latest add",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H5.33333V5.33333H0V0Z" fill="#F69220" />
        <path d="M5.33333 0H10.6667V5.33333H5.33333V0Z" fill="#F69220" />
        <path d="M10.6667 0H16V5.33333H10.6667V0Z" fill="#F69220" />
        <path d="M0 5.33333H5.33333V10.6667H0V5.33333Z" fill="#4A4A4A" />
        <path
          d="M5.33333 5.33333H10.6667V10.6667H5.33333V5.33333Z"
          fill="#F69220"
        />
        <path d="M10.6667 5.33333H16V10.6667H10.6667V5.33333Z" fill="#F69220" />
        <path d="M0 10.6667H5.33333V16H0V10.6667Z" fill="#4A4A4A" />
        <path d="M5.33333 10.6667H10.6667V16H5.33333V10.6667Z" fill="#4A4A4A" />
        <path d="M10.6667 10.6667H16V16H10.6667V10.6667Z" fill="#F69220" />
      </svg>
    ),
  },
  {
    name: "yarn",
    prefix: "yarn shadcn@latest add",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="size-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6606 2H14.1208C14.1208 2 10.1557 7.02641 9.38792 7.97151L9.20818 8.1903L9.20464 8.47277V13.8475C9.20464 13.9317 9.13619 14 9.05193 14H6.94813C6.86387 14 6.79541 13.9317 6.79541 13.8475V8.47352L6.79184 8.19114L6.61226 7.97232C5.84534 7.03713 1.88231 2 1.88231 2H4.40798L7.81084 6.13621L8.00018 6.36622L8.18949 6.13618L11.6606 2Z"
          fill="#2C8EBB"
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
  const activeFile = files.find((f) => f.target === activeFileId) || files[0];

  return (
    <div className="flex flex-col gap-4 mb-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/30 p-2 border border-border rounded-lg">
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
              className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-muted/50 transition-colors"
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

          <code className="rounded bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground border border-border shadow-sm">
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
              defaultOpenIds={fileTreeElements
                .filter((e) => e.type === "folder")
                .map((e) => e.id)}
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
