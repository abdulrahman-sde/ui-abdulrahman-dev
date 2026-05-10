import type { StaticImageData } from "next/image";

export type TemplateColor = "mint" | "amber";
export type TemplateVariant = "northwind" | "halcyon" | "atelier";

export interface Template {
  slug: string;
  title: string;
  description: string;
  color: TemplateColor;
  accent: string;
  /** Path relative to /public, e.g. "/previews/notio.jpg". 1280×800 (16/10). */
  thumbnail?: StaticImageData;
}
