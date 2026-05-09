export default function Hero() {
  return (
    <section className="flex justify-center px-5 pt-[100px] pb-20">
      <div className="w-full max-w-[1100px] text-center">
        <p className="mb-5 inline-block bg-[linear-gradient(90deg,#F5C344,#F28482,#B567C2)] bg-clip-text text-xs font-semibold uppercase tracking-[1px] text-transparent">
          Introducing Nexora
        </p>

        <h1 className="mx-auto mb-5 max-w-[800px] text-[3.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#0f172a] max-md:text-[2.5rem]">
          Create stunning visuals with{" "}
          <span className="bg-[linear-gradient(90deg,#F5C344,#F28482,#B567C2)] bg-clip-text text-transparent">
            AI-powered
          </span>{" "}
          precision
        </h1>

        <p className="mx-auto mb-10 max-w-[540px] text-lg leading-relaxed text-[#64748b]">
          From concept to creation in seconds. Nexora transforms your ideas into
          high-quality images with intelligent prompt assistance and a powerful
          generation engine.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 max-sm:flex-col">
          <button className="rounded-full bg-gradient-to-br from-[#F5C344] via-[#F28482] to-[#B567C2] px-8 py-3.5 text-[0.9rem] font-semibold tracking-[-0.01em] text-white shadow-[0_8px_24px_rgba(245,195,68,0.25)] max-sm:w-full">
            Start Creating Free
          </button>
          <button className="rounded-full border border-[#e2e8f0] bg-white px-8 py-3.5 text-[0.9rem] font-semibold tracking-[-0.01em] text-[#0f172a] max-sm:w-full">
            See How It Works
          </button>
        </div>

        {/* Visual card */}
        <div className="mx-auto mt-[60px] max-w-[1000px]">
          <div className="relative h-[580px] overflow-hidden rounded-3xl bg-[#F4F8F9] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] max-sm:h-60">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#F5C344_0%,#F28482_25%,#B567C2_50%,transparent_75%)] opacity-30" />
            {/* Mesh grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                maskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 70%)",
              }}
            />
            {/* Status label */}
            <div className="absolute bottom-7 left-7 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-[0.8rem] font-medium text-[#1e293b] shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              Ready to generate
            </div>
            {/* Version badge */}
            <div className="absolute right-7 top-7 rounded-full bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.5px] text-[#64748b] shadow-[0_4px_15px_rgba(0,0,0,0.06)]">
              Nexora v2.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
