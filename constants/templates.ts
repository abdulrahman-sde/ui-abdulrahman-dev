import type { Template } from "@/types/template";
import nexoraThumbnail from "@/public/thumbnails/nexora.png";

export const TEMPLATES: Template[] = [
  {
    slug: "nexora",
    title: "Nexora",
    description:
      "An AI image generation landing page with hero, core features, how it works, pricing, and footer sections.",
    thumbnail: nexoraThumbnail,
  },
  {
    slug: "nova",
    title: "Nova",
    description:
      "A premium SaaS landing page with hero, features, content, pricing, and FAQ sections.",
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
