# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: read this first

@AGENTS.md

This is **Next.js 16** with **React 19** and **Tailwind v4**. Conventions differ from older docs (params is now `Promise`, `@theme` blocks replace `tailwind.config.ts`, etc.). Before writing any `page.tsx` / `layout.tsx` / `route.ts` / `dynamic` export, read the relevant guide in `node_modules/next/dist/docs/01-app/` to confirm current syntax. Do not trust training data for Next/Tailwind APIs.

`ARCHITECTURE.md` exists in the repo but is stale — it describes a previous iframe-based preview architecture that has since been replaced. Trust this file over `ARCHITECTURE.md`.

Package manager: **bun**. Use `bun dev`, `bun add`, `bun run build`. Do **not** run `bun run build` (or `next build`) without explicit user permission — the user prefers to run builds themselves.

## What this site is

**ui.abdulrahmanasif.dev** — a free landing page template library. NOT a personal portfolio, NOT an agency site, NOT a paid product. Templates are MIT-licensed and meant to be browsed and forked. Frame all copy/CTAs around "free templates to browse and fork", not "hire me" or "buy this". GitHub is the primary CTA.

## Commands

```bash
bun dev              # next dev — http://localhost:3000
bun run build        # next build — DO NOT run without user permission
bun start            # next start
bun run lint         # eslint (uses eslint-config-next)
```

There is no test runner configured.

## Architecture: two root layouts, one per "world"

The codebase has **two independent root layouts**, separated by route group. There is no `app/layout.tsx` — Next.js 16 supports this and treats each route group's top-level `layout.tsx` as a sibling root layout.

```
app/
├── (main)/                          ← Marketing site root layout
│   ├── layout.tsx                   ← Header, ThemeProvider, Inter/Lora/JetBrains fonts
│   ├── (landing)/page.tsx           ← /
│   ├── templates/page.tsx           ← /templates  (gallery)
│   ├── template/[slug]/page.tsx     ← /template/<slug>  (detail page, iframes the live route)
│   ├── r/[name]/route.ts            ← /r/<slug>.json  (shadcn install endpoint, force-static)
│   └── not-found.tsx
└── templates/<slug>/(pages)/        ← Per-template root layout (one per template)
    ├── layout.tsx                   ← Own <html>, dark class, template's globals.css, fonts
    └── page.tsx                     ← Live template — also the iframe target for the detail page
```

Why two roots:

- The marketing site needs `next-themes`, the chrome header, and the marketing tokens.
- A template preview must be a fully isolated document — its own `<html>`, its own CSS variables, its own `dark` scope. No bleed from the marketing theme.
- Putting the live template at `app/templates/<slug>/(pages)/` makes it a **second root layout** (because no `app/layout.tsx` overrides it). Navigation between `/templates` (in `(main)`) and `/templates/<slug>` (the live template) is a full page reload — exactly what you want for an iframe target.
- The detail page at `/template/<slug>` (singular) iframes `/templates/<slug>` (plural). That's the visual disambiguation: singular = marketing detail, plural = live template.

## Templates: source of truth and install flow

```
components/templates/<slug>/         ← All template source code
├── globals.css                      ← Template tokens (:root, .dark) + @theme + @layer base
├── sections/                        ← Page sections (hero, nav, footer, …)
└── ui/                              ← Template-private primitives (button, badge, glow, …)

app/templates/<slug>/(pages)/        ← The route's layout + page (also shipped to users)
├── layout.tsx                       ← imports "@/components/templates/<slug>/globals.css"
└── page.tsx                         ← imports section components

constants/templates.ts               ← TEMPLATES array — gallery metadata for ALL templates
                                       (a slug can appear here without a components/ folder yet —
                                        the gallery falls back to a TemplateMock placeholder)
```

`/r/<slug>.json` is built by `lib/registry/build-registry-item.ts`:

1. Walks `components/templates/<slug>/**` and ships every file. `globals.css` retargets to `app/globals.css`; everything else keeps its source path (so `import "@/components/templates/<slug>/ui/button"` works the same in dev and after install — **path parity**).
2. Walks `app/templates/<slug>/(pages)/{layout.tsx,page.tsx}` and retargets them to `app/layout.tsx` and `app/page.tsx`.
3. **Rewrites the layout's `globals.css` import** from `@/components/templates/<slug>/globals.css` → `./globals.css` so it resolves once installed (where `layout.tsx` and `globals.css` both live under `app/`).
4. `METAS` in the same file holds per-slug `dependencies`, `title`, `description`. Add a new entry when adding a template.

### Adding a new template

