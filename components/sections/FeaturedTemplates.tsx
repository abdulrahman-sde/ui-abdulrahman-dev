"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const CATEGORIES = ["All", "Landing Page", "SaaS Dashboard", "Marketing", "Portfolio", "E-commerce"];

const TEMPLATES = [
  {
    id: 1,
    title: "Obsidian SaaS",
    category: "SaaS Dashboard",
    tag: "Popular",
    price: "$49",
    img: "https://picsum.photos/seed/tmpl-obsidian/800/560",
    wide: true,
  },
  {
    id: 2,
    title: "Helio Landing",
    category: "Landing Page",
    tag: "New",
    price: "$39",
    img: "https://picsum.photos/seed/tmpl-helio/800/560",
    wide: false,
  },
  {
    id: 3,
    title: "Vault Portfolio",
    category: "Portfolio",
    tag: "",
    price: "$29",
    img: "https://picsum.photos/seed/tmpl-vault/800/560",
    wide: false,
  },
  {
    id: 4,
    title: "Meridian Marketing",
    category: "Marketing",
    tag: "Trending",
    price: "$45",
    img: "https://picsum.photos/seed/tmpl-meridian/800/560",
    wide: false,
  },
  {
    id: 5,
    title: "Construct E-com",
    category: "E-commerce",
    tag: "",
    price: "$59",
    img: "https://picsum.photos/seed/tmpl-construct/800/560",
    wide: false,
  },
  {
    id: 6,
    title: "Sable Analytics",
    category: "SaaS Dashboard",
    tag: "New",
    price: "$55",
    img: "https://picsum.photos/seed/tmpl-sable/800/560",
    wide: true,
  },
];

export default function FeaturedTemplates() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="templates" className="section" ref={sectionRef}>
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="reveal">
            <span className="eyebrow eyebrow-ember mb-4">Templates</span>
            <h2
              className="font-barlow font-semibold"
              style={{ fontSize: "clamp(36px, 5vw, 58px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--text-primary)" }}
            >
              Every template is a{" "}
              <span className="font-serif-italic" style={{ color: "#00bd7d" }}>
                production asset
              </span>
            </h2>
          </div>
          <p className="reveal reveal-d2 text-[16px] max-w-[340px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Not prototypes. Every template ships with clean code, responsive layouts, and zero bloat.
          </p>
        </div>

        {/* Category Filter */}
        <div className="reveal reveal-d2 flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer`}
              style={
                i === 0
                  ? { background: "#00bd7d", border: "1px solid transparent", color: "#fff" }
                  : { background: "transparent", border: "1px solid var(--border-mid)", color: "var(--text-secondary)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {TEMPLATES.map((tmpl, i) => (
            <div
              key={tmpl.id}
              className={`reveal reveal-d${Math.min(i + 1, 5)} tmpl-card ${
                tmpl.wide ? "md:col-span-7" : "md:col-span-5"
              }`}
              style={{ aspectRatio: tmpl.wide ? "16/9" : "4/3" }}
            >
              <Image
                src={tmpl.img}
                alt={tmpl.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />

              {/* Tag */}
              {tmpl.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-label"
                    style={{ background: "#00bd7d", color: "#fff" }}
                  >
                    {tmpl.tag}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="tmpl-card-overlay z-10">
                <div className="flex items-end justify-between w-full">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-label mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {tmpl.category}
                    </p>
                    <h3 className="text-[18px] font-semibold text-white tracking-tight">
                      {tmpl.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[20px] font-bold text-white tracking-tightest">
                      {tmpl.price}
                    </span>
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "#00bd7d" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="6" y1="18" x2="18" y2="6" />
                        <polyline points="9 6 18 6 18 15" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="reveal reveal-d4 flex justify-center mt-12">
          <a href="#" className="btn-outline">
            View all 200+ templates
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
