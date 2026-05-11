import type { Template } from "@/types/template";
import nexoraThumbnail from "@/public/thumbnails/nexora.png";
import novaThumbnail from "@/public/thumbnails/nova.png";
import popcornThumbnail from "@/public/thumbnails/popcorn.png";
import glazeThumbnail from "@/public/thumbnails/glaze.png";
import orbitThumbnail from "@/public/thumbnails/orbit.png";
export const TEMPLATES: Template[] = [
  {
    slug: "nova",
    title: "Nova",
    description:
      "A premium SaaS landing page with hero, features, content, pricing, and FAQ sections.",
    color: "amber",
    accent: "hsl(38.6 92.1% 50.2%)",
    thumbnail: novaThumbnail,
  },
  {
    slug: "popcorn",
    title: "Popcorn",
    description:
      "A clean, modern landing page for global services with coverage map, features, and testimonials.",
    color: "amber",
    accent: "hsl(45 93% 47%)",
    thumbnail: popcornThumbnail,
  },
  {
    title: "Orbit",
    slug: "orbit",
    description:
      "Modern SaaS landing page template with global reach visualization.",
    color: "slate",
    accent: "neutral",
    thumbnail: orbitThumbnail,
  },
  {
    slug: "glaze",
    title: "Glaze",
    description:
      "A sleek, dark-themed landing page with glassmorphism effects.",
    color: "zinc",
    accent: "hsl(0 0% 100%)",
    thumbnail: glazeThumbnail,
  },

  {
    slug: "nexora",
    title: "Nexora",
    description:
      "An AI image generation landing page with hero, core features, how it works, pricing, and footer sections.",
    color: "mint",
    accent: "hsl(142.1 70.6% 45.3%)",
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
