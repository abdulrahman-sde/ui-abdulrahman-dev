"use client";

import { useEffect, useRef } from "react";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Explore the library. 5 free templates, no card required.",
    features: [
      "5 free templates",
      "Next.js + React source",
      "Community support",
      "Basic documentation",
    ],
    cta: "Get started free",
    featured: false,
  },
  {
    name: "Builder",
    price: "$79",
    period: "one-time",
    desc: "Everything you need to ship client work and side projects at speed.",
    features: [
      "All 200+ templates",
      "Lifetime updates",
      "Unlimited projects",
      "Commercial license",
      "Dark + light variants",
      "Priority support",
    ],
    cta: "Get Builder",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Agency",
    price: "$199",
    period: "one-time",
    desc: "Multi-seat access for teams building at volume. One purchase, five seats.",
    features: [
      "Everything in Builder",
      "5 team seats",
      "White-label rights",
      "Early access to new drops",
      "Slack community access",
      "Dedicated support",
    ],
    cta: "Get Agency",
    featured: false,
  },
];

export default function Pricing() {
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
    <section id="pricing" className="section" ref={ref}>
      <div className="container-site">
        {/* Header */}
        <div className="reveal text-center mb-14 md:mb-16">
          <span className="eyebrow eyebrow-ember mb-5">Pricing</span>
          <h2
            className="font-barlow font-semibold"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-0.04em", lineHeight: 1.06, color: "var(--text-primary)" }}
          >
            One price.{" "}
            <span className="font-serif-italic" style={{ color: "#00bd7d" }}>
              Everything yours.
            </span>
          </h2>
          <p className="mt-4 text-[16px] mx-auto" style={{ color: "var(--text-secondary)", maxWidth: 440 }}>
            No subscriptions. No per-project licensing. No surprise fees. Buy once, own forever.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal reveal-d${i + 1} pricing-card ${plan.featured ? "featured" : ""} relative`}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-label"
                    style={{ background: "#00bd7d", color: "#fff" }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-label mb-3" style={{ color: "var(--text-tertiary)" }}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-barlow font-bold"
                    style={{ fontSize: "clamp(40px, 5vw, 56px)", letterSpacing: "-0.05em", color: plan.featured ? "#00bd7d" : "var(--text-primary)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[13px] font-medium" style={{ color: "var(--text-tertiary)" }}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-[14px] mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {plan.desc}
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-[14px]" style={{ color: "var(--text-secondary)" }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ember-mid)", color: "#00bd7d" }}>
                      <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.featured ? (
                <a href="#" className="btn-ember justify-center">
                  <span>{plan.cta}</span>
                  <span className="icon-wrap">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="18" x2="18" y2="6" />
                      <polyline points="9 6 18 6 18 15" />
                    </svg>
                  </span>
                </a>
              ) : (
                <a href="#" className="btn-outline justify-center">
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Reassurance row */}
        <div className="reveal reveal-d4 flex flex-wrap justify-center gap-6 mt-12">
          {["30-day refund guarantee", "No recurring charges", "Instant download", "MIT-style license"].map((item) => (
            <span key={item} className="flex items-center gap-2 text-[13px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#00bd7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
