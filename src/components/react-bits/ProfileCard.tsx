"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";

/**
 * React Bits — ProfileCard (adaptación TypeScript, reinterpretada como credencial).
 * Concepto original de David Haz: https://reactbits.dev/components/profile-card
 * Tarjeta con inclinación 3D según el puntero y un brillo holográfico que sigue al cursor.
 */
type ProfileCardProps = {
  image: string;
  name: string;
  role: string;
  meta: { label: string; value: string }[];
  code: string;
};

export function ProfileCard({ image, name, role, meta, code }: ProfileCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);

  const update = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", `${x * 100}%`);
      el.style.setProperty("--py", `${y * 100}%`);
      el.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
    });
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    update((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
    e.currentTarget.dataset.active = "true";
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    update(0.5, 0.5);
    e.currentTarget.dataset.active = "false";
  };

  return (
    <div className="pcard-wrap" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="pcard">
        <div className="pcard-head">
          <span className="pcard-chip" aria-hidden="true" />
          <span className="mono">CREDENCIAL · DEV</span>
          <span className="mono pcard-code">{code}</span>
        </div>
        <div className="pcard-photo">
          <img src={image} alt={`Retrato de ${name}`} width={720} height={900} />
        </div>
        <div className="pcard-body">
          <p className="pcard-name">{name}</p>
          <p className="pcard-role">{role}</p>
          <dl className="pcard-meta">
            {meta.map((m) => (
              <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
            ))}
          </dl>
          <div className="pcard-barcode" aria-hidden="true" />
        </div>
        <div className="pcard-holo" aria-hidden="true" />
        <div className="pcard-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
