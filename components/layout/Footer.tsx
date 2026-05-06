import { Container } from "@/components/ui/Container";
import { socialLinks, siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name} — Free to use
        </p>
        <nav className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
