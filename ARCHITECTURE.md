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
└── launchui/                       ← Per-template, holds ONLY files that ship to app/
    ├── page.tsx                    ← Composes section components — ships as app/page.tsx
    └── meta.ts                     ← shadcn registry metadata (deps, cssVars)

components/
├── layout/                        ← Site chrome (header, footer)
├── shared/                        ← Used in 2+ features (e.g. template-mock)
├── ui/                            ← Shadcn primitives — never edit
└── launchui/                       ← Per-template components (path-parity with install)
    ├── globals.css                 ← Template tokens + @import "tailwindcss" (ships → app/globals.css)
    ├── layout.tsx                  ← Root layout (ships → app/layout.tsx)
    ├── sections/
    │   ├── nav.tsx
    │   ├── hero.tsx
    │   └── ...
    └── ui/                         ← Template-private primitives (button, badge, glow, ...)

public/
└── registry-styles/
    └── launchui.css                ← Compiled output of components/launchui/globals.css

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

## Path parity: source layout = install layout

This is the second-most important concept in the codebase, and the one that's easiest to get wrong.

### The first-principles problem

A shadcn registry serves a JSON payload. Each entry in `files[]` has two paths:

- `path` — where the file lives in *your* repo (purely informational, what GitHub will show)
- `target` — where the file lands in the *user's* repo when they run `npx shadcn add`

A template's section components reference each other and reference shared primitives:

```tsx
// hero.tsx
import { Section } from "???/ui/section";
import { Button } from "???/ui/button";
```

Whatever string you write for `???` gets shipped verbatim to the user. So the question becomes: **what import path is simultaneously valid in your dev preview AND in the user's installed project?**

### Three options

1. **Rewrite imports at registry-build time.** Source uses one alias (e.g. `@/registry/launchui/...`); the `/r/[slug].json` route does AST/regex surgery on every file before serving. Works, but every transformation is a class of bug — type-only imports, dynamic imports, re-exports, string literals that look like paths. Easy to break, hard to test.
2. **tsconfig path-alias trick.** Add an alias so `@/components/launchui/*` resolves to `registry/launchui/components/*` in dev only. Works until ESLint, the IDE, or Next's bundler disagree about what the alias means.
3. **Path parity.** Store the source files at the same paths the user will get them at. No rewriting. No aliases. The bytes you wrote are the bytes the user receives.

Path parity is what shadcn/ui itself uses, and what every major shadcn-compatible registry (Magic UI, Aceternity, Tailark, OriginUI) does in production. We use it here.

### How parity is enforced

A template ships two kinds of file:

| Kind                     | Source location                      | Install target               |
| ------------------------ | ------------------------------------ | ---------------------------- |
| App-level (page, layout) | `registry/<slug>/page.tsx`           | `app/page.tsx`               |
|                          | `components/<slug>/layout.tsx`       | `app/layout.tsx`             |
|                          | `components/<slug>/globals.css`      | `app/globals.css`            |
| Components               | `components/<slug>/sections/*.tsx`   | `components/<slug>/sections/*.tsx` |
|                          | `components/<slug>/ui/*.tsx`         | `components/<slug>/ui/*.tsx` |

For *components*, source path == target path. Section files import each other with `@/components/launchui/ui/section` and that string works unchanged in dev (because the file is at `components/launchui/ui/section.tsx` in this repo) and in the user's project (because that's where the registry just placed it).

For *app-level files*, the source location can't match the target — the user's `app/` is owned by Next.js routing, so we can't put live files there in this repo. Instead:

- `registry/<slug>/page.tsx` is the source-of-truth for the user's `app/page.tsx`. It's also the entry point the dev preview imports (`@/registry/launchui/page`). It uses `@/components/launchui/sections/*` imports — which work in *both* places because the components live at the parity path.
- `components/<slug>/layout.tsx` and `components/<slug>/globals.css` live next to the components in source so that `import "./globals.css"` in `layout.tsx` resolves cleanly here AND after install (where both files become siblings under `app/`). The build-registry walker rewrites their target to `app/layout.tsx` and `app/globals.css`.

### Why `tsconfig` excludes `registry/`

Notice `tsconfig.json` has `"exclude": ["node_modules", "registry"]`. This is intentional. Files under `registry/<slug>/` are *shipped to the user*, not consumed by this app's TypeScript compilation. Their imports (`@/components/launchui/sections/*`) are valid in the user's project too — but TS-checking them in this repo would force every section import to also resolve here. Excluding `registry/` keeps the type-checker focused on what runs in *this* app, while Next's bundler still happily compiles the registry page when the preview route imports it.

The `components/<slug>/` files, by contrast, ARE type-checked here — they have to compile in both worlds, and any import or lint error a user would see, you see first.

---

## How styles work per template

### Problem

Template CSS files start with `@import "tailwindcss"` — a Tailwind v4 directive. Browsers can't process this; it must be compiled by PostCSS.

### Solution

`scripts/sync-registry-styles.mjs` runs before `next dev` and `next build` (wired in `package.json`). It:

1. Scans `registry/*/` for directories (these are the source-of-truth slug list)
2. For each slug, looks for `globals.css` first under `components/<slug>/` (the path-parity location), then falls back to `registry/<slug>/`
3. Runs the file through PostCSS with `@tailwindcss/postcss`. The Tailwind v4 JIT scans for class names — we set `base: <repo root>` so it picks up class usages in BOTH `registry/<slug>/page.tsx` AND `components/<slug>/**`
4. Writes the compiled output to `public/registry-styles/<slug>.css`

Result: `public/registry-styles/launchui.css` is ~50KB of plain, fully-resolved CSS that any browser can load with a `<link>` tag.

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

### Install command (`/r/launchui.json`)

