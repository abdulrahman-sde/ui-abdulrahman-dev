import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Grid,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
} from "lucide-react";

const RECENT_ARTICLES = [
  { title: "Fall prevention...", status: "Ready to Release" as const },
  { title: "Medication mana...", status: "Ready to Release" as const },
  { title: "Elder nutrition g...", status: "Drafting" as const },
  { title: "Home safety ch...", status: "Ready to Release" as const },
  { title: "Memory care st...", status: "Drafting" as const },
];

const SUBJECTS = [
  {
    label: "Elder Care",
    value: "4,220",
    change: "+12%",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    label: "Mobility",
    value: "1,890",
    change: "+8%",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    label: "Home Safety",
    value: "3,450",
    change: "+15%",
    color: "bg-amber-500/20 text-amber-400",
  },
];

const INBOX_ROWS = [
  {
    question: "How to prevent falls in elderly homes?",
    volume: "2.4K",
    difficulty: "Medium",
    status: "Drafting",
  },
  {
    question: "Best mobility aids for seniors 2026",
    volume: "1.8K",
    difficulty: "Easy",
    status: "Drafting",
  },
  {
    question: "Medication management for dementia patients",
    volume: "3.1K",
    difficulty: "Hard",
    status: "Drafting",
  },
  {
    question: "Home safety modifications on a budget",
    volume: "1.2K",
    difficulty: "Easy",
    status: "Drafting",
  },
  {
    question: "Nutrition guidelines for aging adults",
    volume: "2.0K",
    difficulty: "Medium",
    status: "Drafting",
  },
];

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
    </div>
  );
}

export default function DashboardMockup() {
  return (
    <div className="rounded-t-2xl overflow-hidden bg-[#1a1a1c] shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-left">
      {/* Title Bar */}
      <div className="bg-[#242427] border-b border-white/5 px-4 py-2.5 flex items-center gap-2.5">
        <TrafficLights />
        <PanelLeft className="w-3.5 h-3.5 text-white/40" />
        <ChevronLeft className="w-3.5 h-3.5 text-white/25" />
        <ChevronRight className="w-3.5 h-3.5 text-white/25" />
        <div className="flex-1 flex justify-center">
          <div className="inline-flex items-center gap-1.5 bg-[#1a1a1c] rounded-md px-6 py-1 text-[10px] text-white/60">
            <Monitor className="w-3 h-3" />
            questly.ai
          </div>
        </div>
        <RotateCw className="w-3.5 h-3.5 text-white/40" />
        <Share className="w-3.5 h-3.5 text-white/40" />
        <Plus className="w-3.5 h-3.5 text-white/40" />
        <Copy className="w-3.5 h-3.5 text-white/40" />
      </div>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <svg viewBox="0 0 256 256" fill="currentColor" className="w-4 h-4 text-white/70" aria-hidden="true">
              <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
            </svg>
            <Grid className="w-3.5 h-3.5 text-white/30" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#e8553f] flex items-center justify-center text-[8px] font-bold text-white">
              C
            </div>
            <span className="text-[10px] text-white/80">CareNest</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { icon: Compass, label: "Uncover" },
              { icon: Layers, label: "Subjects" },
              { icon: ListTodo, label: "Inbox" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-2 text-[10px] text-white/60 hover:text-white/80 transition-colors"
              >
                <item.icon className="w-3 h-3" />
                {item.label}
              </a>
            ))}
          </nav>

          <div>
            <div className="text-[9px] text-white/30 uppercase tracking-wider mb-1.5">
              Recent
            </div>
            <div className="flex flex-col gap-1">
              {RECENT_ARTICLES.map((a) => (
                <div
                  key={a.title}
                  className="flex items-center gap-1.5 text-[9px] text-white/50"
                >
                  <span
                    className={`w-1 h-1 rounded-full ${
                      a.status === "Ready to Release"
                        ? "bg-[#28c840]/70"
                        : "bg-white/20"
                    }`}
                  />
                  {a.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#e8553f] flex items-center justify-center text-sm font-bold text-white">
                C
              </div>
              <div>
                <div className="text-sm font-medium text-white">CareNest</div>
                <div className="text-[10px] text-white/45">Content workspace</div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] text-white/70 bg-white/10 hover:bg-white/15 rounded-lg px-3 py-1.5 transition-colors">
              <Sparkles className="w-3 h-3" />
              Generate
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5">
            {[
              { value: "62", label: "Posts indexed", sub: "RELEASED" },
              { value: "12", label: "Subject groups", sub: "BREADTH" },
              { value: "412", label: "Ready to draft", sub: "REMAINING" },
              {
                value: "3,156,200",
                label: "Searches a month",
                sub: "MAX REACH",
              },
            ].map((s) => (
              <div key={s.sub} className="px-3 py-2.5">
                <div className="text-[8px] tracking-wider text-white/35 uppercase">
                  {s.sub}
                </div>
                <div className="text-xl font-medium text-white mt-0.5">
                  {s.value}
                </div>
                <div className="text-[8px] text-white/35">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Subject Cards */}
          <div className="grid grid-cols-3 gap-2">
            {SUBJECTS.map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 px-3 py-2.5"
              >
                <div className="text-[9px] text-white/40">{s.label}</div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-lg font-medium text-white">
                    {s.value}
                  </span>
                  <span className={`text-[9px] ${s.color} rounded px-1`}>
                    {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Drafting Inbox */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] text-white/60 font-medium">
                Drafting Inbox
              </div>
              <button className="text-[9px] text-white/40 hover:text-white/60 transition-colors">
                View all
              </button>
            </div>
            <div className="rounded-lg ring-1 ring-white/5 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-[8px] text-white/30 uppercase tracking-wider bg-white/[0.02]">
                    <th className="text-left px-3 py-1.5 font-medium">
                      Question
                    </th>
                    <th className="text-left px-3 py-1.5 font-medium">
                      Volume
                    </th>
                    <th className="text-left px-3 py-1.5 font-medium">
                      Difficulty
                    </th>
                    <th className="text-left px-3 py-1.5 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {INBOX_ROWS.map((row) => (
                    <tr
                      key={row.question}
                      className="border-t border-white/5 text-[9px] text-white/50"
                    >
                      <td className="px-3 py-1.5 text-white/70">
                        {row.question}
                      </td>
                      <td className="px-3 py-1.5">{row.volume}</td>
                      <td className="px-3 py-1.5">{row.difficulty}</td>
                      <td className="px-3 py-1.5 text-[#febc2e]/80">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
