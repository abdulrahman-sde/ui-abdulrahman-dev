import type { TemplateMeta } from "@/types/registry";

export const meta: TemplateMeta = {
  name: "notio",
  title: "Notio",
  description: "A modern landing page template with a dark hero, product UI mockup, and partner logo wall.",
  dependencies: ["lucide-react", "motion", "next-themes"],
  registryDependencies: ["button"],
  cssVars: {
    light: {
      "--background": "oklch(0.08 0.01 260)",
      "--foreground": "oklch(0.96 0.005 260)",
      "--primary": "oklch(0.72 0.14 40)",
      "--primary-foreground": "oklch(0.08 0.01 260)",
      "--muted": "oklch(0.16 0.015 260)",
      "--muted-foreground": "oklch(0.65 0.02 260)",
      "--border": "oklch(0.22 0.02 260)",
      "--card": "oklch(0.12 0.015 260)",
      "--card-foreground": "oklch(0.96 0.005 260)",
    },
    dark: {
      "--background": "oklch(0.08 0.01 260)",
      "--foreground": "oklch(0.96 0.005 260)",
      "--primary": "oklch(0.72 0.14 40)",
      "--primary-foreground": "oklch(0.08 0.01 260)",
      "--muted": "oklch(0.16 0.015 260)",
      "--muted-foreground": "oklch(0.65 0.02 260)",
      "--border": "oklch(0.22 0.02 260)",
      "--card": "oklch(0.12 0.015 260)",
      "--card-foreground": "oklch(0.96 0.005 260)",
    },
  },
  fileTargets: {
    "page.tsx": "app/page.tsx",
    "globals.css": "app/notio-globals.css",
    "components/hero.tsx": "components/notio/hero.tsx",
    "components/logos.tsx": "components/notio/logos.tsx",
    "components/nav.tsx": "components/notio/nav.tsx",
  },
};
