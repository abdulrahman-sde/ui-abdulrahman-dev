import { notFound } from "next/navigation";
import LaunchUITemplate from "@/registry/launchui/page";

// Add a new entry here for each template added to registry/
const RENDERERS: Record<string, React.ComponentType> = {
  launchui: LaunchUITemplate,
};

export async function generateStaticParams() {
  return Object.keys(RENDERERS).map((slug) => ({ slug }));
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Page = RENDERERS[slug];
  if (!Page) notFound();
  return <Page />;
}
