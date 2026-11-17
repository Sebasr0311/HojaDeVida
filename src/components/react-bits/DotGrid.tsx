"use client";

import * as React from "react";

/**
 * React Bits — DotGrid (implementación ligera en canvas 2D, sin dependencias).
 * Concepto original de David Haz: https://reactbits.dev/backgrounds/dot-grid
 * Una malla de puntos que se ilumina y se aparta alrededor del puntero.
 * Se detiene fuera de pantalla y respeta prefers-reduced-motion.
 */
type DotGridProps = {
  gap?: number;
  size?: number;
  baseColor?: string;
  activeColor?: string;
  radius?: number;
  push?: number;
  className?: string;
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function DotGrid({ gap = 28, size = 1.6, baseColor = "#2a2a2e", activeColor = "#ff6b35", radius = 160, push = 10, className }: DotGridProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const base = hexToRgb(baseColor);
    const active = hexToRgb(activeColor);
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const offX = (w % gap) / 2, offY = (h % gap) / 2;
      for (let y = offY; y <= h; y += gap) {
        for (let x = offX; x <= w; x += gap) {
          const dx = x - pointer.x, dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          let t = dist < radius ? 1 - dist / radius : 0;
          t = t * t;
          const px = dist > 0 ? x + (dx / dist) * push * t : x;
          const py = dist > 0 ? y + (dy / dist) * push * t : y;
          const r = Math.round(base[0] + (active[0] - base[0]) * t);
          const g = Math.round(base[1] + (active[1] - base[1]) * t);
          const b = Math.round(base[2] + (active[2] - base[2]) * t);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.beginPath();
          ctx.arc(px, py, size + t * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.16;
      pointer.y += (pointer.ty - pointer.y) * 0.16;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left; pointer.ty = e.clientY - rect.top;
      if (pointer.x < -1000) { pointer.x = pointer.tx; pointer.y = pointer.ty; }
    };
    const onLeave = () => { pointer.tx = -9999; pointer.ty = -9999; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(loop);
      });
      io.observe(canvas);
    }
    return () => {
      ro.disconnect(); io?.disconnect(); cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [gap, size, baseColor, activeColor, radius, push]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
