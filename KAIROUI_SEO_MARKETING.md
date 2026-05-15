# Kairo UI — SEO, GEO & Marketing Playbook

### Specific to this repo. Read alongside SEO_MASTERY_GUIDE.md.

> This document is about **this project** (`kairoui.online`) — what's already done, what's broken, what to build next, and how to market it. It references the general guide (`SEO_MASTERY_GUIDE.md`) for concepts. Read that first if you're new to SEO.

---

## Current State Audit (May 2026)

### What you have

- **5 templates**: Nova, Popcorn, Orbit, Glaze, Nexora
- **Domain**: kairoui.online (www. variant, metadataBase confirms this)
- **Stack**: Next.js 16, React 19, Tailwind v4, Vercel hosting
- **Analytics**: Vercel Analytics + Speed Insights already wired
- **Registry**: `/r/<slug>.json` endpoint serving shadcn CLI installs

### What's missing (critical issues first)

#### Issue 1 — No sitemap.ts

There is no `app/sitemap.ts`. Google has to discover your pages by crawling, which means template detail pages at `/template/<slug>` may never get indexed.

**Fix required**: Create `app/sitemap.ts` (code in Section 3 below).

#### Issue 2 — No robots.ts

There is no `app/robots.ts`. Without it, Next.js serves a permissive default, but you have no sitemap reference and no control.

**Fix required**: Create `app/robots.ts` (code in Section 3 below).

#### Issue 3 — Template detail pages have thin metadata

Current `generateMetadata` for `/template/[slug]`:

```tsx
return {
  title: `${t.title} — kairoui.online`, // ← no keyword, just a name
  description: t.description, // ← 1 sentence, no keyword targeting
};
```

`"Nova — kairoui.online"` is not what anyone searches. No one is searching for "Nova" in the context of templates. They search "Next.js SaaS landing page template" — that's what your title needs.

**Fix required**: Keyword-targeted titles and descriptions (Section 4 below).

#### Issue 4 — Templates page has no metadata at all

`app/(main)/templates/page.tsx` exports no `metadata`. Google invents a title from the page content, which will be garbage.

**Fix required**: Add metadata to `app/(main)/templates/page.tsx`.

#### Issue 5 — Homepage metadata has keyword stuffing and a misaligned brand

The `keywords` array in layout.tsx has 7 terms including "Kairo UI" — this doesn't harm you but also doesn't help (Google has ignored the keywords meta tag since 2009). More importantly, the description is generic. The homepage title is good but could be sharper.

**Fix**: Remove the `keywords` array entirely. Improve the description.

#### Issue 6 — No structured data (JSON-LD) anywhere

No schema markup exists on any page. This means:

- Google can't show rich results for your templates
- AI systems have no machine-readable description of what you offer
- No FAQ schema = no chance at AI Overview inclusion

**Fix required**: Add schema to key pages (Section 5 below).

#### Issue 7 — No canonical tags on template detail pages

Dynamic `generateMetadata` doesn't set `alternates.canonical`. If a template page ever gets accessed via a redirect or campaign URL, Google will see two versions.

**Fix required**: Add canonical to every `generateMetadata` return (Section 4).

#### Issue 8 — No llms.txt

No `/llms.txt` endpoint. AI crawlers like Perplexity and ChatGPT Browse have no machine-readable summary of your site.

**Fix required**: Create `app/llms.txt/route.ts` (Section 5 below).

---

## The Opportunity

Before fixing anything, understand what you're sitting on.

### Your keyword universe

These are the search terms you should own. All are beatable with a focused effort:

