# SEO Implementation Guide — Kairo UI

What was changed, why each change matters, and what to do next.

---

## The problem before this session

Kairo UI had zero technical SEO. The site existed but Google had no reliable way to find it, understand it, or rank it. Specifically:

- No sitemap → Google had to discover pages by crawling links, which meant template detail pages might never get indexed
- No robots.txt → No sitemap reference, no crawl control
- Template pages had titles like `"Nova — kairoui.online"` → nobody searches that phrase
- The templates gallery page had no metadata at all → Google invents a title from page content (garbage)
- No structured data → Google can't generate rich results, AI systems can't describe you
- No canonical tags → duplicate content risk from campaign URLs or redirects
- No `llms.txt` → AI crawlers (Perplexity, ChatGPT Browse) have no machine-readable summary

---

## What was implemented

### 1. `app/sitemap.ts` — The most important fix

**What it does:** Generates `/sitemap.xml` at your domain root. Lists every URL on the site: homepage, `/templates`, and each `/template/<slug>`.

**Why it matters:** A sitemap is a direct instruction to Google: "these are all my pages, please index them." Without it, Google has to discover pages by following links. Template detail pages live behind a card click on the gallery — Google might never crawl them. With a sitemap, you submit it to Search Console and Google indexes all pages within days, not months.

**The priority values:**
- Homepage: `1.0` — most important page
- `/templates`: `0.9` — second most important (gallery = high traffic intent)
- Template details: `0.8` — individual template pages

**After deploying:** Go to Google Search Console → Sitemaps → submit `https://www.kairoui.online/sitemap.xml`. This is mandatory. The sitemap file alone does nothing; Google needs to be told it exists.

---

### 2. `app/robots.ts` — Crawl control

**What it does:** Generates `/robots.txt`. Tells all crawlers they can index everything except `/api/`, `/_next/`, and `/r/`.

**Why `/r/` is blocked:** The `/r/<slug>.json` endpoints are registry payloads for the shadcn CLI — JSON files with file contents. They're not pages for humans or search engines. Allowing them to be indexed wastes crawl budget and could confuse Google (JSON with TypeScript source code isn't a meaningful page). Blocking them focuses crawl budget on pages that actually matter.

**Why it references the sitemap:** robots.txt is where crawlers look first. Including the sitemap URL there means crawlers who haven't received a Search Console submission can still find the sitemap automatically.

---

### 3. `app/(main)/layout.tsx` — Homepage metadata rewrite

**Three changes:**

**a) Title changed from a string to a template object**

Before:
```ts
title: "Kairo UI — Modern, Next.js Landing Page Templates"
```

After:
```ts
title: {
  default: "Free Next.js Landing Page Templates — Kairo UI",
  template: "%s | Kairo UI",
}
```

The `template` field means every child page that sets its own title automatically gets `"Nova — Free SaaS Landing Page Template | Kairo UI"` without you wiring anything. Without this, child pages that don't set a title fall back to the `default`. It's a one-time setup that handles all future pages.

The new default title leads with "Free" because that's the primary differentiator and a genuine search modifier (people filter for "free templates" constantly). "Modern" in the old title means nothing to a search engine.

**b) Description rewritten for keyword coverage**

Before:
> "Explore a curated collection of professionally designed, open-source landing page templates for React and Next.js. Built with Tailwind CSS."

After:
> "A growing collection of free, MIT-licensed landing page templates for Next.js 16 and Tailwind CSS v4. Install any template in seconds with the shadcn CLI. No signup, no paywalls."

Every phrase in the new description is either a search term people actually use or a conversion signal:
- "free, MIT-licensed" → what people filter for
- "Next.js 16 and Tailwind CSS v4" → current version specificity (searchers are version-aware)
- "shadcn CLI" → your genuine differentiator, no competitor does this
- "No signup, no paywalls" → removes friction objections before they form

**c) `keywords` array removed**

