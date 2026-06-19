import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { TEMPLATES } from "@/constants/templates";
import { TemplateViewer } from "./_components/template-viewer";
import { buildRegistryItem } from "@/lib/registry/build-registry-item";
import { highlight } from "@/lib/registry/highlight";
import { JsonLd } from "@/components/shared/json-ld";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const getTemplateFiles = unstable_cache(
  async (slug: string) => {
    const registryItem = await buildRegistryItem(slug);
    return Promise.all(
      (registryItem.files || []).map(async (file) => {
        const ext = file.path.split(".").pop() || "tsx";
        const html = await highlight(file.content as string, ext);
        return {
          path: file.path,
          target: file.target || file.path,
          content: file.content as string,
          html,
        };
      }),
    );
  },
  ["template-files"],
  { revalidate: 3600 },
);

const REGISTRY_BASE = "https://www.kairoui.online";

const TEMPLATE_META: Record<
  string,
  { keyword: string; category: string; sections: string }
> = {
  nova: {
    keyword: "SaaS landing page template",
    category: "SaaS",
    sections: "hero, features, content, pricing, and FAQ sections",
  },
  glaze: {
    keyword: "dark glassmorphism landing page template",
    category: "Dashboard",
    sections: "hero, features, and dark glassmorphism UI sections",
  },
  popcorn: {
    keyword: "mobile app landing page template",
    category: "Mobile App",
    sections: "hero, coverage map, features, and testimonials",
  },
  orbit: {
    keyword: "SaaS template with global reach visualization",
    category: "SaaS",
    sections: "hero, global reach visualization, and feature sections",
  },
  nexora: {
    keyword: "AI image generation landing page template",
    category: "AI Tool",
    sections: "hero, core features, how it works, pricing, and footer",
  },
  nexto: {
    keyword: "agency landing page template",
    category: "Agency",
    sections: "hero, logo strip, services grid, showcase, stats, process steps, testimonials, CTA, and footer",
  },
  xero: {
    keyword: "dark SaaS landing page template",
    category: "SaaS",
    sections: "animated beam hero, features, showcase, pricing, FAQ, and testimonials",
  },
  lumina: {
    keyword: "SaaS automation landing page template",
    category: "SaaS",
    sections: "frosted-glass dashboard preview, logo marquee, features grid, agent feed, stats, testimonials, pricing, and FAQ",
  },
  sprint: {
    keyword: "Linear-inspired product management landing page template",
    category: "SaaS",
    sections: "3D dashboard mockup, hero, navbar, AI agents showcase, project timeline visualization, workflow carousel, logo cloud, feature cards, CTA, and footer",
  },
  aurora: {
    keyword: "dark-mode SaaS landing page template",
    category: "SaaS",
    sections: "video hero, marquee logo cloud, feature grid, how-it-works steps, studio showcase, testimonials, and pricing",
  },
};

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) return { title: "Template Not Found" };

  const meta = TEMPLATE_META[slug];
  const keyword = meta?.keyword ?? `${t.title} landing page template`;
  const sections = meta?.sections ?? t.description;

  return {
    title: `${t.title} — Free ${keyword} for Next.js`,
    description: `${t.title} is a free, MIT-licensed ${keyword} built with Next.js 16 and Tailwind CSS v4. Includes ${sections}. Install in one command with the shadcn CLI.`,
    alternates: {
      canonical: `https://www.kairoui.online/template/${slug}`,
    },
    openGraph: {
      title: `${t.title} — Free ${keyword}`,
      description: `Free MIT-licensed template. Includes ${sections}. One-command install via shadcn CLI.`,
      url: `https://www.kairoui.online/template/${slug}`,
      siteName: "Kairo UI",
      type: "website",
      images: [
        {
          url: `https://www.kairoui.online/thumbnails/${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${t.title} — Free ${keyword} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.title} — Free ${keyword}`,
      description: `Free Next.js template. Install with shadcn CLI.`,
      images: [`https://www.kairoui.online/thumbnails/${slug}.png`],
    },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  if (!t) notFound();

  const filesWithHighlight = await getTemplateFiles(slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${t.title} — Next.js Landing Page Template`,
    description: t.description,
    url: `https://www.kairoui.online/template/${slug}`,
    codeRepository: "https://github.com/abdulrahmanasif/kairoui",
    programmingLanguage: ["TypeScript", "TSX"],
    runtimePlatform: "Next.js",
    license: "https://opensource.org/licenses/MIT",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="relative isolate min-h-screen">
      <JsonLd data={schema} />

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden dark:hidden">
        <div
          className="absolute -top-[10%] left-[10%] h-[40%] w-[80%] rounded-[100%] bg-primary/5 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[20%] -left-[10%] h-[30%] w-[50%] rounded-[100%] bg-blue-500/5 blur-[100px]"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 pt-32 pb-20">
        <Link
          href="/templates"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <div className="mb-12 max-w-2xl">
          <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground/80">
            {t.description}
          </p>
        </div>

        <TemplateViewer
          files={filesWithHighlight}
          command={`${REGISTRY_BASE}/r/${t.slug}.json`}
          src={`/templates/${t.slug}`}
          name={t.title}
        />

        {/* Server-rendered content for SEO */}
        {(() => {
          const meta = TEMPLATE_META[slug];
          const keyword = meta?.keyword ?? `${t.title} landing page template`;
          const sections = meta?.sections ?? t.description;
          return (
            <div className="mt-16 max-w-2xl border-t border-border/50 pt-12 space-y-6">
              <h2 className="font-serif text-2xl font-medium tracking-tight">
                About {t.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.title} is a free, open-source {keyword} built with Next.js
                and Tailwind CSS v4. It includes {sections}. Released under the
                MIT license — use it in personal or commercial projects with no
                restrictions.
              </p>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-foreground">License</dt>
                  <dd className="text-muted-foreground">MIT — free forever</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Framework</dt>
                  <dd className="text-muted-foreground">Next.js 16 + React 19</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Styling</dt>
                  <dd className="text-muted-foreground">Tailwind CSS v4</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Install</dt>
                  <dd className="text-muted-foreground">One command via shadcn CLI</dd>
                </div>
              </dl>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
