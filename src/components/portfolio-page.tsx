"use client";

import * as React from "react";
import {
  ArrowDown, ArrowUpRight, BookOpen, Check, Cloud, Code2, Cpu, Database, Download,
  FileSpreadsheet, Github, GraduationCap, HeartPulse, Layers3, Linkedin, Lock, Mail,
  MapPin, Menu, MessageCircle, Server, ShieldCheck, ShoppingBag, Sparkles, Terminal, Workflow, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { ProjectCarousel, type CarouselSlide } from "@/components/react-bits/carousel";
import { ShinyText } from "@/components/react-bits/ShinyText";
import { DecryptedText } from "@/components/react-bits/DecryptedText";
import { TiltedCard } from "@/components/react-bits/TiltedCard";
import { GlareHover } from "@/components/react-bits/GlareHover";
import { Magnet } from "@/components/react-bits/Magnet";
import { ClickSpark } from "@/components/react-bits/ClickSpark";
import { LogoLoop, type LogoItem } from "@/components/react-bits/LogoLoop";

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
  highlights: string[];
  role: string;
  status: string;
  category: ProjectCategory;
  stack: string[];
  url?: string;
  github?: string;
  icon: React.ElementType;
  slides: CarouselSlide[];
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "SAED",
    headline: "Un sistema para administrar toda una comunidad.",
    description: "Plataforma SaaS multi-tenant de gestión residencial concebida para centralizar administración, finanzas, portería y convivencia de edificios y conjuntos cerrados.",
    details: "Diseño y desarrollo individual de extremo a extremo: aislamiento por copropiedad en Oracle Autonomous Database (VPD / Row-Level Security), 6 alcances RBAC, pasarela Wompi, pases QR para visitantes, custodia de paquetería con PIN y sorteo auditable de parqueaderos. Aún sin prueba piloto.",
    highlights: [
      "Aislamiento multi-tenant nativo con Oracle VPD (SAED_CTX) y bitácora inmutable AUDITORIA_LOG",
      "6 portales operativos por rol: Superadmin, Organización, Administración, Portería, Residente Titular y Convivencia",
      "Recaudo digital con Wompi, validación QR en garita y alertas transaccionales por correo"
    ],
    role: "Diseño y desarrollo Full Stack individual",
    status: "En desarrollo",
    category: "saas",
    stack: ["Java 17", "Spring Boot 3.2", "React 18", "Oracle ATP (VPD/RLS)", "Tailwind CSS", "Wompi", "OCI"],
    url: "https://www.saed.app/",
    github: "https://github.com/Sebasr0311/SAED",
    icon: Layers3,
    featured: true,
    slides: [
      {
        id: "saed-manual-hero",
        src: `${BASE_PATH}/projects/saed/01-manual-hero.png`,
        alt: "Nuevo diseño SAED 2.0: Manual de armado del conjunto con simulador de unidades e invitación QR",
        tag: "SAED 2.0 · Manual del Conjunto",
        title: "Tu conjunto, armado pieza por pieza",
        caption: "Nuevo sistema de diseño SAED 2.0 con simulador interactivo de unidades y vista previa de pases QR."
      },
      {
        id: "saed-manual-piezas",
        src: `${BASE_PATH}/projects/saed/02-manual-piezas.png`,
        alt: "Arquitectura de los 6 roles y módulos integrados en SAED 2.0",
        tag: "Arquitectura · 6 Roles RBAC",
        title: "Lo que viene en la caja: 6 roles sobre un mismo registro",
        caption: "Organización, Administrador, Portería, Residente Titular, Conviviente y Propietario no residente conectados en tiempo real."
      },
      {
        id: "saed-cartera",
        src: `${BASE_PATH}/projects/saed/03-admin-cartera.png`,
        alt: "Nuevo panel de Cartera y Cobros en SAED 2.0 con antigüedad de deuda por unidad",
        tag: "Administración · Cartera",
        title: "Cartera, cobros y antigüedad de mora por unidad",
        caption: "Control de recaudo, saldos vencidos a 30/60/90+ días y estados de mora crítica por apartamento."
      },
      {
        id: "saed-pagos",
        src: `${BASE_PATH}/projects/saed/04-admin-pagos.png`,
        alt: "Gestión de pagos y bandeja de aprobación de soportes en SAED 2.0",
        tag: "Finanzas · Conciliación",
        title: "Gestión de pagos y bandeja de aprobación",
        caption: "Saldos consolidados por residente, registro de abonos manuales y aprobación administrativa de comprobantes."
      },
      {
        id: "saed-residente-panel",
        src: `${BASE_PATH}/projects/saed/05-residente-dashboard.png`,
        alt: "Centro operativo del Residente Titular en el nuevo diseño de SAED 2.0",
        tag: "Autoservicio · Residente Titular",
        title: "Centro Operativo del Residente (Apto 402)",
        caption: "Alertas prioritarias de cuotas, visitantes en portería, paquetes por retirar, reservas activas y avisos de comunidad."
      },
      {
        id: "saed-residente-operaciones",
        src: `${BASE_PATH}/projects/saed/06-residente-operaciones.png`,
        alt: "Pago de cuotas con Wompi, pase QR activo y custodia de paquetes en SAED 2.0",
        tag: "Wompi & QR · Operaciones",
        title: "Pago en línea con Wompi y pases QR activos",
        caption: "Pago directo de administración vía PSE/tarjeta, credenciales QR para invitados y seguimiento de encomiendas en garita."
      },
      {
        id: "saed-porteria-paquetes",
        src: `${BASE_PATH}/projects/saed/07-porteria-paquetes.png`,
        alt: "Consola de Portería y Seguridad para recepción y custodia de paquetería con PIN",
        tag: "Seguridad · Portería",
        title: "Recepción y custodia de paquetería con PIN",
        caption: "Registro de encomiendas por transportadora con fotografía de evidencia y envío automático de PIN de retiro al residente."
      }
    ]
  },
  {
    index: "02",
    name: "Alexa Beauty",
    headline: "De un emprendimiento a una tienda operativa.",
    description: "Plataforma de comercio electrónico y punto de venta físico (POS) con catálogo de cosméticos, selector de tonos, control de inventario y checkout asistido por WhatsApp.",
    details: "Desarrollo Full Stack realizado de manera individual. La plataforma está en uso comercial activo, gestionando inventario real, alertas de stock mínimo, ventas de mostrador y pedidos reales.",
    highlights: [
      "Catálogo público optimizado con selector rápido de tonos, búsqueda reactiva y reserva de inventario",
      "Módulo POS de mostrador para registrar ventas físicas y descontar existencias al instante",
      "Panel administrativo con autenticación JWT HttpOnly, kardex de movimientos e importación Excel"
    ],
    role: "Full Stack · Proyecto comercial",
    status: "En uso comercial",
    category: "comercial",
    stack: ["Java 21 LTS", "Spring Boot 3.4", "Next.js 15", "React 19", "TypeScript", "PostgreSQL 16", "Supabase"],
    url: "https://alexa-beauty.vercel.app/",
    github: "https://github.com/Sebasr0311/Alexa-Beauty",
    icon: ShoppingBag,
    slides: [
      {
        id: "alexa-hero",
        src: `${BASE_PATH}/projects/alexa/01-hero-storefront.png`,
        alt: "Página principal de la tienda en línea Alexa Beauty",
        tag: "E-Commerce · Storefront",
        title: "Tienda oficial en producción",
        caption: "Experiencia de compra diseñada para dispositivos móviles y escritorio con asesoría directa por WhatsApp."
      },
      {
        id: "alexa-catalogo",
        src: `${BASE_PATH}/projects/alexa/02-catalogo-productos.png`,
        alt: "Catálogo de productos de Alexa Beauty con variantes de tono y precios en COP",
        tag: "Catálogo · Variantes",
        title: "Catálogo con variantes de tono y stock en vivo",
        caption: "Visualización de muestras de color (swatches), existencias por producto y alertas de últimas unidades."
      },
      {
        id: "alexa-tonos",
        src: `${BASE_PATH}/projects/alexa/04-selector-tonos.png`,
        alt: "Modal de selección rápida de tono para Forever Gloss en Alexa Beauty",
        tag: "UX · Selector de Tono",
        title: "Selección rápida de tono sin salir del catálogo",
        caption: "Modal interactivo que valida disponibilidad por variante antes de agregar el artículo al carrito."
      },
      {
        id: "alexa-detalle",
        src: `${BASE_PATH}/projects/alexa/03-detalle-producto.png`,
        alt: "Ficha detallada de producto Forever Gloss en Alexa Beauty",
        tag: "Producto · Checkout",
        title: "Ficha comercial de producto",
        caption: "Galería de imágenes en Supabase Storage, SKU autoritativo, selector de cantidad y consulta directa."
      },
      {
        id: "alexa-pos",
        src: `${BASE_PATH}/projects/alexa/05-admin-pos.png`,
        alt: "Módulo administrativo POS para registrar venta en punto físico",
        tag: "Admin · Punto Físico POS",
        title: "Registro de ventas en punto físico (POS)",
        caption: "Buscador rápido de artículos con foto, tono y precio para descontar stock y actualizar ganancias al instante."
      },
      {
        id: "alexa-admin",
        src: `${BASE_PATH}/projects/alexa/06-panel-admin.png`,
        alt: "Panel administrativo de Alexa Beauty con resumen de pedidos e inventario",
        tag: "Backoffice · Gestión",
        title: "Panel de control y seguimiento de pedidos",
        caption: "Administración centralizada de pedidos por confirmar, alertas de stock bajo, kardex y carga por Excel."
      }
    ]
  },
  {
    index: "03",
    name: "MediTraje",
    headline: "Tecnología para ordenar la atención médica.",
    description: "Plataforma clínica integral para orientación de triaje hospitalario, agendamiento médico sin colisiones, historia clínica inmutable y prescripción digital.",
    details: "Implementa un motor determinista de 42 reglas clínicas (Niveles I–V con corte inmediato a Línea 123), bloqueo transaccional de citas, doble factor TOTP (RFC 6238) y 13 triggers PL/SQL en Oracle Cloud ATP para garantizar la inmutabilidad clínica.",
    highlights: [
      "Motor puro de triaje con 42 reglas clínicas y activación automática de protocolo de urgencias Nivel I",
      "Inmutabilidad clínica en Oracle ATP mediante 13 triggers PL/SQL, enmiendas cronológicas y snapshot farmacológico",
      "Seguridad asistencial con Argon2id, MFA TOTP, protocolo de emergencia Break-Glass y carné QR"
    ],
    role: "Arquitectura y desarrollo Full Stack",
    status: "Demo publicada",
    category: "salud",
    stack: ["Java 21", "Spring Boot 3.3", "Oracle Cloud ATP", "PL/SQL", "Flyway", "TOTP MFA", "Vanilla JS"],
    url: "https://meditraje.vercel.app/",
    github: "https://github.com/Sebasr0311/MediTraje",
    icon: HeartPulse,
    slides: [
      {
        id: "meditraje-hero",
        src: `${BASE_PATH}/projects/meditraje/01-landing-hero.png`,
        alt: "Portal principal de MediTriaje 2.0 con vista previa de flujo clínico",
        tag: "Salud Digital · Portal",
        title: "Atención médica oportuna y triaje inteligente",
        caption: "Resumen asistencial con orientación de prioridad, asignación de turno sin colisiones y receta digital sellada."
      },
      {
        id: "meditraje-simulador",
        src: `${BASE_PATH}/projects/meditraje/02-simulador-triaje.png`,
        alt: "Simulador interactivo del motor de triaje y tarjeta de receta con snapshot farmacológico",
        tag: "Motor Clínico · 42 Reglas",
        title: "Simulador de triaje y snapshot farmacológico",
        caption: "Clasificación determinista según síntoma, duración e intensidad, junto a recetas con congelamiento histórico."
      },
      {
        id: "meditraje-emergencia",
        src: `${BASE_PATH}/projects/meditraje/03-corte-emergencia.png`,
        alt: "Pantalla de Corte de Emergencia Nivel I con alerta de llamada al 123",
        tag: "Nivel I · Corte Vital",
        title: "Protocolo de corte de emergencia (Línea 123)",
        caption: "Ante síntomas críticos como dolor torácico opresivo, el sistema interrumpe el flujo normal y prioriza urgencias."
      },
      {
        id: "meditraje-agenda",
        src: `${BASE_PATH}/projects/meditraje/04-agenda-medica.png`,
        alt: "Calendario semanal de citas médicas en el panel administrativo de MediTriaje",
        tag: "Operación · Agenda",
        title: "Supervisión de agenda médica en cuadrícula horaria",
        caption: "Control en tiempo real de citas programadas, confirmadas, atendidas y canceladas con exportación a Excel."
      },
      {
        id: "meditraje-cita",
        src: `${BASE_PATH}/projects/meditraje/05-detalle-cita.png`,
        alt: "Modal con el detalle completo de una cita médica y trazabilidad de paciente",
        tag: "Trazabilidad · Cita",
        title: "Ficha detallada de cita y contacto asistencial",
        caption: "Inspección de profesional asignado, especialidad, sede, consultorio y estado de confirmación."
      },
      {
        id: "meditraje-oracle",
        src: `${BASE_PATH}/projects/meditraje/06-arquitectura-oracle.png`,
        alt: "Diagrama de arquitectura PL/SQL en Oracle Cloud ATP con paquetes, triggers y vistas",
        tag: "Oracle ATP · PL/SQL",
        title: "Arquitectura de base de datos e inmutabilidad clínica",
        caption: "54 tablas en 8 dominios, paquetes PL/SQL, 13 triggers que impiden borrar historias cerradas e índices concurrentes."
      }
    ]
  },
  {
    index: "04",
    name: "Digitalizador académico IA",
    headline: "Convertir planillas físicas en datos utilizables.",
    description: "Aplicación de escritorio en Python que digitaliza planillas escolares manuscritas escaneadas en PDF mediante visión artificial con Google Gemini y genera libros de Excel consolidados.",
    details: "Flujo guiado de 5 pantallas en CustomTkinter: rasterización de PDFs a 2× DPI con PyMuPDF, extracción JSON estructurada en segundo plano con Gemini Vision, tabla interactiva que resalta en amarillo las celdas dudosas y exportación multi-hoja con OpenPyXL.",
    highlights: [
      "Transcripción fiel sin invención de datos: marca trazos dudosos (<80% confianza) en amarillo (#FFE08A) para revisión docente",
      "Procesamiento asíncrono multi-curso en hilo dedicado con reintentos automáticos y backoff exponencial",
      "Exportación a Excel (.xlsx) con una pestaña por asignatura, encabezados institucionales y empaquetado en ejecutable .exe"
    ],
    role: "Desarrollo individual · Aplicación de escritorio",
    status: "Proyecto personal",
    category: "automatizacion",
    stack: ["Python 3", "Google Gemini Vision", "CustomTkinter", "PyMuPDF", "OpenPyXL", "PyInstaller"],
    github: "https://github.com/Sebasr0311/SistemadeNotas",
    icon: FileSpreadsheet,
    slides: [
      {
        id: "notas-comparativa",
        src: `${BASE_PATH}/projects/notas/01-comparativa-ocr-ia.png`,
        alt: "Comparativa entre planilla manuscrita escaneada y tabla extraída en CustomTkinter",
        tag: "Visión IA · OCR Manuscrito",
        title: "De planilla física escaneada a tabla estructurada",
        caption: "Reconocimiento de nombres, notas manuscritas y casillas bloqueadas a partir de PDFs escaneados con CamScanner."
      },
      {
        id: "notas-carga",
        src: `${BASE_PATH}/projects/notas/02-carga-multicurso.png`,
        alt: "Pantalla de carga multi-curso y monitor de extracción OCR en segundo plano",
        tag: "Multi-Curso · Threading",
        title: "Carga por lotes y extracción en segundo plano",
        caption: "Asociación de múltiples cursos y archivos PDF con barra de progreso en vivo y registro detallado por página."
      },
      {
        id: "notas-revision",
        src: `${BASE_PATH}/projects/notas/03-tabla-revision-interactiva.png`,
        alt: "Tabla interactiva de revisión docente con celdas de baja confianza resaltadas en amarillo",
        tag: "Validación · Edición en Vivo",
        title: "Tabla interactiva con alertas de confianza",
        caption: "Navegación por pestañas de curso, edición manual previa a exportar y resaltado preventivo de celdas dudosas."
      },
      {
        id: "notas-excel",
        src: `${BASE_PATH}/projects/notas/04-excel-consolidado.png`,
        alt: "Libro de Excel consolidado multi-hoja generado automáticamente con OpenPyXL",
        tag: "OpenPyXL · Exportación",
        title: "Libro Excel multi-hoja con formato institucional",
        caption: "Generación automática de hojas por curso con encabezado institucional, filas cebreadas y notas listas para archivo."
      }
    ]
  },
  {
    index: "05",
    name: "Data Warehouse MusicBrainz",
    headline: "De millones de registros a información analítica.",
    description: "Data Warehouse analítico construido sobre PostgreSQL 16 (~16 GB) bajo arquitectura Medallón y modelo dimensional en estrella (Kimball) para explorar 15 millones de pistas musicales.",
    details: "Ingesta masiva en Python con streaming COPY FROM STDIN desde volcados oficiales de MusicBrainz (~89,3M de filas en Silver 3FN), transformación a capa Gold con hechos particionados, auditoría de calidad con 0 huérfanos y dashboard de 3 páginas en Power BI con 26 medidas DAX.",
    highlights: [
      "ETL de alto rendimiento en Python con carga por bloques (COPY) hacia 10 tablas normalizadas (3FN) en capa Silver",
      "Esquema estrella Kimball en capa Gold con particionamiento por rango, patrón Key 0 y 4 vistas materializadas OLAP",
      "Modelo semántico en Power BI con 26 medidas DAX auditadas (1.728.603 lanzamientos únicos y 15.000.000 pistas)"
    ],
    role: "Ingeniería de datos · Proyecto en equipo",
    status: "Proyecto académico",
    category: "datos",
    stack: ["Python", "PostgreSQL 16", "Arquitectura Medallón", "Kimball Star Schema", "Power BI", "DAX", "Docker"],
    icon: Database,
    slides: [
      {
        id: "dwh-powerbi-analisis",
        src: `${BASE_PATH}/projects/dwh/01-powerbi-analisis.png`,
        alt: "Dashboard Power BI de DWMusicBrainz mostrando análisis por época, formato y artista",
        tag: "Power BI · Análisis Detallado",
        title: "Evolución de formatos, duración y artistas (15M pistas)",
        caption: "Histograma de duración en bandas de 30s, transición del vinilo/CD al streaming (1950–2025) y ranking de producción."
      },
      {
        id: "dwh-powerbi-calidad",
        src: `${BASE_PATH}/projects/dwh/02-powerbi-calidad.png`,
        alt: "Dashboard Power BI de DWMusicBrainz sobre calidad, cobertura ISRC y catálogo emergente",
        tag: "Power BI · Calidad & ISRC",
        title: "Cobertura ISRC, densidad del catálogo y talento emergente",
        caption: "Drill-down temporal y geográfico, densidad por empaque y matriz de formalización ISRC por país y tipo de artista."
      },
      {
        id: "dwh-estrella",
        src: `${BASE_PATH}/projects/dwh/03-esquema-estrella.png`,
        alt: "Diagrama del esquema estrella con tabla de hechos particionada y 6 dimensiones",
        tag: "Capa Gold · Esquema Estrella",
        title: "Diseño dimensional particionado por rango",
        caption: "Tabla de hechos central rodeada de 6 dimensiones conformadas con llaves sustitutas y particionamiento temporal."
      },
      {
        id: "dwh-medallion",
        src: `${BASE_PATH}/projects/dwh/04-resumen-medallion.png`,
        alt: "Resumen ejecutivo de KPIs y tabla de arquitectura Medallón de DWMusicBrainz",
        tag: "Arquitectura · Medallón",
        title: "Métricas globales y flujo Raw → Silver → Gold → Semántica",
        caption: "1.728.603 lanzamientos únicos, 690.454 artistas activos y 965.241 horas de audio procesadas en PostgreSQL 16."
      },
      {
        id: "dwh-auditoria",
        src: `${BASE_PATH}/projects/dwh/06-auditoria-calidad.png`,
        alt: "Tabla de controles automáticos de calidad de datos en meta.data_quality_log",
        tag: "Gobierno del Dato · Auditoría",
        title: "Conciliación automática Silver vs. Gold sin huérfanos",
        caption: "Verificación de integridad referencial en las 6 dimensiones (0 huérfanos) y cuadre exacto de métricas aditivas."
      }
    ]
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
  {title: "Datos e IA", icon: Database, items: ["PostgreSQL", "Oracle SQL", "PL/SQL", "ETL en Python", "Data Warehouse", "Power BI / DAX", "Google Gemini API"]},
  {title: "Cloud & DevOps", icon: Cloud, items: ["Oracle Cloud (OCI)", "Supabase", "Vercel", "Render", "Docker", "Flyway", "Git / GitHub"]},
  {title: "Producto y arquitectura", icon: Workflow, items: ["APIs REST", "Multi-Tenancy (RLS/VPD)", "Clean Architecture", "Scrum", "Tailwind CSS", "shadcn/ui"]},
];

