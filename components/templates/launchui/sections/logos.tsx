import { ReactNode } from "react";
import { Badge } from "@/components/templates/launchui/ui/badge";
import { Section } from "@/components/templates/launchui/ui/section";

interface LogoItem {
  name: string;
  version?: string;
}

interface LogosProps {
  title?: string;
  badge?: ReactNode | false;
  logos?: LogoItem[] | false;
  className?: string;
}

export default function Logos({
  title = "Built with industry-standard tools and best practices",
  badge = (
    <Badge variant="outline">Updated April 2026</Badge>
  ),
  logos = [
    { name: "Figma" },
    { name: "React", version: "19" },
    { name: "TypeScript", version: "5" },
    { name: "Shadcn/ui" },
    { name: "Tailwind", version: "4" },
  ],
  className,
}: LogosProps) {
  return (
    <Section className={className}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {badge !== false && badge}
          <h2 className="text-md font-semibold sm:text-2xl">{title}</h2>
        </div>
        {logos !== false && logos.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <span>{logo.name}</span>
                {logo.version && (
                  <span className="text-muted-foreground/60">{logo.version}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
