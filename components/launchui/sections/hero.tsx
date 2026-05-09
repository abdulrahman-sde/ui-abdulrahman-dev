import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/launchui/ui/badge";
import Glow from "@/components/launchui/ui/glow";
import { LinkButton, type LinkButtonProps } from "@/components/launchui/ui/link-button";
import { Mockup, MockupFrame } from "@/components/launchui/ui/mockup";
import { Section } from "@/components/launchui/ui/section";

interface HeroButtonProps extends Omit<LinkButtonProps, "children"> {
  text: string;
}

interface HeroProps {
  title?: string;
  description?: string;
  badge?: ReactNode | false;
  mockup?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

const DEFAULT_BADGE = (
  <Badge variant="outline" className="animate-appear">
    <span className="text-muted-foreground">Professionally crafted landing page components</span>
    <Link href="/" className="flex items-center gap-1">
      Get started
      <ArrowRightIcon className="size-3" />
    </Link>
  </Badge>
);

const DEFAULT_MOCKUP = (
  <div className="w-full bg-muted/50 rounded-xl" style={{ aspectRatio: "16/9" }} />
);

export default function Hero({
  title = "Give your big idea the design it deserves",
  description = "Professionally designed blocks and templates built with React, Shadcn/ui and Tailwind that will help your product stand out.",
  badge = DEFAULT_BADGE,
  mockup = DEFAULT_MOCKUP,
  buttons = [
    { href: "/", text: "Get Started", variant: "default" },
    { href: "/", text: "GitHub", variant: "glow" },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "[mask-image:linear-gradient(to_top,transparent_0%,black_35%)] overflow-hidden pb-0 sm:pb-0 md:pb-0",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {badge !== false && badge}
          <h1 className="animate-appear relative z-10 inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>
          <p className="animate-appear text-muted-foreground relative z-10 max-w-[740px] text-balance font-medium opacity-0 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex justify-center gap-4 opacity-0 delay-300">
              {buttons.map((button) => (
                <LinkButton
                  key={button.text}
                  variant={button.variant ?? "default"}
                  size="lg"
                  href={button.href}
                  icon={button.icon}
                  iconRight={button.iconRight}
                >
                  {button.text}
                </LinkButton>
              ))}
            </div>
          )}
          {mockup !== false && (
            <div className="relative w-full pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="small"
              >
                <Mockup
                  type="responsive"
                  className="bg-background/90 w-full rounded-xl border-0"
                >
                  {mockup}
                </Mockup>
              </MockupFrame>
              <Glow variant="top" className="animate-appear-zoom opacity-0 delay-1000" />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
