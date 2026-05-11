import { IconPlaceholder } from "./icon-placeholder";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Logo } from "@/components/templates/orbit/ui/logo";

type FooterLink = {
  title: string;
  href: string;
  icon?: ReactNode;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Testimonials", href: "#" },
      { title: "Integration", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "FAQs", href: "#" },
      { title: "About Us", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "T&S", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Brand", href: "#" },
      { title: "Help", href: "#" },
    ],
  },
  {
    label: "Social Links",
    links: [
      {
        title: "Facebook",
        href: "#",
        icon: (
          <IconPlaceholder
            hugeicons="Facebook01Icon"
            lucide="FacebookIcon"
            phosphor="FacebookLogoIcon"
            remixicon="RiFacebookFill"
            tabler="IconBrandFacebook"
          />
        ),
      },
      {
        title: "Instagram",
        href: "#",
        icon: (
          <IconPlaceholder
            hugeicons="InstagramIcon"
            lucide="InstagramIcon"
            phosphor="InstagramLogoIcon"
            remixicon="RiInstagramFill"
            tabler="IconBrandInstagram"
          />
        ),
      },
      {
        title: "Youtube",
        href: "#",
        icon: (
          <IconPlaceholder
            hugeicons="YoutubeIcon"
            lucide="YoutubeIcon"
            phosphor="YoutubeLogoIcon"
            remixicon="RiYoutubeFill"
            tabler="IconBrandYoutube"
          />
        ),
      },
      {
        title: "LinkedIn",
        href: "#",
        icon: (
          <IconPlaceholder
            hugeicons="Linkedin01Icon"
            lucide="LinkedinIcon"
            phosphor="LinkedinLogoIcon"
            remixicon="RiLinkedinFill"
            tabler="IconBrandLinkedin"
          />
        ),
      },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className={cn(
        "md:rounded-t-6xl relative mx-auto flex w-full mt-20 pt-10 max-w-5xl flex-col items-center justify-center rounded-t-4xl border-t px-6 md:px-8",
        "dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]",
      )}
    >
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
        <div className="space-y-4">
          <Logo className="h-4" />
          <p className="text-muted-foreground mt-8 text-sm md:mt-0">
            The operating system for modern teams.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
          {footerLinks.map((section, index) => (
            <div className="mb-10 md:mb-0" key={section.label}>
              <h3 className="text-xs">{section.label}</h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a
                      className="hover:text-foreground inline-flex items-center duration-250 [&_svg]:me-1 [&_svg]:size-4"
                      href={link.href}
                      key={`${section.label}-${link.title}`}
                    >
                      {link.icon}
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="via-border h-px w-full bg-linear-to-r" />
      <div className="flex w-full items-center justify-center py-4">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Orbit, All rights reserved
        </p>
      </div>
    </footer>
  );
}
