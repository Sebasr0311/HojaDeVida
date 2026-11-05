"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Layers,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Stack, { type StackLayout } from "./Stack";
import GlareHover from "./GlareHover";

export interface CertificateItem {
  id: string;
  index: string;
  badge: string;
  title: string;
  shortTitle: string;
  issuer: string;
  organization: string;
  date: string;
  metric: string;
  summary: string;
  skills: string[];
  cardImageSrc: string;
  fullImageSrc: string;
  pdfUrl: string;
  accentColor: string;
}

interface CertificateShowcaseProps {
  certificates: CertificateItem[];
}

const LAYOUT_OPTIONS: { value: StackLayout; label: string }[] = [
  { value: "cascade", label: "Cascada 3D" },
  { value: "fan", label: "Abanico" },
  { value: "deck", label: "Mazo" },
];

export function CertificateShowcase({ certificates }: CertificateShowcaseProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [stackLayout, setStackLayout] = React.useState<StackLayout>("cascade");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState<"hd" | "pdf">("hd");
  const [zoomed, setZoomed] = React.useState(false);

  const count = certificates.length;
  const activeCert = certificates[activeIndex] ?? certificates[0];

  const selectCert = React.useCallback(
    (index: number) => {
      if (count === 0) return;
      const normalized = ((index % count) + count) % count;
      setActiveIndex(normalized);
    },
    [count]
  );

  const openViewer = React.useCallback(
    (index: number, mode: "hd" | "pdf" = "hd") => {
      selectCert(index);
      setModalMode(mode);
      setZoomed(false);
      setModalOpen(true);
    },
    [selectCert]
  );

  React.useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % count);
        setZoomed(false);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + count) % count);
        setZoomed(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen, count]);

  if (!activeCert) return null;

  const stackCards = certificates.map((cert, idx) => (
    <div key={cert.id} className="cert-stack-card-inner">
      <div className="cert-stack-card-topbar">
        <span className="cert-stack-pill">
          <ShieldCheck size={13} />
          <span>{cert.issuer}</span>
        </span>
        <span className="cert-stack-metric">{cert.metric}</span>
      </div>
      <div className="cert-stack-image-stage">
        <img
          src={cert.cardImageSrc}
          alt={`Vista previa del certificado ${cert.title}`}
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>
      <div className="cert-stack-card-footer">
        <div className="cert-stack-card-meta">
          <span className="cert-stack-index">{cert.index} / CREDENCIAL</span>
          <strong>{cert.shortTitle}</strong>
          <span>{cert.date}</span>
        </div>
        <div className="cert-stack-card-actions">
          <button
            type="button"
            className="cert-stack-expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              openViewer(idx, "hd");
            }}
            aria-label={`Ampliar certificado ${cert.title}`}
          >
            <Maximize2 size={14} />
            <span>Ver HD</span>
          </button>
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-stack-pdf-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Abrir PDF original de ${cert.title}`}
          >
            <FileText size={14} />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="cert-showcase">
      <div className="cert-showcase-grid">
        {/* Left column: Interactive Credential List */}
        <div className="cert-list-column">
          <div className="cert-list-header">
            <div className="cert-list-title-row">
              <span className="cert-list-kicker">
                <Award size={16} /> CREDENCIALES Y CERTIFICACIONES OFICIALES
              </span>
              <span className="cert-list-counter">
                0{activeIndex + 1} / 0{count}
              </span>
            </div>
            <p className="cert-list-subtitle">
              Selecciona una certificación para traerla al frente del mazo 3D interactivo, inspeccionarla en alta definición o descargar el PDF original.
            </p>
          </div>

          <div className="cert-animated-list" role="listbox" aria-label="Lista de certificados">
            {certificates.map((cert, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <GlareHover
                  key={cert.id}
                  width="100%"
                  height="auto"
                  borderRadius="16px"
                  glareColor="#5a72e6"
                  glareOpacity={0.12}
                  variant="sheen"
                  rimGlint={true}
                >
                  <div
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className={`cert-list-item ${isSelected ? "is-selected" : ""}`}
                    onClick={() => selectCert(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectCert(idx);
                      }
                    }}
                  >
                    <div className="cert-list-badge-col">
                      <span className="cert-list-badge">{cert.badge}</span>
                      <span className="cert-list-verified" title="Documento verificado">
                        <CheckCircle2 size={13} />
                      </span>
                    </div>

                    <div className="cert-list-body">
                      <div className="cert-list-top">
                        <span className="cert-list-issuer">{cert.issuer}</span>
                        <span className="cert-list-metric-pill">{cert.metric}</span>
                      </div>
                      <strong className="cert-list-name">{cert.title}</strong>
                      <span className="cert-list-org">
                        {cert.organization} · {cert.date}
                      </span>
                      <div className="cert-list-skills">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="cert-skill-chip">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="cert-list-item-actions">
                      <button
                        type="button"
                        className="cert-row-btn cert-row-btn--view"
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewer(idx, "hd");
                        }}
                        aria-label={`Inspeccionar ${cert.title} en pantalla completa`}
                        title="Inspeccionar certificado en HD"
                      >
                        <Eye size={15} />
                        <span>Ver</span>
                      </button>
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-row-btn cert-row-btn--pdf"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Abrir PDF de ${cert.title}`}
                        title="Abrir archivo PDF original"
                      >
                        <FileText size={15} />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                </GlareHover>
              );
            })}
          </div>
        </div>

        {/* Right column: React Bits 3D Stack + Active Inspector */}
        <div className="cert-stage-column">
          <div className="cert-stage-shell">
            <div className="cert-stage-toolbar">
              <div className="cert-stage-status">
                <span className="cert-stage-dot" />
                <span>
                  <strong>{activeCert.index}</strong> / 0{count} · {activeCert.issuer}
                </span>
              </div>

              <div className="cert-stage-controls">
                <div className="cert-layout-switcher" role="group" aria-label="Disposición del mazo 3D">
                  <Layers size={13} className="cert-layout-icon" />
                  {LAYOUT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`cert-layout-btn ${stackLayout === opt.value ? "is-active" : ""}`}
                      onClick={() => setStackLayout(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="cert-stack-viewport">
              <div className="cert-stack-wrapper">
                <Stack
                  cards={stackCards}
                  activeIndex={activeIndex}
                  layout={stackLayout}
                  visible={3}
                  spread={0.58}
                  depth={0.48}
                  radius={18}
                  frame={7}
                  frameColor="#ffffff"
                  shadow={true}
                  tilt={20}
                  threshold={75}
                  speed={1.05}
                  sendToBackOnClick={true}
                  autoplay={false}
                  onChange={setActiveIndex}
                />
              </div>
            </div>

            <div className="cert-stage-detail-bar">
              <div className="cert-stage-detail-copy">
                <div className="cert-stage-detail-eyebrow">
                  <Sparkles size={13} />
                  <span>Arrastra o haz clic sobre el certificado para pasar al siguiente</span>
                </div>
                <h4>{activeCert.title}</h4>
                <p>{activeCert.summary}</p>
              </div>

              <div className="cert-stage-detail-buttons">
                <button
                  type="button"
                  className="cert-primary-action"
                  onClick={() => openViewer(activeIndex, "hd")}
                >
                  <Maximize2 size={15} />
                  <span>Inspeccionar HD</span>
                </button>
                <button
                  type="button"
                  className="cert-secondary-action"
                  onClick={() => openViewer(activeIndex, "pdf")}
                >
                  <FileText size={15} />
                  <span>Visor PDF</span>
                </button>
                <a
                  href={activeCert.pdfUrl}
                  download
                  className="cert-download-action"
                  aria-label={`Descargar PDF de ${activeCert.title}`}
                  title="Descargar PDF original"
                >
                  <Download size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Credential & PDF Modal Viewer */}
      {modalOpen && (
        <div
          className="rb-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de certificado: ${activeCert.title}`}
          onClick={() => setModalOpen(false)}
        >
          <div className="rb-lightbox-panel cert-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="rb-lightbox-header cert-modal-header">
              <div className="rb-lightbox-meta">
                <span className="rb-carousel-badge">{activeCert.issuer}</span>
                <span className="rb-carousel-counter">
                  {activeCert.index} / 0{count} · {activeCert.metric}
                </span>
              </div>

              <div className="cert-modal-tabs" role="tablist" aria-label="Modo de visualización">
                <button
                  type="button"
                  role="tab"
                  aria-selected={modalMode === "hd"}
                  className={`cert-modal-tab ${modalMode === "hd" ? "is-active" : ""}`}
                  onClick={() => setModalMode("hd")}
                >
                  <Eye size={14} />
                  <span>Documento HD</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={modalMode === "pdf"}
                  className={`cert-modal-tab ${modalMode === "pdf" ? "is-active" : ""}`}
                  onClick={() => setModalMode("pdf")}
                >
                  <FileText size={14} />
                  <span>Visor PDF Original</span>
                </button>
              </div>

              <div className="rb-lightbox-actions">
                {modalMode === "hd" && (
                  <button
                    type="button"
                    className="rb-carousel-effect-btn"
                    onClick={() => setZoomed((z) => !z)}
                    title={zoomed ? "Ajustar a pantalla" : "Ampliar detalle"}
                  >
                    {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                    <span>{zoomed ? "Ajustar" : "Zoom +"}</span>
                  </button>
                )}
                <a
                  href={activeCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rb-carousel-effect-btn"
                  title="Abrir PDF en una nueva pestaña"
                >
                  <ExternalLink size={14} />
                  <span>Abrir PDF</span>
                </a>
                <button
                  type="button"
                  className="rb-carousel-nav-btn"
                  onClick={() => {
                    selectCert(activeIndex - 1);
                    setZoomed(false);
                  }}
                  aria-label="Certificado anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="rb-carousel-nav-btn"
                  onClick={() => {
                    selectCert(activeIndex + 1);
                    setZoomed(false);
                  }}
                  aria-label="Siguiente certificado"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  type="button"
                  className="rb-carousel-nav-btn rb-lightbox-close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Cerrar visor"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className={`rb-lightbox-stage cert-modal-stage ${zoomed ? "is-zoomed" : ""}`}>
              {modalMode === "hd" ? (
                <img
                  src={activeCert.fullImageSrc}
                  alt={`Certificado completo: ${activeCert.title}`}
                  className={`rb-lightbox-image cert-modal-image ${zoomed ? "is-zoomed" : ""}`}
                  onClick={() => setZoomed((z) => !z)}
                />
              ) : (
                <iframe
                  src={activeCert.pdfUrl}
                  title={`PDF original de ${activeCert.title}`}
                  className="cert-modal-pdf-frame"
                />
              )}
            </div>

            <div className="rb-lightbox-footer cert-modal-footer">
              <div>
                <h4>{activeCert.title}</h4>
                <p>
                  {activeCert.organization} · Expedido: {activeCert.date} — {activeCert.summary}
                </p>
              </div>
              <div className="cert-modal-footer-links">
                <a
                  href={activeCert.pdfUrl}
                  download
                  className="cert-primary-action"
                >
                  <Download size={15} />
                  <span>Descargar PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