1. Add metadata to `constants/templates.ts`.
2. Create `components/templates/<slug>/` with `globals.css` (with `:root`/`.dark` token blocks), `sections/`, `ui/`. All internal imports must use `@/components/templates/<slug>/...` — these strings ship verbatim and resolve identically here and in user projects.
3. Create `app/templates/<slug>/(pages)/{layout.tsx,page.tsx}`. The layout imports `@/components/templates/<slug>/globals.css` (the registry builder rewrites this on ship).
4. Add a `METAS[<slug>]` entry in `lib/registry/build-registry-item.ts` with `dependencies` (every npm package the template's components import — including `clsx`, `tailwind-merge` if `@/lib/utils` is used).
5. The gallery `Link` already targets `/template/<slug>`; the detail page reads from `TEMPLATES`; no further wiring needed.

### What gets shipped on install

- `app/layout.tsx` (the route's layout, with import path rewritten)
- `app/page.tsx` (the route's page)
- `app/globals.css` (the template's globals.css)
- `components/templates/<slug>/{sections,ui}/**.tsx`

The shadcn CLI prompts to overwrite `app/layout.tsx` and `app/globals.css`. That's expected — the user is installing a full template. `@/lib/utils` (the `cn` helper) is **not** shipped because it's auto-created by `shadcn init`.

## Frontend rules (strictly enforced)

The user's global `~/.claude/CLAUDE.md` defines these. Apply them in this repo without re-asking.

**Data flow** (never skip layers): `Component → Hook → DAL → API`

- Components: UI only, consume hooks
- Hooks (`hooks/`): state + effects, call DAL only
- DAL (`dal/*.dal.ts`): all API calls, never raw `fetch` in hooks/components
- Types (`types/`): all TS interfaces here only

**Page structure**: `page.tsx` = section components only, no markup or logic.

**Styling**: For the marketing site, all colors/radius/spacing in `app/globals.css` `@theme inline { ... }`. For templates, in `components/templates/<slug>/globals.css`. Never hardcode tokens in components. Use Tailwind tokens (`bg-primary`, `rounded-lg`, etc.). Tailwind v4 — there is **no** `tailwind.config.ts`.

**Components**: Shadcn for all UI primitives (`components/ui/`, never edit those). No raw HTML for interactive/structural elements.

**Server vs client**:

- Server: data fetching, filtering, sorting, auth, calculations
- Client: modals, tabs, animations, form validation, routing-aware state

## Folder conventions

```
app/(main)/<feature>/_components/    # private to feature, used nowhere else
app/(main)/<feature>/_hooks/         # private to feature
components/layout/                   # Site chrome (header, footer)
components/ui/                       # Shadcn primitives — DO NOT modify
components/shared/                   # Used in 2+ marketing features
components/templates/<slug>/         # Per-template source — shipped to users via /r/<slug>.json
hooks/                               # Shared hooks only (e.g. use-media)
lib/utils.ts                         # `cn` helper
lib/registry/build-registry-item.ts  # Builds the shadcn registry JSON payload
constants/templates.ts               # TEMPLATES array — gallery source of truth
types/                               # All TS interfaces
```

`_components/` and `_hooks/` (underscore prefix) are private to a feature. If a piece is needed in 2+ features, promote it to `components/shared/` or `hooks/`.

## Design system (marketing site)

- Tokens are CSS variables in `:root` and `.dark` selectors in `app/globals.css`, then exposed to Tailwind via the `@theme inline { ... }` block.
- Theming: `next-themes` (`class` attribute strategy). `<html>` has `suppressHydrationWarning`. The header `ThemeToggle` gates rendering until mounted.
- Fonts: `Geist` (sans), `Lora` (serif), `JetBrains_Mono` (mono) — loaded via `next/font/google` in `app/(main)/layout.tsx` and exposed as `--font-sans`, `--font-serif`, `--font-mono`.
- Icons: `lucide-react` only.
- Animation: `motion` (the new name for framer-motion v12+). `useScroll` + `useMotionValueEvent` for scroll, `AnimatePresence` for mount/unmount.
- Aliases: `@/*` resolves to repo root (see `tsconfig.json`).

Templates own their own design system inside `components/templates/<slug>/globals.css` — they're isolated from the marketing tokens.

## shadcn setup

`components.json` is configured with `style: base-nova`, `baseColor: neutral`, RSC enabled, and a custom registry alias `@tailark` pointing at `https://tailark.com/r/{name}.json`. Add primitives with `bunx shadcn@latest add <name>`.

## Image domains

`next.config.ts` whitelists `picsum.photos`, `images.unsplash.com`, `avatars.githubusercontent.com` for `<Image>`. Add new external hosts there before referencing them.

## Skills active in this project

`.agents/skills/` contains four skills (locked in `skills-lock.json`):

- **design-taste-frontend** — asymmetric layouts, CSS-only motion (no framer-motion-style imports beyond `motion`).
- **high-end-visual-design** — soft-structuralism / editorial-asymmetric. Custom cubic-bezier easings, double-bezel cards, button-in-button CTAs, `py-24`+ section padding.
- **full-output-enforcement** — never truncate code, never use `// ...` placeholders.
- **brandkit** — image generation only.

When making visual changes to the marketing site, honor the design skill conventions (no neon, no purple beyond the existing primary, Geist/Lora/JetBrains font stack). Templates have their own design — don't impose marketing conventions on them.
