export default function CoreFeatures() {
  return (
    <section className="flex justify-center px-5 py-20">
      <div className="w-full max-w-[1100px] text-center">
        {/* Header */}
        <p className="mb-4 inline-block bg-[linear-gradient(90deg,var(--color-nexora-yellow),var(--color-nexora-red),var(--color-nexora-purple-dark))] bg-clip-text text-[0.75rem] font-semibold uppercase tracking-[1px] text-transparent">
          Core Features
        </p>
        <h2 className="mb-3 text-[2.75rem] font-medium tracking-[-0.02em] text-nexora-slate-900 max-md:text-4xl">
          Built for Speed &amp; Quality
        </h2>
        <p className="mb-[50px] text-lg leading-normal text-nexora-slate-500">
          Everything you need to go
          <br />
          from idea to image
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* ── Card 1: Smart Prompt Suggestions ── */}
          <div className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-nexora-bg-light bg-[radial-gradient(circle_at_50%_0%,var(--color-nexora-orange)_0%,var(--color-nexora-yellow-light)_30%,var(--color-nexora-bg-light)_60%,var(--color-nexora-bg-light)_100%)] text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div className="absolute left-6 right-6 top-[30px] z-10 rounded-xl bg-white p-4 text-[0.8rem] leading-relaxed text-nexora-slate-600 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              A bright, high-resolution 3D illustration of a{" "}
              <span className="bg-[linear-gradient(90deg,var(--color-nexora-orange),var(--color-nexora-purple-light))] bg-clip-text font-semibold text-transparent">
                cheerful cartoon
              </span>{" "}
              of a{" "}
              <span className="bg-[linear-gradient(90deg,var(--color-nexora-orange),var(--color-nexora-purple-light))] bg-clip-text font-semibold text-transparent">
                girl character
              </span>{" "}
              <span className="bg-[linear-gradient(90deg,var(--color-nexora-orange),var(--color-nexora-purple-light))] bg-clip-text font-semibold text-transparent">
                centred against a
              </span>{" "}
              smooth blue background
            </div>

            <div className="absolute left-10 top-[180px] z-10 flex items-center gap-1.5 rounded-full border border-black bg-white px-3.5 py-1.5 text-[0.75rem] font-semibold text-nexora-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
              <span className="text-base text-nexora-purple-500">✦</span>
              Add more details
            </div>

            {/* Cursor SVG */}
            <svg
              className="absolute left-[110px] top-[205px] z-20 h-6 w-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="1"
            >
              <path d="M4 2L20 11L11 13L9 22L4 2Z" />
            </svg>

            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-nexora-slate-800">
              Smart Prompt Suggestions
            </h3>
          </div>

          {/* ── Card 2: API Access ── */}
          <div className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-nexora-bg-light bg-[radial-gradient(circle_at_50%_0%,var(--color-nexora-purple-light)_0%,var(--color-nexora-pink)_30%,var(--color-nexora-bg-light)_60%,var(--color-nexora-bg-light)_100%)] text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div className="absolute bottom-[70px] left-0 right-0 top-0 flex items-center justify-center px-6">
              <img
                className="mt-5 h-[180px] w-full object-contain"
                src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg"
                alt="API network diagram"
              />
            </div>
            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-nexora-slate-800">
              API Access
            </h3>
          </div>

          {/* ── Card 3: Project Library ── */}
          <div className="relative flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] bg-nexora-bg-light bg-[radial-gradient(circle_at_50%_0%,var(--color-nexora-yellow-light)_0%,var(--color-nexora-purple-light)_30%,var(--color-nexora-bg-light)_60%,var(--color-nexora-bg-light)_100%)] text-left shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(circle_at_center_top,black_0%,transparent_80%)]" />
            <img
              className="absolute left-1/2 top-[50px] z-10 w-[170px] -translate-x-1/2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)]"
              src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg"
              alt="Folder icon"
            />
            <div className="absolute left-1/2 top-[220px] z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-black bg-white px-[18px] py-1.5 text-[0.75rem] font-medium text-nexora-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
              <svg
                className="h-[14px] w-[14px] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-nexora-slate-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search in library
            </div>
            <h3 className="relative z-10 p-6 text-[1.05rem] font-semibold text-nexora-slate-800">
              Project Library
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
