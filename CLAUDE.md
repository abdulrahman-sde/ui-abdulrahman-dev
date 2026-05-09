# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: read this first

@AGENTS.md

This is **Next.js 16** with **React 19** and **Tailwind v4**. Conventions differ from older docs (params is now `Promise`, `@theme` blocks replace `tailwind.config.ts`, etc.). Before writing any `page.tsx` / `layout.tsx` / `route.ts` / `dynamic` export, read the relevant guide in `node_modules/next/dist/docs/01-app/` to confirm current syntax. Do not trust training data for Next/Tailwind APIs.

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

## Architecture

### Route layout (App Router)

```
app/
├── (landing)/               route group — marketing site at /
│   ├── page.tsx             composes section components only, no markup/logic
│   └── _components/         private to landing
├── templates/
│   ├── page.tsx             /templates gallery
│   ├── _components/         private to gallery
│   └── [slug]/
│       ├── page.tsx         /templates/<slug> detail page
│       └── _components/     private to detail page
├── submit/                  /submit page
├── globals.css              ALL design tokens live here in @theme blocks
└── layout.tsx               root, sets up next-themes + fonts
```

### Frontend rules (strictly enforced)

The user's global `~/.claude/CLAUDE.md` defines these. Apply them in this repo without re-asking.

**Data flow** (never skip layers): `Component → Hook → DAL → API`

- Components: UI only, consume hooks
- Hooks (`hooks/`): state + effects, call DAL only
- DAL (`dal/*.dal.ts`): all API calls, never raw `fetch` in hooks/components
- Types (`types/`): all TS interfaces here only

**Page structure**: `page.tsx` = section components only, no markup or logic.

**Styling**: All colors/radius/spacing in `app/globals.css` `@theme inline { ... }` only. Never hardcode in components. Use Tailwind tokens (`bg-primary`, `rounded-lg`, etc.). Tailwind v4 — there is **no** `tailwind.config.ts`.

**Components**: Shadcn for all UI primitives (`components/ui/`, never edit those). No raw HTML for interactive/structural elements.

**Server vs client**:

- Server: data fetching, filtering, sorting, auth, calculations
- Client: modals, tabs, animations, form validation, routing-aware state

### Folder conventions

```
app/<feature>/_components/   # private to feature, used nowhere else
app/<feature>/_hooks/        # private to feature
components/layout/           # Header, Footer — structural chrome only
components/ui/               # Shadcn primitives — DO NOT modify
components/shared/           # used in 2+ features (e.g. template-mock)
components/logo.tsx          # logo, used by header
hooks/                       # shared hooks only (e.g. use-media)
lib/utils.ts                 # `cn` helper and other shared utils
constants/                   # static data (e.g. TEMPLATES list)
types/                       # all TS interfaces
```

`_components/` and `_hooks/` (underscore prefix) are private to a feature. If a piece is needed in 2+ features, promote it to `components/shared/` or `hooks/`.

### Design system

- Tokens are CSS variables in `:root` and `.dark` selectors in `app/globals.css`, then exposed to Tailwind via the `@theme inline { ... }` block.
- Theming: `next-themes` (`class` attribute strategy). The `<html>` tag in `app/layout.tsx` has `suppressHydrationWarning`. The header has a `ThemeToggle` that gates rendering until mounted to avoid hydration mismatches.
- Fonts: `Inter` (sans), `Lora` (serif), `JetBrains_Mono` (mono) — all loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-sans`, `--font-serif`, `--font-mono`.
- Icons: `lucide-react` only.
- Animation: `motion` (the new name for framer-motion v12+). Used in the header for the floating-pill scroll effect. Pattern: `useScroll` + `useMotionValueEvent` to track scroll, `AnimatePresence` for mount/unmount transitions.
- Aliases: `@/*` resolves to repo root (see `tsconfig.json`).

### Templates data flow

The gallery (`app/templates/page.tsx`) and the detail page (`app/templates/[slug]/page.tsx`) both read from `constants/templates.ts` (the `TEMPLATES` array of `Template` objects defined in `types/template.ts`). Each template currently renders as a procedural `TemplateMock` SVG-ish placeholder via `components/shared/template-mock.tsx` — there is no real preview yet.

A planned architecture for real previews + a shadcn registry endpoint (`/r/<slug>.json`) is documented in `/Users/abdulrahman/.claude/plans/users-abdulrahman-downloads-www-styleui-drifting-sun.md`. If working on template previews / install commands, read that plan first.

### shadcn setup

`components.json` is configured with `style: base-nova`, `baseColor: neutral`, RSC enabled, and a custom registry alias `@tailark` pointing at `https://tailark.com/r/{name}.json`. Add primitives with `bunx shadcn@latest add <name>`.

### Image domains

`next.config.ts` whitelists `picsum.photos`, `images.unsplash.com`, `avatars.githubusercontent.com` for `<Image>`. Add new external hosts there before referencing them.

## Skills active in this project

`.agents/skills/` contains four skills (locked in `skills-lock.json`):

- **design-taste-frontend** — asymmetric layouts, CSS-only motion (no framer-motion-style imports beyond `motion`).
- **high-end-visual-design** — soft-structuralism / editorial-asymmetric. Custom cubic-bezier easings, double-bezel cards, button-in-button CTAs, `py-24`+ section padding.
- **full-output-enforcement** — never truncate code, never use `// ...` placeholders.
- **brandkit** — image generation only.

When making visual changes, honor the design skill conventions (no neon, no purple beyond the existing primary, Geist/Lora/JetBrains font stack).
