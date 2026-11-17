"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * React Bits — CountUp (adaptación TypeScript).
 * Concepto original de David Haz: https://reactbits.dev/text-animations/count-up
 * Cuenta hasta `to` cuando entra en pantalla, con easing y formato es-CO.
 */
type CountUpProps = { to: number; duration?: number; pad?: number; className?: string; suffix?: string };

export function CountUp({ to, duration = 1.6, pad = 0, className, suffix = "" }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : value;
  const formatted = shown.toLocaleString("es-CO").padStart(pad, "0");
  return (
    <span ref={ref} className={className} aria-label={`${to.toLocaleString("es-CO")}${suffix}`}>
      <span aria-hidden="true">{formatted}{suffix}</span>
    </span>
  );
}
