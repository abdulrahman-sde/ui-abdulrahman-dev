const integrations = [
  { emoji: "📅", name: "Google Calendar" },
  { emoji: "📌", name: "Notion" },
  { emoji: "💬", name: "Slack" },
  { emoji: "✉️", name: "Gmail" },
  { emoji: "🐙", name: "GitHub" },
  { emoji: "📊", name: "Linear" },
  { emoji: "🎯", name: "Jira" },
  { emoji: "📝", name: "Obsidian" },
  { emoji: "🔗", name: "Zapier" },
];

export default function CoverageMapSection() {
  return (
    <section className="relative w-full overflow-hidden py-32">
      <div className="bg-dotted-map absolute inset-0 z-0 opacity-50" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-medium">
          Works where you work
        </div>
        <h2 className="mb-4 font-serif text-4xl font-medium md:text-5xl">
          Integrates with
          <br />
          your favorite tools.
        </h2>
        <p className="mb-16 text-muted-foreground">
          Bloom connects to the apps you already love,
          <br />
          so nothing falls through the cracks.
        </p>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
          {integrations.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium shadow-sm"
            >
              <span className="text-lg">{item.emoji}</span> {item.name}
            </div>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium shadow-sm">
            20+ More
          </div>
        </div>
      </div>
    </section>
  );
}
