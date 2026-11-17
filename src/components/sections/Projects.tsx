"use client";

import * as React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Browser, Reveal } from "@/components/media";
import { Chips, Eyebrow, StatusPill } from "./shared";

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const tone = project.status === "En uso comercial" ? "live" : project.status === "Demo publicada" ? "live" : "neutral";
  return (
    <article className={`prow ${flip ? "is-flipped" : ""}`} style={{ "--case-accent": project.accent, "--case-tint": project.tint } as React.CSSProperties} aria-labelledby={`${project.id}-title`}>
      <Reveal className="prow-media">
        <Browser shots={project.shots} url={project.url ?? project.github} />
      </Reveal>
      <Reveal className="prow-copy" delay={100}>
        <p className="mono prow-index">{project.index} · {project.kind}</p>
        <h3 id={`${project.id}-title`} className="prow-title">{project.name}</h3>
        <p className="prow-headline">{project.headline}</p>
        <p className="prow-desc">{project.description}</p>
        <ul className="prow-highlights">
          {project.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <Chips items={project.stack} className="chips--sm" />
        <div className="prow-foot">
          <StatusPill tone={tone}>{project.status}</StatusPill>
          <span className="muted small">{project.role}</span>
          <div className="prow-links">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Código de ${project.name} en GitHub`}><Github size={16} /> Código</a>}
            {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer">Demo <ArrowUpRight size={15} /></a>}
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <section className="section projects" id="proyectos" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head">
          <Eyebrow index="04—07" label="MÁS PROYECTOS" />
          <Reveal>
            <h2 id="projects-title" className="h2">Comercio, salud, <span className="serif">IA y datos.</span></h2>
          </Reveal>
        </div>
        <div className="prows">
          {PROJECTS.map((p, i) => <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />)}
        </div>
        <p className="muted small projects-note">Los trabajos institucionales confidenciales no se publican aquí.</p>
      </div>
    </section>
  );
}
