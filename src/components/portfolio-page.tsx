"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowDown, ArrowUpRight, BookOpen, Check, Cloud, Code2, Database, Download,
  FileSpreadsheet, Github, GraduationCap, HeartPulse, Layers3, Linkedin, Mail,
  MapPin, Menu, MessageCircle, ShieldCheck, ShoppingBag, Terminal, Workflow, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const LINKS = {
  github: "https://github.com/Sebasr0311",
  linkedin: "https://www.linkedin.com/in/juan-sebastian-rincon-farelo-a17374449/",
  email: "mailto:juansebastianrincon@unicesar.edu.co",
  whatsapp: "https://wa.me/573026555881",
  cv: `${BASE_PATH}/CV_Juan_Sebastian_Rincon_Farelo.pdf`,
  portrait: `${BASE_PATH}/juan-sebastian-portrait.jpg`,
};

const NAV = [
  {label: "Inicio", href: "#inicio"},
  {label: "Sobre mí", href: "#sobre-mi"},
  {label: "Proyectos", href: "#proyectos"},
  {label: "Tecnologías", href: "#tecnologias"},
  {label: "Trayectoria", href: "#trayectoria"},
];

type ProjectCategory = "saas" | "comercial" | "salud" | "automatizacion" | "datos";
type Project = {
  index: string;
  name: string;
  headline: string;
  description: string;
  details: string;
  role: string;
  status: string;
  category: ProjectCategory;
  stack: string[];
  url?: string;
  github?: string;
  icon: React.ElementType;
  motif: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "SAED",
    headline: "Un sistema para administrar toda una comunidad.",
    description: "Plataforma SaaS de gestión residencial concebida para centralizar administración, finanzas y operaciones diarias de una copropiedad.",
    details: "Diseño y desarrollo individual: residentes y roles, contratos, pagos, visitas QR, notificaciones multicanal y asignación automatizada de parqueaderos. Aún sin prueba piloto.",
    role: "Diseño y desarrollo Full Stack individual",
    status: "En desarrollo",
    category: "saas",
    stack: ["Java 17", "React", "Oracle SQL", "Tailwind", "OCI"],
    url: "https://www.saed.app/",
    github: "https://github.com/Sebasr0311/SAED",
    icon: Layers3,
    motif: "saed",
    featured: true,
  },
  {
    index: "02",
    name: "Alexa Beauty",
    headline: "De un emprendimiento a una tienda operativa.",
    description: "Comercio electrónico con catálogo, tonos y variantes, inventario y pedidos por WhatsApp.",
    details: "Desarrollo Full Stack realizado de manera individual. La plataforma está en uso y el emprendimiento ya ha recibido pedidos reales.",
    role: "Full Stack · Proyecto comercial",
    status: "En uso comercial",
    category: "comercial",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Supabase"],
    url: "https://alexa-beauty.vercel.app/",
    github: "https://github.com/Sebasr0311/Alexa-Beauty",
    icon: ShoppingBag,
    motif: "alexa",
  },
  {
    index: "03",
    name: "MediTraje",
    headline: "Tecnología para ordenar la atención médica.",
    description: "Sistema de triaje hospitalario y gestión de citas médicas de principio a fin.",
    details: "Agendamiento, notificaciones de cita y cancelación por correo, confirmación de asistencia en consultorio y clasificación de prioridades de atención.",
    role: "Proyecto de software",
    status: "Demo publicada",
    category: "salud",
    stack: ["Aplicación web", "Citas", "Notificaciones", "Flujos clínicos"],
    url: "https://meditraje.vercel.app/",
    github: "https://github.com/Sebasr0311/MediTraje",
    icon: HeartPulse,
    motif: "meditraje",
  },
  {
    index: "04",
    name: "Digitalizador académico IA",
    headline: "Convertir planillas físicas en datos utilizables.",
    description: "Aplicación de escritorio que interpreta planillas académicas a través de una API de inteligencia artificial.",
    details: "Digitaliza registros, permite configurar porcentajes por nota o calcular promedios simples y exporta el resultado a Excel.",
    role: "Desarrollo individual · Aplicación de escritorio",
    status: "Proyecto personal",
    category: "automatizacion",
    stack: ["IA vía API", "Automatización", "Procesamiento", "Excel"],
    icon: FileSpreadsheet,
    motif: "ai",
  },
  {
    index: "05",
    name: "Data Warehouse MusicBrainz",
    headline: "De millones de registros a información analítica.",
    description: "Proyecto académico de ingeniería de datos utilizando PostgreSQL y arquitectura Medallón.",
    details: "Como integrante del equipo, fui responsable de ingesta, limpieza y auditoría de datos mediante procesos ETL en Python para las capas Bronce y Plata; solución orientada a Power BI.",
    role: "Ingeniería de datos · Proyecto en equipo",
    status: "Proyecto académico",
    category: "datos",
    stack: ["Python", "ETL", "PostgreSQL", "Medallón", "Power BI"],
    icon: Database,
    motif: "dwh",
  },
];

