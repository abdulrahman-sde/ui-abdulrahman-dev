import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Separator({ className, style }: SeparatorProps) {
  return (
    <hr
      className={cn("border-t border-border", className)}
      role="separator"
      style={style}
    />
  );
}
