import type { Template } from "@/types/template";
import launchuiThumbnail from "@/public/thumbnails/notio.png";
export const TEMPLATES: Template[] = [
  {
    slug: "launchui",
    title: "Launch UI",
    category: "SaaS",
    tags: ["Next.js", "Light/Dark", "Tailwind", "Open source"],
    color: "amber",
    accent: "oklch(66.5% 0.1804 47.04)",
    description:
      "A full landing page template with hero, logos, feature grid, stats, pricing, FAQ, CTA, and footer.",
    featured: true,
    components: 9,
    downloads: "2.1k",
    thumbnail: launchuiThumbnail,
  },
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
