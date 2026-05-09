import type { TemplateColor, TemplateVariant } from "@/types/template";

const Bar = ({ w = "60%", c = "var(--muted)", h = 6 }: { w?: string | number; c?: string; h?: number }) => (
  <span className="block rounded" style={{ width: w, height: h, background: c }} />
);

export function MockNorthwind({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between">
        <div className="size-3 rounded-sm" style={{ background: accent }} />
        <div className="flex gap-1.5">
          <Bar w="20px" h={4} />
          <Bar w="20px" h={4} />
          <Bar w="20px" h={4} />
          <Bar w="36px" h={4} c={accent} />
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <Bar w="40%" h={4} />
        <Bar w="70%" h={10} c="var(--foreground)" />
        <Bar w="55%" h={6} />
        <span className="mt-1 inline-block rounded-full px-2 py-1" style={{ background: accent, width: 50, height: 12 }} />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => <div key={i} className="bg-muted aspect-[4/3] rounded-md" />)}
      </div>
    </div>
  );
}

export function MockHalcyon({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-1.5 p-3">
      <div className="flex items-center justify-between">
        <div className="size-3 rounded-full" style={{ background: accent }} />
        <Bar w="40px" h={4} />
      </div>
      <Bar w="80%" h={12} c="var(--foreground)" />
      <div className="mt-1 grid flex-1 grid-cols-3 gap-1">
        <div className="row-span-2 rounded-md" style={{ background: `color-mix(in oklch, ${accent} 35%, transparent)` }} />
        <div className="bg-muted rounded-md" />
        <div className="bg-muted rounded-md" />
        <div className="bg-muted rounded-md" />
        <div className="rounded-md" style={{ background: `color-mix(in oklch, ${accent} 20%, transparent)` }} />
      </div>
    </div>
  );
}

export function MockAtelier({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-1.5 p-3">
      <div className="flex items-center justify-between">
        <Bar w="60px" h={4} />
        <div className="flex gap-1">
          <Bar w="14px" h={4} />
          <Bar w="14px" h={4} />
        </div>
      </div>
      <div className="mt-2 grid flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col justify-center gap-1.5">
          <Bar w="80%" h={3} />
          <Bar w="100%" h={10} c="var(--foreground)" />
          <Bar w="90%" h={4} />
          <Bar w="70%" h={4} />
        </div>
        <div className="rounded-md" style={{ background: `linear-gradient(135deg, ${accent} 0%, color-mix(in oklch, ${accent} 50%, var(--muted)) 100%)` }} />
      </div>
    </div>
  );
}

export function colorToVariant(color: TemplateColor): TemplateVariant {
  if (color === "mint") return "northwind";
  if (color === "amber") return "halcyon";
  return "atelier";
}

export function TemplateMock({ accent, variant }: { accent: string; variant: TemplateVariant }) {
  if (variant === "northwind") return <MockNorthwind accent={accent} />;
  if (variant === "halcyon") return <MockHalcyon accent={accent} />;
  return <MockAtelier accent={accent} />;
}