| Keyword                        | Monthly Volume | Difficulty | Your Current Status |
| ------------------------------ | -------------- | ---------- | ------------------- |
| Next.js landing page template  | 4,400          | 28         | Not ranking         |
| free Next.js templates         | 2,900          | 22         | Not ranking         |
| Tailwind landing page template | 3,600          | 25         | Not ranking         |
| SaaS landing page template     | 5,400          | 35         | Not ranking         |
| Next.js SaaS template          | 1,900          | 24         | Not ranking         |
| free landing page templates    | 8,100          | 30         | Not ranking         |
| shadcn templates               | 1,200          | 18         | Could rank fast     |
| Tailwind CSS templates free    | 2,200          | 20         | Not ranking         |
| Next.js portfolio template     | 1,400          | 22         | Not ranking         |
| AI landing page template       | 1,800          | 19         | Not ranking         |

**Total addressable searches (just the above)**: ~33,000/month. That's before long-tail variations.

### Your unfair advantages

1. **shadcn CLI install** — no other free template library installs this cleanly. This is a genuine differentiator that should be in every title and description.
2. **MIT licensed** — explicitly free, forever. People search "free" constantly.
3. **Next.js 16 + React 19 + Tailwind v4** — cutting-edge stack. Most competitors are on v3/v13.
4. **Growing collection** — a "growing collection" with categories is a directory play (high SEO value).

---

## Section 1: The Content Strategy

### The three tiers of content you need

**Tier 1: Template pages (you have 5, need 20+)**

Each template page at `/template/<slug>` is a landing page targeting:

- `"[template name] Next.js template"` — branded
- `"[category] landing page template Next.js"` — category
- `"free [category] template shadcn"` — distribution method

These are your highest-converting pages. Someone searching "SaaS landing page template Next.js" is ready to install.

**Tier 2: Category/collection pages (you have 0, need 8)**

Pages like:

- `/templates/saas` — "Free SaaS Landing Page Templates"
- `/templates/portfolio` — "Free Next.js Portfolio Templates"
- `/templates/ai` — "Free AI Product Landing Page Templates"

These hub pages collect all templates in a category, rank for broader terms, and internally link to individual template pages. Google loves this hub-and-spoke structure.

**Tier 3: Blog/guide content (you have 0, need 8–10 posts)**

Pages like:

- `"How to install a Next.js template with shadcn"` — tutorial that ranks + converts
- `"Best free Next.js templates 2026"` — curation piece, you curate your own (meta but it works)
- `"Tailwind v4 landing page: what changed"` — technical, links to your templates
- `"How to customize a Kairo UI template"` — tutorial that ranks + retains

---

## Section 2: Keyword Targeting Per Page

### Homepage `/`

**Primary keyword**: `free landing page templates Next.js`
**Secondary**: `shadcn landing page templates`, `free Tailwind templates`

**Current title**: `"Kairo UI — Modern, Next.js Landing Page Templates"` — decent, keep it
**Suggested improvement**:

```
"Free Next.js Landing Page Templates — Kairo UI"
```

Put "Free" first. That's what differentiates you and what people filter for.

**Current description**: Generic. Rewrite to:

```
"A growing collection of free, MIT-licensed landing page templates for Next.js 16
and Tailwind CSS. Install any template in seconds with the shadcn CLI.
No signup, no paywalls."
```

This hits: free, MIT, Next.js 16, Tailwind CSS, shadcn, no signup — all actual search terms.

### Templates gallery `/templates`

**Primary keyword**: `free Next.js templates`
**Secondary**: `Tailwind CSS templates`, `landing page templates`

Add metadata:

```tsx
export const metadata: Metadata = {
  title: "Free Next.js Landing Page Templates — Browse All | Kairo UI",
  description:
    "Browse 5+ free, MIT-licensed Next.js landing page templates built with Tailwind CSS v4. Install any template with one command via the shadcn CLI.",
  alternates: { canonical: "https://www.kairoui.online/templates" },
};
```

### Template detail pages `/template/[slug]`

**Per-template targeting:**

| Slug    | Primary keyword                         | Title                                                  |
| ------- | --------------------------------------- | ------------------------------------------------------ |
| nova    | free SaaS landing page template Next.js | Nova — Free SaaS Landing Page Template for Next.js     |
| glaze   | dark landing page template Next.js      | Glaze — Free Dark Glassmorphism Landing Page Template  |
| popcorn | mobile app landing page template        | Popcorn — Free Mobile App Landing Page Template        |
| orbit   | SaaS template Next.js Tailwind          | Orbit — Free Modern SaaS Template with Global Reach    |
| nexora  | AI product landing page template        | Nexora — Free AI Product Landing Page Template Next.js |

