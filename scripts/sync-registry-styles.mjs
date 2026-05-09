import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "registry-styles");

mkdirSync(out, { recursive: true });

const registryDir = join(root, "registry");
const slugs = readdirSync(registryDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const slug of slugs) {
  const cssPath = join(registryDir, slug, "globals.css");
  let css;
  try {
    css = readFileSync(cssPath, "utf-8");
  } catch {
    continue;
  }

  // Compile through Tailwind v4 so @import "tailwindcss" and @theme are resolved.
  // base must point to the registry/<slug> dir so relative @source/@plugin paths resolve.
  const result = await postcss([
    tailwindcss({ base: join(registryDir, slug) }),
  ]).process(css, {
    from: cssPath,
    to: join(out, `${slug}.css`),
  });

  writeFileSync(join(out, `${slug}.css`), result.css);
  console.log(`  ✓ ${slug}.css`);
}

console.log(`Compiled ${slugs.length} registry styles → public/registry-styles/`);
