import {
  Reveal,
  Card,
  SectionHeader,
} from "@/components/templates/aurora/ui/primitives";

const SIDEBAR_ITEMS = [
  "Overview",
  "Components",
  "Data",
  "Workflows",
  "Edge",
  "Logs",
  "Billing",
];

const NODES = [
  {
    x: "2%",
    y: "10%",
    t: "Webhook",
    sub: "stripe.payment.success",
    active: true,
  },
  { x: "40%", y: "40%", t: "Transform", sub: "shape → Order", active: false },
  { x: "70%", y: "5%", t: "Notify", sub: "slack · #ops", active: false },
  { x: "70%", y: "70%", t: "Persist", sub: "orders.append", active: false },
];

const INSPECTOR_ROWS = [
  ["Source", "stripe"],
  ["Event", "payment.success"],
  ["Region", "iad1 · sfo3"],
  ["Retries", "3"],
  ["Timeout", "8s"],
];

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative px-6 lg:px-10 py-28 lg:py-32 bg-[oklch(0.04_0.004_240)] aurora-glow-strong"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="The studio"
            title="A canvas for everything you ship."
            subtitle="Components, workflows, data, deployments — laid out in one calm surface. Reach for what you need, ignore the rest."
          />
        </Reveal>

        <Reveal delay={150} className="mt-16">
          <Card className="p-3 lg:p-4">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
                <span className="w-3 h-3 rounded-full bg-white/15" />
              </div>
              <div className="hidden sm:flex items-center gap-2 h-7 px-3 rounded-full bg-black border border-white/[0.06] text-xs text-white/40">
                aurora.studio / acme / production
              </div>
              <div className="text-xs text-white/30 tabular-nums">12:48</div>
            </div>

            {/* App body */}
            <div className="grid grid-cols-12 gap-3">
              {/* Sidebar */}
              <div className="hidden lg:flex col-span-2 flex-col gap-1 rounded-2xl bg-black border border-white/[0.06] p-3">
                {SIDEBAR_ITEMS.map((s, i) => (
                  <div
                    key={s}
                    className={`px-3 h-9 rounded-xl flex items-center text-sm ${
                      i === 3
                        ? "bg-white/20 text-white font-medium"
                        : "text-white/55 hover:text-white cursor-pointer transition-colors"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>

              {/* Canvas */}
              <div className="col-span-12 lg:col-span-7 rounded-2xl bg-black border border-white/[0.06] p-5 min-h-[460px] relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">
                      Workflow · checkout_v3
                    </div>
                    <div className="mt-1 text-xl font-medium tracking-tight">
                      Order pipeline
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/70 hover:bg-white/10 transition-colors">
                      Preview
                    </button>
                    <button className="h-8 px-3 rounded-lg bg-white/[0.08] text-white border border-white/20 text-xs font-medium hover:bg-white/[0.12] transition-colors">
                      Deploy
                    </button>
                  </div>
                </div>

                {/* Node graph */}
                <div className="relative mt-8 h-72">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 600 280"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M90 60 C160 60, 200 140, 280 140"
                      stroke="white"
                      strokeOpacity=".25"
                      strokeDasharray="3 4"
                    />
                    <path
                      d="M280 140 C360 140, 400 60, 480 60"
                      stroke="white"
                      strokeOpacity=".25"
                      strokeDasharray="3 4"
                    />
                    <path
                      d="M280 140 C360 140, 400 220, 480 220"
                      stroke="white"
                      strokeOpacity=".25"
                      strokeDasharray="3 4"
                    />
                  </svg>
                  {NODES.map((n, i) => (
                    <div
                      key={i}
                      style={{ left: n.x, top: n.y }}
                      className="absolute w-44"
                    >
                      <div
                        className={`rounded-xl border p-3 ${
                          n.active
                            ? "bg-[rgba(124,58,237,0.1)] text-white border-[rgba(124,58,237,0.25)]"
                            : "bg-[oklch(0.13_0.005_240)] border-white/10 text-white"
                        }`}
                      >
                        <div className="text-xs font-medium">{n.t}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${n.active ? "text-black/55" : "text-white/40"}`}
                        >
                          {n.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[11px] text-white/40">
                  <span>4 nodes · 3 edges · v3.14</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Healthy
                  </span>
                </div>
              </div>

              {/* Inspector */}
              <div className="col-span-12 lg:col-span-3 rounded-2xl bg-black border border-white/[0.06] p-5">
                <div className="text-xs text-white/40 uppercase tracking-widest">
                  Inspector
                </div>
                <div className="mt-3 text-base font-medium tracking-tight">
                  Webhook
                </div>
                <div className="mt-4 space-y-3">
                  {INSPECTOR_ROWS.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-white/40">{k}</span>
                      <span className="text-white font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-white/[0.06]">
                  <div className="text-xs text-white/40 uppercase tracking-widest">
                    Last 24h
                  </div>
                  <div className="mt-3 flex items-end gap-[3px] h-16">
                    {Array.from({ length: 36 }).map((_, k) => (
                      <span
                        key={k}
                        style={{ height: `${20 + ((k * 13) % 70)}%` }}
                        className={`flex-1 rounded-sm ${k === 33 ? "bg-white" : "bg-white/[0.12]"}`}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                    <span>14,221 events</span>
                    <span className="text-emerald-400">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
