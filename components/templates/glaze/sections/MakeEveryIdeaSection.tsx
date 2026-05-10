import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function MakeEveryIdeaSection() {
  return (
    <div className="w-full rounded-[2.5rem] border border-border bg-white/5 p-2 shadow-sm">
      <section className="relative flex flex-col gap-10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-card/30 p-8 md:p-12">
        <div className="z-10 flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="mb-2 text-xl font-medium text-foreground">
              Ask anything. Get answers instantly.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Query your data in plain language. Horizon translates your questions
              into insights — no SQL or dashboards required.
            </p>
          </div>
          <Button
            className="group h-11 rounded-full px-6 transition-all duration-300"
            variant="outline"
          >
            <div className="mr-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 transition-transform group-hover:scale-110">
              <Play className="h-3 w-3 fill-current" />
            </div>
            Watch Demo
          </Button>
        </div>
        <div className="group relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl transition-all duration-700 hover:border-ring/20">
          {/* <ComposerPlaceholder /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </section>
    </div>
  );
}
