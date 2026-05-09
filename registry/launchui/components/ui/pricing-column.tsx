import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheckBig } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const pricingColumnVariants = cva(
  "relative flex flex-col gap-6 overflow-hidden rounded-2xl p-8 shadow-xl border border-border/50 bg-card",
  {
    variants: {
      variant: {
        default: "bg-card/60",
        glow: "bg-card/80 after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-full after:-translate-x-1/2 after:rounded-[50%] after:bg-foreground/10 after:blur-[72px]",
        "glow-brand":
          "bg-card after:content-[''] after:absolute after:-top-[128px] after:left-1/2 after:h-[128px] after:w-full after:-translate-x-1/2 after:rounded-[50%] after:bg-primary/40 after:blur-[72px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PricingColumnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pricingColumnVariants> {
  name: string;
  icon?: ReactNode;
  description: string;
  price: number;
  originalPrice?: number;
  promotionText?: ReactNode;
  priceNote: string;
  cta: {
    variant: "glow" | "default";
    label: string;
    href: string;
  };
  features: string[];
}

export function PricingColumn({
  name,
  icon,
  description,
  price,
  originalPrice,
  promotionText,
  priceNote,
  cta,
  features,
  variant,
  className,
  ...props
}: PricingColumnProps) {
  return (
    <div
      className={cn(pricingColumnVariants({ variant, className }))}
      {...props}
    >
      <div className="flex flex-col gap-7">
        <header className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 font-bold">
            {icon && (
              <span className="text-muted-foreground">{icon}</span>
            )}
            {name}
          </h2>
          <p className="text-muted-foreground max-w-[220px] text-sm">
            {description}
          </p>
        </header>
        <section className="flex flex-col gap-3">
          {originalPrice !== undefined && originalPrice !== price && (
            <span className="text-muted-foreground text-lg font-medium line-through">
              ${originalPrice}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-2xl font-bold">$</span>
            <span className="text-6xl font-bold">{price}</span>
          </div>
          {price > 0 && (
            <div className="flex flex-col text-sm text-muted-foreground">
              <span>one-time payment</span>
              <span>plus local taxes</span>
            </div>
          )}
          {promotionText && (
            <div className="text-primary h-6 text-sm font-medium">
              {promotionText}
            </div>
          )}
        </section>
        <Button variant={cta.variant} size="lg" asChild>
          <a href={cta.href}>{cta.label}</a>
        </Button>
        <p className="text-muted-foreground min-h-[40px] max-w-[220px] text-sm">
          {priceNote}
        </p>
        <hr className="border-border" />
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <li
            key={`${feature}-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <CircleCheckBig className="text-muted-foreground size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
