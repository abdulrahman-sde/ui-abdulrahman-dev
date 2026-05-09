const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "API Docs", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Tutorials", "Blog", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press"],
  },
] as const;

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-[#e2e8f0] px-5 pb-10 pt-[60px]">
      <div className="w-full max-w-[1100px]">
        {/* Top grid */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="mb-3 text-xl font-semibold text-[#0f172a]">Nexora</p>
            <p className="max-w-[280px] text-[0.85rem] leading-relaxed text-[#64748b]">
              AI-powered image generation that turns your ideas into stunning
              visuals. Fast, intuitive, and built for creators.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.8px] text-[#94a3b8]">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[0.85rem] text-[#475569]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e2e8f0] pt-6 sm:flex-row">
          <p className="text-[0.8rem] text-[#94a3b8]">
            &copy; {new Date().getFullYear()} Nexora. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[0.8rem] text-[#94a3b8]">
              Privacy
            </a>
            <a href="#" className="text-[0.8rem] text-[#94a3b8]">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
