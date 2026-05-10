import type { Template } from "@/types/template";
import nexoraThumbnail from "@/public/thumbnails/nexora.png";
import novaThumbnail from "@/public/thumbnails/nova.png";

export const TEMPLATES: Template[] = [
  {
    slug: "nexora",
    title: "Nexora",
    description:
      "An AI image generation landing page with hero, core features, how it works, pricing, and footer sections.",
    color: "mint",
    accent: "hsl(142.1 70.6% 45.3%)",
    thumbnail: nexoraThumbnail,
  },
  {
    slug: "nova",
    title: "Nova",
    description:
      "A premium SaaS landing page with hero, features, content, pricing, and FAQ sections.",
    color: "amber",
    accent: "hsl(38.6 92.1% 50.2%)",
    thumbnail: novaThumbnail,
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
