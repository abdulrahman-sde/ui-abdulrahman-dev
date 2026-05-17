"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Circle } from "lucide-react";

const LINKS = ["Product", "Features", "Pricing", "Docs", "Changelog"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-black/60 border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2">
          <Circle size={18} className="text-white fill-white" />
          <span className="text-lg font-semibold tracking-tight">Aurora</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:inline-flex h-9 px-3 items-center text-sm text-white/70 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-white text-[#0a0a12] text-sm font-medium hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all"
          >
            Get started
            <ArrowRight size={14} />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden ml-1 w-9 h-9 grid place-items-center rounded-full border border-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-black/90 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="py-2 text-sm text-white/70"
                onClick={() => setOpen(false)}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
