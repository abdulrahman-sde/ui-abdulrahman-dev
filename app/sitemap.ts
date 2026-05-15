import { MetadataRoute } from "next";
import { TEMPLATES } from "@/constants/templates";

const BASE = "https://www.kairoui.online";

const SITE_UPDATED = new Date("2025-05-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: SITE_UPDATED,
    },
    {
      url: `${BASE}/templates`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: SITE_UPDATED,
    },
  ];

  const templateDetailPages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${BASE}/template/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: SITE_UPDATED,
  }));

  return [...staticPages, ...templateDetailPages];
}
