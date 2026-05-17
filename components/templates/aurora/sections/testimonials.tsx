import { Star } from "lucide-react";
import { Reveal, Card, SectionHeader } from "@/components/templates/aurora/ui/primitives";

const QUOTES = [
  {
    q: "We shipped our v2 in eight weeks. Aurora deleted four internal tools we'd been propping up for years.",
    name: "Maya Chen",
    role: "Head of Platform · Halcyon",
  },
  {
    q: "The studio feels like a calm room. The team stopped context switching the day it landed.",
    name: "Idris Rao",
    role: "Co-founder · Northwind",
  },
  {
    q: "p95 dropped 4× without us doing anything. Pricing is honest. Support replies in minutes.",
    name: "Sofie Lindqvist",
    role: "Staff Eng · Lattice",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 lg:px-10 py-28 lg:py-32 bg-[oklch(0.04_0.004_240)]">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Loved by builders"
            title="Words from teams already shipping."
            subtitle="Real notes from product, platform, and infra leads using Aurora in production today."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-3">
          {QUOTES.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <Card hover className="p-7 h-full flex flex-col">
                <div className="flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={13} className="fill-white" />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-snug tracking-tight text-white/90">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <div className="mt-auto pt-8 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[oklch(0.13_0.005_240)] border border-white/10 grid place-items-center text-xs font-medium">
                    {t.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
