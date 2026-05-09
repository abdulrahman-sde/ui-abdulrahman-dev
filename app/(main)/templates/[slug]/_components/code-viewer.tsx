"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  FileTree,
  type FileTreeElement,
} from "@/components/unlumen-ui/file-tree";
import type { TemplateSourceFile } from "@/types/registry";

interface CodeViewerProps {
  files: TemplateSourceFile[];
}

function buildFileTree(files: TemplateSourceFile[]) {
  const root: FileTreeElement[] = [];
  const folderByPath = new Map<string, FileTreeElement>();
  const openFolderIds = new Set<string>();

  for (const file of files) {
    const segments = file.path.split("/");
    const fileName = segments.pop();
    if (!fileName) continue;

    let currentPath = "";
    let siblings = root;

    for (const segment of segments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      openFolderIds.add(currentPath);

      let folder = folderByPath.get(currentPath);
      if (!folder) {
        folder = {
          id: currentPath,
          name: segment,
          type: "folder",
          children: [],
        };
        folderByPath.set(currentPath, folder);
        siblings.push(folder);
      }

      siblings = folder.children ?? [];
      folder.children = siblings;
    }

    siblings.push({
      id: file.path,
      name: fileName,
      icon: undefined,
    });
  }

  return { elements: root, defaultOpenIds: Array.from(openFolderIds) };
}

export default function CodeViewer({ files }: CodeViewerProps) {
  const tree = useMemo(() => buildFileTree(files), [files]);
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
      <div className="flex min-h-120 items-center justify-center text-sm text-muted-foreground">
        No source files found.
      </div>
    );
  }

  return (
    <div className="flex min-h-120">
      {/* File tree sidebar */}
      <div className="border-border bg-card w-64 shrink-0 border-r p-2">
        <FileTree
          elements={tree.elements}
          className="border-border/60 bg-background/40 rounded-2xl border shadow-sm"
          selectedId={selected}
          onSelect={(node) => {
            if (node.type !== "folder") {
              setSelected(node.id);
            }
          }}
          defaultOpenIds={tree.defaultOpenIds}
          showIcons
        />
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
