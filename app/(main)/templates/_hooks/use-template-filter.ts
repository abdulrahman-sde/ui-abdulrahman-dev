"use client";
import { useState, useMemo } from "react";
import { TEMPLATES } from "@/constants/templates";

export type Sort = "popular" | "newest" | "az";

export function useTemplateFilter() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<Sort>("popular");

  const filtered = useMemo(() => {
    let arr = TEMPLATES.filter((t) => {
      const matchesCat = cat === "All" || t.category === cat;
      const q = query.toLowerCase().trim();
      const matchesQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.tags.some((tg) => tg.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
    if (sort === "popular") arr = [...arr].sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
    if (sort === "newest") arr = [...arr].reverse();
    if (sort === "az") arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [query, cat, sort]);

  const clearFilters = () => { setQuery(""); setCat("All"); };

  return { query, setQuery, cat, setCat, sort, setSort, filtered, clearFilters };
}
