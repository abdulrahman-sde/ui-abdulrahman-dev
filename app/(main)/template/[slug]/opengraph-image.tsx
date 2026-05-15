import { ImageResponse } from "next/og";
import { TEMPLATES } from "@/constants/templates";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const t = TEMPLATES.find((x) => x.slug === params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#71717a",
            marginBottom: 12,
            fontFamily: "sans-serif",
          }}
        >
          Free Next.js Template
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            fontFamily: "sans-serif",
            lineHeight: 1.1,
          }}
        >
          {t?.title ?? "Template"}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#a1a1aa",
            marginTop: 16,
            fontFamily: "sans-serif",
          }}
        >
          {t?.description ?? ""}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 16,
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          kairoui.online
        </div>
      </div>
    ),
    { ...size },
  );
}
