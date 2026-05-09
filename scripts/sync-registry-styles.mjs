import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "registry-styles");

mkdirSync(out, { recursive: true });

const registryDir = join(root, "registry");
const componentsDir = join(root, "components");
const slugs = readdirSync(registryDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

for (const slug of slugs) {
  // globals.css lives next to the components (mirrors install layout).
  // Fall back to the registry dir for back-compat.
  const candidates = [
    join(componentsDir, slug, "globals.css"),
    join(registryDir, slug, "globals.css"),
  ];
  let css;
  let cssPath;
  for (const candidate of candidates) {
    try {
      css = readFileSync(candidate, "utf-8");
      cssPath = candidate;
      break;
    } catch {
      // try next
    }
  }
  if (!css) continue;

  // Compile through Tailwind v4. base = repo root so the JIT scans both
  // registry/<slug>/ and components/<slug>/ for class names.
  const result = await postcss([
    tailwindcss({ base: root }),
  ]).process(css, {
    from: cssPath,
    to: join(out, `${slug}.css`),
  });

  writeFileSync(join(out, `${slug}.css`), result.css);
  console.log(`  ✓ ${slug}.css`);
}

console.log(`Compiled ${slugs.length} registry styles → public/registry-styles/`);
