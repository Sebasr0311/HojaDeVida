"use client";

import * as React from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * React Bits — SpotlightCard (adaptación TypeScript, con clases de diseño propias).
 * Implementación basada en el componente abierto de David Haz:
 * https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/SpotlightCard/SpotlightCard.jsx
 * Proyecto original: https://reactbits.dev (licencia MIT + Commons Clause).
 */
type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(103, 119, 232, 0.12)",
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    element.style.setProperty("--spotlight-color", spotlightColor);
    onMouseMove?.(event);
  };

  return <div ref={ref} onMouseMove={handleMouseMove} className={cn("spotlight-card", className)} {...props}>{children}</div>;
}
