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
                <Button variant="ghost" size="icon" asChild aria-label="GitHub">
                  <Link
                    href="https://github.com/abdulrahmanasif"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  aria-label="Portfolio"
                >
                  <Link
                    href="https://abdulrahman.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" />
                    </svg>
                  </Link>
                </Button>
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
