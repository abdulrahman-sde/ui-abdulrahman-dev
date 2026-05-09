"use client";

import { useState } from "react";
import { Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PreviewFrame from "./preview-frame";
import CodeViewer from "./code-viewer";
import type { TemplateSourceFile } from "@/types/registry";

type Tab = "preview" | "code";

interface TabPanelProps {
  slug: string;
  title: string;
  files: TemplateSourceFile[];
}

export default function TabPanel({ slug, title, files }: TabPanelProps) {
  const [tab, setTab] = useState<Tab>("preview");

  return (
    <div>
      <div className="border-border flex items-center gap-1 border-b px-3 py-2">
        <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>
          <Eye className="size-3.5" /> Preview
        </TabBtn>
        <TabBtn active={tab === "code"} onClick={() => setTab("code")}>
          <Code2 className="size-3.5" /> Code
        </TabBtn>
      </div>
      {tab === "preview" ? (
        <PreviewFrame slug={slug} title={title} />
      ) : (
        <CodeViewer files={files} />
      )}
    </div>
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
        "h-8 rounded-full px-3 text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
