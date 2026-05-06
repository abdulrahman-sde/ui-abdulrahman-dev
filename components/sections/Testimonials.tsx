"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "I cut my client onboarding from 3 weeks to 4 days. Framestack templates are the real thing — not 'almost there' like everything else I've tried.",
    author: "Nadia Eriksson",
    role: "Founder, Reframe Studio",
    avatar: "https://picsum.photos/seed/nadia-e/80/80",
  },
  {
    quote: "The SaaS dashboard template saved us $12k in design hours. Our investors asked who built the UI. We just said 'our team' — and technically, we didn't lie.",
    author: "Marcus Solberg",
    role: "CTO, Kove Analytics",
    avatar: "https://picsum.photos/seed/marcus-s/80/80",
  },
  {
    quote: "Every template I've bought shipped with genuinely clean code. Not 'clean for an AI-generated thing' — clean full stop. Rare.",
    author: "Priya Narayan",
    role: "Senior Engineer, Driftwork",
    avatar: "https://picsum.photos/seed/priya-n/80/80",
  },
  {
    quote: "I launched three client sites in one month using Framestack. The landing page template alone justified my entire subscription three times over.",
    author: "Theo Lindqvist",
    role: "Freelance Builder",
    avatar: "https://picsum.photos/seed/theo-l/80/80",
  },
  {
    quote: "Bought the portfolio template on a Tuesday, had client inquiries by Thursday. That's the only ROI metric that matters.",
    author: "Camille Moreau",
    role: "Product Designer",
    avatar: "https://picsum.photos/seed/camille-m/80/80",
  },
  {
    quote: "The code quality is embarrassingly good. I expected to spend an afternoon refactoring. I spent 20 minutes customizing and shipped by lunch.",
    author: "Soren Bakke",
    role: "Indie Hacker",
    avatar: "https://picsum.photos/seed/soren-b/80/80",
  },
  {
    quote: "Switched from another template library and never looked back. The dark/light variants alone are worth double the price.",
    author: "Anaya Osei",
    role: "Frontend Lead, Vessel",
    avatar: "https://picsum.photos/seed/anaya-o/80/80",
  },
  {
    quote: "As a non-developer, I was skeptical. The templates are that good that even I could customize them. That says everything.",
    author: "Jasper Reid",
    role: "Product Manager, Lumio",
    avatar: "https://picsum.photos/seed/jasper-r/80/80",
  },
];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      className="flex flex-col gap-5 p-6 rounded-[20px] shrink-0 w-[320px] md:w-[360px]"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-lo)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#00bd7d" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      <blockquote className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: "1px solid var(--border-lo)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.avatar}
          alt={t.author}
          className="w-9 h-9 rounded-full object-cover"
          style={{ border: "1px solid var(--border-mid)" }}
        />
        <div>
          <p className="text-[13px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>{t.author}</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4);

  return (
    <section id="testimonial" className="section overflow-hidden" ref={ref} style={{ background: "var(--bg-elevated)" }}>
      <div className="container-site mb-14">
        <div className="reveal text-center">
          <span className="eyebrow eyebrow-ember mb-5">Social proof</span>
          <h2
            className="font-barlow font-semibold"
            style={{ fontSize: "clamp(32px, 4.5vw, 54px)", letterSpacing: "-0.04em", lineHeight: 1.08, color: "var(--text-primary)" }}
          >
            Builders who ship{" "}
            <span className="font-serif-italic" style={{ color: "#00bd7d" }}>
              trust Framestack
            </span>
          </h2>
          <p className="mt-4 text-[16px] mx-auto" style={{ color: "var(--text-secondary)", maxWidth: 480 }}>
            1,200+ verified reviews. Real teams, real projects, real results.
          </p>
        </div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex gap-4" style={{ animation: "marquee 50s linear infinite" }}>
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4" style={{ animation: "marquee-rev 45s linear infinite" }}>
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
