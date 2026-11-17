"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Shot } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/* ───────────── Lightbox ───────────── */

type LightboxState = { shots: Shot[]; index: number; variant: "phone" | "wide" } | null;
const LightboxContext = React.createContext<(s: Shot[], i: number, variant?: "phone" | "wide") => void>(() => {});
export const useLightbox = () => React.useContext(LightboxContext);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<LightboxState>(null);
  const open = React.useCallback((shots: Shot[], index: number, variant: "phone" | "wide" = "wide") => setState({ shots, index, variant }), []);
  const close = () => setState(null);
  const go = React.useCallback((d: number) => setState((s) => (s ? { ...s, index: (s.index + d + s.shots.length) % s.shots.length } : s)), []);

  React.useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [state, go]);

  const shot = state?.shots[state.index];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {state && shot && (
            <motion.div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={shot.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            >
              <div className="lightbox-top" onClick={(e) => e.stopPropagation()}>
                <span className="mono">{String(state.index + 1).padStart(2, "0")} / {String(state.shots.length).padStart(2, "0")}</span>
                <button type="button" className="icon-btn" onClick={close} aria-label="Cerrar" autoFocus><X size={18} /></button>
              </div>
              <figure className={cn("lightbox-figure", state.variant === "phone" && "is-phone")} onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  />
                </AnimatePresence>
                <figcaption>
                  <strong>{shot.title}</strong>
                  {shot.caption && <span>{shot.caption}</span>}
                </figcaption>
              </figure>
              {state.shots.length > 1 && (
                <>
                  <button type="button" className="icon-btn lightbox-nav lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior"><ChevronLeft size={20} /></button>
                  <button type="button" className="icon-btn lightbox-nav lightbox-nav--next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Siguiente"><ChevronRight size={20} /></button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </LightboxContext.Provider>
  );
}

/* ───────────── Auto-cycling index ───────────── */

export function useCycle(length: number, delay: number, ref: React.RefObject<Element | null>) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduce = useReducedMotion();
  React.useEffect(() => {
    if (paused || !inView || reduce || length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % length), delay);
    return () => window.clearTimeout(id);
  }, [index, paused, inView, reduce, length, delay]);
  return { index, setIndex, paused, setPaused, running: !paused && inView && !reduce && length > 1 };
}

/* ───────────── Phone frame ───────────── */

type PhoneProps = {
  shots?: Shot[];
  video?: { mp4: string; webm: string; poster: string; label: string };
  label?: string;
  delay?: number;
  className?: string;
  accent?: string;
};

export function Phone({ shots = [], video, label, delay = 3800, className, accent }: PhoneProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { index, setIndex, setPaused, running } = useCycle(video ? 0 : shots.length, delay, ref);
  const openLightbox = useLightbox();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  const shot = shots[index];

  return (
    <div
      ref={ref}
      className={cn("phone", className)}
      style={accent ? ({ "--phone-accent": accent } as React.CSSProperties) : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="phone-body">
        <div className="phone-island" aria-hidden="true" />
        <div className="phone-screen">
          {video ? (
            <video ref={videoRef} muted loop playsInline preload="metadata" poster={video.poster} aria-label={video.label}>
              <source src={video.webm} type="video/webm" />
              <source src={video.mp4} type="video/mp4" />
            </video>
          ) : (
            <button type="button" className="phone-hit" onClick={() => openLightbox(shots, index, "phone")} aria-label={`Ampliar: ${shot?.title ?? ""}`}>
              <AnimatePresence initial={false}>
                {shot && (
                  <motion.img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
              <span className="phone-expand" aria-hidden="true"><Expand size={14} /></span>
            </button>
          )}
        </div>
      </div>
      <div className="phone-caption">
        <span className="mono">{label}</span>
        <strong>{video ? video.label : shot?.title}</strong>
        {!video && shots.length > 1 && (
          <div className="phone-dots" role="tablist" aria-label={`Pantallas de ${label}`}>
            {shots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.title}
                className={cn("phone-dot", i === index && "is-active", i === index && running && "is-running")}
                style={{ "--dur": `${delay}ms` } as React.CSSProperties}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────── Browser frame ───────────── */

export function Browser({ shots, url, className, delay = 4800, tabs = false }: { shots: Shot[]; url?: string; className?: string; delay?: number; tabs?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { index, setIndex, setPaused, running } = useCycle(shots.length, delay, ref);
  const openLightbox = useLightbox();
  const shot = shots[index];
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "localhost";

  return (
    <div ref={ref} className={cn("browser", className)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="browser-bar">
        <span className="browser-lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="browser-url mono">{host}</span>
        <span className="browser-count mono">{String(index + 1).padStart(2, "0")}/{String(shots.length).padStart(2, "0")}</span>
      </div>
      <button type="button" className="browser-view" onClick={() => openLightbox(shots, index)} aria-label={`Ampliar: ${shot.title}`}>
        <AnimatePresence initial={false}>
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        </AnimatePresence>
        <span className="browser-expand"><Expand size={14} /> Ampliar</span>
      </button>
      {tabs ? (
        <div className="browser-tabs" role="tablist" aria-label="Pantallas">
          {shots.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === index} className={cn("browser-tab", i === index && "is-active", i === index && running && "is-running")} style={{ "--dur": `${delay}ms` } as React.CSSProperties} onClick={() => setIndex(i)}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="browser-progress" role="tablist" aria-label="Pantallas">
          {shots.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === index} aria-label={s.title} className={cn("phone-dot", i === index && "is-active", i === index && running && "is-running")} style={{ "--dur": `${delay}ms` } as React.CSSProperties} onClick={() => setIndex(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────────── Reveal on scroll ───────────── */

export function Reveal({ children, className, delay = 0, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "article" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}
