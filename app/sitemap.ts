import { MetadataRoute } from "next";
import { TEMPLATES } from "@/constants/templates";

const BASE = "https://www.kairoui.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${BASE}/templates`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  const templateDetailPages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${BASE}/template/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [...staticPages, ...templateDetailPages];
}
