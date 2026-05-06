"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "200+",  label: "Production templates",   sub: "new every week" },
  { value: "48k",   label: "Projects shipped",        sub: "by real builders" },
  { value: "3.2k",  label: "Active customers",        sub: "and counting" },
  { value: "4.9★",  label: "Average rating",          sub: "across 1,200 reviews" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view"));
      },
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-sm" ref={ref}>
      <div className="container-site">
        <div className="divider mb-16" />

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-[20px]"
          style={{ border: "1px solid var(--border-lo)", background: "var(--border-lo)" }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`reveal reveal-d${i + 1} flex flex-col gap-2 p-8 md:p-10`}
              style={{ background: "var(--bg-surface)" }}
            >
              <span className="stat-num font-barlow" style={{ color: i === 0 ? "#00bd7d" : "var(--text-primary)" }}>
                {s.value}
              </span>
              <div>
                <p className="text-[14px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>{s.label}</p>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: "var(--text-tertiary)" }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider mt-16" />
      </div>
    </section>
  );
}
