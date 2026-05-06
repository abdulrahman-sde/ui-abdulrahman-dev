"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" ref={ref}>
      <div className="container-site">
        <div
          className="reveal relative overflow-hidden rounded-[32px] p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #00bd7d 0%, #00a36b 100%)",
            boxShadow: "0 24px 64px rgba(0,189,125,0.20), 0 0 0 1px rgba(0,189,125,0.10)",
          }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-label mb-6"
              style={{ background: "rgba(0,0,0,0.16)", color: "rgba(255,255,255,0.92)" }}
            >
              <span className="live-dot" style={{ background: "#fff" }} />
              Limited launch pricing — ends soon
            </span>

            <h2
              className="font-barlow font-bold text-white mb-5"
              style={{ fontSize: "clamp(34px, 5vw, 64px)", letterSpacing: "-0.045em", lineHeight: 1.05 }}
            >
              Stop building from scratch.
              <br />
              <span className="font-serif-italic font-normal">Start shipping.</span>
            </h2>

            <p className="text-[17px] font-medium mb-10 mx-auto" style={{ color: "rgba(255,255,255,0.82)", maxWidth: 480 }}>
              200+ templates ready to deploy. Buy once, own forever. Your next project starts today.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[15px] font-bold text-[#00bd7d]"
                style={{
                  background: "#fff",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px rgba(0,0,0,0.26)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.18)";
                }}
              >
                Get Builder — $79 one-time
              </a>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white"
                style={{
                  background: "rgba(0,0,0,0.14)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Browse templates first
              </a>
            </div>

            <p className="mt-6 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
