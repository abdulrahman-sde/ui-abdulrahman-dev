# CLAUDE.md

@AGENTS.md

**Next.js 16 · React 19 · Tailwind v4 · npm.** Before writing any `page.tsx` / `layout.tsx` / `route.ts` / `dynamic` export, read `node_modules/next/dist/docs/01-app/` — do not trust training data for Next/Tailwind APIs. `ARCHITECTURE.md` is stale; trust this file instead.

**Package manager: npm.** Use `npm run dev` · `npm install <pkg>` · `npm run lint`. Never run `npm run build` without explicit permission. Do NOT use `bun` — it is not installed.

---

## What this site is

**ui.abdulrahmanasif.dev** — a free MIT-licensed landing page template library. Not a portfolio, not a paid product. All copy/CTAs must frame it as "free templates to browse and fork". GitHub is the primary CTA.

---

## Architecture

Two independent root layouts — there is no `app/layout.tsx`:

```
app/
├── (main)/                      ← Marketing site (Header, ThemeProvider, fonts)
│   ├── (landing)/page.tsx       ← /
│   ├── templates/page.tsx       ← /templates  (gallery)
│   ├── template/[slug]/page.tsx ← /template/<slug>  (detail — iframes the live route)
│   └── r/[name]/route.ts        ← /r/<slug>.json  (shadcn install endpoint)
└── templates/<slug>/            ← Per-template root (own <html>, CSS, fonts)
    ├── layout.tsx
    └── page.tsx                 ← Live template & iframe target
```

`/template/<slug>` (singular) = marketing detail page. `/templates/<slug>` (plural) = isolated live preview. Navigation between them is a full page reload by design.

---

## Templates

```
components/templates/<slug>/     ← All source (shipped to users)
├── globals.css                  ← Template tokens (:root, .dark, @theme, @layer base)
├── sections/                    ← Page sections
└── ui/                          ← Template-private primitives

app/templates/<slug>/
├── layout.tsx                   ← imports @/components/templates/<slug>/globals.css
└── page.tsx                     ← imports section components

constants/templates.ts           ← TEMPLATES array — gallery source of truth
lib/registry/build-registry-item.ts ← builds /r/<slug>.json; METAS holds per-slug deps
```

**Adding a template:**
1. Add to `constants/templates.ts`
2. Create `components/templates/<slug>/` — all internal imports use `@/components/templates/<slug>/...` (path parity: same string works in dev and after install)
3. Create `app/templates/<slug>/{layout.tsx,page.tsx}`
4. Add `METAS[<slug>]` in `lib/registry/build-registry-item.ts` with all npm `dependencies`

**What ships on install:** `app/layout.tsx` (import rewritten), `app/page.tsx`, `app/globals.css`, `components/templates/<slug>/{sections,ui}/**.tsx`. `@/lib/utils` is not shipped — created by `shadcn init`.

---

## Styling rules (strictly enforced)

- **No inline `style={{}}` props.** All colors, gradients, shadows, masks, and layout tricks go in the template's `globals.css` as named CSS utility classes, then applied via `className`. Exception: genuinely dynamic computed values (e.g. per-item heights/positions derived from data arrays at runtime) may use inline styles.
- **No hardcoded hex/rgba in JSX.** Use CSS variables (`var(--token)`) or Tailwind tokens (`bg-primary`, `text-muted`, etc.).
- **Marketing site tokens:** `app/globals.css` `@theme inline { ... }`. **Template tokens:** `components/templates/<slug>/globals.css`. Never cross-pollinate.
- Tailwind v4 — no `tailwind.config.ts`. Arbitrary values via `[]` syntax are fine.
- `page.tsx` = section components only, zero markup or logic.

---

## Client vs Server components (strictly enforced)

**Default to Server Components.** Only add `"use client"` when the component genuinely needs:
- Browser APIs (`window`, `document`, `canvas`, WebGL)
- React state (`useState`, `useReducer`)
- Effects tied to browser events (`useEffect` for scroll, resize, intervals, RAF)
- Interactive event handlers that can't be handled by native HTML (e.g. complex menus)

**Never add `"use client"` for:**
- Accordion / FAQ sections → use native `<details>`/`<summary>` or CSS-only patterns
- Static gradients, grids, decorative overlays → pure CSS in `globals.css`
- shadcn primitives that don't themselves require client (check before assuming)

**Motion:** Import as `import * as motion from "motion/react-client"` — this keeps SSR intact while enabling animations.

---

## Frontend rules

**Data flow** (never skip layers): `Component → Hook → DAL → API`
- Components: UI only
- Hooks (`hooks/`): state + effects, call DAL only
- DAL (`dal/*.dal.ts`): all API calls, never raw `fetch` in components/hooks
- Types (`types/`): all TS interfaces only here

**Components:** Shadcn for all UI primitives (`components/ui/` — never edit). No raw HTML for interactive/structural elements.

---

## Design system (marketing site)

- Tokens: CSS vars in `:root`/`.dark` in `app/globals.css`, exposed via `@theme inline`.
- Theming: `next-themes` (`class` strategy). `<html>` has `suppressHydrationWarning`.
- Fonts: `Geist` (sans), `Lora` (serif), `JetBrains_Mono` (mono) → `--font-sans/serif/mono`.
- Icons: `lucide-react` only.
- Animation: `motion` (framer-motion v12+). `useScroll` + `useMotionValueEvent` for scroll.
- No neon, no purple beyond existing primary. Honor asymmetric / editorial-asymmetric layouts.

Templates own their isolated design system in their own `globals.css` — don't impose marketing conventions on them.

---

## Folder conventions

```
app/(main)/<feature>/_components/   # private to feature
app/(main)/<feature>/_hooks/        # private to feature
components/layout/                  # Site chrome
components/ui/                      # Shadcn — never modify
components/shared/                  # Used in 2+ features
components/templates/<slug>/        # Per-template source
hooks/                              # Shared hooks (use-media, use-scroll, etc.)
lib/utils.ts                        # cn helper
constants/templates.ts              # TEMPLATES array
types/                              # All TS interfaces
```

---

## Misc

- **shadcn:** `style: base-nova`, `baseColor: neutral`, RSC enabled, `@tailark` → `https://tailark.com/r/{name}.json`. Add with `bunx shadcn@latest add <name>`.
- **Image domains:** `picsum.photos`, `images.unsplash.com`, `avatars.githubusercontent.com` whitelisted in `next.config.ts`. Add new hosts there before using.
- **Skills:** `.agents/skills/` has `design-taste-frontend`, `high-end-visual-design`, `full-output-enforcement`, `brandkit` (locked in `skills-lock.json`). Never truncate code output.
