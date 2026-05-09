# ARCHITECTURE.md

A first-principles walkthrough of how this repo is built. Read top to bottom — each section assumes the previous one.

---

## 1. What this product is

`ui.abdulrahmanasif.dev` is a **free landing-page template library**. The product *is* the source code of each template, MIT-licensed, installable via the shadcn CLI. Three user-facing surfaces:

- A **gallery** at `/templates` listing every template.
- A **detail page** at `/template/<slug>` (singular) that previews the live template and shows the install command.
- A **registry endpoint** at `/r/<slug>.json` that the shadcn CLI consumes to drop the template's files into a user's project.

Not a portfolio, not an agency site, not paid, no auth, no CMS. Templates are checked-in source files.

---

## 2. The hardest problem this solves

A template, viewed on this site, must look **byte-for-byte identical** to that same template after a user installs it into their own Next.js project. If the preview lies, the gallery is broken.

Consequences derived from that one rule:

1. A template is the *root* of an app — it owns `<html>`, its own `globals.css`, its own font stack, its own dark-mode policy. So previewing it inside our marketing chrome (header, `next-themes`, marketing tokens) would distort it.
2. We still need the marketing site around it — gallery, detail page, theme toggle, our own design system.
3. So we need **two completely independent rendering contexts in one Next.js app**, with no CSS or provider bleed between them.

That requirement drives every architectural decision below.

---

## 3. Two worlds, one repo

The deployed app is two parallel apps sharing a domain:

- **Marketing world** — gallery, detail page, registry endpoint. Has its own `<html>`, `next-themes`, `Geist/Lora/JetBrains` fonts, marketing tokens (`app/globals.css`).
- **Template world** — the live templates themselves. Each template has its own `<html>`, its own fonts, its own tokens (`components/templates/<slug>/globals.css`), its own dark-mode strategy.

URL convention (load-bearing):

| URL | World | What it is |
| --- | --- | --- |
| `/`, `/templates`, `/template/<slug>`, `/r/<slug>.json` | Marketing | Site chrome wraps these |
| `/templates/<slug>` | Template | The live template, isolated |

Mnemonic: **singular `/template/` describes, plural `/templates/<slug>` runs**.

---

## 4. How Next.js makes two worlds possible

Three App Router features, combined:

1. **Route groups** — folders wrapped in parentheses, e.g. `(main)`, `(pages)`, organise files but don't add a URL segment.
2. **Sibling root layouts** — if `app/layout.tsx` does **not** exist, each top-level subtree provides its own `<html>`/`<body>` in its `layout.tsx`, and Next.js treats them as independent roots. We deliberately have no `app/layout.tsx`.
3. **Hard navigation across roots** — clicking a link from one root layout to another forces a full document reload, because the `<html>` itself differs. Exactly what we want for the marketing↔template boundary: no leftover CSS or providers.

The two roots:

```
app/
├── (main)/layout.tsx                       Root #1: marketing <html>, header, ThemeProvider
└── templates/<slug>/(pages)/layout.tsx     Root #2: template <html>, template fonts, no chrome
```

---

## 5. Folder layout

