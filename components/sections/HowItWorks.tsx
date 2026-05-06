"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Browse the library",
    body: "Filter by category, stack, or vibe. Every template has a live preview — what you see is exactly what you get.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "One-click download",
    body: "Get the full source — React, Next.js, HTML, or Framer. Clean code, no locks, no attribution required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Make it yours",
    body: "Swap colors, fonts, and copy in minutes. Templates are built to be customized, not fought against.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Ship in hours",
    body: "Deploy to Vercel, Netlify, or your own infra. Production-ready out of the box — performance and SEO baked in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" className="section" ref={ref} style={{ background: "var(--bg-elevated)" }}>
      <div className="container-site">
        {/* Split header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-20">
          <div className="reveal">
            <span className="eyebrow eyebrow-ember mb-5">How it works</span>
            <h2
              className="font-barlow font-semibold"
              style={{ fontSize: "clamp(34px, 4.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.08, color: "var(--text-primary)" }}
            >
              From browse to
              <br />
              <span className="font-serif-italic" style={{ color: "#00bd7d" }}>shipped in one afternoon</span>
            </h2>
          </div>

          <div className="reveal reveal-d2 flex flex-col justify-end">
            <p className="text-[16px] leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: 400 }}>
              Framestack removes everything that slows you down — no licensing confusion, no locked components, no generic starter kits that take days to undo.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-d${i + 1} relative bezel`}
            >
              <div className="bezel-core p-7 flex flex-col gap-5 h-full">
                {/* Number + Icon */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-[11px] font-bold tracking-label"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {step.num}
                  </span>
                  <span className="feature-icon">
                    {step.icon}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                  <h3 className="text-[17px] font-semibold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.body}
                  </p>
                </div>

                {/* Step connector indicator */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-2 z-20"
                    style={{ transform: "translateY(-50%)" }}
                  >
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                      <circle cx="8" cy="8" r="3" fill="#00bd7d" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
