import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg
    className="size-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="size-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-background border-border border-t py-12">
      <div className="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-5" />
          <p className="text-muted-foreground mt-4 max-w-xs text-sm">
            Free landing page templates for developers. Open source. No account
            required.
          </p>
        </div>

        <FooterCol title="Site">
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/templates">Templates</FooterLink>
          <FooterLink href="/submit">Submit</FooterLink>
        </FooterCol>

        <FooterCol title="Categories">
          <FooterLink href="/templates?cat=SaaS">SaaS</FooterLink>
          <FooterLink href="/templates?cat=Portfolio">Portfolio</FooterLink>
          <FooterLink href="/templates?cat=Agency">Agency</FooterLink>
          <FooterLink href="/templates?cat=Open+source">Open source</FooterLink>
        </FooterCol>

        <FooterCol title="Connect">
          <FooterLink href="https://github.com" external>
            <GithubIcon /> GitHub
          </FooterLink>
          <FooterLink href="https://twitter.com" external>
            <TwitterIcon /> Twitter
          </FooterLink>
          <FooterLink href="mailto:getgarde4@gmail.com">
            <Mail className="size-3.5" /> Email
          </FooterLink>
        </FooterCol>
      </div>

      <div className="border-border mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-3 border-t px-6 pt-6 text-xs sm:flex-row">
        <p className="text-muted-foreground">
          © 2026 ui.abdulrahmanasif.dev — Built with care.
        </p>
        <p className="text-muted-foreground font-mono">
          Built in public. <span className="text-primary">●</span> Online
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
        {title}
      </p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-foreground/80 hover:text-foreground inline-flex items-center gap-1.5"
      >
        {children}
      </Link>
    </li>
  );
}
