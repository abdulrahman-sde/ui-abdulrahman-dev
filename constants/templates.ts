import type { Template } from "@/types/template";
import nexoraThumbnail from "@/public/thumbnails/nexora.png";
export const TEMPLATES: Template[] = [
  {
    slug: "nexora",
    title: "Nexora",
    category: "SaaS",
    tags: ["Next.js", "Light", "Tailwind", "Open source"],
    color: "amber",
    accent: "oklch(66.5% 0.1804 47.04)",
    description:
      "An AI image generation landing page with hero, core features, how it works, pricing, and footer sections.",
    featured: true,
    components: 5,
    downloads: "1.2k",
    thumbnail: nexoraThumbnail,
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
