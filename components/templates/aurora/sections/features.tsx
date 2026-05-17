"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Zap, Layers, Workflow, Shield, Globe, Code } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/templates/aurora/ui/primitives";

const FEATURES = [
  {
    Icon: Zap,
    title: "Instant deploys",
    body: "Ship 50× faster with isolated, atomic environments. Roll back the second something feels off.",
    mock: <DeployMock />,
  },
  {
    Icon: Layers,
    title: "Composable surface",
    body: "Every primitive — auth, payments, edge — lives behind one consistent, opinion-free API.",
    mock: <ComposeMock />,
  },
  {
    Icon: Workflow,
    title: "Automations",
    body: "Trigger flows from anything that emits an event. Watch them execute in real time on the studio canvas.",
    mock: <AutomationMock />,
  },
  {
    Icon: Shield,
    title: "Default secure",
    body: "SOC 2 Type II, HIPAA-ready, residency in 14 regions. Encryption keys you control, end to end.",
    mock: <SecurityMock />,
  },
  {
    Icon: Globe,
    title: "Truly global",
    body: "Compute at 340 edges, p95 under 40ms in every populated continent. No more cold starts.",
    mock: <GlobalMock />,
  },
  {
    Icon: Code,
    title: "TypeScript native",
    body: "Generated SDKs, end-to-end types, and a CLI that respects your shell. Read the source if you like.",
    mock: <TypeScriptMock />,
  },
];

function DeployMock() {
  return (
    <div className="aurora-feat-mock-inner flex flex-col gap-2.5 p-5">
      {[
        { label: "Build", status: "done", time: "12s" },
        { label: "Test", status: "done", time: "4s" },
        { label: "Deploy → iad1", status: "active", time: "..." },
        { label: "Health check", status: "pending", time: "—" },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                row.status === "done"
                  ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,.8)]"
                  : row.status === "active"
                    ? "bg-white aurora-pulse"
                    : "bg-white/20"
              }`}
            />
            <span className="text-xs text-white/60">{row.label}</span>
          </div>
          <span className="text-xs text-white/30 tabular-nums">{row.time}</span>
        </div>
      ))}
    </div>
  );
}

function ComposeMock() {
  const primitives = ["Auth", "Payments", "Storage", "Edge", "AI", "Queue"];
  return (
    <div className="aurora-feat-mock-inner p-5 grid grid-cols-3 gap-2">
      {primitives.map((p, i) => (
        <div
          key={p}
          className={`rounded-xl border text-xs font-medium h-10 flex items-center justify-center ${
            i < 2
              ? "bg-white/[0.08] text-white border-white/20"
              : "border-white/10 text-white/35"
          }`}
        >
          {p}
        </div>
      ))}
    </div>
  );
}

function AutomationMock() {
  return (
    <div className="aurora-feat-mock-inner p-5 flex flex-col gap-3">
      {[
        {
          from: "Slack msg",
          to: "Summarise",
          color: "bg-emerald-400/20 text-emerald-300",
        },
        {
          from: "Form submit",
          to: "Notify + log",
          color: "bg-blue-400/20 text-blue-300",
        },
        {
          from: "Cron · 09:00",
          to: "Daily digest",
          color: "bg-violet-400/20 text-violet-300",
        },
      ].map((flow) => (
        <div key={flow.from} className="flex items-center gap-2 text-xs">
          <span className="text-white/40 w-24 truncate">{flow.from}</span>
          <span className="text-white/20">→</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] ${flow.color}`}
          >
            {flow.to}
          </span>
        </div>
      ))}
    </div>
  );
}

