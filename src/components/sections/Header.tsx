"use client";

import * as React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LINKS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Perfil", href: "#perfil" },
  { label: "SAED", href: "#saed" },
  { label: "Móvil", href: "#movil" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Stack", href: "#stack" },
  { label: "Trayectoria", href: "#trayectoria" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={cn("nav", scrolled && "is-scrolled", open && "is-open")}>
      <div className="nav-pill">
        <a href="#inicio" className="nav-logo" aria-label="Juan Sebastián Rincón, ir al inicio" onClick={() => setOpen(false)}>
          <span className="nav-mark">JS</span>
          <span className="nav-name">Juan Sebastián <em>Rincón</em></span>
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={cn(active === n.href.slice(1) && "is-active")} aria-current={active === n.href.slice(1) ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#contacto">Contacto <ArrowUpRight size={15} /></a>
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div id="mobile-menu" className="nav-sheet" hidden={!open}>
        <nav aria-label="Navegación móvil">
          {NAV.map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ "--i": i } as React.CSSProperties}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>{n.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} style={{ "--i": NAV.length } as React.CSSProperties}>
            <span className="mono">{String(NAV.length + 1).padStart(2, "0")}</span>Contacto
          </a>
        </nav>
        <a className="btn btn--primary" href={LINKS.cv} target="_blank" rel="noopener noreferrer">Descargar CV <ArrowUpRight size={16} /></a>
      </div>
    </header>
  );
}
