# Architecture: ui.abdulrahmanasif.dev

A free landing page template library. Templates are MIT-licensed, browsable at `/templates`, and installable via the shadcn CLI. This document walks through every layer of the system — how routes work, how CSS is isolated, how the registry serves installable blocks, and how to add a new template.

---

## Directory map

```
app/
├── (main)/                         ← Root layout group: fonts + ThemeProvider
│   ├── layout.tsx                  ← The ONE root layout for the site
│   ├── not-found.tsx               ← Global 404 page
│   ├── (landing)/                  ← URL: /
│   │   ├── page.tsx
│   │   └── _components/
│   ├── templates/                  ← URL: /templates, /templates/[slug]
│   │   ├── page.tsx
│   │   ├── _components/
│   │   ├── _hooks/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── _components/
│   ├── submit/                     ← URL: /submit
│   │   ├── page.tsx
│   │   └── _components/
│   └── r/                          ← URL: /r/[name].json  (shadcn registry API)
│       └── [name]/route.ts
│
├── (preview)/                      ← Second root layout — fully isolated from (main)
│   └── templates/[slug]/preview/
│       ├── layout.tsx              ← Bare <html><body> + per-template CSS link
│       └── page.tsx                ← Renders the actual template component
│
├── favicon.ico
└── globals.css                     ← Design tokens (@theme) for the (main) site

registry/
└── notio/                          ← One folder per implemented template
    ├── page.tsx                    ← The template's root component
    ├── globals.css                 ← Template's own design tokens + @import "tailwindcss"
    ├── meta.ts                     ← shadcn registry metadata (deps, cssVars, fileTargets)
    └── components/
        ├── nav.tsx
        ├── hero.tsx
        └── logos.tsx

public/
└── registry-styles/
    └── notio.css                   ← Compiled output of registry/notio/globals.css

scripts/
└── sync-registry-styles.mjs       ← Compiles registry CSS via PostCSS → public/registry-styles/

constants/
└── templates.ts                   ← TEMPLATES array — the single source of truth for metadata

types/
├── template.ts                    ← Template interface
└── registry.ts                    ← Registry/source file types

lib/
└── registry/
    ├── load-source.ts             ← Reads + syntax-highlights registry source files
    ├── build-registry-item.ts     ← Builds the shadcn-compatible JSON payload
    └── highlight.ts               ← Shiki wrapper (github-light / github-dark themes)

components/
├── layout/
│   ├── header.tsx                 ← HeroHeader with scroll-aware floating pill
│   └── footer.tsx
├── shared/
│   └── template-mock.tsx          ← SVG placeholder previews for templates not yet in registry
└── ui/                            ← Shadcn primitives — never edit
```

---

## The two-layout system

This is the most important concept in the codebase.

### Why two layouts exist

Every Next.js App Router page inherits from a root `layout.tsx`. The main site needs `next-themes`, Google fonts, and `globals.css`. But the template preview pages (served inside an `<iframe>`) must be completely isolated — different CSS variables, different theme, no inherited styles at all.

The solution is **multiple root layouts via route groups**. Next.js supports this: when `app/layout.tsx` doesn't exist and each route group has its own `layout.tsx`, those layouts are independent documents. Navigation between groups triggers a full page reload (not SPA navigation), which is expected — the preview is inside an iframe anyway.

### `(main)` layout — `app/(main)/layout.tsx`

```tsx
export default function MainLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ... antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- Loads `../globals.css` (which sets design tokens in `@theme`)
- Wraps every main-site page in `ThemeProvider` (light/dark via class attribute)
- Sets up the three font CSS variables: `--font-sans` (Inter), `--font-serif` (Lora), `--font-mono` (JetBrains Mono)

### `(preview)` layout — `app/(preview)/templates/[slug]/preview/layout.tsx`

```tsx
export default async function PreviewLayout({ children, params }) {
  const { slug } = await params;
  if (!PREVIEWABLE.has(slug)) notFound();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`/registry-styles/${slug}.css`} />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
