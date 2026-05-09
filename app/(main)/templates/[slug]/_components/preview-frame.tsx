"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTH: Record<Device, number | string> = {
  desktop: "100%",
  tablet: 768,
  mobile: 390,
};

const DEVICE_ASPECT: Record<Device, string> = {
  desktop: "16/10",
  tablet: "4/3",
  mobile: "9/19.5",
};

interface PreviewFrameProps {
  slug: string;
  title: string;
}

export default function PreviewFrame({ slug, title }: PreviewFrameProps) {
  const [device, setDevice] = useState<Device>("desktop");
  const previewUrl = `/templates/${slug}/preview`;

  return (
    <div className="flex flex-col gap-0">
      {/* Toolbar */}
      <div className="border-border bg-card flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-1">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
            const Icon =
              d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                onClick={() => setDevice(d)}
                aria-label={d}
                className={cn(
                  "flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-xs transition-colors",
                  device === d
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
              </button>
            );
          })}
        </div>

        {/* Fake URL bar */}
        <div className="bg-muted flex h-6 flex-1 mx-3 items-center rounded-md px-3">
          <span className="text-muted-foreground font-mono text-[10px] truncate">
            ui.abdulrahmanasif.dev/templates/{slug}/preview
          </span>
        </div>

        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
          aria-label="Open preview in new tab"
        >
          <ExternalLink className="size-3.5" />
          <span className="hidden sm:inline">Open</span>
        </a>
      </div>

      {/* Preview viewport */}
      <div className="bg-muted flex min-h-[480px] items-center justify-center p-6">
        <div
          className="transition-all duration-300"
          style={{ width: DEVICE_WIDTH[device], maxWidth: "100%" }}
        >
          <div
            className="ring-border overflow-hidden rounded-xl shadow-2xl shadow-black/20 ring-1"
            style={{ aspectRatio: DEVICE_ASPECT[device] }}
          >
            <iframe
              src={previewUrl}
              className="h-full w-full border-0"
              loading="lazy"
              title={`${title} preview`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