function SecurityMock() {
  return (
    <div className="aurora-feat-mock-inner p-5 flex flex-col gap-3">
      {[
        { label: "SOC 2 Type II", ok: true },
        { label: "HIPAA ready", ok: true },
        { label: "14 residency regions", ok: true },
        { label: "Key rotation", ok: true },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-2.5 text-xs">
          <span className="w-4 h-4 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-[10px]">
            ✓
          </span>
          <span className="text-white/55">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function GlobalMock() {
  const regions = [
    { code: "IAD", ms: "12ms", x: "18%", y: "38%" },
    { code: "LHR", ms: "24ms", x: "46%", y: "28%" },
    { code: "SIN", ms: "36ms", x: "74%", y: "46%" },
    { code: "GRU", ms: "31ms", x: "32%", y: "65%" },
    { code: "NRT", ms: "29ms", x: "82%", y: "32%" },
  ];
  return (
    <div className="aurora-feat-mock-inner relative p-4 overflow-hidden">
      <div className="absolute inset-0 aurora-globe-grid opacity-20" />
      {regions.map((r) => (
        <div
          key={r.code}
          className="absolute flex flex-col items-center gap-0.5"
          style={{ left: r.x, top: r.y }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,.6)]" />
          <span className="text-[9px] text-white/50 tabular-nums">{r.ms}</span>
        </div>
      ))}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="text-[10px] text-white/30">340 edge nodes</span>
        <span className="text-[10px] text-white/30">p95 &lt; 40ms</span>
      </div>
    </div>
  );
}

function TypeScriptMock() {
  return (
    <div className="aurora-feat-mock-inner p-5 font-mono">
      <div className="text-[11px] leading-[1.7]">
        <div>
          <span className="text-violet-400">import</span>
          <span className="text-white/55">
            {" "}
            {"{"} Aurora {"}"}{" "}
          </span>
          <span className="text-violet-400">from</span>
          <span className="text-emerald-300"> &apos;@aurora/sdk&apos;</span>
        </div>
        <div className="mt-1">
          <span className="text-blue-300">const</span>
          <span className="text-white/70"> client </span>
          <span className="text-white/40">= </span>
          <span className="text-blue-300">new</span>
          <span className="text-white/70"> Aurora</span>
          <span className="text-white/40">({"{"}</span>
        </div>
        <div className="pl-4">
          <span className="text-white/40">token: </span>
          <span className="text-emerald-300">process.env.TOKEN</span>
        </div>
        <div>
          <span className="text-white/40">{"}"})</span>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="features"
      className="relative px-6 lg:px-10 py-28 lg:py-36 aurora-glow-strong"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col items-start gap-5 max-w-2xl">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05]">
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              Six primitives that compose into anything you can imagine, and
              very little that you can&apos;t.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Tab rail */}
          <div className="lg:col-span-4 flex flex-col gap-1 relative">
            {FEATURES.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActive(i)}
                className="aurora-tab-btn group relative text-left w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors duration-200"
              >
                {active === i && (
                  <motion.span
                    layoutId="aurora-tab-bg"
                    className="aurora-tab-active-bg absolute inset-0 rounded-2xl"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span
                  className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                    active === i
                      ? "bg-[rgba(124,58,237,0.15)] text-white border border-[rgba(124,58,237,0.3)]"
                      : "bg-white/[0.04] border border-white/10 text-white/40 group-hover:text-white/70"
                  }`}
                >
                  <f.Icon size={15} />
                </span>
                <span
                  className={`relative z-10 text-sm font-medium tracking-tight transition-colors duration-200 ${
                    active === i
                      ? "text-white"
                      : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  {f.title}
                </span>
                <span
                  className={`relative z-10 ml-auto text-[11px] tabular-nums transition-colors duration-200 ${
                    active === i ? "text-[#a78bfa]" : "text-white/20"
                  }`}
                >
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Feature canvas */}
          <div className="lg:col-span-8 relative min-h-[400px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="aurora-feat-canvas h-full flex flex-col"
              >
                <div className="relative rounded-3xl bg-[oklch(0.1_0.005_240)] border border-white/[0.06] overflow-hidden h-full flex flex-col">
                  {/* Canvas header */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      {(() => {
                        const F = FEATURES[active].Icon;
                        return <F size={14} />;
                      })()}
                    </div>
                    <span className="text-sm font-medium tracking-tight">
                      {FEATURES[active].title}
                    </span>
                    <span className="ml-auto text-[11px] text-white/25 tabular-nums">
                      0{active + 1} / 06
                    </span>
                  </div>

                  {/* Mockup area */}
                  <div className="aurora-feat-mockup-area flex-1 relative overflow-hidden">
                    {FEATURES[active].mock}
                  </div>

                  {/* Body text */}
                  <div className="px-6 py-5 border-t border-white/[0.06]">
                    <p className="text-sm text-white/55 leading-relaxed max-w-lg">
                      {FEATURES[active].body}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
