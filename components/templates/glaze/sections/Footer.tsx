export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 md:py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 px-6 text-sm font-medium text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-[10px] font-bold text-background shadow-inner">
            G
          </div>
          <p>© {new Date().getFullYear()} Horizon, Inc.</p>
        </div>

        <nav className="flex items-center gap-10">
          <a className="transition-colors hover:text-foreground" href="#">
            Home
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="#"
          >
            Changelog
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="#"
          >
            Docs
          </a>
        </nav>
      </div>
    </footer>
  );
}
