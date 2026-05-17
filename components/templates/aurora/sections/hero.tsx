import { ArrowRight, Play, Star, ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal, Stagger } from "@/components/templates/aurora/ui/primitives";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";

const STATS = [
  { k: "12,400+", v: "Teams onboarded" },
  { k: "99.99%", v: "Annual uptime" },
  { k: "38ms", v: "p95 response" },
  { k: "SOC 2 II", v: "Compliant" },
];

export default function Hero() {
  return (
    <section className="relative px-2 lg:px-4 pt-2 lg:pt-2">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="relative z-10 min-h-[88vh] lg:min-h-[92vh] flex flex-col">
          {/* Top notice bar */}
          <div className="px-6 lg:px-10 pt-6 flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-2 h-8 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(124,58,237,.8)]" />
              v4.2 — Aurora Studio is live
              <span className="text-white/40">·</span>
              <a
                href="#"
                className="text-white inline-flex items-center gap-1 hover:text-white/80 transition-colors"
              >
                Read the note <ArrowUpRight size={11} />
              </a>
            </div>
            <div className="ml-auto flex items-center gap-2 h-8 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80">
              <Star size={11} className="text-white fill-white" />
              <span>4.9</span>
              <span className="text-white/40">on the App Store</span>
            </div>
          </div>

          {/* Headline — anchored bottom-left */}
          <div className="mt-auto px-6 lg:px-12 pb-14 lg:pb-20">
            <div className="max-w-3xl">
              <Stagger base={150} step={120}>
                <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] uppercase tracking-[0.18em] text-white/80">
                  <Sparkles size={12} /> The 2026 release
                </span>
                <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95]">
                  Build at the
                  <br />
                  <span className="italic font-light text-white/90">
                    speed of light.
                  </span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
                  Aurora is the studio for teams that ship faster than the
                  brief. Design, deploy, and operate your product from a single,
                  calm surface.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white text-[#0a0a12] text-sm font-medium hover:opacity-90 hover:-translate-y-px active:scale-[0.98] transition-all"
                  >
                    Start free trial <ArrowRight size={14} />
                  </a>
                  <a
                    href="#showcase"
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-black/60 transition-all"
                  >
                    <Play size={12} className="fill-white" /> Watch 90s demo
                  </a>
                </div>
              </Stagger>
            </div>
          </div>

          {/* Stats strip */}
          <Reveal delay={650} className="px-4 lg:px-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-2">
              {STATS.map((s, i) => (
                <div
                  key={s.v}
                  className={`px-4 py-3 ${i ? "border-l border-white/[0.06]" : ""}`}
                >
                  <div className="text-xl lg:text-2xl font-medium tracking-tight">
                    {s.k}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
