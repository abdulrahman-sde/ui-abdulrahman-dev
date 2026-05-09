import { Section } from "@/components/templates/launchui/ui/section";

interface StatItem {
  label?: string;
  value: string | number;
  suffix?: string;
  description?: string;
}

interface StatsProps {
  items?: StatItem[] | false;
  className?: string;
}

const DEFAULT_STATS: StatItem[] = [
  {
    label: "used by",
    value: "9.9",
    suffix: "k",
    description: "designers on Figma Community",
  },
  {
    label: "over",
    value: "2,078",
    description: "clones and forks on GitHub",
  },
  {
    label: "already",
    value: "21.7",
    suffix: "k",
    description: "installations with shadcn/ui CLI",
  },
  {
    label: "includes",
    value: 74,
    description: "blocks and sections",
  },
];

export default function Stats({ items = DEFAULT_STATS, className }: StatsProps) {
  return (
    <Section className={className}>
      <div className="mx-auto max-w-[960px]">
        {items !== false && items.length > 0 && (
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
            {items.map((item) => (
              <div
                key={`${item.label}-${item.description}`}
                className="flex flex-col items-start gap-3 text-left"
              >
                {item.label && (
                  <div className="text-muted-foreground text-sm font-semibold">
                    {item.label}
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <div className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-medium text-transparent sm:text-5xl md:text-6xl">
                    {item.value}
                  </div>
                  {item.suffix && (
                    <div className="text-primary text-2xl font-semibold">
                      {item.suffix}
                    </div>
                  )}
                </div>
                {item.description && (
                  <div className="text-muted-foreground text-sm font-semibold text-pretty">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
