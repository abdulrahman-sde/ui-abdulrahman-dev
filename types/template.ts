export type TemplateColor = "mint" | "ink" | "amber" | "sky" | "rose";
export type TemplateVariant = "northwind" | "halcyon" | "atelier";
import type { StaticImageData } from "next/image";
export interface Template {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  color: TemplateColor;
  accent: string;
  description: string;
  featured?: boolean;
  components: number;
  downloads: string;
  /** Path relative to /public, e.g. "/previews/notio.jpg". 1280×800 (16/10). */
  thumbnail?: StaticImageData;
}
