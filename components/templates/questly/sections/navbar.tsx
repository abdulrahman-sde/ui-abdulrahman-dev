"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./logo";

const NAV_LINKS = [
  { label: "Toolkit", icon: ChevronDown },
  { label: "Plans" },
  { label: "News" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="animate-fade-down relative z-20">
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 sm:py-5">
        <Logo className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href="#"
                className="flex items-center gap-1 text-[13px] text-gray-700 hover:text-gray-900 transition-all duration-300"
              >
                {link.label}
                {link.icon && <ChevronDown className="w-3.5 h-3.5" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:inline-flex bg-gray-900 text-white text-[13px] font-medium px-4 sm:px-5 py-2 rounded-full hover:bg-gray-800 active:scale-[0.97] transition-all duration-300"
          >
            Get started
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-900 hover:bg-gray-900/10 active:scale-95 transition-all duration-300"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-4 right-4 top-full rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-gray-200 px-5 py-3 animate-fade-up z-30">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  href="#"
                  className={`block text-[15px] text-gray-700 hover:text-gray-900 py-3 active:scale-[0.98] transition-all duration-200 ${
                    i < NAV_LINKS.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