const FILTERS: {value: "todos" | ProjectCategory; label: string}[] = [
  {value: "todos", label: "Todos"},
  {value: "saas", label: "SaaS"},
  {value: "comercial", label: "Comercial"},
  {value: "salud", label: "Salud"},
  {value: "automatizacion", label: "IA y automatización"},
  {value: "datos", label: "Datos"},
];

const SKILLS = [
  {title: "Desarrollo", icon: Code2, items: ["Java", "Spring Boot", "React", "Next.js", "TypeScript", "JavaScript", "Python", "C / C++"]},
  {title: "Datos e IA", icon: Database, items: ["PostgreSQL", "Oracle SQL", "SQL", "ETL en Python", "Data Warehouse", "Power BI", "Integración de IA"]},
  {title: "Cloud & DevOps", icon: Cloud, items: ["Oracle Cloud (OCI)", "Azure", "AWS", "Vercel", "Render", "Docker", "Git / GitHub"]},
  {title: "Producto y equipo", icon: Workflow, items: ["APIs REST", "Automatización", "POO", "Scrum", "Trello", "Postman", "UI con Tailwind y shadcn/ui"]},
];

function Reveal({children, className="", delay=0}: {children:React.ReactNode; className?:string; delay?:number}) {
  const node = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!node.current) return;
    const el = node.current;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    el.classList.add('is-revealing');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      }
    }, {threshold:0.09, rootMargin:"0px 0px -24px 0px"});
    observer.observe(el);
    return () => { observer.disconnect(); el.classList.remove('is-revealing'); };
  }, []);
  return <div ref={node} className={`reveal ${className}`} style={{"--reveal-delay":`${delay}ms`} as React.CSSProperties}>{children}</div>;
}

function SectionHeading({eyebrow, title, description}: {eyebrow:string;title:string;description?:string}) {
  return <div className="section-heading">
    <p className="eyebrow"><span className="eyebrow-line"/> {eyebrow}</p>
    <h2>{title}</h2>
    {description && <p className="section-intro">{description}</p>}
  </div>;
}