```
app/
├── globals.css                            Marketing tokens (:root, .dark, @theme inline)
├── (main)/                                Marketing world (Root #1)
│   ├── layout.tsx                         Header + ThemeProvider + marketing fonts
│   ├── (landing)/page.tsx                 /
│   ├── templates/page.tsx                 /templates                 (gallery)
│   ├── templates/_components/             feature-private to gallery
│   ├── template/[slug]/page.tsx           /template/<slug>           (detail page)
│   ├── template/[slug]/_components/       feature-private (TemplateRenderer)
│   ├── r/[name]/route.ts                  /r/<slug>.json             (registry endpoint)
│   └── not-found.tsx
└── templates/<slug>/(pages)/              Template world (Root #2, one per template)
    ├── layout.tsx                         Template's own <html>
    └── page.tsx                           The live template

components/
├── ui/                                    Marketing shadcn primitives — never edit
├── layout/                                Marketing chrome (header, footer)
├── shared/                                Marketing components used in 2+ features
├── unlumen-ui/                            Third-party shadcn-registry imports
└── templates/<slug>/                      Template source — SHIPPED to users
    ├── globals.css                        Template tokens (:root, .dark, @theme, @layer base)
    ├── sections/                          Hero, Nav, Pricing, Footer, …
    └── ui/                                Template-private primitives (button, badge, glow, …)

constants/templates.ts                     TEMPLATES array — gallery source of truth
types/                                     All TS interfaces (template.ts, registry.ts)
hooks/                                     Shared hooks only (use-media)
lib/utils.ts                               cn() helper (shipped via shadcn init in user projects)
lib/registry/                              Builds the shadcn registry JSON payload
public/thumbnails/                         Gallery thumbnails (1280×800, 16/10)
components.json                            shadcn config (style, aliases, registry mappings)
next.config.ts                             Image remotePatterns whitelist
```

The word *templates* appears in three places, each meaning something different:

| Path | Job | Ships to user? |
| --- | --- | --- |
| `app/(main)/templates/page.tsx` | Gallery | No |
| `app/(main)/template/[slug]/page.tsx` | Detail page (singular) | No |
| `app/templates/<slug>/(pages)/{layout,page}.tsx` | Live template (plural) | Yes (as `app/{layout,page}.tsx`) |
| `components/templates/<slug>/**` | Template source | Yes (as-is) |

Underscore folders (`_components/`, `_hooks/`) are private to a route — Next.js won't turn them into routes, and convention says nothing else may import them. Promote to `components/shared/` or `hooks/` only when 2+ features need the same code.

---

## 6. The marketing world

`app/(main)/layout.tsx` is the marketing root:

- Loads `Geist`, `Lora`, `JetBrains_Mono` via `next/font/google` and binds them to `--font-sans`, `--font-serif`, `--font-mono`.
- Imports `app/globals.css` — Tailwind v4 import + marketing tokens + `@theme inline` block exposing tokens to Tailwind.
- Renders `<html lang="en" suppressHydrationWarning>`. The suppression is required by `next-themes` (server doesn't know the user's theme; an inline script reconciles `class="dark"` before hydration).
- Wraps everything in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`. The active theme is communicated by toggling `class="dark"` on `<html>`, which the marketing CSS keys off of.
- Mounts `<HeroHeader />` above `{children}` (fixed-position, scroll-aware, `motion`-animated floating pill, theme toggle). `not-found.tsx` mounts the header itself because the not-found boundary doesn't always inherit the layout tree.

Pages stay thin per the project rule **`page.tsx` = section components only, no markup or logic**:

- `(landing)/page.tsx` composes `HeroSection`, `TemplatesShowcase`, `Features`, `Team`, `CallToAction` from `(landing)/_components/`.
- `templates/page.tsx` composes `TemplateGrid` from `templates/_components/`. The grid reads `TEMPLATES` from `constants/templates.ts`, links each card to `/template/<slug>`, and falls back to `<TemplateMock>` when a thumbnail is missing.
- `template/[slug]/page.tsx` is the bridge to the template world (section 8).
- `r/[name]/route.ts` is a Route Handler returning JSON, not a page (section 9).

---

## 7. The template world

`app/templates/<slug>/(pages)/layout.tsx` is a fully independent root:

```tsx
import "@/components/templates/<slug>/globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

