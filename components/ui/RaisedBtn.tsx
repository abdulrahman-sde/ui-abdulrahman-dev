"use client";
import React from "react";

import { cn } from "@/lib/utils";

interface RaisedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const RaisedButton = React.forwardRef<HTMLButtonElement, RaisedButtonProps>(
  (props, ref) => {
    const {
      color = "var(--foreground)",
      style,
      className,
      children,
      ...restProps
    } = props;
    return (
      <button
        ref={ref}
        {...restProps}
        style={{
          backgroundColor: color,
          color: "var(--background)",
          boxShadow: `0 4px 6px rgba(0,0,0,0.2)`,
          ...style,
        }}
        className={cn(
          "relative inline-flex appearance-none items-center justify-center rounded-xl border-0 px-4 py-2 text-sm font-medium transition-[transform,opacity]",
          "active:scale-95 hover:opacity-90",
          "before:absolute before:inset-0 before:rounded-inherit",
          "before:bg-linear-to-b before:from-white/20 before:to-transparent",
          "overflow-hidden cursor-pointer",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

RaisedButton.displayName = "RaisedButton";

export default RaisedButton;