**Description formula for each**:

```
"[Template name] is a free, MIT-licensed [category] landing page template built with
Next.js 16 and Tailwind CSS v4. Includes [key sections]. Install in seconds with
the shadcn CLI — no signup required."
```

---

## Section 3: Technical Fixes (Code)

### 3.1 Create `app/sitemap.ts`

```tsx
// app/sitemap.ts

import { MetadataRoute } from "next";
import { TEMPLATES } from "@/constants/templates";

const BASE = "https://www.kairoui.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/templates`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  const templateDetailPages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${BASE}/template/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [...staticPages, ...templateDetailPages];
}
```

After deploying, go to Google Search Console → Sitemaps → submit `https://www.kairoui.online/sitemap.xml`.

### 3.2 Create `app/robots.ts`

```tsx
// app/robots.ts

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/r/"],
      },
    ],
    sitemap: "https://www.kairoui.online/sitemap.xml",
  };
}
```

Note: `/r/` (the registry endpoints) are disallowed — they're JSON payloads for the CLI, not pages for users or crawlers.

### 3.3 Fix `generateMetadata` in `/template/[slug]/page.tsx`

Replace the current thin implementation:

```tsx
// app/(main)/template/[slug]/page.tsx — generateMetadata

// A mapping of category labels per template — add to constants/templates.ts or inline here
const TEMPLATE_META: Record<
  string,
  { keyword: string; category: string; sections: string }
> = {
  nova: {
    keyword: "SaaS landing page template",
    category: "SaaS",
    sections: "hero, features, pricing, and FAQ sections",
  },
  glaze: {
    keyword: "dark glassmorphism landing page template",
    category: "Dashboard",
    sections: "hero, features, and dark glassmorphism UI sections",
  },
  popcorn: {
    keyword: "mobile app landing page template",
    category: "Mobile App",
    sections: "hero, coverage map, features, and testimonials",
  },
  orbit: {
    keyword: "SaaS template with global reach visualization",
    category: "SaaS",
    sections: "hero, global reach visualization, and feature sections",
  },
  nexora: {
    keyword: "AI product landing page template",
    category: "AI Tool",
    sections: "hero, core features, how it works, pricing, and footer",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) return { title: "Template Not Found" };

  const meta = TEMPLATE_META[slug];
  const keyword = meta?.keyword ?? `${t.title} landing page template`;
  const sections = meta?.sections ?? t.description;

  return {
    title: `${t.title} — Free ${keyword} for Next.js | Kairo UI`,
    description: `${t.title} is a free, MIT-licensed ${keyword} built with Next.js 16 and Tailwind CSS v4. Includes ${sections}. Install in one command with the shadcn CLI.`,
    alternates: {
      canonical: `https://www.kairoui.online/template/${slug}`,
    },
    openGraph: {
      title: `${t.title} — Free ${keyword}`,
      description: `Free MIT-licensed template. Includes ${sections}. One-command install via shadcn CLI.`,
      url: `https://www.kairoui.online/template/${slug}`,
      siteName: "Kairo UI",
      images: [
        {
          url: `/og/template-${slug}.png`, // generate these — see Section 6
          width: 1200,
          height: 630,
          alt: `${t.title} template preview`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.title} — Free ${keyword}`,
      description: `Free Next.js template. Install with shadcn CLI.`,
      images: [`/og/template-${slug}.png`],
    },
  };
}
```

### 3.4 Fix `app/(main)/templates/page.tsx`

```tsx
// app/(main)/templates/page.tsx

import type { Metadata } from "next";
import TemplateGrid from "@/app/(main)/templates/_components/template-grid";

export const metadata: Metadata = {
  title: "Free Next.js Landing Page Templates — Browse All | Kairo UI",
  description:
    "Browse free, MIT-licensed Next.js 16 landing page templates built with Tailwind CSS v4. SaaS, AI tools, mobile apps, and more. Install any template in one command via shadcn.",
  alternates: {
    canonical: "https://www.kairoui.online/templates",
  },
  openGraph: {
    title: "Free Next.js Landing Page Templates | Kairo UI",
    description:
      "Free, MIT-licensed Next.js templates for SaaS, AI products, mobile apps, and more.",
    url: "https://www.kairoui.online/templates",
    siteName: "Kairo UI",
  },
};

export default function TemplatesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto">
        <TemplateGrid />
      </div>
    </div>
  );
}
```

### 3.5 Fix layout.tsx metadata (homepage)

```tsx
// In app/(main)/layout.tsx — replace the metadata export

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kairoui.online"),
  title: {
    default: "Free Next.js Landing Page Templates — Kairo UI",
    template: "%s | Kairo UI",
  },
  description:
    "A growing collection of free, MIT-licensed landing page templates for Next.js 16 and Tailwind CSS v4. Install any template in seconds with the shadcn CLI. No signup, no paywalls.",
  authors: [{ name: "Abdul Rahman Asif" }],
  creator: "Abdul Rahman Asif",
  openGraph: {
    title: "Free Next.js Landing Page Templates — Kairo UI",
    description:
      "Free, MIT-licensed Next.js 16 templates. Install any template with one command.",
    url: "https://www.kairoui.online",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kairo UI — Free Next.js Landing Page Templates",
      },
    ],
    siteName: "Kairo UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Next.js Landing Page Templates — Kairo UI",
    description:
      "Free, MIT-licensed Next.js 16 templates. Install any template with one command.",
    images: ["/twitter-image"],
    creator: "@abdurahmanasif",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://www.kairoui.online",
  },
};
```

Two changes from the original:

- `title` is now an object with `template: "%s | Kairo UI"` — this means child pages that set their own title will automatically get `"Nova — Free SaaS Template | Kairo UI"` format
- `keywords` array removed (Google ignores it)

---

## Section 4: Structured Data (JSON-LD)

### 4.1 Create a shared JsonLd component

```tsx
// components/shared/json-ld.tsx

type Props = { data: Record<string, unknown> };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### 4.2 Add schema to the templates gallery page

```tsx
// app/(main)/templates/page.tsx — add this inside the component return

import { JsonLd } from "@/components/shared/json-ld";
import { TEMPLATES } from "@/constants/templates";

// Inside TemplatesPage():
const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free Next.js Landing Page Templates",
  description:
    "Free, MIT-licensed Next.js 16 landing page templates built with Tailwind CSS v4.",
  url: "https://www.kairoui.online/templates",
  numberOfItems: TEMPLATES.length,
  hasPart: TEMPLATES.map((t) => ({
    "@type": "CreativeWork",
    name: t.title,
    url: `https://www.kairoui.online/template/${t.slug}`,
    description: t.description,
    license: "https://opensource.org/licenses/MIT",
  })),
};

return (
  <>
    <JsonLd data={schema} />
    <div className="bg-background min-h-screen">...</div>
  </>
);
```

### 4.3 Add schema to each template detail page

```tsx
// In TemplateDetailPage() — add before the return

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: `${t.title} — Next.js Landing Page Template`,
  description: t.description,
  url: `https://www.kairoui.online/template/${t.slug}`,
  codeRepository: "https://github.com/abdulrahmanasif/kairoui",
  programmingLanguage: ["TypeScript", "TSX"],
  runtimePlatform: "Next.js",
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};
```

### 4.4 Add FAQ schema to the homepage

The homepage should have an FAQ section (below the hero or above the footer). This is a two-for-one: improves the page for users AND gives you FAQPage schema which AI Overviews pull from directly.

**Suggested FAQ content:**

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are Kairo UI templates really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All templates are MIT-licensed — free for personal and commercial use. No signup, no attribution required.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install a Kairo UI template?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run: bunx shadcn add https://www.kairoui.online/r/<slug>.json — replacing <slug> with the template name. The shadcn CLI will prompt you before writing any files.",
      },
    },
    {
      "@type": "Question",
      name: "Which frameworks do Kairo UI templates support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Templates are built for Next.js 16 with React 19 and Tailwind CSS v4. They require a shadcn-initialized Next.js project.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Kairo UI templates for client projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The MIT license allows commercial use without restriction.",
      },
    },
  ],
};
```

