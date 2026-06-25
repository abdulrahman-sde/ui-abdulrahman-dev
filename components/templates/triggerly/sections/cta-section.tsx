export function CTASection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            Automate the busywork. Ship the work that matters.
          </h2>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 border border-secondary text-foreground font-medium rounded-lg hover:bg-muted transition-colors text-sm">
              Contact sales
            </button>
            <button className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:brightness-90 transition-all text-sm">
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
