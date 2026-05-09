export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-8 pt-24 pb-16 md:px-16">
      {/* Warm amber-to-dark radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, oklch(0.48 0.14 40 / 0.55) 0%, oklch(0.22 0.06 30 / 0.4) 45%, oklch(0.08 0.01 260) 75%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          Never Forget Another Call
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/60">
          Record, transcribe, and take notes on your conversations — all in
          real-time. Turn every call into searchable, shareable insights.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
        >
          Start for free
        </a>
      </div>

      {/* Phone mockup — floats right side */}
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 md:block">
        <PhoneMockup />
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl"
      style={{
        width: 220,
        background: "oklch(0.12 0.015 260)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[10px] font-medium text-white/70">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-3 rounded-sm bg-white/50" />
          <div className="h-2 w-3 rounded-sm bg-white/50" />
          <div className="h-2 w-5 rounded-sm bg-white/70" />
        </div>
      </div>

      {/* Card */}
      <div
        className="mx-3 mb-3 flex flex-col rounded-2xl p-4"
        style={{ background: "oklch(0.16 0.015 260)" }}
      >
        <p className="text-[11px] font-medium text-white/50">Call with Joanne</p>
        <p className="mt-2 text-sm font-medium text-white">Write notes here.</p>
        <p className="mt-1 text-xs text-white/40 leading-relaxed">
          Notio will keep transcribing even after your phone locks.
        </p>

        {/* Timer */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 animate-pulse rounded-full bg-red-400" />
            <span className="font-mono text-xs text-white/40">00:19</span>
          </div>

          {/* Stop button */}
          <button className="flex size-10 items-center justify-center rounded-full bg-white/10">
            <div className="size-3.5 rounded-sm bg-white" />
          </button>

          {/* Waveform bars */}
          <div className="flex items-end gap-0.5 h-6">
            {[3, 6, 10, 8, 5, 12, 9, 7, 4, 10, 6, 8, 5, 11, 7].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-white/30"
                style={{ height: h * 1.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
