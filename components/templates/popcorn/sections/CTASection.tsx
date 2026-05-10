import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 pb-48">
      <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-[3rem] bg-inverse p-12 text-primary-content md:flex-row md:p-20">
        {/* Left content */}
        <div className="z-10 w-full rounded-3xl bg-inverse-glass p-8 backdrop-blur-md md:w-1/3">
          <h2 className="mb-8 font-serif text-3xl font-medium md:text-4xl">
            Up and running
            <br />
            in 3 easy steps
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-surface-bright/20 px-6 py-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-bright font-medium text-primary">
                1
              </div>
              <span className="font-medium text-primary-content/90">
                Download the app
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-surface-bright/10 px-6 py-4 opacity-60">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-bright/20 font-medium text-primary-content">
                2
              </div>
              <span className="font-medium text-primary-content/90">
                Set up your profile
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-surface-bright/10 px-6 py-4 opacity-60">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-bright/20 font-medium text-primary-content">
                3
              </div>
              <span className="font-medium text-primary-content/90">Start planning!</span>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-bright px-4 py-1.5 text-xs font-medium text-primary">
              Yes, it&apos;s that simple
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Center Image Mockup */}
        <div className="absolute top-1/2 left-1/2 hidden h-[500px] w-full max-w-md -translate-x-1/2 -translate-y-1/2 md:block">
          <Image
            alt="App interface"
            className="rotate-12 drop-shadow-2xl object-contain"
            fill
            src="https://i.postimg.cc/7ZcgPgML/Untitled-(1).png"
            sizes="400px"
          />
        </div>

        {/* Right content */}
        <div className="z-10 mt-12 w-full text-right md:mt-0 md:w-1/3">
          <h2 className="mb-4 font-serif text-3xl font-medium md:text-4xl">
            Start free,
            <br />
            upgrade anytime.
          </h2>
          <div className="mb-2 font-serif text-7xl font-medium">$0</div>
          <div className="mb-8 text-sm text-inverse-muted">Forever free plan</div>
          <Button asChild className="h-12 rounded-full bg-surface-bright px-8 text-base text-primary ring-0 shadow-none transition-all duration-300 hover:bg-surface-bright/90 hover:scale-105 active:scale-95" variant="outline">
            <a href="#">
              Download free
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
