import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEMPLATES } from "@/constants/templates";
import { TemplateViewer } from "./_components/template-viewer";
import { buildRegistryItem } from "@/lib/registry/build-registry-item";
import { highlight } from "@/lib/registry/highlight";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const REGISTRY_BASE = "https://ui.abdulrahmanasif.dev";

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
  if (!t) return { title: "Template" };
  return {
    title: `${t.title} — ui.abdulrahmanasif.dev`,
    description: t.description,
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

  const registryItem = await buildRegistryItem(slug);
  const filesWithHighlight = await Promise.all(
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

  return (
    <div className="relative isolate min-h-screen">
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
      </div>
    </div>
  );
}
