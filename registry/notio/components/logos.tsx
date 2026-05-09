const LOGOS = [
  { name: "Notion",    letter: "N" },
  { name: "Framer",   letter: "F" },
  { name: "Webflow",  letter: "W" },
  { name: "Slack",    letter: "S" },
  { name: "Coinbase", letter: "C" },
  { name: "Uber",     letter: "U" },
  { name: "Loom",     letter: "L" },
];

export default function Logos() {
  return (
    <section className="border-t border-white/5 px-8 py-12 md:px-16">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-white/30">
        Your favorite companies are using us as partners
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {LOGOS.map((logo) => (
          <div key={logo.name} className="flex items-center gap-2 text-white/30 transition-colors hover:text-white/60">
            <div className="flex size-5 items-center justify-center rounded text-xs font-bold bg-white/10">
              {logo.letter}
            </div>
            <span className="text-sm font-medium">{logo.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
