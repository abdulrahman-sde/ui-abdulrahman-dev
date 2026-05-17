import { ArrowUpRight } from "lucide-react";
import {
  Reveal,
  Card,
  Eyebrow,
  StepItem,
} from "@/components/templates/aurora/ui/primitives";

const STEPS = [
  {
    n: "01",
    title: "Register your identity",
    body: "Two minutes, one prompt. We provision your workspace, billing, and team in a single tap.",
  },
  {
    n: "02",
    title: "Configure your studio",
    body: "Pick the primitives. We pre-wire CI, auth, observability, and your preferred deploy target.",
  },
  {
    n: "03",
    title: "Ship and operate",
    body: "Push code. Watch it propagate to 340 edges. Sleep. The night shift is automated.",
  },
];

function StepMock({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute inset-0 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/20 text-white grid place-items-center text-xs font-semibold">
          JM
        </div>
        <div className="flex-1">
          <div className="h-2 bg-white/15 rounded-full w-40" />
          <div className="mt-2 h-2 bg-white/10 rounded-full w-24" />
        </div>
        <div className="px-3 h-7 grid place-items-center rounded-full bg-white/[0.08] border border-white/20 text-white text-xs font-medium">
          Verified
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="absolute inset-0 p-4 grid grid-cols-4 gap-2">
        {["Auth", "Data", "Edge", "Pay"].map((t, k) => (
          <div
            key={t}
            className={`rounded-xl border flex items-center justify-center text-xs font-medium ${
              k < 2
                ? "bg-white/[0.08] border-white/20 text-white"
                : "bg-transparent border-white/10 text-white/40"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />
        <span className="text-xs text-white/70">build · iad1 · 12s ago</span>
      </div>
      <div className="flex items-end gap-[3px] h-10">
        {Array.from({ length: 18 }).map((_, k) => (
          <div
            key={k}
            style={{ height: `${8 + ((k * 7) % 18)}px` }}
            className={`w-1 rounded-sm ${k < 13 ? "bg-white" : "bg-white/15"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="product"
      className="relative px-6 lg:px-10 py-28 lg:py-32 bg-[oklch(0.04_0.004_240)]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left rail */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <Reveal>
              <Eyebrow>How it works</Eyebrow>
              <h2 className="mt-5 text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05]">
                Three quick phases
                <br />
                to activate your space.
              </h2>
              <p className="mt-5 text-white/60 text-base leading-relaxed max-w-md">
                The same flow you&apos;ll see at sign-up. Calm, sequential, no
                surprises — just like the rest of Aurora.
              </p>
            </Reveal>
            <div className="mt-8 max-w-sm space-y-3">
              <Reveal delay={150}>
                <StepItem number="1" text="Register your identity" active />
              </Reveal>
              <Reveal delay={250}>
                <StepItem number="2" text="Configure your studio" />
              </Reveal>
              <Reveal delay={350}>
                <StepItem number="3" text="Finalize your profile" />
              </Reveal>
            </div>
          </div>

          {/* Right rail */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <Card hover className="p-8">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-white/30 tabular-nums">
                      {s.n}
                    </span>
                    <ArrowUpRight size={14} className="text-white/30" />
                  </div>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  <div className="mt-6 h-24 rounded-2xl bg-black border border-white/[0.06] overflow-hidden relative">
                    <StepMock index={i} />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