---

## Section 5: GEO (AI Search)

### 5.1 Create `app/llms.txt/route.ts`

```tsx
// app/llms.txt/route.ts

import { TEMPLATES } from "@/constants/templates";

export async function GET() {
  const templateList = TEMPLATES.map(
    (t) =>
      `- [${t.title}](https://www.kairoui.online/template/${t.slug}): ${t.description}`,
  ).join("\n");

  const content = `# Kairo UI

A free, open-source library of MIT-licensed Next.js landing page templates built with Tailwind CSS v4 and React 19.

## What this site is
Kairo UI provides free landing page templates that developers can install directly into their Next.js projects using the shadcn CLI. No signup, no paywalls. All templates are MIT-licensed.

## Templates

${templateList}

## Install any template
\`\`\`
bunx shadcn add https://www.kairoui.online/r/<slug>.json
\`\`\`

## Technical details
- Framework: Next.js 16 with React 19
- Styling: Tailwind CSS v4
- Install method: shadcn CLI registry
- License: MIT

## Creator
Abdul Rahman Asif — @abdurahmanasif on Twitter/X
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

### 5.2 How to get cited by AI systems

AI systems (Perplexity, ChatGPT, Claude) recommend things they've seen referenced by trusted sources. Your path to AI citation:

1. **Get into dev newsletters** — TLDR Web Dev, bytes.dev, This Week in React all mention new tools. One mention = dozens of articles link to you = AI systems see the citations.

2. **Get into "awesome" GitHub lists** — search GitHub for `awesome nextjs`, `awesome tailwind`, `awesome shadcn`. Submit PRs. These are heavily crawled.

3. **Answer questions on Stack Overflow** — questions about "Next.js template" or "shadcn starter" → link your templates as a resource.

4. **Reddit posts that rank** — r/nextjs posts rank in Google. A helpful post about your templates that ranks in Google → AI systems will see it.

5. **Write the definitive guide** — "How to set up a Next.js 16 project with Tailwind v4 and shadcn in 2026" → this ranks, gets links, gets cited by AI.

### 5.3 The entity clarity play

When Perplexity or ChatGPT is asked "best free Next.js templates", it needs to know Kairo UI exists as an entity. Make sure these are true:

- Your About/footer clearly states: "Kairo UI is a free library of Next.js landing page templates"
- Your GitHub repo description says the same
- If you post on Twitter, your bio mentions it
- Your templates page H1 says "Free Next.js Landing Page Templates" (not just your logo)

Every place your brand name appears, it should be next to the category you want to own.

---

## Section 6: OG Images (Action Required)

Your current OG image setup uses `/opengraph-image` (generated) for the homepage but `/og/template-<slug>.png` for detail pages — **those files don't exist yet**.

### Option A: Dynamic OG images with `ImageResponse`

```tsx
// app/(main)/template/[slug]/opengraph-image.tsx
// This file auto-generates the OG image for /template/[slug]

