const LOGOS = [
  "VANTA",
  "MONOLITH",
  "OBSIDIAN",
  "HALCYON",
  "PARALLAX",
  "NORTHWIND",
  "QUARTZ",
  "SUMMIT",
  "AETHER",
  "LATTICE",
  "PRISM",
  "ATLAS·CO",
];

export default function LogoCloud() {
  const reel = [...LOGOS, ...LOGOS];

  return (
    <section className="py-16 lg:py-20 border-y border-white/[0.06] bg-[oklch(0.04_0.004_240)]">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-white/40 px-6">
          Powering product teams at category-defining companies
        </p>
        <div className="mt-8 aurora-no-scrollbar overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="aurora-marquee flex items-center gap-14 whitespace-nowrap">
            {reel.map((name, i) => (
              <span
                key={i}
                className="text-2xl lg:text-3xl font-medium tracking-[0.04em] text-white/30 aurora-logo-hover transition-colors select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