```
URL: /r/launchui.json
  → app/(main)/r/[name]/route.ts  (force-static GET handler)
    → buildRegistryItem("launchui")
        → reads registry/launchui/meta.ts for dependencies + cssVars
        → walks registry/launchui/** AND components/launchui/**
        → assigns each file a target by rule (see below)
        → builds shadcn-compatible JSON: { $schema, name, type, files, cssVars, ... }
      → returns JSON with Cache-Control: public, max-age=86400
```

Users install with:

```bash
npx shadcn add https://ui.abdulrahmanasif.dev/r/launchui.json
```

There is **no `fileTargets` map** in `meta.ts` anymore. With path parity, target paths are derived by rule in `lib/registry/build-registry-item.ts`:

| Source                              | Target                       |
| ----------------------------------- | ---------------------------- |
| `registry/<slug>/page.tsx`          | `app/page.tsx`               |
| `registry/<slug>/<anything>.css`    | `app/<basename>.css` (`globals.css` → `app/globals.css`) |
| `registry/<slug>/<rest>`            | `app/<rest>` (other files going to `app/`) |
| `components/<slug>/layout.tsx`      | `app/layout.tsx`             |
| `components/<slug>/globals.css`     | `app/globals.css`            |
| `components/<slug>/<rest>`          | `components/<slug>/<rest>` (path parity) |

If both `registry/<slug>/globals.css` and `components/<slug>/globals.css` exist, the components/ one wins (it's the version that actually compiles into `public/registry-styles/`).

---

## Data: `TEMPLATES` vs `registry/`

These serve different purposes and are intentionally separate.

|          | `constants/templates.ts`                                     | `registry/<slug>/` + `components/<slug>/`     |
| -------- | ------------------------------------------------------------ | --------------------------------------------- |
| Purpose  | Display metadata for the gallery                             | Actual installable source code                |
| Contains | title, category, tags, description, color, accent, downloads | `registry/<slug>/`: page.tsx, meta.ts. `components/<slug>/`: layout.tsx, globals.css, sections, ui |
| Required | All 13 templates must be listed                              | Only implemented templates have a folder      |
| Used by  | Gallery grid, detail page header, related templates          | Preview iframe, code viewer, install command  |

A template can exist in `TEMPLATES` without having a registry/components folder — the detail page shows a mock preview and hides the code/install tabs. Once both folders are created, `loadTemplateSource` returns real files and the full UI unlocks automatically.

---

## Adding a new template

Say you're adding `northwind`:

**1. Add to `constants/templates.ts`** (already there — just fill metadata)

**2. Create the two folders. Path parity matters: source = install destination for everything under `components/<slug>/`.**

```
registry/northwind/
  meta.ts              ← TemplateMeta: name, title, deps, cssVars (NO fileTargets)
  page.tsx             ← Root component, imports from @/components/northwind/sections/*

components/northwind/
  globals.css          ← @import "tailwindcss" + :root CSS vars + @theme block
  layout.tsx           ← Root layout (does `import "./globals.css"`)
  sections/
    nav.tsx            ← imports from @/components/northwind/ui/*
    hero.tsx
    ...
  ui/                  ← Template-private primitives (button, badge, etc.)
    button.tsx
    ...
```

All section/ui imports must use `@/components/northwind/...` paths — these strings get shipped to the user verbatim, and they resolve here too because the files literally live there.

**3. Register the renderer in the preview page:**

```ts
// app/(preview)/templates/[slug]/preview/page.tsx
import NorthwindTemplate from "@/registry/northwind/page";

const RENDERERS: Record<string, React.ComponentType> = {
  launchui: LaunchUITemplate,
  northwind: NorthwindTemplate, // ← add this
};
```

**4. Mark it previewable in the layout:**

```ts
// app/(preview)/templates/[slug]/preview/layout.tsx
const PREVIEWABLE = new Set(["launchui", "northwind"]); // ← add slug
```

**5. Register the meta in the registry builder:**

```ts
// lib/registry/build-registry-item.ts
import { meta as northwindMeta } from "@/registry/northwind/meta";

const METAS: Record<string, TemplateMeta> = {
  launchui: launchuiMeta,
  northwind: northwindMeta, // ← add this
};
```

**6. Run `bun dev`** — the sync script auto-compiles `components/northwind/globals.css` → `public/registry-styles/northwind.css`.

That's it. The gallery, detail page, code viewer, preview iframe, and install endpoint all work automatically.

---

## Key constraints

- **No `app/layout.tsx`** — it must not exist. Both route groups each own their root layout. If it comes back, every preview page gets nested `<html>` and React hydration breaks.
- **`public/registry-styles/`** is gitignored-friendly but must exist at dev/build time — the sync script creates it.
- **`components/<slug>/globals.css` uses `@import "tailwindcss"`** — this is Tailwind v4 source syntax, NOT deployable as-is. The sync script compiles it. Never copy the raw source file to `public/` directly.
- **Path parity is load-bearing.** Every import inside `components/<slug>/` MUST use `@/components/<slug>/...`. Never use relative imports (`./ui/button`) — they'd break in dev *and* after install. Never use `@/registry/<slug>/...` from inside a section — that path won't exist on the user's machine.
- **`tsconfig.json` excludes `registry/`** — files there are shipped to users, not compiled by this app. Don't add `registry/` to `include` or you'll get type errors for imports that are correct in the user's project but unresolvable here.
- **`RENDERERS`, `PREVIEWABLE`, and `METAS` must stay in sync** — slug missing from any of the three breaks a different surface (preview page, preview layout, install JSON respectively).
- **`@/` aliases resolve from project root**, so route group names `(main)` and `(preview)` are part of the path when importing with `@/app/(main)/...`. They are NOT transparent to the module resolver (only to URLs).
