"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * React Bits — Carousel (adaptación TypeScript + controles accesibles y vista ampliada).
 * Basado en el registro oficial de React Bits (`https://reactbits.dev/r/Carousel-TS-TW.json`)
 * por David Haz (https://reactbits.dev — licencia MIT + Commons Clause).
 */
export interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
  caption: string;
}

export interface ProjectCarouselProps {
  slides: CarouselSlide[];
  projectName: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  className?: string;
}

export function ProjectCarousel({
  slides,
  projectName,
  autoplay = false,
  autoplayDelay = 5200,
  pauseOnHover = true,
  loop = true,
  className,
}: ProjectCarouselProps) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; pointerId: number; moved: boolean } | null>(null);

  const wrapIndex = useCallback(
    (index: number) => {
      if (count <= 0) return 0;
      if (loop) return ((index % count) + count) % count;
      return Math.max(0, Math.min(count - 1, index));
    },
    [count, loop]
  );

  const goTo = useCallback(
    (index: number) => {
      setActive(wrapIndex(index));
      setDragOffset(0);
    },
    [wrapIndex]
  );

  const step = useCallback(
    (direction: number) => {
      setActive((prev) => wrapIndex(prev + direction));
      setDragOffset(0);
    },
    [wrapIndex]
  );

  useEffect(() => {
    if (!autoplay || count <= 1 || (pauseOnHover && isHovered) || lightboxOpen || isDragging) {
      return;
    }
    const timer = window.setInterval(() => {
      step(1);
    }, Math.max(2000, autoplayDelay));
    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, count, isDragging, isHovered, lightboxOpen, pauseOnHover, step]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setLightboxOpen(false);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, step]);

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (count <= 1) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement)?.closest("button")) return;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
      moved: false,
    };
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const drag = dragStartRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;

    if (!drag.moved) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        dragStartRef.current = null;
        return;
      }
      drag.moved = true;
      setIsDragging(true);
      viewportRef.current?.setPointerCapture?.(event.pointerId);
    }

    setDragOffset(dx);
  };

  const handlePointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    const drag = dragStartRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    dragStartRef.current = null;
    setIsDragging(false);

    if (!drag.moved) return;
    const width = viewportRef.current?.clientWidth ?? 320;
    const threshold = Math.min(90, width * 0.16);
    if (dragOffset <= -threshold) {
      step(1);
    } else if (dragOffset >= threshold) {
      step(-1);
    } else {
      setDragOffset(0);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  if (count === 0) return null;
  const currentSlide = slides[active] ?? slides[0];

  return (
    <>
      <div
        className={cn("rb-carousel", className)}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Galería de evidencias de ${projectName}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top bar inside carousel frame */}
        <div className="rb-carousel-topbar">
          <div className="rb-carousel-meta">
            <span className="rb-carousel-counter">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <span className="rb-carousel-tag">{currentSlide.tag}</span>
          </div>
          <button
            type="button"
            className="rb-carousel-expand"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Ampliar captura: ${currentSlide.title}`}
            title="Ver imagen en alta definición"
          >
            <Expand className="h-3.5 w-3.5" />
            <span>HD</span>
          </button>
        </div>

        {/* Swipeable stage */}
        <div
          ref={viewportRef}
          className={cn("rb-carousel-viewport", isDragging && "is-dragging")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          <div
            className={cn("rb-carousel-track", !isDragging && "is-animated")}
            style={{
              transform: `translate3d(calc(${-active * 100}% + ${dragOffset}px), 0, 0)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="rb-carousel-slide"
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${count}: ${slide.title}`}
                aria-hidden={index !== active}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="rb-carousel-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  onClick={() => {
                    if (!isDragging) setLightboxOpen(true);
                  }}
                />
              </div>
            ))}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                className="rb-carousel-arrow rb-carousel-arrow-prev"
                onClick={() => step(-1)}
                aria-label={`Captura anterior de ${projectName}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rb-carousel-arrow rb-carousel-arrow-next"
                onClick={() => step(1)}
                aria-label={`Siguiente captura de ${projectName}`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Footer with caption + React Bits indicator bars/dots */}
        <div className="rb-carousel-footer">
          <div className="rb-carousel-caption-wrap">
            <strong className="rb-carousel-title">{currentSlide.title}</strong>
            <p className="rb-carousel-caption">{currentSlide.caption}</p>
          </div>

          {count > 1 && (
            <div className="rb-carousel-dots" role="tablist" aria-label={`Seleccionar captura de ${projectName}`}>
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Ir a captura ${index + 1}: ${slide.title}`}
                  className={cn("rb-carousel-dot", index === active && "is-active")}
                  onClick={() => goTo(index)}
                >
                  <span className="rb-carousel-dot-pill" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* High-Definition Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="rb-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${projectName}: ${currentSlide.title}`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="rb-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="rb-lightbox-header">
              <div className="rb-lightbox-header-info">
                <span className="rb-carousel-counter">
                  {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
                <span className="rb-carousel-tag">{currentSlide.tag}</span>
                <strong className="rb-lightbox-title">
                  {projectName} — {currentSlide.title}
                </strong>
              </div>
              <button
                type="button"
                className="rb-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label="Cerrar vista ampliada"
              >
                <X className="h-4 w-4" />
                <span>Cerrar</span>
              </button>
            </div>

            <div className="rb-lightbox-stage">
              {count > 1 && (
                <button
                  type="button"
                  className="rb-lightbox-nav rb-lightbox-nav--prev"
                  onClick={() => step(-1)}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <img
                src={currentSlide.src}
                alt={currentSlide.alt}
                className="rb-lightbox-image"
                decoding="async"
              />

              {count > 1 && (
                <button
                  type="button"
                  className="rb-lightbox-nav rb-lightbox-nav--next"
                  onClick={() => step(1)}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="rb-lightbox-footer">
              <p className="rb-lightbox-caption">{currentSlide.caption}</p>
              <div className="rb-carousel-dots">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Ir a captura ${index + 1}: ${slide.title}`}
                    className={cn("rb-carousel-dot", index === active && "is-active")}
                    onClick={() => goTo(index)}
                  >
                    <span className="rb-carousel-dot-pill" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
