import type { Template } from "@/types/template";

export const TEMPLATES: Template[] = [
  { slug: "notio", title: "Notio", category: "Mobile App", tags: ["Next.js", "Dark", "Tailwind"], color: "amber", accent: "oklch(0.72 0.14 40)", description: "A modern landing page with a dark warm hero, call transcription mockup, and partner logo wall.", featured: true, components: 5, downloads: "1.2k" },
  { slug: "northwind", title: "Northwind", category: "SaaS", tags: ["Next.js", "Tailwind", "Dark mode"], color: "mint", accent: "oklch(0.85 0.16 159)", description: "A confident SaaS hero with floating product UI, three-tier pricing, and a feature carousel.", featured: true, components: 24, downloads: "3.4k" },
  { slug: "atelier", title: "Atelier", category: "Portfolio", tags: ["Astro", "Serif", "Editorial"], color: "ink", accent: "oklch(0.45 0.05 270)", description: "An editorial portfolio template with serif display type, large case studies, and a soft grid.", components: 18, downloads: "2.1k" },
  { slug: "halcyon", title: "Halcyon", category: "Agency", tags: ["Next.js", "Motion", "Bento"], color: "amber", accent: "oklch(0.78 0.16 65)", description: "Agency landing with a bento services grid, scroll-driven case study reels, and a bold marquee.", featured: true, components: 32, downloads: "5.8k" },
  { slug: "echo", title: "Echo", category: "Mobile App", tags: ["Tailwind", "iOS frame", "Compact"], color: "sky", accent: "oklch(0.78 0.13 230)", description: "App landing with iPhone hero, a feature pinwheel, and an App Store-flavored CTA.", components: 21, downloads: "1.9k" },
  { slug: "rsvp", title: "RSVP", category: "Waitlist", tags: ["Single page", "Form-first"], color: "rose", accent: "oklch(0.72 0.18 12)", description: "A focused waitlist page with avatar stack social proof and a single email field.", components: 9, downloads: "4.2k" },
  { slug: "longform", title: "Longform", category: "Blog", tags: ["MDX", "Lora", "Reading"], color: "ink", accent: "oklch(0.4 0.04 80)", description: "Long-read blog template with chapter navigation, footnotes, and a minimal author rail.", components: 14, downloads: "1.3k" },
  { slug: "drift", title: "Drift", category: "SaaS", tags: ["Tailwind", "Mint", "Bento"], color: "mint", accent: "oklch(0.85 0.16 159)", description: "A clean B2B page with a soft mint palette, FAQ accordion, and customer-logo wall.", components: 27, downloads: "2.7k" },
  { slug: "kiosk", title: "Kiosk", category: "E-commerce", tags: ["Next.js", "Product"], color: "ink", accent: "oklch(0.2 0 0)", description: "Single-product landing with a sticky buy bar and a vertically scrolling story.", components: 19, downloads: "1.1k" },
  { slug: "salon", title: "Salon", category: "Local business", tags: ["Booking", "Calendar"], color: "rose", accent: "oklch(0.78 0.12 25)", description: "Booking-focused landing with hours, gallery, and a calendar-style availability widget.", components: 15, downloads: "640" },
  { slug: "mono", title: "Mono", category: "Open source", tags: ["Docs", "Mono", "Minimal"], color: "ink", accent: "oklch(0.3 0 0)", description: "An open-source project landing with a code-first hero and integrated docs preview.", featured: true, components: 22, downloads: "3.0k" },
  { slug: "lumen", title: "Lumen", category: "Newsletter", tags: ["Sub form", "Beehiiv"], color: "amber", accent: "oklch(0.85 0.13 80)", description: "Newsletter landing with issue archive, sponsor slot, and inline subscribe.", components: 12, downloads: "1.6k" },
  { slug: "summit", title: "Summit", category: "Event", tags: ["Schedule", "Speakers"], color: "sky", accent: "oklch(0.55 0.16 240)", description: "Conference landing with a speaker grid, multi-track schedule, and ticket tiers.", components: 26, downloads: "880" },
];

export const TEMPLATE_CATEGORIES = [
  "All",
  "SaaS",
  "Portfolio",
  "Agency",
  "Mobile App",
  "Waitlist",
  "Blog",
  "E-commerce",
  "Open source",
  "Newsletter",
  "Event",
  "Local business",
] as const;
