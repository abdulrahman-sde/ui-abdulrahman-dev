"use client";

import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, viewportOnce } from "./_motion";
import { WordStagger } from "./WordStagger";

export default function BottomCTASection() {
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-48 text-center">
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="flex flex-col items-center"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-border bg-white/5 backdrop-blur-sm"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background text-lg font-bold shadow-inner">
            H
          </div>
        </motion.div>

        <h2 className="mb-8 text-3xl font-medium tracking-tight text-foreground">
          <WordStagger text="Start building clarity today." stagger={0.06} />
        </h2>

        <motion.form
          variants={fadeUp}
          className="group flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card/50 p-1.5 pl-5 transition-all duration-500 focus-within:border-ring/50 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
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
    </section>
  );
}
