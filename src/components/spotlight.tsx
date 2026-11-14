"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "cn";

// Feeds the pointer position to the `spotlight` utility, which draws the
// highlight in CSS. Writing the variables directly avoids re-rendering.
export function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("spotlight rounded-xl", className)}
    >
      {children}
    </div>
  );
}