```

- No `ThemeProvider`, no Google fonts, no `globals.css`
- Loads exactly one CSS file: the compiled output for that specific template
- `PREVIEWABLE` set gates which slugs have a real registry entry — others 404 cleanly

---

## How styles work per template

### Problem

Template CSS files start with `@import "tailwindcss"` — a Tailwind v4 directive. Browsers can't process this; it must be compiled by PostCSS.

### Solution

`scripts/sync-registry-styles.mjs` runs before `next dev` and `next build` (wired in `package.json`). It:

1. Scans `registry/*/` for directories
2. For each one that has a `globals.css`, runs it through PostCSS with `@tailwindcss/postcss`
3. The Tailwind compiler scans the registry source files for class names, generates the utilities, resolves `@theme` and `:root` variables
4. Writes the compiled output to `public/registry-styles/<slug>.css`

Result: `public/registry-styles/notio.css` is ~18KB of plain, fully-resolved CSS that any browser can load with a `<link>` tag.

**When you add a new template**, just run `bun dev` — the script runs automatically and compiles the new template's CSS.

---

## Template data flow: from URL to rendered page

### Browsing (`/templates`)

```
URL: /templates
  → app/(main)/templates/page.tsx
    → TemplateGrid (server component)
      → reads TEMPLATES from constants/templates.ts
      → renders Link cards with TemplateMock placeholders
```

`TemplateMock` is an SVG-based placeholder with colored bars. It's only 3 visual variants (`northwind`, `halcyon`, `atelier`) mapped from the template's `color` field. It exists purely as a visual placeholder for templates that don't have a real registry entry yet.

### Detail page (`/templates/notio`)

```
URL: /templates/notio
  → app/(main)/templates/[slug]/page.tsx
    → TemplateDetail (server component, slug="notio")
      → loadTemplateSource("notio")
          → reads registry/notio/** files from disk
          → highlights each file with Shiki
          → returns { slug, files: [{ path, content, html }] }
      → hasRealPreview = true
      → renders TabPanel with PreviewFrame + CodeViewer
```

If `loadTemplateSource` returns `null` (template not yet in `registry/`), the detail page falls back to the `TemplateMock` SVG placeholder instead.

### Preview iframe

The detail page renders:

```tsx
// app/(main)/templates/[slug]/_components/preview-frame.tsx
<iframe src="/templates/notio/preview" />
```

That URL is handled by the `(preview)` route group — a completely separate document:

```
URL: /templates/notio/preview
  → app/(preview)/templates/[slug]/preview/layout.tsx
      → validates slug is in PREVIEWABLE
      → returns <html><head><link href="/registry-styles/notio.css"></head><body>...</body></html>
    → app/(preview)/templates/[slug]/preview/page.tsx
        → RENDERERS["notio"] = NotioTemplate
        → renders <NotioTemplate />
          → registry/notio/page.tsx
            → Nav, Hero, Logos
```

The iframe receives a complete standalone HTML document. `registry-styles/notio.css` provides all Tailwind utilities + CSS variables for the template. The main site's theme has zero influence.

### Code viewer

`TabPanel` switches between `PreviewFrame` (iframe) and `CodeViewer`. `CodeViewer` receives `files` from `loadTemplateSource` — each file already has pre-rendered Shiki HTML (`file.html`), so the code viewer just does:

```tsx
<div dangerouslySetInnerHTML={{ __html: activeFile.html }} />
```

No client-side highlighting. All syntax highlighting is done server-side at request time.

### Install command (`/r/notio.json`)

```
URL: /r/notio.json
  → app/(main)/r/[name]/route.ts  (force-static GET handler)
    → buildRegistryItem("notio")
        → reads registry/notio/meta.ts for dependencies, cssVars, fileTargets
        → walks registry/notio/** files
        → builds shadcn-compatible JSON: { $schema, name, type, files, cssVars, ... }
      → returns JSON with Cache-Control: public, max-age=86400
```

Users install with:

```bash
npx shadcn add https://ui.abdulrahmanasif.dev/r/notio.json
```

The `meta.ts` `fileTargets` map controls where each file lands in the user's project:

```ts
fileTargets: {
  "page.tsx": "app/page.tsx",
  "globals.css": "app/notio-globals.css",
  "components/hero.tsx": "components/notio/hero.tsx",
}
```

---

## Data: `TEMPLATES` vs `registry/`

These serve different purposes and are intentionally separate.

|          | `constants/templates.ts`                                     | `registry/<slug>/`                           |
| -------- | ------------------------------------------------------------ | -------------------------------------------- |
| Purpose  | Display metadata for the gallery                             | Actual installable source code               |
| Contains | title, category, tags, description, color, accent, downloads | page.tsx, components, globals.css, meta.ts   |
| Required | All 13 templates must be listed                              | Only implemented templates have a folder     |
| Used by  | Gallery grid, detail page header, related templates          | Preview iframe, code viewer, install command |

A template can exist in `TEMPLATES` without being in `registry/` — the detail page shows a mock preview and hides the code/install tabs. Once `registry/<slug>/` is created, `loadTemplateSource` returns real files and the full UI unlocks automatically.

---

## Adding a new template

Say you're adding `northwind`:

**1. Add to `constants/templates.ts`** (already there — just fill metadata)

**2. Create the registry folder:**

```
registry/northwind/
  globals.css          ← @import "tailwindcss" + :root CSS vars + @theme block
  meta.ts              ← TemplateMeta: name, title, deps, cssVars, fileTargets
  page.tsx             ← Root component
  components/
    nav.tsx
    hero.tsx
    ...
```

**3. Register the renderer in the preview page:**

```ts
// app/(preview)/templates/[slug]/preview/page.tsx
import NorthwindTemplate from "@/registry/northwind/page";

const RENDERERS: Record<string, React.ComponentType> = {
  notio: NotioTemplate,
  northwind: NorthwindTemplate, // ← add this
};
```

**4. Mark it previewable in the layout:**

```ts
// app/(preview)/templates/[slug]/preview/layout.tsx
const PREVIEWABLE = new Set(["notio", "northwind"]); // ← add slug
```

**5. Run `bun dev`** — the sync script auto-compiles `registry/northwind/globals.css` → `public/registry-styles/northwind.css`.

That's it. The gallery, detail page, code viewer, preview iframe, and install endpoint all work automatically.

---

## Key constraints

- **No `app/layout.tsx`** — it must not exist. Both route groups each own their root layout. If it comes back, every preview page gets nested `<html>` and React hydration breaks.
- **`public/registry-styles/`** is gitignored-friendly but must exist at dev/build time — the sync script creates it.
- **`registry/*/globals.css` uses `@import "tailwindcss"`** — this is Tailwind v4 source syntax, NOT deployable as-is. The sync script compiles it. Never copy the raw source file to `public/` directly.
- **`RENDERERS` and `PREVIEWABLE` must stay in sync** — if a slug is in `RENDERERS` but not `PREVIEWABLE`, the preview page renders but the layout returns 404. If it's in `PREVIEWABLE` but not `RENDERERS`, the page returns 404.
- **`@/` aliases resolve from project root**, so route group names `(main)` and `(preview)` are part of the path when importing with `@/app/(main)/...`. They are NOT transparent to the module resolver (only to URLs).