return (
  <html lang="en" className="dark" suppressHydrationWarning>
    <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
      {children}
    </body>
  </html>
);
```

What to notice:

- Imports the **template's** `globals.css`, not the marketing one. Same token names (`--background`, `--primary`, …), different values, different scope.
- `class="dark"` is hard-coded — this template ships dark-on. No `ThemeProvider`, no toggle. A future template wanting user theming must add its own provider.
- Different font (`Inter`) bound to the same variable name as the marketing world — fine, because the variable is scoped to *this document's* `<body>`.

`page.tsx` composes section components from `components/templates/<slug>/sections/`. Sections import primitives only from `components/templates/<slug>/ui/`, npm packages, and `@/lib/utils`. **They never import from `@/components/ui/` or `@/components/shared/`** — those don't exist in a user's project after install. This self-containment is what makes the registry payload portable.

`constants/templates.ts` lists templates with display metadata only (slug, title, category, tags, accent, thumbnail). Registry metadata (npm deps, css vars) lives separately in `METAS` inside `lib/registry/build-registry-item.ts`, because the registry builder is server-only and uses `fs`/`path`. A slug can appear in `TEMPLATES` before its `components/templates/<slug>/` folder exists — the gallery shows a placeholder mock and `/r/<slug>.json` returns a 404 with `"template source not yet available"`.

---

## 8. The bridge: `/template/[slug]` and the iframe

The detail page sits in the marketing world but needs to show the live template. It does so with a real `<iframe>`:

```
/template/<slug>     (marketing world, has chrome)
  └── <iframe src="/templates/<slug>">    ← loads the template world as a fresh document
```

Why an iframe rather than rendering the template inline:

- The template needs its own `<html>`, fonts, CSS variables. An iframe gives it a real document boundary — no CSS bleed, no provider conflicts, predictable scrolling.
- The iframe `src` is the *real* template route, the same one a user clicks "Open" to view standalone, the same one used to verify the install. One source of truth.
- The detail page (`app/(main)/template/[slug]/page.tsx`) reads metadata from `TEMPLATES`, `notFound()`s for unknown slugs, generates static params for SSG, renders heading/category/tags, and hands off to `TemplateRenderer`.

`TemplateRenderer` (a client component):

- Renders package-manager tabs (bun/npm/pnpm/yarn) and builds the install command: `<prefix> https://ui.abdulrahmanasif.dev/r/<slug>.json`.
- Has a copy-to-clipboard button with a 2-second "copied" state.
- Renders the iframe at 200% width/height with `transform: scale(0.5)` from the top-left corner, so a 1× device sees a "two-monitor-wide" rendering scaled down to fit. Effect: the preview shows desktop-grade layout in a smaller card without affecting the real route at `/templates/<slug>`.
- Provides an "Open" link to `/templates/<slug>` (target=`_blank`) for a full-fidelity view.

---

## 9. The shadcn registry pipeline

`/r/<slug>.json` is what makes templates installable. The route is `force-static`, generates static params from `TEMPLATES`, and delegates to `buildRegistryItem(slug)` in `lib/registry/build-registry-item.ts`. Cache headers: `public, max-age=86400, stale-while-revalidate=86400` and `Access-Control-Allow-Origin: *` so the shadcn CLI can fetch it from any project.

Build steps inside `buildRegistryItem`:

