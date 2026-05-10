import Image from "next/image";

export default function PeaceOfMindSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 font-serif text-4xl font-medium md:text-5xl">
          One app.
          <br />
          Everything in its place.
        </h2>
        <p className="text-muted-foreground">
          Up and running in under a minute.
          <br />
          Works offline, syncs when you reconnect.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-[2rem] bg-accent-green/50 p-10 text-center">
          <div className="mb-8 flex aspect-square w-48 flex-col items-center justify-center rounded-3xl border border-border bg-surface-elevated p-6 shadow-sm">
            <span className="mb-2 text-sm font-medium text-muted-foreground">
              Always free
            </span>
            <span className="font-serif text-5xl font-medium">$0</span>
            <div className="mt-4 flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
              <svg
                className="h-3 w-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Core features
            </div>
          </div>
          <h3 className="mb-3 font-serif text-2xl font-medium">Free Forever</h3>
          <p className="text-sm text-muted-foreground">
            A generous free plan with all the
            <br />
            essentials, no credit card required.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-[2rem] bg-accent-blue/50 p-10 text-center">
          <div className="relative mb-8 flex aspect-square w-48 flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 shadow-sm">
            <Image
              alt="Quick Setup Illustration"
              className="object-contain w-auto h-auto"
              src="https://i.postimg.cc/7ZcgPgML/Untitled-(1).png"
              width={60}
              height={100}
            />
          </div>
          <h3 className="mb-3 font-serif text-2xl font-medium">
            Up in 60 Seconds
          </h3>
          <p className="text-sm text-muted-foreground">
            Sign up, sync your calendar, and you&apos;re in.
            <br />
            No manual import or migration needed.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-[2rem] bg-accent-purple/50 p-10 text-center">
          <div className="mb-8 flex aspect-square w-48 flex-col items-center justify-center rounded-3xl border border-border bg-surface-elevated p-6 shadow-sm">
            <svg
              className="mb-4 h-8 w-8 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="mb-3 text-center text-sm font-medium leading-tight">
              Your data
              <br />
              stays yours
            </span>
            <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-green-600">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              End-to-end encrypted
            </div>
          </div>
          <h3 className="mb-3 font-serif text-2xl font-medium">
            Private by Default
          </h3>
          <p className="text-sm text-muted-foreground">
            Zero third-party tracking.
            <br />
            Your tasks are never sold or shared.
          </p>
        </div>
      </div>
    </section>
  );
}
