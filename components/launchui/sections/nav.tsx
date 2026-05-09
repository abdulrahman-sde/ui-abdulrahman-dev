"use client";

import { Menu } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/launchui/ui/button";
import { Navbar, NavbarLeft, NavbarRight } from "@/components/launchui/ui/navbar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/launchui/ui/sheet";

interface NavLink {
  text: string;
  href: string;
}

interface NavAction {
  text: string;
  href: string;
  isButton?: boolean;
}

interface NavProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavLink[];
  actions?: NavAction[];
  className?: string;
}

export default function Nav({
  logo,
  name = "Launch UI",
  homeUrl = "/",
  mobileLinks = [
    { text: "Getting Started", href: "/" },
    { text: "Components", href: "/" },
    { text: "Documentation", href: "/" },
  ],
  actions = [
    { text: "Sign in", href: "/", isButton: false },
    { text: "Get Started", href: "/", isButton: true },
  ],
  className,
}: NavProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="absolute left-0 h-24 w-full bg-background/80 backdrop-blur-lg" />
      <div className="relative mx-auto max-w-[1280px]">
        <Navbar>
          <NavbarLeft>
            <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
              {logo}
              {name}
            </a>
          </NavbarLeft>
          <NavbarRight>
            {actions.map((action) =>
              action.isButton ? (
                <Button key={action.text} variant="default" asChild>
                  <a href={action.href}>{action.text}</a>
                </Button>
              ) : (
                <a
                  key={action.text}
                  href={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.text}
                </a>
              ),
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <nav className="grid gap-6 text-lg font-medium">
                  <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                    {name}
                  </a>
                  {mobileLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </Navbar>
      </div>
    </header>
  );
}
