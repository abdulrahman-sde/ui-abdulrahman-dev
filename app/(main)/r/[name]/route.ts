import { NextResponse } from "next/server";
import { TEMPLATES } from "@/constants/templates";
import { buildRegistryItem } from "@/lib/registry/build-registry-item";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ name: `${t.slug}.json` }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const slug = name.replace(/\.json$/, "");

  if (!TEMPLATES.find((t) => t.slug === slug)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  try {
    const item = await buildRegistryItem(slug);
    return NextResponse.json(item, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json({ error: "template source not yet available" }, { status: 404 });
  }
}
