"use client";
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { ArrowUpRight, Award, Download, FileText, Github, GraduationCap, Linkedin, Mail, MessageCircle } from "lucide-react";
import { CERTIFICATES, EDUCATION, LINKS, SKILL_GROUPS } from "@/data/portfolio";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { Magnet } from "@/components/react-bits/Magnet";
import { BlurText } from "@/components/react-bits/BlurText";
import { Reveal, useLightbox } from "@/components/media";
import { Chips, Eyebrow } from "./shared";

export function Stack() {
  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="section-head">
          <Eyebrow index="08" label="STACK Y CONOCIMIENTOS" />
          <Reveal>
            <h2 id="stack-title" className="h2">El stack es el medio. <span className="serif">La solución es el objetivo.</span></h2>
          </Reveal>
        </div>
        <div className="bento">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.id} delay={i * 60} className={`bento-cell bento-cell--${g.id}`}>
              <SpotlightCard className="bento-card" spotlightColor="rgba(255, 255, 255, 0.65)">
                <span className="mono bento-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{g.title}</h3>
                <p>{g.lead}</p>
                <Chips items={g.items} className="chips--sm" />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <p className="muted small stack-note">Actualmente ampliando conocimientos en Angular. La profundidad varía entre tecnologías; los proyectos de arriba muestran dónde las he usado.</p>
      </div>
    </section>
  );
}

export function Journey() {
  const open = useLightbox();
  const shots = CERTIFICATES.map((c) => ({ src: c.image, alt: c.title, title: c.title, caption: `${c.issuer} · ${c.date}` }));
  return (
    <section className="section journey" id="trayectoria" aria-labelledby="journey-title">
      <div className="wrap journey-grid">
        <div>
          <Eyebrow index="09" label="TRAYECTORIA" />
          <Reveal><h2 id="journey-title" className="h2">Aprender, construir <span className="serif">y respaldarlo.</span></h2></Reveal>
          <ol className="timeline">
            {EDUCATION.map((e) => (
              <Reveal as="li" key={e.title}>
                <span className="mono">{e.period}</span>
                <h3><GraduationCap size={17} /> {e.title}</h3>
                <p>{e.place}</p>
                <p className="muted small">{e.note}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="certs">
          <p className="mono kicker"><Award size={14} /> Certificaciones verificables</p>
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.id} delay={i * 80} className="cert" >
              <button type="button" className="cert-thumb" onClick={() => open(shots, i)} aria-label={`Ver certificado: ${c.title}`} style={{ "--cert": c.accent } as React.CSSProperties}>
                <img src={c.image} alt="" loading="lazy" />
              </button>
              <div className="cert-body">
                <span className="mono" style={{ color: c.accent }}>{c.metric}</span>
                <h3>{c.title}</h3>
                <p className="muted small">{c.issuer} · {c.date}</p>
                <p className="cert-summary">{c.summary}</p>
                <a className="link-arrow" href={c.pdf} target="_blank" rel="noopener noreferrer"><FileText size={14} /> PDF oficial <ArrowUpRight size={14} /></a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="wrap">
        <Eyebrow index="10" label="CONTACTO" />
        <h2 id="contact-title" className="contact-title">
          <BlurText as="span" text="¿Tienes un reto?" />
          <BlurText as="span" className="serif" text="Construyamos la solución." delay={0.3} />
        </h2>
        <div className="contact-grid">
          <p className="contact-text">Abierto a patrocinio y contrato de aprendizaje SENA, equipos de desarrollo y proyectos donde la tecnología cree valor real. Actualmente en etapa lectiva: el inicio de la etapa productiva requiere autorización institucional.</p>
          <div className="contact-actions">
            <Magnet padding={50} magnetStrength={3.4}>
              <a className="btn btn--primary btn--lg" href={LINKS.email}><Mail size={18} /> {LINKS.emailAddress}</a>
            </Magnet>
            <div className="contact-links">
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WhatsApp <ArrowUpRight size={14} /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer"><Download size={17} /> Hoja de vida PDF <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer wrap">
        <span className="nav-mark">JS</span>
        <span>© {new Date().getFullYear()} Juan Sebastián Rincón Farelo · Valledupar, Colombia</span>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </section>
  );
}