import { ImageResponse } from "next/og";
import { TEMPLATES } from "@/constants/templates";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const t = TEMPLATES.find((x) => x.slug === params.slug);

  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "60px",
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: "#71717a",
          marginBottom: 12,
          fontFamily: "sans-serif",
        }}
      >
        Free Next.js Template
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "white",
          fontFamily: "sans-serif",
          lineHeight: 1.1,
        }}
      >
        {t?.title}
      </div>
      <div
        style={{
          fontSize: 22,
          color: "#a1a1aa",
          marginTop: 16,
          fontFamily: "sans-serif",
        }}
      >
        {t?.description}
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 16,
          color: "#52525b",
          fontFamily: "monospace",
        }}
      >
        kairoui.online
      </div>
    </div>,
    { ...size },
  );
}
```

This generates OG images on-the-fly — no static files needed.

---

## Section 7: The Distribution Plan

### Phase 1: Fix the foundation (Week 1)

Do everything in Sections 3–6 above. This is your technical SEO baseline. Without it, everything else is wasted effort.

Checklist:

- [ ] `app/sitemap.ts` created and submitted to Search Console
- [ ] `app/robots.ts` created
- [ ] All template detail pages have keyword-targeted metadata + canonical
- [ ] `app/(main)/templates/page.tsx` has metadata
- [ ] `layout.tsx` metadata fixed (title template, no keywords array)
- [ ] JSON-LD on templates gallery and detail pages
- [ ] FAQ section + schema on homepage
- [ ] `app/llms.txt/route.ts` live
- [ ] Dynamic OG images working

### Phase 2: Content expansion (Week 2–4)

**Priority 1: Category hub pages**

Create `/templates/saas`, `/templates/ai`, `/templates/dark` etc. Each one:

- Has its own keyword-targeted metadata
- Lists all templates in that category with thumbnails
- Links back to `/templates` and to each individual template
- Has a brief intro paragraph explaining the category

This creates a proper hub-and-spoke structure that Google rewards.

**Priority 2: Install guide**

Create `/docs/getting-started` or `/blog/how-to-install`:

- Title: "How to Install a Kairo UI Template with the shadcn CLI"
- Step-by-step guide with code blocks
- Screenshots of the process
- Links to individual templates
- This ranks for "shadcn template install" and "Next.js template how to use"

**Priority 3: A comparison/curation page**

Create `/blog/best-free-nextjs-templates-2026`:

- Lists your own templates (you can include others to seem unbiased)
- Ranks for "best free Next.js templates" — this exact phrase has real volume
- Gets shared because it's a useful list

### Phase 3: Launch and distribution (Week 4+)

**Product Hunt**

Your site is genuinely good. Submit it with:

- Tagline: "Free MIT-licensed Next.js landing page templates, one-command install"
- Description: focus on the shadcn CLI install being the superpower
- Gallery screenshots: show the install flow and the before/after

Best day: Tuesday. Best time: 12:01 AM PST.

**Hacker News (Show HN)**

Title: `Show HN: Free Next.js landing page templates, installable via shadcn CLI`

The hook is the shadcn install. That's genuinely novel — templates you install the same way you add a Button component. Lead with that.

**Reddit**

- r/nextjs — `"I built a free landing page template library that installs via the shadcn CLI"`
- r/webdev — same post, slightly different framing
- r/reactjs — mention the React 19 + Next.js 16 angle
- r/tailwindcss — Tailwind v4 angle

Wait 1 week between each subreddit post. Don't batch them.

**GitHub**

- Make the repo public if it isn't
- Write a great README with screenshots and the install command as the very first thing
- Add topics: `nextjs`, `tailwindcss`, `shadcn`, `templates`, `landing-page`, `react`
- Submit to:
  - `awesome-nextjs` list
  - `awesome-tailwindcss` list
  - `awesome-shadcn-ui` list (this one specifically will drive developer traffic)

**Developer newsletters to pitch**

| Newsletter         | Audience       | How to submit              |
| ------------------ | -------------- | -------------------------- |
| TLDR Web Dev       | 500k devs      | tldr.tech/submit           |
| bytes.dev          | React devs     | reply to any issue         |
| This Week in React | React/Next.js  | thisweekinreact.com/submit |
| Syntax.fm          | General webdev | @syntaxfm on Twitter       |
| Pointer.io         | Frontend devs  | pointer.io/submit          |

Template pitch:

> "Hey — I built Kairo UI (kairoui.online), a free library of Next.js 16 landing page templates installable via the shadcn CLI. MIT licensed. Thought your audience of Next.js devs might find it useful — especially the shadcn install flow which means templates work the same way as components. Happy to answer questions."

Keep it short. No fluff. Link directly.

**Twitter/X strategy**

Content that works for developer tools:

1. **"I built X because Y"** — the origin story. Post this on launch day.
2. **The "why shadcn install"** thread — explain why installing templates via the shadcn CLI is a better DX than downloading a ZIP file.
3. **Template previews** — short screen recordings of the templates. No voiceover. Just the template scrolling. Tag `#nextjs #tailwindcss`.
4. **Behind-the-scenes** — "here's how the isolated template preview architecture works" — technical threads attract developers.

