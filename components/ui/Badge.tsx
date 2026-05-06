import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full bg-[#c1bebe2d] px-2.5 py-1 text-[11px] font-medium text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
