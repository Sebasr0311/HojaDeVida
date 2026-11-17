"use client";

import * as React from "react";
import {
  motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from "motion/react";

/**
 * React Bits — ScrollVelocity (adaptación TypeScript con motion).
 * Concepto original de David Haz: https://reactbits.dev/text-animations/scroll-velocity
 * Cinta infinita cuya velocidad y dirección responden a la velocidad del scroll.
 */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function VelocityRow({ children, baseVelocity, className }: { children: React.ReactNode; baseVelocity: number; className?: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = React.useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="velocity-row">
      <motion.div className={className} style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0 ? true : undefined}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({ rows, velocity = 3, className }: { rows: React.ReactNode[]; velocity?: number; className?: string }) {
  return (
    <div className="velocity">
      {rows.map((row, i) => (
        <VelocityRow key={i} baseVelocity={i % 2 === 0 ? -velocity : velocity} className={className}>{row}</VelocityRow>
      ))}
    </div>
  );
}
