"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * React Bits — BlurText (adaptación TypeScript con motion).
 * Concepto original de David Haz: https://reactbits.dev/text-animations/blur-text
 * Revela el texto palabra por palabra pasando de desenfocado a nítido.
 */
type BlurTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: "top" | "bottom";
  /** Palabras (por índice) que reciben `highlightClassName`. */
  highlight?: number[];
  highlightClassName?: string;
};

export function BlurText({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.07,
  direction = "bottom",
  highlight = [],
  highlightClassName,
}: BlurTextProps) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];
  const y = direction === "bottom" ? 18 : -18;

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <motion.span
            aria-hidden="true"
            className={highlight.includes(i) ? highlightClassName : undefined}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
            initial={reduce ? false : { opacity: 0, filter: "blur(12px)", y }}
            animate={inView || reduce ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
