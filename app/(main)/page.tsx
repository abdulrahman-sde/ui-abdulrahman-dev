import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Separator } from "@/components/ui/Separator";
import { TemplateCard } from "@/components/ui/TemplateCard";
import RaisedButton from "@/components/ui/RaisedBtn";
import { templates } from "@/constants/templates";
import { siteConfig } from "@/constants/site";

export default function Home() {
  const featured = templates.filter((t) => t.featured);

  return (
    <Container>
      {/* Hero */}
      <section className="py-16">
        <div className="flex flex-col max-w-[72ch]">
          <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
            <h1 className="text-[25px] font-bold tracking-tighter text-foreground sm:text-[28px]">
              Free landing page templates.
            </h1>
          </div>

          <div className="mt-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <p className="text-[15px] leading-[1.8] text-muted-foreground sm:text-base">
              Open-source templates built with Next.js and Tailwind CSS.
              Preview live, grab the source code, and ship faster.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-up" style={{ animationDelay: "160ms" }}>
            <Link href="/templates">
              <RaisedButton className="flex items-center gap-2">
                Browse Templates
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </RaisedButton>
            </Link>
            <a
              href={siteConfig.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              My Portfolio
            </a>
            <a
              href="https://github.com/abdulrahman-sde"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Separator />

      {/* Featured templates */}
      <section className="py-14">
        <div className="mb-8">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Featured
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-balance font-serif text-2xl font-semibold">
              Latest templates
            </h2>
            <Link
              href="/templates"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              View all
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Bottom CTA */}
      <section className="py-16 text-center">
        <div className="max-w-[52ch] mx-auto">
          <h2 className="text-balance font-serif text-2xl font-semibold mb-4">
            All templates are free.
          </h2>
          <p className="text-[15px] leading-[1.8] text-muted-foreground mb-8">
            Every template is open-source and free for personal or commercial
            use. No attribution required — just build.
          </p>
          <Link href="/templates">
            <RaisedButton>Browse all templates</RaisedButton>
          </Link>
        </div>
      </section>
    </Container>
  );
}
