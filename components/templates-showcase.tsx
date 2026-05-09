import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Template = {
  name: string;
  category: string;
  href: string;
};

const templates: Template[] = [
  { name: "Startup", category: "SaaS", href: "#" },
  { name: "Portfolio", category: "Personal", href: "#" },
  { name: "Agency", category: "Business", href: "#" },
  { name: "App Landing", category: "Mobile", href: "#" },
  { name: "Waitlist", category: "Launch", href: "#" },
  { name: "Blog", category: "Content", href: "#" },
];

export default function TemplatesShowcase() {
  return (
    <section id="templates" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12">
          <h2 className="font-serif text-4xl font-medium">Templates</h2>
          <p className="text-muted-foreground mt-3 text-balance">
            Free to use. More added regularly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {templates.map((template) => (
            <Link
              key={template.name}
              href={template.href}
              className="group ring-border hover:ring-primary/30 relative flex flex-col overflow-hidden rounded-2xl ring-1 transition-all duration-200"
            >
              {/* Preview area */}
              <div className="bg-muted relative flex h-44 items-center justify-center">
                <span className="text-muted-foreground/40 font-serif text-5xl font-medium select-none">
                  {template.name[0]}
                </span>
                <div className="group-hover:opacity-100 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200">
                  <span className="bg-background ring-border flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ring-1">
                    Preview <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="bg-card border-border flex items-center justify-between border-t px-4 py-3">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {template.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {template.category}
                  </p>
                </div>
                <span className="text-muted-foreground border-border rounded-full border px-2.5 py-0.5 text-xs">
                  Free
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
