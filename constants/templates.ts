import type { Template } from "@/types/template";

export const templates: Template[] = [
  {
    slug: "saas-minimal",
    title: "SaaS Minimal",
    description:
      "Clean, minimal SaaS landing page with hero, features, pricing, and CTA sections. Built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind CSS", "SaaS"],
    previewImage: "/previews/saas-minimal.png",
    githubUrl: "https://github.com/abdulrahman-sde/ui-templates/tree/main/saas-minimal",
    featured: true,
  },
  {
    slug: "agency-dark",
    title: "Agency Dark",
    description:
      "Bold dark-mode agency landing page with smooth scroll animations and a modern grid layout.",
    tags: ["Next.js", "Tailwind CSS", "Agency"],
    previewImage: "/previews/agency-dark.png",
    githubUrl: "https://github.com/abdulrahman-sde/ui-templates/tree/main/agency-dark",
    featured: true,
  },
  {
    slug: "portfolio-simple",
    title: "Portfolio Simple",
    description:
      "Minimal developer portfolio template with a clean typographic hierarchy and subtle animations.",
    tags: ["Next.js", "Tailwind CSS", "Portfolio"],
    previewImage: "/previews/portfolio-simple.png",
    githubUrl: "https://github.com/abdulrahman-sde/ui-templates/tree/main/portfolio-simple",
    featured: false,
  },
];