const TECH_LOOP_ITEMS: LogoItem[] = [
  { node: <span className="tech-loop-pill"><Server size={15} /> Java 21 LTS & Spring Boot 3</span>, title: "Java & Spring Boot" },
  { node: <span className="tech-loop-pill"><Code2 size={15} /> React 19 & Next.js 15</span>, title: "React & Next.js" },
  { node: <span className="tech-loop-pill"><Database size={15} /> Oracle Cloud ATP (PL/SQL · VPD)</span>, title: "Oracle Cloud ATP" },
  { node: <span className="tech-loop-pill"><Database size={15} /> PostgreSQL 16 & Supabase</span>, title: "PostgreSQL & Supabase" },
  { node: <span className="tech-loop-pill"><Sparkles size={15} /> Python 3 & Google Gemini Vision</span>, title: "Python & Gemini AI" },
  { node: <span className="tech-loop-pill"><Layers3 size={15} /> Data Warehouse · Kimball & DAX</span>, title: "Data Warehouse & Power BI" },
  { node: <span className="tech-loop-pill"><Lock size={15} /> Seguridad Multi-Tenant & TOTP MFA</span>, title: "Seguridad & Multi-Tenancy" },
  { node: <span className="tech-loop-pill"><Cpu size={15} /> Docker · Flyway · OCI · Git</span>, title: "Cloud & DevOps" },
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
    <p className="eyebrow">
      <span className="eyebrow-line"/>
      <DecryptedText text={eyebrow} animateOn="inViewHover" sequential={true} speed={30} scrambleColor="#4b64df" />
    </p>
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
        <Magnet padding={40} magnetStrength={3.5}>
          <Button asChild size="sm" className="header-cta"><a href="#contacto">Hablemos <ArrowUpRight size={16}/></a></Button>
        </Magnet>
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
        <div className="hero-location"><MapPin size={14}/> Valledupar, Colombia <span className="hero-location-divider"/> <DecryptedText text="Desarrollo de software" animateOn="inViewHover" sequential={true} speed={28} scrambleColor="#4b64df" /></div>
        <div className="availability">
          <span className="availability-pulse"/>
          <ShinyText
            text="Disponible para patrocinio y contrato de aprendizaje SENA"
            color="#2b5e42"
            shineColor="#4ad68d"
            speed={3.2}
            delay={1.4}
          />
        </div>
        <h1>
          Transformo{" "}
          <ShinyText
            text="problemas"
            color="#4b64df"
            shineColor="#98b0ff"
            speed={2.6}
            delay={0.8}
            className="hero-highlight"
          />{" "}
          en software que <em>funciona.</em>
        </h1>
        <p className="hero-description">Soy <strong>Juan Sebastián Rincón</strong>. Desarrollo aplicaciones Full Stack, automatizo procesos y construyo soluciones donde la ingeniería, los datos y las ideas se encuentran.</p>
        <div className="hero-actions">
          <Magnet padding={55} magnetStrength={3.2}>
            <Button asChild size="lg"><a href="#proyectos">Explorar mis proyectos <ArrowUpRight size={18}/></a></Button>
          </Magnet>
          <Magnet padding={45} magnetStrength={3.8}>
            <Button asChild variant="outline" size="lg"><a href={LINKS.cv} target="_blank" rel="noopener noreferrer">Descargar CV <Download size={17}/></a></Button>
          </Magnet>
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
        <div className="portrait-tilted-shell">
          <TiltedCard
            imageSrc={LINKS.portrait}
            altText="Retrato profesional de Juan Sebastián Rincón Farelo"
            captionText="Juan Sebastián · Full Stack & Data"
            containerWidth="100%"
            containerHeight="100%"
            imageWidth="100%"
            imageHeight="100%"
            rotateAmplitude={10}
            scaleOnHover={1.025}
            glare={0.35}
            shadow={0.45}
            floating={true}
            radius={30}
            showTooltip={true}
            displayOverlayContent={true}
            overlayDepth={24}
            overlayContent={
              <div className="portrait-name">
                <span>JUAN SEBASTIÁN RINCÓN</span>
                <span>FULL STACK / SOFTWARE</span>
              </div>
            }
          />
        </div>
        <div className="floating-token floating-token--top"><div className="floating-token-icon"><Terminal size={18}/></div><div><strong>Software Engineering</strong><span>Build · Automate · Ship</span></div><span className="floating-verified"><Check size={14}/></span></div>
        <div className="floating-token floating-token--bottom"><span className="floating-status"/><div><strong>SAED 2.0 Activo</strong><span>SaaS Multi-Tenant · Nuevo Diseño</span></div><ArrowUpRight size={17}/></div>
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
        <p className="eyebrow">
          <span className="eyebrow-line"/>
          <DecryptedText text="01 / SOBRE MÍ" animateOn="inViewHover" sequential={true} speed={30} scrambleColor="#4b64df" />
        </p>
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

function ProjectCard({project}: {project: Project}) {
  const Icon = project.icon;
  return (
    <SpotlightCard
      className={`project-card ${project.featured ? "project-card--featured" : ""}`}
      spotlightColor="rgba(92, 125, 233, 0.12)"
    >
      <div className="project-media">
        <ProjectCarousel
          slides={project.slides}
          projectName={project.name}
          autoplay={true}
          autoplayDelay={5200}
          pauseOnHover={true}
          loop={true}
          featured={Boolean(project.featured)}
        />
      </div>
      <div className="project-content">
        <div className="project-heading-row">
          <div>
            <p className="project-meta">
              <DecryptedText text={`${project.index} / PROYECTO`} animateOn="inViewHover" sequential={true} speed={28} scrambleColor="#4b64df" />
              <span className="project-meta-divider">·</span>
              <span>{project.role}</span>
            </p>
            <h3>{project.name}</h3>
          </div>
          <Icon className="project-mini-icon" size={23} strokeWidth={1.7}/>
        </div>
        <h4>{project.headline}</h4>
        <p className="project-description">{project.description}</p>
        <p className="project-detail">{project.details}</p>
        <ul className="project-highlights" aria-label={`Puntos clave de ${project.name}`}>
          {project.highlights.map((item) => (
            <li key={item}>
              <Check size={14} className="project-highlight-icon" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="project-stack">
          {project.stack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="project-card-footer">
          <Badge className={`project-status project-status--${project.category}`}>
            {project.status}
          </Badge>
          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                aria-label={`Código de ${project.name} en GitHub`}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-link"
              >
                <Github size={16}/>
                <span>Repositorio</span>
              </a>
            )}
            {project.url ? (
              <a
                href={project.url}
                aria-label={`Visitar ${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver demo <ArrowUpRight size={16}/>
              </a>
            ) : (
              <span className="project-private">App de escritorio / Local</span>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function Projects() {
  const [filter,setFilter]=React.useState<"todos"|ProjectCategory>("todos");
  const filtered=filter==="todos"?PROJECTS:PROJECTS.filter(p=>p.category===filter);
  return <section className="section section-projects" id="proyectos">
    <div className="container">
      <Reveal><div className="section-heading-row"><SectionHeading eyebrow="02 / PROYECTOS SELECCIONADOS" title="Trabajos que hablan por sí solos." description="Explora las pantallas reales, flujos operativos y diagramas de arquitectura de cada proyecto con el carrusel interactivo React Bits."/><span className="section-count">05 <span>/ PROYECTOS</span></span></div></Reveal>
      <Tabs value={filter} onValueChange={v=>setFilter(v as typeof filter)} className="project-filter-tabs"><TabsList aria-label="Filtrar proyectos">
        {FILTERS.map(f=><TabsTrigger key={f.value} value={f.value}>{f.label}</TabsTrigger>)}
      </TabsList></Tabs>
      <div className="projects-grid" aria-live="polite">{filtered.map((p,i)=><Reveal key={p.index} className={p.featured?"project-reveal--featured":""} delay={i*65}><ProjectCard project={p}/></Reveal>)}</div>
      <p className="projects-footer-note"><ShieldCheck size={16}/> Haz clic en la captura activa o en el botón HD para inspeccionar en pantalla completa, o cambia el modo de transición (Scale · 3D Tilt · Cube · Slide). Los trabajos institucionales confidenciales no se publican aquí.</p>
    </div>
  </section>;
}

function Technology() {
  return <section className="section section-skills" id="tecnologias"><div className="container">
    <Reveal><div className="section-heading-row"><SectionHeading eyebrow="03 / HERRAMIENTAS Y CONOCIMIENTOS" title="El stack es el medio. La solución es el objetivo." description="Tecnologías con las que diseño, desarrollo, integro y despliego soluciones de extremo a extremo."/></div></Reveal>
    <Reveal delay={60}>
      <div className="tech-loop-shell">
        <LogoLoop
          logos={TECH_LOOP_ITEMS}
          speed={55}
          direction="left"
          logoHeight={26}
          gap={16}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutWidth={0.09}
          draggable={true}
          scrollBoost={0.12}
          ariaLabel="Ecosistema tecnológico principal"
        />
      </div>
    </Reveal>
    <div className="skills-grid">{SKILLS.map((group,i)=>{
      const Icon=group.icon;
      return <Reveal key={group.title} delay={i*80}>
        <GlareHover
          width="100%"
          height="100%"
          borderRadius="19px"
          glareColor="#5a72e6"
          glareOpacity={0.15}
          variant="twin"
          rimGlint={true}
        >
          <div className="skills-card">
            <div className="skills-head"><span className="skills-icon"><Icon size={25} strokeWidth={1.65}/></span><span className="skills-number">0{i+1}</span></div>
            <h3>{group.title}</h3>
            <div className="skills-tags">{group.items.map(item=><span key={item}>{item}</span>)}</div>
          </div>
        </GlareHover>
      </Reveal>;
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
  return <section className="section-contact" id="contacto"><div className="container"><div className="contact-panel"><div className="contact-glow" aria-hidden="true"/><div className="contact-top"><span className="contact-kicker"><span className="small-online-dot"/> <ShinyText text="DISPONIBLE PARA CONVERSAR" color="#c4d1e3" shineColor="#ffffff" speed={2.8} delay={1.2} /></span><span className="contact-index"><DecryptedText text="05 / CONTACTO" animateOn="inViewHover" sequential={true} speed={30} scrambleColor="#8ca4ff" /></span></div>
    <div className="contact-middle"><div><h2>¿Tienes un reto?<br/><em>Construyamos</em> la solución.</h2><p>Abierto a oportunidades de aprendizaje, equipos de desarrollo y proyectos donde la tecnología pueda crear valor real.</p><p className="contact-context">Actualmente en etapa lectiva SENA; cualquier inicio de etapa productiva requiere autorización institucional.</p></div>
      <div className="contact-actions">
        <Magnet padding={45} magnetStrength={3.4} style={{ width: "100%" }}>
          <Button asChild size="lg" className="contact-button" style={{ width: "100%" }}><a href={LINKS.email}>Escríbeme un correo <ArrowUpRight size={19}/></a></Button>
        </Magnet>
        <a className="contact-link" href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Hablemos por WhatsApp <ArrowUpRight size={16}/></a>
        <a className="contact-link" href={LINKS.cv} target="_blank" rel="noopener noreferrer"><Download size={18}/> Descargar mi CV <ArrowUpRight size={16}/></a>
      </div>
    </div>
    <div className="contact-bottom"><span>juansebastianrincon@unicesar.edu.co</span><span>Valledupar · Colombia</span></div>
  </div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a href="#inicio" className="footer-brand">JS<span>.</span></a><span>Diseñado y desarrollado con intención. © {new Date().getFullYear()} Juan Sebastián Rincón Farelo.</span><div className="footer-links"><a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href="#inicio" aria-label="Volver arriba">↑</a></div></div></footer>;
}

export function PortfolioPage() {
  return (
    <ClickSpark
      sparkColor={["#4b64df", "#6c87ff", "#36b475"]}
      sparkSize={11}
      sparkRadius={24}
      sparkCount={8}
      duration={440}
      shape="streak"
      ring={true}
    >
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header/>
      <main id="contenido">
        <Hero/>
        <About/>
        <Projects/>
        <Technology/>
        <Journey/>
        <Contact/>
      </main>
      <Footer/>
    </ClickSpark>
  );
}
