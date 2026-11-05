"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CircularCarousel, {
  CircularCarouselHandle,
  Digits,
} from "@/components/react-bits/CircularCarousel";

export interface CarouselSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  projectName: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  featured?: boolean;
  className?: string;
}

/**
 * Interactive Project Carousel powered by React Bits CircularCarousel
 * (@react-bits/CircularCarousel-JS-CSS):
 * - 3D ring of bendable cards with momentum drag, snapping, parallax and click-to-focus
 * - Animated digit reel counter + slide tag + title + caption
 * - Synchronized Prev/Next arrows, indicator pills, and full-screen HD Lightbox modal
 */
export function Carousel({
  slides,
  projectName,
  autoplay = false,
  autoplayDelay = 4800,
  pauseOnHover = true,
  loop = true,
  featured = false,
  className,
}: CarouselProps) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const ringRef = React.useRef<CircularCarouselHandle | null>(null);

  const count = slides.length;

  const goTo = React.useCallback(
    (index: number) => {
      if (count <= 1) return;
      const target = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(count - 1, index));
      setActive(target);
      ringRef.current?.focusIndex(target);
    },
    [count, loop]
  );

  const step = React.useCallback(
    (delta: number) => {
      if (count <= 1) return;
      const next = ((active + delta) % count + count) % count;
      setActive(next);
      ringRef.current?.stepBy(delta);
    },
    [active, count]
  );

  // Close lightbox on Escape & navigate with arrows when lightbox is open
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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

  const circularItems = React.useMemo(
    () =>
      slides.map((s) => ({
        id: s.id,
        src: s.src,
        alt: s.alt,
        title: s.title,
        subtitle: s.tag,
        tag: s.tag,
        caption: s.caption,
      })),
    [slides]
  );

  if (count === 0) return null;
  const currentSlide = slides[active] ?? slides[0];

  return (
    <>
      <div
        className={cn("rb-carousel", featured && "rb-carousel--featured", className)}
        role="region"
        aria-roledescription="carrusel circular 3D"
        aria-label={`Galería interactiva 3D de ${projectName}`}
      >
        {/* Top bar inside carousel frame */}
        <div className="rb-carousel-topbar">
          <div className="rb-carousel-meta">
            <span className="rb-carousel-counter">
              <Digits value={active + 1} />
              <span className="rb-carousel-counter-sep">/</span>
              <span>{String(count).padStart(2, "0")}</span>
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

        {/* 3D CircularCarousel stage (@react-bits/CircularCarousel-JS-CSS) */}
        <div className="rb-carousel-viewport">
          <CircularCarousel
            ref={ringRef}
            items={circularItems}
            preset="cylinder"
            intro="rise"
            cardWidth={featured ? 310 : 255}
            aspectRatio={1.6}
            gap={22}
            curve={0.35}
            tilt={-4}
            autoplay={autoplay ? "step" : "off"}
            interval={autoplayDelay / 1000}
            pauseOnHover={pauseOnHover}
            draggable={true}
            snap={true}
            focusOnClick={true}
            fadeColor="#090e17"
            cornerRadius={10}
            captions={false}
            onChange={(index) => setActive(index)}
            onItemClick={(_, index) => {
              if (index === active) {
                setLightboxOpen(true);
              } else {
                setActive(index);
              }
            }}
          />

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

        {/* Footer with caption + indicator pills */}
        <div className="rb-carousel-footer">
          <div className="rb-carousel-caption-wrap">
            <strong className="rb-carousel-title">{currentSlide.title}</strong>
            <p className="rb-carousel-caption">{currentSlide.caption}</p>
          </div>

          {count > 1 && (
            <div
              className="rb-carousel-dots"
              role="tablist"
              aria-label={`Seleccionar captura de ${projectName}`}
            >
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
                  className="rb-lightbox-nav rb-lightbox-nav-prev"
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
                  className="rb-lightbox-nav rb-lightbox-nav-next"
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

export const ProjectCarousel = Carousel;

