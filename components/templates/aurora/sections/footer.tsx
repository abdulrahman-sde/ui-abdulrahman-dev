import { Circle } from "lucide-react";

function IconX({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function IconGithub({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function IconLinkedin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const COLS = [
  {
    h: "Product",
    items: ["Studio", "Edge", "Data", "Workflows", "Auth", "Changelog"],
  },
  {
    h: "Company",
    items: ["About", "Customers", "Careers — 6", "Press", "Brand"],
  },
  {
    h: "Resources",
    items: ["Docs", "Guides", "API reference", "Status", "Security"],
  },
  { h: "Legal", items: ["Terms", "Privacy", "DPA", "Cookies", "SLAs"] },
];

export default function Footer() {
  return (
    <footer className="px-6 lg:px-10 pt-20 pb-10 bg-[oklch(0.04_0.004_240)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Circle size={22} className="text-white fill-white" />
              <span className="text-2xl font-semibold tracking-tight">
                Aurora
              </span>
            </div>
            <p className="mt-5 text-sm text-white/45 max-w-xs leading-relaxed">
              The studio for teams that ship faster than the brief.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
              >
                <IconX size={15} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
              >
                <IconGithub size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
              >
                <IconLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="text-xs uppercase tracking-[0.18em] text-white/40">
                {c.h}
              </h4>
              <ul className="mt-4 space-y-3">
                {c.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Aurora Studio, Inc. Designed in calm rooms.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
              All systems normal
            </span>
            <span>v4.2.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