Google has ignored the `<meta name="keywords">` tag since 2009. It provides zero ranking benefit and clutters the metadata object. Removed entirely.

**d) Canonical added**

```ts
alternates: { canonical: "https://www.kairoui.online" }
```

Tells Google the definitive URL for the homepage. Prevents duplicate content issues if the site is ever accessed via `http://`, `kairoui.online` (without www), or trailing slash variants.

---

### 4. `app/(main)/templates/page.tsx` — Gallery page metadata + JSON-LD

**Before:** No metadata at all. Google would invent a title from the page's text content.

**After:**
```
Title: "Free Next.js Landing Page Templates — Browse All | Kairo UI"
Description: "Browse free, MIT-licensed Next.js 16 landing page templates built with Tailwind CSS v4. SaaS, AI tools, mobile apps, and more. Install any template in one command via shadcn."
```

The title targets `"free Next.js templates"` (2,900/month, difficulty 22 — beatable). The description hits several secondary terms: SaaS, AI tools, mobile apps, shadcn.

**JSON-LD added:** `CollectionPage` schema listing all templates. This tells Google (and AI systems) that this is a structured collection, not random content. Each template is listed as a `CreativeWork` with its URL, description, and MIT license. This is machine-readable context that improves how your site appears in AI-generated answers.

---

### 5. `app/(main)/template/[slug]/page.tsx` — Per-template keyword targeting

**Before:** Titles like `"Nova — kairoui.online"`. Nobody searches that. Description was the one-sentence template description from `constants/templates.ts`.

**After:** Each template gets a unique, keyword-targeted title and description:

| Template | Title |
|---|---|
| Nova | Nova — Free SaaS landing page template for Next.js \| Kairo UI |
| Glaze | Glaze — Free dark glassmorphism landing page template for Next.js \| Kairo UI |
| Popcorn | Popcorn — Free mobile app landing page template for Next.js \| Kairo UI |
| Orbit | Orbit — Free SaaS template with global reach visualization for Next.js \| Kairo UI |
| Nexora | Nexora — Free AI product landing page template for Next.js \| Kairo UI |

The formula: `[Name] — Free [specific keyword] for Next.js`

This targets high-intent searches where someone knows what category they want. "Free SaaS landing page template Next.js" is 4,400 searches/month at difficulty 28 — winnable for a focused site.

**Description formula:**
> "[Name] is a free, MIT-licensed [keyword] built with Next.js 16 and Tailwind CSS v4. Includes [specific sections]. Install in one command with the shadcn CLI."

Every description hits: free, MIT, Next.js 16, Tailwind v4, specific sections (shows depth), shadcn CLI (differentiator).