function Header() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{
    if (!open) return;
    const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};
    window.addEventListener("keydown",close);
    return ()=>window.removeEventListener("keydown",close);
  },[open]);
  return <header className="site-header">
    <div className="nav-shell container">
      <a className="wordmark" href="#inicio" aria-label="Ir al inicio" onClick={()=>setOpen(false)}>
        <span className="wordmark-box">JS<span className="wordmark-dot">.</span></span>
        <span className="wordmark-name">JUAN SEBASTIÁN <span>RINCÓN</span></span>
      </a>
      <nav className={`nav-links ${open ? "nav-links--open" : ""}`} aria-label="Navegación principal" id="primary-nav">
        {NAV.map(item=><a onClick={()=>setOpen(false)} href={item.href} key={item.href}>{item.label}</a>)}
        <a className="mobile-contact" href="#contacto" onClick={()=>setOpen(false)}>Hablemos <ArrowUpRight size={15}/></a>
      </nav>
      <div className="header-actions">
        <a className="header-resume" href={LINKS.cv} target="_blank" rel="noopener noreferrer" aria-label="Ver CV PDF">CV <Download size={14}/></a>
        <Button asChild size="sm" className="header-cta"><a href="#contacto">Hablemos <ArrowUpRight size={16}/></a></Button>
        <button className="mobile-menu" type="button" aria-controls="primary-nav" aria-expanded={open} onClick={()=>setOpen(!open)} aria-label={open?"Cerrar menú":"Abrir menú"}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero-section" id="inicio">
    <div className="hero-ambient hero-ambient--one" aria-hidden="true"/>
    <div className="hero-ambient hero-ambient--two" aria-hidden="true"/>
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="hero-location"><MapPin size={14}/> Valledupar, Colombia <span className="hero-location-divider"/> Desarrollo de software</div>
        <div className="availability"><span className="availability-pulse"/> Disponible para patrocinio y contrato de aprendizaje SENA</div>
        <h1>Transformo <span className="hero-highlight">problemas</span> en software que <em>funciona.</em></h1>
        <p className="hero-description">Soy <strong>Juan Sebastián Rincón</strong>. Desarrollo aplicaciones Full Stack, automatizo procesos y construyo soluciones donde la ingeniería, los datos y las ideas se encuentran.</p>
        <div className="hero-actions">
          <Button asChild size="lg"><a href="#proyectos">Explorar mis proyectos <ArrowUpRight size={18}/></a></Button>
          <Button asChild variant="outline" size="lg"><a href={LINKS.cv} target="_blank" rel="noopener noreferrer">Descargar CV <Download size={17}/></a></Button>
        </div>
        <div className="hero-socials">
          <span>ENCUÉNTRAME EN</span>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="Abrir GitHub"><Github size={19}/></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Abrir LinkedIn"><Linkedin size={19}/></a>
          <a href={LINKS.email} aria-label="Enviar correo electrónico"><Mail size={19}/></a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-backdrop" aria-hidden="true"/>
        <div className="portrait-frame">
          <Image src={LINKS.portrait} alt="Retrato profesional de Juan Sebastián Rincón Farelo" width={720} height={900} className="portrait-image" priority sizes="(max-width: 900px) 80vw, 440px"/>
          <div className="portrait-name"><span>JUAN SEBASTIÁN RINCÓN</span><span>FULL STACK / SOFTWARE</span></div>
        </div>
        <div className="floating-token floating-token--top"><div className="floating-token-icon"><Terminal size={18}/></div><div><strong>Software Engineering</strong><span>Build · Automate · Ship</span></div><span className="floating-verified"><Check size={14}/></span></div>
        <div className="floating-token floating-token--bottom"><span className="floating-status"/><div><strong>Creando SAED</strong><span>Plataforma SaaS · En desarrollo</span></div><ArrowUpRight size={17}/></div>
        <span className="hero-asterisk" aria-hidden="true">✳</span>
      </div>
    </div>
    <div className="container hero-foot">
      <span>FULL STACK DEVELOPMENT</span><span className="hero-foot-star">✦</span><span>PROCESOS AUTOMATIZADOS</span><span className="hero-foot-star">✦</span><span>INGENIERÍA DE DATOS</span><a href="#sobre-mi" aria-label="Bajar a sobre mí"><ArrowDown size={18}/></a>
    </div>
  </section>;
}

function About() {
  return <section className="section section-about" id="sobre-mi">
    <div className="container about-grid">
      <Reveal><div className="about-left">
        <p className="eyebrow"><span className="eyebrow-line"/> 01 / SOBRE MÍ</p>
        <h2>La tecnología tiene sentido cuando <em>resuelve algo real.</em></h2>
        <div className="about-stamp"><span>JS</span><span>DISEÑAR · CONSTRUIR · MEJORAR</span></div>
      </div></Reveal>
      <Reveal delay={100}><div className="about-right">
        <p>Me entusiasma entender un problema de principio a fin y convertirlo en una herramienta que simplifique el día a día. Trabajo tanto en la interfaz que ve el usuario como en los procesos, las APIs y los datos que hacen posible el producto.</p>
        <p>He construido de manera individual una plataforma SaaS de administración residencial y una tienda utilizada por un emprendimiento real. También he desarrollado soluciones médicas, aplicaciones con IA e ingeniería de datos.</p>
        <div className="about-signature"><div className="about-line"/><span>Aprendiz SENA ADSO y estudiante de Ingeniería de Sistemas</span></div>
        <div className="about-points">
          <div><Code2 size={21}/><strong>Visión de producto</strong><span>De la idea al despliegue.</span></div>
          <div><Workflow size={21}/><strong>Automatización</strong><span>Menos tareas repetitivas.</span></div>
          <div><MessageCircle size={21}/><strong>Comunicación</strong><span>Trabajo claro y colaborativo.</span></div>
        </div>
      </div></Reveal>
    </div>
  </section>;
}

