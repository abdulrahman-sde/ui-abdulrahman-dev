import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { highlight } from "./highlight";
import type { TemplateSource, TemplateSourceFile } from "@/types/registry";

const ROOT = process.cwd();
const REGISTRY_DIR = path.join(ROOT, "registry");
const COMPONENTS_DIR = path.join(ROOT, "components");

function walkDir(dir: string, base: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(base, fullPath);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath, base));
    } else if (
      entry.isFile() &&
      entry.name !== "meta.ts" &&
      !entry.name.startsWith(".")
    ) {
      files.push(relPath);
    }
  }
  return files;
}

function langFromPath(filePath: string): string {
  const ext = path.extname(filePath).slice(1);
  if (ext === "tsx" || ext === "ts") return "tsx";
  if (ext === "css") return "css";
  if (ext === "json") return "json";
  return "text";
}

export async function loadTemplateSource(slug: string): Promise<TemplateSource | null> {
  const registryDir = path.join(REGISTRY_DIR, slug);
  const componentsDir = path.join(COMPONENTS_DIR, slug);
  if (!fs.existsSync(registryDir) && !fs.existsSync(componentsDir)) return null;

  const collected: { displayPath: string; absPath: string }[] = [];

  for (const rel of walkDir(registryDir, registryDir)) {
    collected.push({
      displayPath: rel,
      absPath: path.join(registryDir, rel),
    });
  }
  for (const rel of walkDir(componentsDir, componentsDir)) {
    collected.push({
      displayPath: `components/${rel}`,
      absPath: path.join(componentsDir, rel),
    });
  }

  const files: TemplateSourceFile[] = await Promise.all(
    collected.map(async ({ displayPath, absPath }) => {
      const content = await fsp.readFile(absPath, "utf-8");
      const lang = langFromPath(displayPath);
      const html = await highlight(content, lang);
      return { path: displayPath, content, html };
    })
  );

  return { slug, files };
}
