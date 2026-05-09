import fs from "fs";
import path from "path";
import type { RegistryFile, RegistryItem, RegistryItemType, TemplateMeta } from "@/types/registry";
import { meta as launchuiMeta } from "@/registry/launchui/meta";

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");
const COMPONENTS_DIR = path.join(ROOT, "components");
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

const METAS: Record<string, TemplateMeta> = {
  launchui: launchuiMeta,
};

function walkDir(dir: string, base: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(base, fullPath);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath, base));
    } else if (entry.isFile() && entry.name !== "meta.ts" && !entry.name.startsWith(".")) {
      files.push(relPath);
    }
  }
  return files;
}

function fileType(targetPath: string): RegistryItemType {
  if (targetPath === "app/page.tsx") return "registry:page";
  if (targetPath === "app/globals.css") return "registry:file";
  if (targetPath.startsWith("hooks/")) return "registry:hook";
  if (targetPath.startsWith("lib/")) return "registry:lib";
  return "registry:component";
}

interface SourceFile {
  registryPath: string;
  target: string;
  absPath: string;
}

function collectSources(slug: string): SourceFile[] {
  const sources: SourceFile[] = [];

  const registryDir = path.join(REGISTRY_DIR, slug);
  for (const rel of walkDir(registryDir, registryDir)) {
    const basename = path.basename(rel);
    let target: string;
    if (basename === "globals.css") target = "app/globals.css";
    else if (rel === "page.tsx") target = "app/page.tsx";
    else target = `app/${rel}`;
    sources.push({
      registryPath: `registry/${slug}/${rel}`,
      target,
      absPath: path.join(registryDir, rel),
    });
  }

  const componentsDir = path.join(COMPONENTS_DIR, slug);
  for (const rel of walkDir(componentsDir, componentsDir)) {
    const basename = path.basename(rel);
    if (rel === "layout.tsx") {
      sources.push({
        registryPath: `components/${slug}/${rel}`,
        target: "app/layout.tsx",
        absPath: path.join(componentsDir, rel),
      });
      continue;
    }
    if (basename === "globals.css") {
      sources.push({
        registryPath: `components/${slug}/${rel}`,
        target: "app/globals.css",
        absPath: path.join(componentsDir, rel),
      });
      continue;
    }
    sources.push({
      registryPath: `components/${slug}/${rel}`,
      target: `components/${slug}/${rel}`,
      absPath: path.join(componentsDir, rel),
    });
  }

  return sources;
}

export async function buildRegistryItem(slug: string): Promise<RegistryItem> {
  const meta: TemplateMeta = METAS[slug] ?? { name: slug, title: slug };
  const sources = collectSources(slug);

  const byTarget = new Map<string, SourceFile>();
  for (const s of sources) {
    const existing = byTarget.get(s.target);
    if (!existing) byTarget.set(s.target, s);
    else if (s.registryPath.startsWith("components/")) byTarget.set(s.target, s);
  }

  const files: RegistryFile[] = Array.from(byTarget.values()).map((s) => ({
    path: s.registryPath,
    type: fileType(s.target),
    target: s.target,
    content: fs.readFileSync(s.absPath, "utf-8"),
  }));

  return {
    $schema: SCHEMA,
    name: meta.name,
    type: "registry:block",
    title: meta.title,
    description: meta.description,
    dependencies: meta.dependencies,
    registryDependencies: meta.registryDependencies,
    files,
    cssVars: meta.cssVars,
  };
}
