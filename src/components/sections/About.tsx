"use client";

import * as React from "react";
import { Boxes, Smartphone, ShieldCheck } from "lucide-react";
import { ScrollVelocity } from "@/components/react-bits/ScrollVelocity";
import { MARQUEE } from "@/data/portfolio";
import { Eyebrow } from "./shared";
import { Reveal } from "@/components/media";

const PRINCIPLES = [
  { icon: Boxes, title: "De punta a punta", body: "Modelo de datos, API, interfaz, despliegue y pruebas. Entiendo cómo encaja cada pieza porque las construyo todas." },
  { icon: Smartphone, title: "Primero el teléfono", body: "Si el cliente pide desde el celular, el producto se diseña en el celular. El escritorio viene después." },
  { icon: ShieldCheck, title: "Datos en los que se puede confiar", body: "Stock real, dinero cuadrado y permisos que se cumplen en la base de datos, no solo en la pantalla." },
];

export function About() {
  return (
    <>
      <div className="marquee" aria-label="Tecnologías principales">
        <ScrollVelocity
          velocity={2.4}
          className="marquee-track"
          rows={[
            <>{MARQUEE.map((t) => <React.Fragment key={t}><b>{t}</b><i aria-hidden="true">✦</i></React.Fragment>)}</>,
          ]}
        />
      </div>

      <section className="section about" id="perfil" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div>
            <Eyebrow index="00" label="PERFIL" />
            <Reveal>
              <h2 id="about-title" className="h2">
                La tecnología vale cuando <span className="serif">resuelve algo real</span> para alguien concreto.
              </h2>
            </Reveal>
          </div>
          <Reveal className="about-text" delay={120}>
            <p>Estudio Ingeniería de Sistemas en la Universidad Popular del Cesar y el tecnólogo ADSO en el SENA. Mientras tanto he construido, de forma individual, una plataforma SaaS para conjuntos residenciales y tres tiendas para negocios reales de Valledupar: cosméticos, repostería y ropa deportiva.</p>
            <p>Me gusta entender el problema completo: quién usa el sistema, desde qué dispositivo, qué no puede fallar. Luego lo convierto en arquitectura, código y pruebas.</p>
          </Reveal>
        </div>
        <div className="wrap">
          <ul className="principles">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal as="li" key={p.title} delay={i * 90}>
                  <span className="principle-icon"><Icon size={20} strokeWidth={1.6} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
