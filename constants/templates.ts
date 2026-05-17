import type { Template } from "@/types/template";
import nexoraThumbnail from "@/public/thumbnails/nexora.webp";
import novaThumbnail from "@/public/thumbnails/nova.webp";
import popcornThumbnail from "@/public/thumbnails/popcorn.webp";
import glazeThumbnail from "@/public/thumbnails/glaze.webp";
import orbitThumbnail from "@/public/thumbnails/orbit.webp";
import xeroThumbnail from "@/public/thumbnails/xero.png";
import auroraThumbnail from "@/public/thumbnails/aurora.png";
import luminaThumbnail from "@/public/thumbnails/lumina.png";
import nextoThumbnail from "@/public/thumbnails/nexto.png";

export const TEMPLATES: Template[] = [
  {
    slug: "nexto",
    title: "Nexto",
    description:
      "A studio agency landing page with hero, logos strip, services grid, showcase, stats, process steps, testimonial, CTA, and footer.",
    color: "purple",
    accent: "hsl(248 82% 69%)",
    thumbnail: nextoThumbnail,
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
    slug: "xero",
    title: "Xero",
    description:
      "A dark SaaS landing page for a data encryption platform with animated beam hero, features, showcase, pricing, FAQ, and testimonials.",
    color: "purple",
    accent: "hsl(290 40% 72%)",
    thumbnail: xeroThumbnail,
  },
  {
    slug: "lumina",
    title: "Lumina",
    description:
      "A white + indigo SaaS automation landing page with frosted-glass dashboard preview, logo marquee, features grid, agent feed, stats, testimonials, pricing, FAQ, and footer.",
    color: "indigo",
    accent: "hsl(239 84% 67%)",
    thumbnail: luminaThumbnail,
  },
  {
    slug: "aurora",
    title: "Aurora",
    description:
      "A premium dark-mode SaaS landing page with video hero, marquee logo cloud, feature grid, how-it-works steps, studio showcase, testimonials, and pricing.",
    color: "zinc",
    accent: "hsl(0 0% 100%)",
    thumbnail: auroraThumbnail,
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
