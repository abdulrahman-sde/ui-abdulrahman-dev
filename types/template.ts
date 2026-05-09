export type TemplateColor = "mint" | "ink" | "amber" | "sky" | "rose";
export type TemplateVariant = "northwind" | "halcyon" | "atelier";

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
}
