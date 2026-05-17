import { Check } from "lucide-react";
import {
  Reveal,
  Card,
  SectionHeader,
} from "@/components/templates/aurora/ui/primitives";

const TIERS = [
  {
    name: "Hobby",
    price: "$0",
    period: "forever",
    blurb: "Everything to ship your weekend project.",
    cta: "Start free",
    popular: false,
    features: [
      "1 workspace",
      "3 projects",
      "Community support",
      "Aurora-branded domain",
    ],
  },
  {
    name: "Studio",
    price: "$24",
    period: "per seat / month",
    blurb: "For teams shipping production software, daily.",
    cta: "Start 14-day trial",
    popular: true,
    features: [
      "Unlimited projects",
      "Edge & data primitives",
      "SOC 2 Type II",
      "Priority support",
      "Audit log + SSO",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "from $2k / mo",
    blurb: "Residency, procurement, and a TAM who answers fast.",
    cta: "Talk to sales",
    popular: false,
    features: [
      "14 region residency",
      "Customer-managed keys",
      "SLA 99.99%",
      "Dedicated TAM",
      "On-prem connectors",
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative px-6 lg:px-10 py-28 lg:py-32 bg-[oklch(0.04_0.004_240)] aurora-glow"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Pricing"
            title="Honest, usage-aware, no surprises."
            subtitle="Pay for what you ship, not what you forecast. Switch tiers — or down — whenever you want."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <Card
                hover
                className={`p-8 h-full flex flex-col ${t.popular ? "aurora-pricing-featured" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium tracking-tight text-white"
                  >
                    {t.name}
                  </span>
                  {t.popular && (
                    <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[#a78bfa]">
                      Most popular
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-5xl font-medium tracking-tight">
                    {t.price}
                  </span>
                  <span
                    className="pb-2 text-xs text-white/40"
                  >
                    {t.period}
                  </span>
                </div>

                <p
                  className="mt-3 text-sm text-white/55"
                >
                  {t.blurb}
                </p>

                <button
                  className={`mt-7 h-10 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                    t.popular
                      ? "bg-white text-[#0a0a12] hover:opacity-90"
                      : "bg-white/[0.03] text-white border border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  {t.cta}
                </button>

                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 text-white"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
