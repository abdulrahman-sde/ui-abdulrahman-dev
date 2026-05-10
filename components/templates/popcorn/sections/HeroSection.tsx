import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-20 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-gradient-orb-1 blur-[120px]" />
        <div className="absolute top-[10%] -right-[10%] h-[400px] w-[400px] rounded-full bg-gradient-orb-2 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] h-[600px] w-[600px] rounded-full bg-gradient-orb-3 blur-[150px]" />
      </div>

      <h1 className="mx-auto mb-6 font-serif text-5xl leading-[1.1] font-medium tracking-tight text-balance md:text-7xl lg:text-7xl">
        Your day,
        <br />
        beautifully planned.
      </h1>
      <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground md:text-xl">
        Tasks, habits, and calendar — unified in one calm
        <br />
        and focused app.
      </p>

      <div className="relative z-10 mb-20 flex justify-center">
        <Button
          className="group h-12 rounded-full px-8 text-base shadow-xl"
          size="lg"
        >
          Download free
          <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface-bright/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </Button>
      </div>

      <div className="relative mx-auto top-10 flex h-[500px] max-w-4xl justify-center md:h-[600px]">
        <div className="absolute inset-[-15%] z-0">
          <Image
            alt=""
            className="object-contain opacity-90"
            fill
            src="https://cdn.prod.website-files.com/66797c2909f9ec0b1ff1a767/69cd18cac294945d09e5dfaa_hero-portal-bg-new.webp"
            sizes="(max-width: 768px) 100vw, 1100px"
            priority
          />
        </div>

        <div className="absolute top-1/2 left-1/2 z-[1] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-glow blur-[80px]" />

        <div className="absolute left-[5%] z-[2] h-full w-[45%] rotate-[-5deg] md:left-[10%]">
          <Image
            alt="Bloom App — Tasks View"
            className="object-contain drop-shadow-2xl"
            priority
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            src="https://i.postimg.cc/mkGjLQ4W/Untitled.png"
          />
        </div>
        <div className="absolute right-[5%] z-[3] mt-12 h-full w-[45%] rotate-[5deg] md:right-[10%]">
          <Image
            alt="Bloom App — Calendar View"
            className="object-contain drop-shadow-2xl"
            priority
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            src="https://i.postimg.cc/7ZcgPgML/Untitled-(1).png"
          />
        </div>
      </div>
    </section>
  );
}