function ProjectArtwork({project}: {project:Project}) {
  const Icon=project.icon;
  if(project.motif==="saed")return <div className="project-art project-art--saed" aria-hidden="true"><div className="art-topline"><span>SAED / 2.0</span><span>RESIDENTIAL SYSTEM</span></div><div className="art-saas-grid"><div className="art-saas-tile"><span className="art-square"/><span className="art-tile-lines"><i/><i/><i/></span></div><div className="art-saas-tile"><span className="art-ring"/><span className="art-tile-lines"><i/><i/></span></div><div className="art-saas-tile"><span className="art-chart"><i/><i/><i/><i/></span></div><div className="art-saas-tile"><span className="art-qr"><i/><i/><i/><i/></span></div></div><div className="art-bottomline"><span>ONE PLATFORM. MULTIPLE FLOWS.</span><span>✦</span></div></div>;
  return <div className={`project-art project-art--${project.motif}`} aria-hidden="true"><span className="project-art-index">{project.index} / PROJECT</span><div className="project-art-center"><span className="project-art-orbit"/><Icon size={70} strokeWidth={1.1}/></div><span className="project-art-type">{project.motif==="alexa"?"ECOMMERCE / DIGITAL STORE":project.motif==="meditraje"?"HEALTH / WORKFLOWS":project.motif==="ai"?"AI / DESKTOP AUTOMATION":"DATA / ETL PIPELINES"}</span></div>;
}

function ProjectCard({project}: {project: Project}) {
  const Icon=project.icon;
  return <SpotlightCard className={`project-card ${project.featured?"project-card--featured":""}`} spotlightColor="rgba(92, 125, 233, 0.12)">
    <ProjectArtwork project={project}/>
    <div className="project-content">
      <div className="project-heading-row"><div><p className="project-meta"><span>{project.index} / PROYECTO</span><span className="project-meta-divider">·</span><span>{project.role}</span></p><h3>{project.name}</h3></div><Icon className="project-mini-icon" size={23} strokeWidth={1.7}/></div>
      <h4>{project.headline}</h4>
      <p className="project-description">{project.description}</p>
      <p className="project-detail">{project.details}</p>
      <div className="project-stack">{project.stack.map(t=><span key={t}>{t}</span>)}</div>
      <div className="project-card-footer"><Badge className={`project-status project-status--${project.category}`}>{project.status}</Badge>
        <div className="project-links">
          {project.github&&<a href={project.github} aria-label={`Código de ${project.name} en GitHub`} target="_blank" rel="noopener noreferrer"><Github size={17}/></a>}
          {project.url ? <a href={project.url} aria-label={`Visitar ${project.name}`} target="_blank" rel="noopener noreferrer">Ver proyecto <ArrowUpRight size={17}/></a>:<span className="project-private">Sin enlace público</span>}
        </div>
      </div>
    </div>
  </SpotlightCard>;
}

function Projects() {
  const [filter,setFilter]=React.useState<"todos"|ProjectCategory>("todos");
  const filtered=filter==="todos"?PROJECTS:PROJECTS.filter(p=>p.category===filter);
  return <section className="section section-projects" id="proyectos">
    <div className="container">
      <Reveal><div className="section-heading-row"><SectionHeading eyebrow="02 / PROYECTOS SELECCIONADOS" title="Trabajos que hablan por sí solos." description="Software con propósito: productos comerciales, sistemas complejos, automatizaciones e ingeniería de datos."/><span className="section-count">05 <span>/ PROYECTOS</span></span></div></Reveal>
      <Tabs value={filter} onValueChange={v=>setFilter(v as typeof filter)} className="project-filter-tabs"><TabsList aria-label="Filtrar proyectos">
        {FILTERS.map(f=><TabsTrigger key={f.value} value={f.value}>{f.label}</TabsTrigger>)}
      </TabsList></Tabs>
      <div className="projects-grid" aria-live="polite">{filtered.map((p,i)=><Reveal key={p.index} className={p.featured?"project-reveal--featured":""} delay={i*65}><ProjectCard project={p}/></Reveal>)}</div>
      <p className="projects-footer-note"><ShieldCheck size={16}/> Los proyectos en desarrollo están identificados como tales. Los trabajos institucionales confidenciales no se publican aquí.</p>
    </div>
  </section>;
}

function Technology() {
  return <section className="section section-skills" id="tecnologias"><div className="container">
    <Reveal><div className="section-heading-row"><SectionHeading eyebrow="03 / HERRAMIENTAS Y CONOCIMIENTOS" title="El stack es el medio. La solución es el objetivo." description="Tecnologías con las que diseño, desarrollo, integro y despliego soluciones."/></div></Reveal>
    <div className="skills-grid">{SKILLS.map((group,i)=>{
      const Icon=group.icon;
      return <Reveal key={group.title} delay={i*80}><div className="skills-card"><div className="skills-head"><span className="skills-icon"><Icon size={25} strokeWidth={1.65}/></span><span className="skills-number">0{i+1}</span></div><h3>{group.title}</h3><div className="skills-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div></div></Reveal>;
    })}</div>
    <p className="skills-note">Actualmente ampliando conocimientos en Angular. La experiencia y el nivel de profundidad varían entre tecnologías.</p>
  </div></section>;
}

