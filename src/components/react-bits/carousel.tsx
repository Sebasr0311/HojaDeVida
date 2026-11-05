"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, Layers, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactBitsCarousel, {
  type CarouselEffect,
  type ReactBitsCarouselHandle,
} from "@/components/react-bits/ReactBitsCarousel";

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
  defaultEffect?: CarouselEffect;
  className?: string;
}

const EFFECT_CYCLE: { id: CarouselEffect; label: string }[] = [
  { id: "scale", label: "Scale" },
  { id: "tilt", label: "3D Tilt" },
  { id: "cube", label: "Cube" },
  { id: "slide", label: "Slide" },
];

/**
 * Interactive Project Carousel powered by React Bits Carousel (@react-bits/Carousel-TS-CSS):
 * - Full-width 16:10 high-definition stage with peeking adjacent cards & spring momentum
 * - Switchable React Bits transition physics (Scale, 3D Tilt, Cube, Slide)
 * - Autoplay progress bar indicators, keyboard/drag/wheel navigation, and HD Lightbox Modal
 */
export function Carousel({
  slides,
  projectName,
  autoplay = true,
  autoplayDelay = 4800,
  pauseOnHover = true,
  loop = true,
  featured = false,
  defaultEffect = "scale",
  className,
}: CarouselProps) {
  const [active, setActive] = React.useState(0);
  const [effect, setEffect] = React.useState<CarouselEffect>(defaultEffect);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const carouselRef = React.useRef<ReactBitsCarouselHandle | null>(null);

  const count = slides.length;

  const goTo = React.useCallback(
    (index: number) => {
      if (count <= 1) return;
      const target = loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(count - 1, index));
      setActive(target);
      carouselRef.current?.goTo(target);
    },
    [count, loop]
  );

  const step = React.useCallback(
    (delta: number) => {
      if (count <= 1) return;
      const next = ((active + delta) % count + count) % count;
      setActive(next);
      carouselRef.current?.step(delta);
    },
    [active, count]
  );

  const cycleEffect = React.useCallback(() => {
    setEffect((prev) => {
      const idx = EFFECT_CYCLE.findIndex((e) => e.id === prev);
      return EFFECT_CYCLE[(idx + 1) % EFFECT_CYCLE.length].id;
    });
  }, []);

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, step]);

  const items = React.useMemo(
    () =>
      slides.map((s) => ({
        id: s.id,
        image: s.src,
        alt: s.alt,
      })),
    [slides]
  );

  if (count === 0) return null;
  const currentSlide = slides[active] ?? slides[0];
  const currentEffectLabel =
    EFFECT_CYCLE.find((e) => e.id === effect)?.label ?? "Scale";

  return (
    <>
      <div
        className={cn("rb-carousel", featured && "rb-carousel--featured", className)}
        role="region"
        aria-roledescription="carrusel interactivo"
        aria-label={`Galería interactiva de ${projectName}`}
      >
        {/* Top bar inside carousel frame */}
        <div className="rb-carousel-topbar">
          <div className="rb-carousel-meta">
            <span className="rb-carousel-counter">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span className="rb-carousel-counter-sep">/</span>
              <span>{String(count).padStart(2, "0")}</span>
            </span>
            <span className="rb-carousel-tag">{currentSlide.tag}</span>
          </div>
          <div className="rb-carousel-actions">
            <button
              type="button"
              className="rb-carousel-effect-btn"
              onClick={cycleEffect}
              aria-label={`Cambiar transición del carrusel (actual: ${currentEffectLabel})`}
              title="Cambiar efecto de transición React Bits"
            >
              <Layers className="h-3 w-3" />
              <span>{currentEffectLabel}</span>
            </button>
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
        </div>

        {/* React Bits Carousel Stage (@react-bits/Carousel-TS-CSS) */}
        <div className="rb-carousel-viewport">
          <div className="rb-carousel-stage-inner">
            <ReactBitsCarousel
              ref={carouselRef}
              items={items}
              baseWidth="100%"
              aspectRatio={1.6}
              peek={featured ? 28 : 20}
              gap={featured ? 14 : 10}
              radius={10}
              frame={false}
              effect={effect}
              indicator="bars"
              arrows={false}
              autoplay={autoplay && !lightboxOpen}
              autoplayDelay={autoplayDelay}
              pauseOnHover={pauseOnHover}
              loop={loop}
              draggable={true}
              theme="dark"
              onChange={(index) => setActive(index)}
              onActiveClick={() => setLightboxOpen(true)}
            />
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

        {/* Footer with caption + quick slide selector pills */}
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

      {/* High-Definition Lightbox Modal — portaled to <body> so transformed ancestors
          (e.g. `.project-card:hover { transform }`) cannot become its containing block. */}
      {lightboxOpen && typeof document !== "undefined" && createPortal(
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
        </div>,
        document.body
      )}
    </>
  );
}

export const ProjectCarousel = Carousel;
