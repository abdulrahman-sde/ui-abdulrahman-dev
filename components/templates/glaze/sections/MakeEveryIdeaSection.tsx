"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "./_motion";
import { WordStagger } from "./WordStagger";

export default function MakeEveryIdeaSection() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="w-full rounded-[2.5rem] border border-border bg-white/5 p-2 shadow-sm"
    >
      <section className="relative flex flex-col gap-10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-card/30 p-8 md:p-12">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="z-10 flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center"
        >
          <motion.div variants={fadeUp}>
            <h2 className="mb-2 text-xl font-medium text-foreground">
              <WordStagger text="Ask anything. Get answers instantly." stagger={0.05} />
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Query your data in plain language. Horizon translates your questions
              into insights — no SQL or dashboards required.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button
              className="group h-11 rounded-full px-6 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
              variant="outline"
            >
              <div className="mr-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110">
                <Play className="h-3 w-3 fill-current" />
              </div>
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="group relative mt-4 aspect-16/9 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl transition-colors duration-500 hover:border-ring/20"
        >
          {/* <ComposerPlaceholder /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </section>
    </motion.div>
  );
}
