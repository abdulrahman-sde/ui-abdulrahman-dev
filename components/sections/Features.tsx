"use client";

import { useEffect, useRef } from "react";

const LEFT_FEATURES = [
  {
    title: "Production-grade code",
    body: "Every template is peer-reviewed, performance-tested, and ships with Lighthouse 95+ scores out of the box.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Lifetime updates",
    body: "Buy once, get all future updates for that template. We keep everything compatible with the latest framework releases.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    title: "Unlimited projects",
    body: "One purchase = unlimited commercial use. Build for clients, startups, side projects — no per-seat BS.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

const RIGHT_FEATURES = [
  {
    title: "Dark & light variants",
    body: "Every template ships with both modes. Properly built — not just `background: white` flipped.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" stroke="none" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Stack agnostic",
    body: "Next.js, React, Astro, plain HTML — we have every major stack covered with no rewrites needed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Component docs",
    body: "Each template comes with a short guide covering customization, props, and deployment gotchas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section" ref={ref}>
      <div className="container-site">
        {/* Asymmetric header */}
        <div
          className="reveal grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 mb-16 md:mb-20 items-end p-10 rounded-[28px]"
          style={{
            background: "linear-gradient(135deg, rgba(0,189,125,0.05) 0%, var(--bg-surface) 60%)",
            border: "1px solid rgba(0,189,125,0.12)",
          }}
        >
          <div>
            <span className="eyebrow eyebrow-ember mb-5">Why Framestack</span>
            <h2
              className="font-barlow font-semibold"
              style={{ fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--text-primary)" }}
            >
              Every detail
              <br />
              <span className="font-serif-italic" style={{ color: "#00bd7d" }}>
                obsessed over
              </span>
              <br />
              so you can move fast
            </h2>
          </div>

          <div className="flex flex-col gap-4 justify-end">
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We spend the hours on typography, spacing, and micro-interactions so you don&apos;t have to. You get the result; we ate the complexity.
            </p>
            <a href="#templates" className="btn-ember w-fit">
              <span>Explore library</span>
              <span className="icon-wrap">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="9 6 18 6 18 15" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Two-column feature list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left col */}
          <div className="flex flex-col gap-4">
            {LEFT_FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className={`reveal reveal-d${i + 1} flex gap-5 p-7 rounded-[20px] transition-colors duration-300`}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-lo)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span className="feature-icon mt-0.5">{feat.icon}</span>
                <div>
                  <h3 className="text-[16px] font-semibold mb-2 tracking-tight" style={{ color: "var(--text-primary)" }}>{feat.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{feat.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right col */}
          <div className="flex flex-col gap-4">
            {RIGHT_FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className={`reveal reveal-d${i + 2} flex gap-5 p-7 rounded-[20px] transition-colors duration-300`}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-lo)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span className="feature-icon mt-0.5">{feat.icon}</span>
                <div>
                  <h3 className="text-[16px] font-semibold mb-2 tracking-tight" style={{ color: "var(--text-primary)" }}>{feat.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{feat.body}</p>
                </div>
              </div>
            ))}

            {/* Mini banner */}
            <div
              className="reveal reveal-d4 flex items-center gap-4 p-6 rounded-[20px]"
              style={{
                background: "var(--ember-lo)",
                border: "1px solid rgba(0,189,125,0.16)",
              }}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#00bd7d" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <div>
                <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>Discord community</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  1,400+ builders. Share builds, get feedback, find collab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