The account is `@abdurahmanasif`. Keep the focus tight: Next.js, Tailwind, open source tools.

### Phase 4: Long-term compounding (Month 2+)

**Add 2+ templates per month**

Every new template:

- Creates a new indexable page
- Gives you new content to post on social
- Expands your keyword coverage (each template targets a different category keyword)

**The flywheel**: more templates → more keywords → more organic traffic → more GitHub stars → more newsletter mentions → more backlinks → higher domain authority → all pages rank better.

**Create a "submit your template" path**

Once you have traction, let community members submit templates. User-generated templates = content you didn't have to make, + community ownership, + more variety, + more keywords.

---

## Section 8: Tracking

### What to monitor after every change

**Google Search Console** (free, set up immediately)

- Check weekly: total impressions, clicks, average position
- After adding sitemap: check Coverage tab for indexation errors
- After fixing metadata: watch CTR for affected pages (should rise in 2–4 weeks)

**Vercel Analytics** (already installed)

- Top pages by visits
- Traffic sources

**Ahrefs Webmaster Tools** (free)

- Backlinks: who links to you
- Keyword rankings: where you appear in search results

### The signals that tell you it's working

| Signal                                     | Timeframe               | What it means                                            |
| ------------------------------------------ | ----------------------- | -------------------------------------------------------- |
| Pages appear in Search Console impressions | 1–4 weeks after sitemap | Google found and indexed your pages                      |
| Impressions grow, clicks low               | Normal early state      | You're appearing but not ranking top 10 yet              |
| Average position drops below 20            | 2–3 months              | You're on page 2, push content and links to break page 1 |
| Average position hits 10 or below          | 3–6 months              | Page 1 — now optimize for CTR (title/description)        |
| Direct/referral traffic spikes             | After distribution      | Newsletter or PH feature landed                          |

