import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { highlight } from "./highlight";
import type { TemplateSource, TemplateSourceFile } from "@/types/registry";

const REGISTRY_DIR = path.join(process.cwd(), "registry");

function walkDir(dir: string, base: string): string[] {
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
  const templateDir = path.join(REGISTRY_DIR, slug);
  if (!fs.existsSync(templateDir)) return null;

  const filePaths = walkDir(templateDir, templateDir);

  const files: TemplateSourceFile[] = await Promise.all(
    filePaths.map(async (relPath) => {
      const fullPath = path.join(templateDir, relPath);
      const content = await fsp.readFile(fullPath, "utf-8");
      const lang = langFromPath(relPath);
      const html = await highlight(content, lang);
      return { path: relPath, content, html };
    })
  );

  return { slug, files };
}
