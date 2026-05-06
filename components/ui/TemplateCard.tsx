import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import RaisedButton from "@/components/ui/RaisedBtn";
import type { Template } from "@/types/template";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-[url(/noise-compressed.png)] bg-size-[auto_50px]">
      {/* Preview thumbnail */}
      <Link
        href={`/templates/${template.slug}`}
        className="relative overflow-hidden block aspect-video group"
        style={{
          backgroundImage: `radial-gradient(circle, #d4d4d4 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundColor: "#f5f5f4",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span className="text-[10px] font-medium text-muted-foreground/40 tracking-widest uppercase">
            Preview
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/templates/${template.slug}`} className="block flex-1 group/link">
            <h3 className="font-semibold tracking-tighter text-foreground group-hover/link:text-accent group-hover/link:underline decoration-accent/50 underline-offset-4">
              {template.title}
            </h3>
          </Link>
          <Link
            href={`/templates/${template.slug}`}
            className="mt-0.5 shrink-0 text-muted-foreground/50 transition-transform duration-300 hover:text-foreground hover:-translate-y-0.5 hover:translate-x-0.5"
            title="View Details"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>

        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted-foreground">
          {template.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="pt-5 flex items-center gap-2">
          <Link href={`/preview/${template.slug}`}>
            <RaisedButton className="px-3 py-1.5 text-[11px] h-auto rounded-xl mr-2 whitespace-nowrap before:rounded-xl flex gap-1.5 items-center">
              Live Preview
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </RaisedButton>
          </Link>
          <a
            href={template.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[12px] border-[1.4px] border-border ps-3 pr-4 py-[6px] rounded-md gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="-mt-0.5">Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}
