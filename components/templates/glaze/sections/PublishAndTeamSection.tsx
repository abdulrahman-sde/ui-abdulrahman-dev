export default function PublishAndTeamSection() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-[2.5rem] border border-border bg-white/5 p-2 shadow-sm">
        <section className="group flex h-[480px] flex-col gap-8 rounded-[2.2rem] border border-white/10 bg-card/30 p-8 transition-all duration-500 hover:bg-card/50">
          <div>
            <h2 className="mb-2 text-lg font-medium text-foreground">
              Deploy anywhere, instantly
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Push to any cloud, embed in Notion, or share a public link — all in
              one click.
            </p>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner transition-all duration-500 group-hover:border-ring/20">
            {/* <DeployPlaceholder /> */}
          </div>
        </section>
      </div>

      <div className="rounded-[2.5rem] border border-border bg-white/5 p-2 shadow-sm">
        <section className="group flex h-[480px] flex-col gap-8 rounded-[2.2rem] border border-white/10 bg-card/30 p-8 transition-all duration-500 hover:bg-card/50">
          <div>
            <h2 className="mb-2 text-lg font-medium text-foreground">
              Collaborate without friction
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Invite your team, assign roles, and build shared dashboards that
              stay in sync.
            </p>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner transition-all duration-500 group-hover:border-ring/20"></div>
        </section>
      </div>
    </div>
  );
}
