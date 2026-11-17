"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { ArrowUpRight, Lock, Smartphone } from "lucide-react";
import { MOBILE_PROJECTS, type MobileProject } from "@/data/portfolio";
import { Phone, Reveal, useLightbox } from "@/components/media";
import { Chips, Eyebrow, StatusPill } from "./shared";

function ScreenStrip({ project }: { project: MobileProject }) {
  const open = useLightbox();
  const all = [...project.store, ...project.admin];
  return (
    <div className="strip">
      <p className="mono kicker">Todas las pantallas · toca para ampliar</p>
      <ul className="strip-row">
        {all.map((s, i) => (
          <li key={s.src}>
            <button type="button" onClick={() => open(all, i, "phone")} aria-label={`Ampliar: ${s.title}`}>
              <img src={s.src} alt="" loading="lazy" width={780} height={1328} />
              <span>{i < project.store.length ? "Tienda" : "Admin"} · {s.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileCase({ project, flip }: { project: MobileProject; flip?: boolean }) {
  return (
    <article className={`mcase mcase--${project.id}`} style={{ "--case-accent": project.accent, "--case-surface": project.surface } as React.CSSProperties} aria-labelledby={`${project.id}-title`}>
      <div className={`mcase-grid ${project.video ? "is-wide" : flip ? "is-flipped" : ""}`}>
        <div className="mcase-copy">
          <div className="mcase-intro">
          <p className="mono mcase-index">{project.index} · {project.kind}</p>
          <h3 id={`${project.id}-title`} className="mcase-title">
            {project.name}
            {project.formerly && <span className="mcase-formerly">antes {project.formerly}</span>}
          </h3>
          <p className="mcase-tagline">{project.tagline}</p>
          <p className="mcase-summary">{project.summary}</p>
          <div className="mcase-meta">
            <StatusPill tone="build">{project.status}</StatusPill>
            <a className="link-arrow" href={project.url} target="_blank" rel="noopener noreferrer">Abrir la tienda en el celular <ArrowUpRight size={15} /></a>
          </div>
          </div>
          <div className="mcase-details">
          <ul className="mcase-highlights">
            {project.highlights.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <span>{h.body}</span>
              </li>
            ))}
          </ul>
          <Chips items={project.stack} className="chips--sm" />
          <p className="muted small mcase-note"><Lock size={12} /> Repositorio privado. {project.note}</p>
          </div>
        </div>

        <div className="mcase-stage">
          <div className="mcase-backdrop" aria-hidden="true" />
          <div className={`phones ${project.video ? "phones--three" : ""}`}>
            {project.video && (
              <Phone video={project.video} label="Probador · en vivo" className="phone--hero" accent={project.accent} />
            )}
            <Phone shots={project.store} label="Tienda · cliente" accent={project.accent} delay={3600} className={project.video ? "phone--side" : "phone--hero"} />
            <Phone shots={project.admin} label="Panel admin · dueña" accent={project.accent} delay={4200} className="phone--side" />
          </div>
        </div>
      </div>
      <ScreenStrip project={project} />
    </article>
  );
}

export function MobileCommerce() {
  return (
    <section className="section mobile" id="movil" aria-labelledby="mobile-title">
      <div className="wrap">
        <div className="section-head">
          <Eyebrow index="02—03" label="COMERCIO MÓVIL · CLIENTES REALES" />
          <Reveal>
            <h2 id="mobile-title" className="h2">
              Tiendas diseñadas <span className="serif">para el pulgar</span>, con su panel de administración incluido.
            </h2>
          </Reveal>
          <Reveal className="section-lede" delay={100}>
            <p><Smartphone size={16} /> Casi todos los pedidos llegan desde un teléfono, así que ambas tiendas se diseñaron primero para móvil: hojas deslizables, botones al alcance del pulgar y cierre por WhatsApp. Las dueñas operan el negocio desde una app instalable en su iPhone.</p>
          </Reveal>
        </div>
        {MOBILE_PROJECTS.map((p, i) => (
          <Reveal key={p.id}><MobileCase project={p} flip={i % 2 === 1} /></Reveal>
        ))}
      </div>
    </section>
  );
}