### The 3-month patience rule

SEO takes 3 months minimum to show results. Expect:

- Month 1: Google discovers and indexes your pages
- Month 2: You appear in search results but at position 30–50
- Month 3: You start moving to position 10–20 for long-tail terms
- Month 4–6: Page 1 rankings for your targets begin

Don't change your strategy every week. Fix the technical issues, publish content, build links, then wait.

---

## Quick Action Priority List

Do these in order. Don't skip ahead.

**This week (technical foundation):**

1. Create `app/sitemap.ts`
2. Create `app/robots.ts`
3. Fix `generateMetadata` in `/template/[slug]/page.tsx`
4. Add metadata to `app/(main)/templates/page.tsx`
5. Fix `layout.tsx` metadata
6. Create `app/llms.txt/route.ts`
7. Submit sitemap to Google Search Console

**Next two weeks (content + schema):** 8. Add `JsonLd` component + schema to templates gallery + detail pages 9. Add FAQ section to homepage + FAQPage schema 10. Create dynamic OG images 11. Create category hub pages (`/templates/saas`, `/templates/ai`) 12. Write the install guide post

**Week 4 (distribution):** 13. Product Hunt launch 14. Hacker News Show HN 15. Reddit posts (staggered) 16. GitHub repo cleanup + topic tags 17. Awesome list PRs 18. Newsletter pitch (3 at once, different ones)

---

_This document is specific to kairoui.online. For general SEO concepts and theory, see SEO_MASTERY_GUIDE.md._
