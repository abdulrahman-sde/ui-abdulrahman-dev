"use client";

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 896;

export default function ScaledDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const w = outer.offsetWidth;
      const s = Math.min(1, w / DESIGN_WIDTH);
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };

    const observer = new ResizeObserver(update);
    observer.observe(outer);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} style={{ height: height || "auto" }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          maxWidth: DESIGN_WIDTH,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
