"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/constants/site";

const navItems = [
  { label: "Templates", href: "/templates" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[url(/noise-compressed.png)] bg-background bg-size-[auto_90px] backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground transition-opacity duration-150 hover:opacity-70"
        >
          <div className="border py-2.5 px-2 rounded-lg">
            <Image src="/logo.png" alt="AR Logo" width={25} height={15} />
          </div>
          <span className="text-sm hidden sm:block font-medium tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="flex items-center">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
          >
            Portfolio
          </a>
        </nav>
      </Container>
    </header>
  );
}
