import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 md:w-auto">
      <header className="rounded-3xl border border-border bg-surface-elevated/70 p-2 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-12 pl-4 pr-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              B
            </div>
            <span className="text-sm font-bold tracking-tight">Bloom</span>
          </div>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#">
              Home
            </a>
            <a className="transition-colors hover:text-foreground" href="#">
              Features
            </a>
            <a className="transition-colors hover:text-foreground" href="#">
              Pricing
            </a>
            <a className="transition-colors hover:text-foreground" href="#">
              Blog
            </a>
          </nav>
          <Button asChild className="group h-9 rounded-full px-4 text-[13px] font-medium" size="sm">
            <a href="#">
              Sign up
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-surface-bright/20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[0.5px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
          </Button>
        </div>
      </header>
    </div>
  );
}
