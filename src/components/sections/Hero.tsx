"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { BlurText } from "@/components/react-bits/BlurText";
import { DotGrid } from "@/components/react-bits/DotGrid";
import { ProfileCard } from "@/components/react-bits/ProfileCard";
import { Magnet } from "@/components/react-bits/Magnet";
import { ShinyText } from "@/components/react-bits/ShinyText";
import { CountUp } from "@/components/react-bits/CountUp";
import { LINKS } from "@/data/portfolio";

const STATS = [
  { to: 7, pad: 2, label: "proyectos publicados" },
  { to: 3, pad: 2, label: "negocios reales atendidos" },
  { to: 30, prefix: "+", label: "módulos de dominio en SAED" },
  { to: 6, pad: 2, label: "roles con permisos en SAED" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <DotGrid className="hero-dots" baseColor="#dcd8cf" activeColor="#7d86e0" gap={26} radius={170} />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.div className="hero-meta" {...fade(0.05)}>
            <span className="status-pill status-pill--live"><span className="status-dot" aria-hidden="true" />
              <ShinyText text="Disponible · patrocinio SENA y contrato de aprendizaje" color="#2f6b4c" shineColor="#8fd9b0" speed={3.4} delay={1.6} />
            </span>
            <span className="hero-loc"><MapPin size={13} /> Valledupar, Colombia</span>
          </motion.div>

          <h1 id="hero-title" className="hero-title">
            <BlurText as="span" className="hero-line" text="Construyo software completo," delay={0.15} />
            <BlurText as="span" className="hero-line hero-line--serif" text="de la base de datos" delay={0.45} />
            <BlurText as="span" className="hero-line" text="al celular de tu cliente." delay={0.75} highlight={[1]} highlightClassName="hero-accent" />
          </h1>

          <motion.p className="hero-lede" {...fade(1.0)}>
            Soy <strong>Juan Sebastián Rincón Farelo</strong>, desarrollador Full Stack. Diseño la arquitectura, escribo el backend en Java, la interfaz en React y modelo los datos en Oracle o Postgres, para productos que la gente usa todos los días.
          </motion.p>

          <motion.div className="hero-actions" {...fade(1.15)}>
            <Magnet padding={50} magnetStrength={3.4}>
              <a className="btn btn--primary" href="#saed">Ver el trabajo <ArrowDownRight size={17} /></a>
            </Magnet>
            <Magnet padding={40} magnetStrength={4}>
              <a className="btn btn--ghost" href={LINKS.cv} target="_blank" rel="noopener noreferrer">Hoja de vida PDF <Download size={16} /></a>
            </Magnet>
            <div className="hero-social">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href={LINKS.email} aria-label="Correo"><Mail size={18} /></a>
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-card" initial={reduce ? false : { opacity: 0, y: 30, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <ProfileCard
            image={LINKS.portrait}
            name="Juan Sebastián Rincón Farelo"
            role="Full Stack · Datos · Cloud"
            code="JSRF-2026"
            meta={[
              { label: "Formación", value: "Ing. de Sistemas · UPC" },
              { label: "Programa", value: "ADSO · SENA" },
              { label: "Inglés", value: "B1 · Use of English B2" },
            ]}
          />
          <a className="hero-card-note" href="#saed">
            <span className="mono">Último trabajo</span>
            <strong>SAED 2.0 · SaaS multi-tenant</strong>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>

      <div className="wrap">
        <dl className="hero-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.prefix}<CountUp to={s.to} pad={s.pad} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
