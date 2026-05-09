import type { TemplateMeta } from "@/types/registry";

export const meta: TemplateMeta = {
  name: "launchui",
  title: "Launch UI",
  description:
    "A full landing page template with hero, logos, feature grid, stats, pricing, FAQ, CTA, and footer. Built with React, Shadcn/ui and Tailwind.",
  dependencies: [
    "lucide-react",
    "class-variance-authority",
    "@radix-ui/react-slot",
    "@radix-ui/react-accordion",
    "@radix-ui/react-dialog",
    "tw-animate-css",
  ],
  registryDependencies: [],
  cssVars: {
    light: {
      "--background": "oklch(97.65% 0.001 17.18)",
      "--foreground": "oklch(0.141 0.005 285.823)",
      "--primary": "oklch(66.5% 0.1804 47.04)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.967 0.001 286.375)",
      "--muted-foreground": "oklch(0.552 0.016 285.938)",
      "--border": "oklch(0.92 0.004 286.32)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.141 0.005 285.823)",
    },
    dark: {
      "--background": "oklch(0.141 0.005 285.823)",
      "--foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(66.5% 0.1804 47.04)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.274 0.006 286.033)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--border": "oklch(0.274 0.006 286.033)",
      "--card": "oklch(0.141 0.005 285.823)",
      "--card-foreground": "oklch(0.985 0 0)",
    },
  },
};
