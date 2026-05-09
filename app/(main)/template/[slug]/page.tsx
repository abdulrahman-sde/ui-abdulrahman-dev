import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEMPLATES } from "@/constants/templates";
import { TemplateViewer } from "./_components/template-viewer";
import { buildRegistryItem } from "@/lib/registry/build-registry-item";
import { highlight } from "@/lib/registry/highlight";

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
    <div className="mx-auto w-full max-w-5xl px-4 pt-32 pb-20">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
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
  );
}