function Journey() {
  return <section className="section section-journey" id="trayectoria"><div className="container journey-grid">
    <Reveal><div className="journey-intro"><SectionHeading eyebrow="04 / TRAYECTORIA" title="Aprender, construir y seguir evolucionando." description="Formación académica combinada con práctica real en ingeniería de software."/><div className="journey-decoration" aria-hidden="true"><span>LEARN</span><span>BUILD</span><span>REPEAT<span className="accent-dot">.</span></span></div></div></Reveal>
    <Reveal delay={110}><div className="journey-content">
      <div className="journey-group"><div className="journey-group-label"><GraduationCap size={17}/> EDUCACIÓN</div>
        <div className="timeline-item"><div className="timeline-mark"/><span className="timeline-date">2025 — 2027 (previsto)</span><h3>Tecnólogo en Análisis y Desarrollo de Software</h3><p>Servicio Nacional de Aprendizaje · SENA</p><span className="timeline-note">Etapa lectiva · Buscando empresa patrocinadora</span></div>
        <div className="timeline-item"><div className="timeline-mark"/><span className="timeline-date">2024 — Actualidad</span><h3>Ingeniería de Sistemas</h3><p>Universidad Popular del Cesar</p><span className="timeline-note">5.º semestre en curso al elaborar este portafolio</span></div>
      </div>
      <div className="journey-group journey-group--certs"><div className="journey-group-label"><BookOpen size={17}/> FORMACIÓN COMPLEMENTARIA</div>
        <div className="certificate"><span className="certificate-year">2026</span><div><strong>Inteligencia Artificial — Nivel Básico</strong><span>Talento Tech / MinTIC · 159 horas</span></div><ArrowUpRight size={15}/></div>
        <div className="certificate"><span className="certificate-year">2026</span><div><strong>Oracle Cloud Infrastructure Foundations I</strong><span>Oracle Academy · Curso completado</span></div><ArrowUpRight size={15}/></div>
        <div className="certificate"><span className="certificate-year">B1</span><div><strong>Inglés intermedio</strong><span>Oxford Placement Test · Resultado 2023</span></div><ArrowUpRight size={15}/></div>
      </div>
    </div></Reveal>
  </div></section>;
}

function Contact() {
  return <section className="section-contact" id="contacto"><div className="container"><div className="contact-panel"><div className="contact-glow" aria-hidden="true"/><div className="contact-top"><span className="contact-kicker"><span className="small-online-dot"/> DISPONIBLE PARA CONVERSAR</span><span className="contact-index">05 / CONTACTO</span></div>
    <div className="contact-middle"><div><h2>¿Tienes un reto?<br/><em>Construyamos</em> la solución.</h2><p>Abierto a oportunidades de aprendizaje, equipos de desarrollo y proyectos donde la tecnología pueda crear valor real.</p><p className="contact-context">Actualmente en etapa lectiva SENA; cualquier inicio de etapa productiva requiere autorización institucional.</p></div>
      <div className="contact-actions"><Button asChild size="lg" className="contact-button"><a href={LINKS.email}>Escríbeme un correo <ArrowUpRight size={19}/></a></Button><a className="contact-link" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Hablemos por WhatsApp <ArrowUpRight size={16}/></a><a className="contact-link" href={LINKS.cv} target="_blank" rel="noopener noreferrer"><Download size={18}/> Descargar mi CV <ArrowUpRight size={16}/></a></div>
    </div>
    <div className="contact-bottom"><span>juansebastianrincon@unicesar.edu.co</span><span>Valledupar · Colombia</span></div>
  </div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a href="#inicio" className="footer-brand">JS<span>.</span></a><span>Diseñado y desarrollado con intención. © {new Date().getFullYear()} Juan Sebastián Rincón Farelo.</span><div className="footer-links"><a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href="#inicio" aria-label="Volver arriba">↑</a></div></div></footer>;
}

export function PortfolioPage() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header/><main id="contenido"><Hero/><About/><Projects/><Technology/><Journey/><Contact/></main><Footer/></>;
}
