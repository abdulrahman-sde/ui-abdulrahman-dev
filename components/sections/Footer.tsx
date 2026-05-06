"use client";

const LINKS = {
  Templates: ["Landing Pages", "SaaS Dashboards", "Marketing", "Portfolios", "E-commerce", "All templates"],
  Resources: ["Documentation", "Changelog", "Blog", "Figma resources", "Discord community"],
  Legal: ["Terms of use", "Privacy policy", "License", "Refund policy"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid var(--border-lo)", background: "var(--bg-elevated)" }}>
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12">
          {/* Brand col */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2.5 w-fit">
              <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-[8px]" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-mid)" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true" style={{ color: "var(--text-primary)" }}>
                  <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="1" />
                  <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.35" />
                  <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.35" />
                  <rect x="13" y="13" width="8" height="8" rx="2" fill="#00bd7d" opacity="1" />
                </svg>
              </span>
              <span className="text-[18px] font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Framestack<span style={{ color: "#00bd7d" }}>.</span>
              </span>
            </a>

            <p className="text-[14px] leading-relaxed max-w-[240px]" style={{ color: "var(--text-secondary)" }}>
              Premium templates for builders who ship. Own what you buy.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { label: "Twitter/X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "GitHub", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-mid)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="text-[11px] font-bold uppercase tracking-label" style={{ color: "var(--text-tertiary)" }}>
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] font-medium transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-14 pt-7"
          style={{ borderTop: "1px solid var(--border-lo)" }}
        >
          <p className="text-[13px] font-medium" style={{ color: "var(--text-tertiary)" }}>
            &copy; {year} Framestack. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="live-dot" />
            <span className="text-[12px] font-medium" style={{ color: "var(--text-tertiary)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
