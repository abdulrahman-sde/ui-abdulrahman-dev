import type { Metadata } from "next";
import { TEMPLATES } from "@/constants/templates";
import { notFound } from "next/navigation";

// Slugs with a real registry entry. Add here when a new template lands in registry/.
const PREVIEWABLE = new Set(["launchui"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATES.find((x) => x.slug === slug);
  return { title: t ? `${t.title} — Preview` : "Preview" };
}

export default async function PreviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PREVIEWABLE.has(slug)) notFound();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={`/registry-styles/${slug}.css`} />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
