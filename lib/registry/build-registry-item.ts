import fs from "fs";
import path from "path";
import type { RegistryFile, RegistryItem, RegistryItemType, TemplateMeta } from "@/types/registry";
import { meta as notioMeta } from "@/registry/notio/meta";

const REGISTRY_DIR = path.join(process.cwd(), "registry");
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

// Add a new entry here for each template added to registry/
const METAS: Record<string, TemplateMeta> = {
  notio: notioMeta,
};

function walkDir(dir: string, base: string): string[] {
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

function fileType(filePath: string): RegistryItemType {
  if (filePath === "page.tsx" || filePath === "page.ts") return "registry:page";
  if (filePath === "globals.css") return "registry:lib";
  if (filePath.includes("hooks/") || filePath.startsWith("hooks")) return "registry:hook";
  if (filePath.includes("lib/") || filePath.startsWith("lib")) return "registry:lib";
  return "registry:component";
}

export async function buildRegistryItem(slug: string): Promise<RegistryItem> {
  const templateDir = path.join(REGISTRY_DIR, slug);
  const meta: TemplateMeta = METAS[slug] ?? { name: slug, title: slug };

  const filePaths = walkDir(templateDir, templateDir);
  const files: RegistryFile[] = filePaths.map((relPath) => {
    const fullPath = path.join(templateDir, relPath);
    const content = fs.readFileSync(fullPath, "utf-8");
    const target = meta.fileTargets?.[relPath] ?? `components/${slug}/${relPath}`;
    return {
      path: `registry/${slug}/${relPath}`,
      type: fileType(relPath),
      target,
      content,
    };
  });

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
