import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/launchui/ui/footer";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnConfig {
  title: string;
  links: FooterLink[];
}

interface FooterSectionProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnConfig[];
  copyright?: string;
  policies?: FooterLink[];
  className?: string;
}

export default function FooterSection({
  logo,
  name = "Launch UI",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Changelog", href: "/" },
        { text: "Documentation", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/" },
        { text: "Careers", href: "/" },
        { text: "Blog", href: "/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "/" },
        { text: "Twitter", href: "/" },
        { text: "GitHub", href: "/" },
      ],
    },
  ],
  copyright = "© 2026 Launch UI. All rights reserved.",
  policies = [
    { text: "Privacy Policy", href: "/" },
    { text: "Terms of Service", href: "/" },
  ],
  className,
}: FooterSectionProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="mx-auto max-w-[1280px]">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.title}>
                <h3 className="pt-1 text-sm font-semibold">{column.title}</h3>
                {column.links.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    className="text-muted-foreground text-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy) => (
                <a key={policy.text} href={policy.href} className="text-xs">
                  {policy.text}
                </a>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
