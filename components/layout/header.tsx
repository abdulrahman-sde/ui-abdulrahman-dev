"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ChevronRight, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { useMedia } from "@/hooks/use-media";
import { useTheme } from "next-themes";

type MenuItem = { name: string; href: string };
const menuItems: MenuItem[] = [];

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
};

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const isLarge = useMedia("(min-width: 64rem)");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 75);
  });

  return (
    <header>
      <nav className="fixed z-20 w-full">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex items-center justify-between py-5">
            {/* Left: logo (fades out on scroll, replaced by floating pill) */}
            <Link
              href="/"
              aria-label="home"
              className={cn(
                "flex items-center duration-200 max-lg:hidden",
                isScrolled && "opacity-0 blur-xs pointer-events-none",
              )}
            >
              <Logo />
            </Link>

            {/* Mobile logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex items-center lg:hidden"
            >
              <Logo />
            </Link>

            {/* Center nav (fades out on scroll) */}
            <ul
              className={cn(
                "hidden items-center gap-1 lg:flex duration-200",
                isScrolled && "opacity-0 blur-xs pointer-events-none",
              )}
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={item.href} className="text-sm">
                      {item.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>

            {/* Right: icon links + CTA (fades out on scroll) */}
            <div
              className={cn(
                "hidden items-center gap-1 lg:flex duration-200",
                isScrolled && "opacity-0 blur-xs pointer-events-none",
              )}
            >
              <ThemeToggle />

              <div className="bg-border -ms-1 me-2 h-5 w-px" />
              <Button size="sm" className="pr-1.5" asChild>
                <Link href="/templates">
                  Browse Templates <ChevronRight className="opacity-50" />
                </Link>
              </Button>
            </div>

            {/* Floating pill (appears on scroll, desktop only) */}
            {isLarge && (
              <motion.div
                animate={{
                  gap: isScrolled ? "1rem" : "0rem",
                }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}
                className={cn(
                  "absolute inset-0 z-50 m-auto flex size-fit h-11 items-center rounded-[10px] transition-colors duration-500",
                  isScrolled
                    ? "bg-card ring-border shadow-foreground/6.5 shadow-lg ring-1 backdrop-blur"
                    : "bg-transparent pointer-events-none",
                )}
              >
                <Link
                  href="/"
                  aria-label="home"
                  className={cn("px-3.5", !isScrolled && "invisible")}
                >
                  <Logo />
                </Link>
                <AnimatePresence initial={false}>
                  {isScrolled && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -156,
                        scale: 0.8,
                        filter: "blur(4px)",
                        width: 0,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        width: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        x: -156,
                        scale: 0.8,
                        filter: "blur(4px)",
                        width: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.1,
                      }}
                      className="flex origin-left items-center overflow-hidden rounded-full gap-30"
                    >
                      <ul className="flex gap-1">
                        {menuItems.map((item) => (
                          <li key={item.name}>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={item.href} className="text-sm">
                                {item.name}
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 mx-2">
                        <ThemeToggle />
                        <Button size="sm" className="gap-1 pr-1" asChild>
                          <Link href="/templates">
                            Browse Templates{" "}
                            <ChevronRight className="opacity-50" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
            >
              {menuState ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuState && (
          <div className="bg-background border-border border-b lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-6 pb-6 pt-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuState(false)}
                  className="text-muted-foreground hover:text-foreground block py-2 text-sm"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-3">
                <ThemeToggle />

                <div className="flex-1" />
                <Button size="sm" asChild>
                  <Link href="/templates">Browse Templates</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
