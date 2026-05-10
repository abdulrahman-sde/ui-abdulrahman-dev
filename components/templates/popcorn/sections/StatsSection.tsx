export default function StatsSection() {
  const features = [
    {
      title: "Smart task\nmanagement",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      title: "Built-in habit\ntracker",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      icon2: "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      title: "Focus mode,\nalways on",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl border-b border-border px-6 py-24">
      <div className="grid w-full grid-cols-1 gap-12 text-center md:grid-cols-3">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface-elevated shadow-sm">
              <svg
                className="h-6 w-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d={f.icon}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                {f.icon2 && (
                  <path
                    d={f.icon2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </div>
            <h3 className="whitespace-pre-line font-serif text-2xl font-medium text-balance">
              {f.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