1. **Walk `components/templates/<slug>/**`** and emit one `RegistryFile` per file. The `target` (where the file will land in the user's project) is computed by filename:
   - `globals.css` → `app/globals.css`
   - everything else keeps its source path verbatim → `components/templates/<slug>/<rel>`
2. **Walk `app/templates/<slug>/(pages)/`** and emit `layout.tsx` and `page.tsx` only. Targets:
   - `layout.tsx` → `app/layout.tsx`
   - `page.tsx` → `app/page.tsx`
3. **Rewrite the layout's `globals.css` import.** In the repo it reads `import "@/components/templates/<slug>/globals.css"`. After install the file lives at `app/layout.tsx` and the CSS lives at `app/globals.css` next to it, so the builder regex-replaces that import with `import "./globals.css"`.
4. Attach `dependencies` and metadata from `METAS[slug]` and return a `RegistryItem` matching the shadcn schema.

The two crucial design choices:

- **Path parity.** Every file under `components/templates/<slug>/` keeps the *exact same path* in the user's project as it has in this repo. So the literal string `import "@/components/templates/<slug>/ui/button"` resolves identically here and after install — no transforms needed for component cross-references.
- **Layout import rewrite.** The single exception is the layout's CSS import, because the file's *target* path moves (from `app/templates/<slug>/(pages)/layout.tsx` → `app/layout.tsx`) while `globals.css` is also retargeted (to `app/globals.css`). The rewrite makes the relative import work post-install.

`@/lib/utils` is **not** shipped — it's auto-created by `shadcn init` in any user's project, so it's safe to assume.

`lib/registry/load-source.ts` and `lib/registry/highlight.ts` exist for an in-page source viewer (Shiki dual-theme, light/dark via the `--shiki-light`/`--shiki-dark` CSS vars in `app/globals.css`) but aren't currently wired into the detail page.

---

## 10. Styling: tokens, `@theme`, isolation

Tailwind v4 — **no `tailwind.config.ts`**. Tokens live in CSS and are exposed to Tailwind via the `@theme inline { ... }` block.

### Marketing (`app/globals.css`)

- `@import "tailwindcss"`.
- `@custom-variant dark (&:is(.dark *))` — the `dark:` variant fires whenever an ancestor has `class="dark"`.
- `:root { … }` defines light tokens (`--background`, `--foreground`, `--primary`, fonts, radius, shadows, …).
- `.dark { … }` overrides them for dark mode.
- `@theme inline { … }` re-exports each token as `--color-*`/`--font-*`/`--radius-*`/`--shadow-*` so Tailwind utilities like `bg-background`, `text-foreground`, `rounded-lg`, `font-serif` resolve to the CSS variables.
- `@layer base` applies `border-border outline-ring/50` to all elements and `bg-background text-foreground` to `body`.
- Bottom of file: Shiki dual-theme rules using `--shiki-light`/`--shiki-dark`.

Theming is `class`-based via `next-themes`: it adds/removes `class="dark"` on `<html>`. The `@custom-variant dark` and the `.dark { … }` block both key off this class.

### Template (`components/templates/<slug>/globals.css`)

Same shape, different values. Launch UI's file uses different OKLCH ranges, omits sidebar/chart tokens, adds `tw-animate-css` import, defines its own `@keyframes` (`appear`, `appear-zoom`, `accordion-down/up`) registered as `--animate-*` so utilities like `animate-appear` work, and adds a `--spacing-container: 1280px` token.

### How isolation actually holds

Both files declare `:root` and `.dark` for the same token names. They *would* collide if loaded in the same document. They're not — each root layout imports exactly one of them, and each layout produces its own document. Inside the marketing document, only `app/globals.css` is loaded. Inside a template document, only that template's CSS is loaded. The detail page sidesteps the issue by sandboxing the template inside an `<iframe>`, which is its own document with its own CSS scope.

The marketing site's design system uses `Geist/Lora/JetBrains` fonts, OKLCH-based neutral + blue primary, and (per the project skills) the high-end-visual-design conventions: double-bezel cards, soft-structuralist sections, custom cubic-bezier easings, no neon, no purple beyond the existing primary, `py-24+` section padding. Templates own their own visual identity and shouldn't inherit these.

---

## 11. Data flow and frontend rules

Strictly applied throughout the marketing site:

- **`Component → Hook → DAL → API`**, never skip a layer. (No DAL is currently needed — there's no API — but if one is added it goes in `dal/*.dal.ts`, not in components or hooks.)
- **`page.tsx` is section components only**, no markup or logic.
- **All design tokens in `@theme`**, never hardcoded in components. Marketing tokens in `app/globals.css`; template tokens in `components/templates/<slug>/globals.css`.
- **All UI primitives via shadcn** (`components/ui/`), never edit those. No raw HTML for interactive/structural elements.
- **Server vs client split**: server for data fetching/auth/calculations, client for modals/tabs/animations/form-validation/routing-aware state. Mark client components with `"use client"` only when they actually need it.
- **Types live in `types/`**, not scattered across files.
- **Aliases**: `@/*` → repo root (see `tsconfig.json`).

Templates relax these rules in one specific way: the template's `ui/` folder is the template's own primitives layer, parallel to (but separate from) `components/ui/`. Inside a template, "use the shadcn primitives" means use the template's own primitives.

---

## 12. Adding a new template

1. **Add metadata** to `constants/templates.ts`. The slug becomes the URL and the folder name everywhere else.
2. **Create `components/templates/<slug>/`** with:
   - `globals.css` — `:root` + `.dark` tokens, `@theme inline` block, `@layer base`. Whatever font/radius/colour story the template wants.
   - `sections/` — composed by `page.tsx`.
   - `ui/` — template-private primitives. Internal imports must use `@/components/templates/<slug>/...` exactly (these strings ship verbatim).
3. **Create `app/templates/<slug>/(pages)/`** with:
   - `layout.tsx` that imports `@/components/templates/<slug>/globals.css` and renders the template's `<html>`/`<body>` with the right fonts and dark-mode policy. The registry builder rewrites the CSS import on ship.
   - `page.tsx` that composes the section components.
4. **Add `METAS[<slug>]`** in `lib/registry/build-registry-item.ts` listing every npm package the template's components import — including `clsx`, `tailwind-merge` (if `@/lib/utils` is used), and any radix/lucide/etc. packages.
5. **(Optional) Drop a thumbnail** at `public/thumbnails/<slug>.png` (1280×800, 16/10) and import it in `constants/templates.ts`. Without it, the gallery falls back to `<TemplateMock>`.
6. Verify: `bun dev`, visit `/templates/<slug>` (the live preview), `/template/<slug>` (the detail page), and `/r/<slug>.json` (the payload). Then `bunx shadcn@latest add http://localhost:3000/r/<slug>.json` into a fresh Next.js project to confirm preview-equals-install.

The shadcn CLI will prompt to overwrite `app/layout.tsx` and `app/globals.css` — that's expected, the user is installing a full template root.

---

## 13. Things that look weird but are intentional

- **No `app/layout.tsx`.** Required for sibling root layouts (section 4).
- **`/template/` (singular) and `/templates/<slug>` (plural) coexist.** Different jobs, different worlds.
- **The header is mounted in both `(main)/layout.tsx` and `not-found.tsx`.** Because `not-found.tsx` doesn't always inherit the layout tree.
- **The detail page iframes its sibling route.** Cleanest way to get a real, isolated, full-fidelity preview without inventing a parallel renderer.
- **The iframe is rendered at 200% with `scale(0.5)`.** Cheap "desktop in a card" scaling without responsive workarounds.
- **`globals.css` filename is reused in two places with different scopes.** Marketing CSS at `app/globals.css`; per-template CSS at `components/templates/<slug>/globals.css`. The registry builder retargets and rewrites the import to make this work post-install.
- **`dependencies` lives in `METAS`, not `constants/templates.ts`.** The constants file is read by client code; `METAS` is read by server-only fs walkers. Keep them apart.
- **`@/lib/utils` isn't shipped via the registry.** `shadcn init` provides it.
- **`ARCHITECTURE.md` (this file) supersedes the deleted older one** that described an iframe-bundled preview pipeline. If anything ever conflicts with `CLAUDE.md`, `CLAUDE.md` wins.

---

## 14. Glossary

- **Route group** — `(name)/` folder; organises files without contributing a URL segment.
- **Sibling root layouts** — multiple top-level `layout.tsx` files, each owning their own `<html>`/`<body>`, enabled by the absence of `app/layout.tsx`.
- **Hard navigation** — full document reload across root layouts; soft navigation only happens within one root.
- **Marketing world / template world** — the two worlds in section 3.
- **Path parity** — the registry's design that keeps file paths identical between this repo and the user's project (except the rewritten layout-CSS import).
- **shadcn registry** — a JSON document at `/r/<slug>.json` that the shadcn CLI reads to install files into a project. The schema URL is `https://ui.shadcn.com/schema/registry-item.json`.
- **`@theme inline`** — Tailwind v4 block exposing CSS variables to Tailwind's utility generator; replaces `tailwind.config.ts`.
