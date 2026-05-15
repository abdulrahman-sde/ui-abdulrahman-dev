"use client";

import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "./_motion";
import { WordStagger } from "./WordStagger";

export default function HeroSection() {
  return (
    <header className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-24 text-center md:pt-48 md:pb-32">
      {/* Hero text — staggered fade-up on load */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3.5 py-1 text-[11px] tracking-wide text-muted-foreground backdrop-blur-md"
        >
          <span className="text-foreground">Horizon</span>
          <span className="opacity-40">/</span>
          <span>Now in Early Access</span>
        </motion.div>

        <h1 className="mb-6 max-w-2xl text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          <WordStagger text="Clarity at every layer of your stack." onLoad stagger={0.06} />
        </h1>

        <motion.p
          variants={fadeUp}
          className="mb-10 max-w-sm text-sm leading-relaxed text-muted-foreground"
        >
          A unified workspace for your metrics, workflows, and team. Decisions
          feel effortless when your data is.
        </motion.p>

        <motion.form
          variants={fadeUp}
          className="group mb-32 flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card/50 p-1.5 pl-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:border-ring/50 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <input
            className="flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
            placeholder="Enter email address..."
            required
            type="email"
          />
          <Button
            className="group/btn relative h-10 rounded-full px-6 text-sm font-medium transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
            type="submit"
          >
            <span className="relative z-10">Get Early Access</span>
            <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-px">
              <MoveRight className="h-3.5 w-3.5" />
            </div>
          </Button>
        </motion.form>
      </motion.div>

      {/* Dashboard mockup — fade in on scroll */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mb-32 w-full max-w-5xl rounded-[2.5rem] border border-border bg-white/5 p-2 shadow-2xl"
      >
        <div className="relative aspect-16/10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-black">
          {/* <DashboardPlaceholder /> */}
        </div>
      </motion.div>

      {/* Feature grid — staggered fade-up on scroll */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mb-40 grid w-full max-w-4xl grid-cols-1 gap-12 text-center md:grid-cols-3"
      >
        {features.map((feat) => (
          <motion.div
            key={feat.label}
            variants={fadeUp}
            className="group flex flex-col items-center"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-ring/30">
              <svg
                className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={feat.icon}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-sm font-medium text-foreground">{feat.label}</h3>
            <p className="max-w-62.5 text-sm leading-relaxed text-muted-foreground">
              {feat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </header>
  );
}

const features = [
  {
    label: "Real-time sync",
    description:
      "Your data updates instantly across every view, every teammate, every device.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    label: "Works with your stack",
    description:
      "Connect any data source — databases, APIs, and third-party tools in minutes.",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    label: "Built for teams",
    description:
      "Collaborative by design — share dashboards, alerts, and insights with your whole org.",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
];