**Canonical added to every template page:**
```ts
alternates: { canonical: `https://www.kairoui.online/template/${slug}` }
```

**SoftwareSourceCode JSON-LD added:** Tells Google this is open-source code (not just an article about templates), with a `price: "0"` Offer. Relevant for search appearances and AI citations.

**TEMPLATE_META map:** A static lookup table mapping each slug to its keyword, category, and section list. This lives in the page file so it's easy to update when you add new templates.

---

### 6. `components/shared/json-ld.tsx` — Reusable schema component

A simple wrapper around a `<script type="application/ld+json">` tag. Used by the templates gallery, template detail pages, and the FAQ.

Why this component exists: inline `dangerouslySetInnerHTML` in every file that needs JSON-LD is repetitive and easy to break. One component, one place to update if the pattern ever changes.

---

### 7. `app/(main)/(landing)/_components/faq.tsx` — FAQ with FAQPage schema

**What it does:** Renders an accordion FAQ section on the homepage. Also outputs `FAQPage` JSON-LD schema with all four questions.

**Why it matters for SEO:** FAQPage schema is one of the few schema types that Google uses directly in search results — the questions can appear as expandable items beneath your listing, consuming more SERP real estate and increasing click-through rate. More importantly, AI systems (Google AI Overviews, Perplexity) pull FAQ content as direct answers. If someone asks "are Kairo UI templates free?", the FAQ schema is how your answer appears verbatim in the AI answer.

**The four questions chosen:**
1. "Are Kairo UI templates really free?" — addresses the primary objection/filter for this audience
2. "How do I install a Kairo UI template?" — the most common action question, also targets "shadcn template install" searches
3. "Which frameworks do Kairo UI templates support?" — qualification question, also targets Next.js version searches
4. "Can I use Kairo UI templates for client projects?" — addresses commercial use concern, common for freelancers

The FAQ section is placed before the CTA so it handles objections just before the conversion point.

---

### 8. `app/(main)/template/[slug]/opengraph-image.tsx` — Dynamic OG images

**What it does:** Auto-generates a 1200×630 OG image for each template detail page using Next.js `ImageResponse`. The image shows the template name, description, and "kairoui.online" branding on a dark background.

**Why it matters:** When someone shares a template page on Twitter, Slack, LinkedIn, or Discord, the link unfurls with this image. Without it, the fallback is whatever the browser captures — usually the generic site OG image or nothing. A distinct image per template makes shares more clickable and professional.

**Edge runtime:** The file uses `export const runtime = "edge"` which means the image is generated at the CDN edge, not on a Node.js server. Fast, free, no static file management.

**No static files needed:** The old metadata referenced `/og/template-<slug>.png` (which didn't exist). This approach generates images on demand — add a template to `TEMPLATES`, its OG image appears automatically.

---

### 9. `app/llms.txt/route.ts` — AI crawler manifest

**What it does:** Serves a plain-text file at `https://www.kairoui.online/llms.txt` describing the site in a structured format that AI crawlers understand.

**Why it matters:** Perplexity, ChatGPT Browse, and other AI systems crawl `llms.txt` specifically (similar to how `robots.txt` is a standard for traditional crawlers). The file tells them: what Kairo UI is, what templates exist with links, how to install them, and technical details. When these AI systems answer "what are good free Next.js templates?", sites with `llms.txt` have a better chance of being cited because the AI has explicit, structured context about the site rather than having to infer it from HTML.

The template list is dynamically generated from `TEMPLATES` so it always reflects the current state of the site.

---

## What this does NOT cover yet

The playbook identifies a second phase. These are not implemented and represent the next priority:

**Category hub pages** (`/templates/saas`, `/templates/ai`, `/templates/dark`)
- Each targets a broader keyword than individual templates
- Creates hub-and-spoke site architecture Google rewards
- Required to rank for terms like "free SaaS templates" without competing with your own template pages

**Blog/guide content**
- "How to install a Kairo UI template with the shadcn CLI" — high-intent, low competition
- "Best free Next.js templates 2026" — curation piece, gets shared
- These rank for terms that template pages alone can't capture

**More templates**
- Every new template = new indexable page = new keyword target
- The flywheel only accelerates with volume

---

## Tracking checklist

After deploying, do these in order:

1. **Submit sitemap** → Search Console → Sitemaps → `https://www.kairoui.online/sitemap.xml`
2. **Request indexing** → Search Console → URL Inspection → enter `/`, `/templates`, and one template detail URL → Request Indexing
3. **Check rich results** → [Rich Results Test](https://search.google.com/test/rich-results) → enter the homepage URL → verify FAQ schema is detected
4. **Verify llms.txt** → visit `https://www.kairoui.online/llms.txt` in browser — should return plain text
5. **Verify sitemap** → visit `https://www.kairoui.online/sitemap.xml` — should list all 7 URLs
6. **Verify robots.txt** → visit `https://www.kairoui.online/robots.txt` — should reference the sitemap

Then wait. SEO takes 3 months minimum:
- Month 1: Google discovers and indexes pages
- Month 2: You appear in results at positions 30–50
- Month 3: Movement toward page 2 for long-tail terms
- Month 4–6: Page 1 begins for targeted keywords

Don't change strategy week to week. Fix the foundation (done), publish content, build links, then wait.
