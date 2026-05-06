"use client";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden bg-stone-950"
      aria-label="Hero"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Side labels */}
      <div className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3">
        <span
          className="tracking-label"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 10,
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.25em",
          }}
        >
          EST. 2024 — TEMPLATES FOR BUILDERS
        </span>
      </div>
      <div className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3">
        <span
          style={{
            writingMode: "vertical-rl",
            fontSize: 10,
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.25em",
          }}
        >
          DESIGN · BUILD · SHIP
        </span>
      </div>

      {/* Floating Nav */}
      <header className="absolute top-5 left-0 right-0 mx-auto z-30 rise rise-1 container-site">
        <nav className="nav-pill rounded-[18px] flex items-center justify-between pl-5 pr-2 py-2">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 pl-1 shrink-0">
            <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-100">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-stone-800"
                fill="none"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="1" />
                <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.4" />
                <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.4" />
                <rect x="13" y="13" width="8" height="8" rx="2" fill="#00bd7d" opacity="1" />
              </svg>
              <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-[#00bd7d] ring-2 ring-white" />
            </span>
            <span className="text-[20px] tracking-tight font-semibold text-stone-900 leading-none">
              Framestack<span style={{ color: "#00bd7d" }}>.</span>
            </span>
          </a>

          {/* Center menu */}
          <ul className="hidden md:flex items-center gap-1 text-[14px] font-medium text-stone-600">
            {["Templates", "Categories", "Pricing", "Changelog"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-full transition-colors hover:bg-stone-100 hover:text-stone-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTA */}
          <a href="#templates" className="btn-ember">
            <span className="leading-none">Browse Templates</span>
            <span className="icon-wrap">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </span>
          </a>
        </nav>
      </header>

      {/* Hero content — over video, keep white text */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pt-[160px] md:pt-[180px] pb-28 min-h-[100dvh]">
        {/* Eyebrow */}
        <div className="rise rise-2 eyebrow border-white/20 bg-white/10 text-white/80 mb-7">
          <span className="live-dot" />
          <span>200+ templates — new drops every week</span>
        </div>

        {/* Headline */}
        <h1 className="rise rise-2 text-white max-w-[1100px] leading-[0.93]">
          <span className="block font-medium tracking-tightest text-[68px] md:text-[90px] font-barlow">
            The template library
          </span>
          <span className="block font-serif-italic text-[60px] md:text-[100px] leading-[0.93] mt-1" style={{ color: "#fff" }}>
            built for shipping
          </span>
        </h1>

        {/* Subtext */}
        <p className="rise rise-3 mt-7 text-white/80 text-[18px] font-medium max-w-[560px] leading-relaxed">
          Production-ready landing pages, dashboards, and SaaS UIs.
          Own them forever — no subscriptions, no licensing hell.
        </p>

        {/* CTAs */}
        <div className="rise rise-4 mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#templates" className="btn-ember text-[15px]">
            <span>Browse all templates</span>
            <span className="icon-wrap">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </span>
          </a>
          <a
            href="#preview"
            className="inline-flex items-center gap-3 pl-2 pr-7 py-2 rounded-full text-[15px] font-medium text-white"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.20)",
              backdropFilter: "blur(12px)",
              transition: "background 0.3s, transform 0.3s",
            }}
          >
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 ml-0.5" fill="currentColor" aria-hidden="true">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </span>
            <span>Watch preview</span>
          </a>
        </div>
      </div>

      {/* Trusted-by marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 rise rise-5">
        <div className="px-6 pb-6">
          <div
            className="mx-auto rounded-[18px] overflow-hidden"
            style={{
              maxWidth: "min(1240px, 100%)",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <div className="flex items-center">
              <div className="hidden md:flex items-center gap-2 pl-5 pr-5 py-3 shrink-0" style={{ borderRight: "1px solid rgba(255,255,255,0.14)" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/70 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.39 6.95H22l-5.8 4.21L18.6 21 12 16.27 5.4 21l2.4-7.84L2 8.95h7.61L12 2z" />
                </svg>
                <span className="text-[11px] font-semibold uppercase tracking-label text-white/80">Trusted by 3,200+ builders</span>
              </div>

              <div className="relative flex-1 overflow-hidden py-3">
                <div className="marquee-track text-white/70 text-[13px] font-semibold uppercase tracking-label">
                  {["Notion", "Linear", "Figma", "Vercel", "Raycast", "Framer", "Loom", "Arc", "Notion", "Linear", "Figma", "Vercel", "Raycast", "Framer", "Loom", "Arc"].map((name, i) => (
                    <span key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 pr-5 pl-5 py-3 shrink-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.14)" }}>
                <span className="text-[28px] font-semibold tracking-tightest leading-none text-white">
                  48k<span style={{ color: "#00bd7d" }}>+</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-label text-white/60 leading-tight">
                  Templates<br />Deployed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
