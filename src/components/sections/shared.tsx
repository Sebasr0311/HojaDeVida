"use client";

import * as React from "react";
import { DecryptedText } from "@/components/react-bits/DecryptedText";
import { cn } from "@/lib/utils";

export function Eyebrow({ index, label, className }: { index?: string; label: string; className?: string }) {
  return (
    <p className={cn("eyebrow", className)}>
      {index && <span className="eyebrow-index">{index}</span>}
      <span className="eyebrow-rule" aria-hidden="true" />
      <DecryptedText text={label} animateOn="view" sequential speed={26} scrambleColor="var(--accent)" />
    </p>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("chips", className)}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

export function StatusPill({ children, tone = "live" }: { children: React.ReactNode; tone?: "live" | "build" | "neutral" }) {
  return <span className={cn("status-pill", `status-pill--${tone}`)}><span className="status-dot" aria-hidden="true" />{children}</span>;
}
