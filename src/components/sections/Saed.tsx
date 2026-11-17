"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { SAED } from "@/data/portfolio";
import { CountUp } from "@/components/react-bits/CountUp";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { Browser, Reveal } from "@/components/media";
import { Chips, Eyebrow, StatusPill } from "./shared";
import { cn } from "@/lib/utils";

function Roles() {
  const [active, setActive] = React.useState(SAED.roles[2].id);
  const role = SAED.roles.find((r) => r.id === active)!;
  return (
    <div className="roles">
      <div className="roles-list" role="tablist" aria-label="Roles de SAED">
        {SAED.roles.map((r, i) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            id={`role-tab-${r.id}`}
            aria-selected={r.id === active}
            aria-controls="role-panel"
            className={cn("role-tab", r.id === active && "is-active")}
            onClick={() => setActive(r.id)}
          >
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>
      <div className="roles-panel" role="tabpanel" id="role-panel" aria-labelledby={`role-tab-${role.id}`}>
        <AnimatePresence mode="wait">
          <motion.div key={role.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            <p className="mono roles-scope">{role.scope}</p>
            <h4>{role.who}</h4>
            <ul>
              {role.does.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="roles-limit"><Lock size={14} /> {role.limit}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Saed() {
  return (
    <section className="section saed" id="saed" aria-labelledby="saed-title">
      <div className="wrap">
        <div className="saed-head">
          <div>
            <Eyebrow index="01" label="CASO DE ESTUDIO · PROYECTO PRINCIPAL" />
            <Reveal>
              <h2 id="saed-title" className="saed-title">SAED<span>2.0</span></h2>
            </Reveal>
          </div>
          <Reveal className="saed-intro" delay={100}>
            <p className="saed-tagline">{SAED.tagline}</p>
            <p>{SAED.summary}</p>
            <div className="saed-meta">
              <StatusPill tone="build">{SAED.status}</StatusPill>
              <span className="muted">{SAED.role}</span>
            </div>
            <div className="saed-links">
              <a className="btn btn--saed" href={SAED.url} target="_blank" rel="noopener noreferrer">Visitar saed.app <ArrowUpRight size={16} /></a>
              <span className="muted small"><Lock size={13} /> Código en repositorio privado</span>
            </div>
          </Reveal>
        </div>

        <dl className="saed-metrics">
          {SAED.metrics.map((m) => (
            <Reveal key={m.label}>
              <dd><CountUp to={m.value} /></dd>
              <dt>{m.label}</dt>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <Browser shots={SAED.shots} url={SAED.url} tabs className="saed-browser" delay={5200} />
        </Reveal>

        <div className="saed-block">
          <div className="saed-block-head">
            <p className="mono kicker">A · Quién lo usa</p>
            <h3 className="h3">Seis roles, un solo registro. Cada uno ve exactamente lo que le corresponde.</h3>
          </div>
          <Reveal><Roles /></Reveal>
        </div>

        <div className="saed-block">
          <div className="saed-block-head">
            <p className="mono kicker">B · Qué resuelve</p>
            <h3 className="h3">Más de 30 módulos de dominio en el backend, agrupados en seis frentes.</h3>
          </div>
          <div className="modules">
            {SAED.modules.map((m, i) => (
              <Reveal key={m.area} delay={i * 60}>
                <SpotlightCard className="module-card" spotlightColor="rgba(255, 255, 255, 0.7)">
                  <div className="module-top">
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mono">{m.items.length} módulos</span>
                  </div>
                  <h4>{m.area}</h4>
                  <Chips items={m.items} className="chips--sm" />
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="saed-block saed-arch">
          <div className="saed-block-head">
            <p className="mono kicker">C · Cómo está construido</p>
            <h3 className="h3">El aislamiento entre organizaciones lo impone la base de datos, no la buena fe del código.</h3>
          </div>
          <div className="arch">
            <ol className="arch-stack">
              {SAED.architecture.map((a, i) => (
                <Reveal as="li" key={a.layer} delay={i * 100} className="arch-layer">
                  <span className="mono arch-tag">{a.layer}</span>
                  <strong>{a.tech}</strong>
                  <p>{a.detail}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="arch-side" delay={200}>
              <p className="mono kicker">Integraciones</p>
              <ul>
                {SAED.integrations.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <div className="arch-ctx" aria-hidden="true">
                <code>PKG_SAED_SESSION.SET_CONTEXT(</code>
                <code>&nbsp;&nbsp;org =&gt; :org, prop =&gt; :prop</code>
                <code>);</code>
                <code className="dim">-- cada consulta queda filtrada por VPD</code>
              </div>
            </Reveal>
          </div>
          <div className="decisions">
            {SAED.decisions.map((d, i) => (
              <Reveal key={d.title} delay={i * 70} className="decision">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
              </Reveal>
            ))}
          </div>
          <Chips items={SAED.stack} className="saed-stack" />
        </div>
      </div>
    </section>
  );
}
