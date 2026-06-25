import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        className="text-foreground h-5 w-auto shrink-0"
        viewBox="0 0 108 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Kairo UI"
      >
        <rect
          x="0.75"
          y="0.75"
          width="26.5"
          height="26.5"
          rx="5.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 7.5v13M8 14l6.5-6.5M8 14l7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-semibold tracking-tight text-foreground">
        kairo
        <span className="opacity-45"> ui</span>
      </span>
    </span>
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-6", className)}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kairo UI icon"
    >
      <rect
        x="0.75"
        y="0.75"
        width="26.5"
        height="26.5"
        rx="5.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 7.5v13M8 14l6.5-6.5M8 14l7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
