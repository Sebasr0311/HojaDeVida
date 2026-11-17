/**
 * Contenido del portafolio. Todo lo que se muestra en la página sale de aquí:
 * editar este archivo basta para actualizar textos, proyectos, capturas y enlaces.
 */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${BASE_PATH}${path}`;

export const LINKS = {
  github: "https://github.com/Sebasr0311",
  linkedin: "https://www.linkedin.com/in/juan-sebastian-rincon-farelo-a17374449/",
  emailAddress: "juansebastianrincon@unicesar.edu.co",
  email: "mailto:juansebastianrincon@unicesar.edu.co",
  whatsapp: "https://wa.me/573026555881",
  cv: asset("/CV_Juan_Sebastian_Rincon_Farelo.pdf"),
  portrait: asset("/juan-sebastian-portrait.jpg"),
};

export type Shot = {
  src: string;
  alt: string;
  title: string;
  caption?: string;
};

/* ───────────────────────── SAED · caso de estudio ───────────────────────── */

export const SAED = {
  name: "SAED 2.0",
  tagline: "Un solo registro para toda la copropiedad.",
  summary:
    "Plataforma SaaS multi-tenant para administrar edificios y conjuntos cerrados en Colombia. Une administración, cartera, portería, residentes y convivencia sobre la misma base de datos, con aislamiento entre organizaciones garantizado por el propio motor Oracle.",
  role: "Diseño, arquitectura y desarrollo Full Stack individual",
  status: "En desarrollo · piloto pendiente",
  url: "https://www.saed.app/",
  metrics: [
    { value: 962, suffix: "", label: "archivos Java en el backend" },
    { value: 84, suffix: "", label: "pantallas React por rol" },
    { value: 90, suffix: "", label: "migraciones SQL versionadas" },
    { value: 282, suffix: "", label: "clases de prueba JUnit" },
    { value: 6, suffix: "", label: "roles con permisos propios" },
  ],
  shots: [
    { src: asset("/projects/saed/01-manual-hero.webp"), alt: "Landing de SAED 2.0 con simulador de unidades", title: "Landing · simulador de unidades", caption: "El sitio público se presenta como el manual de armado del conjunto, con un simulador que calcula el plan según el número de unidades." },
    { src: asset("/projects/saed/02-manual-piezas.webp"), alt: "Piezas del sistema SAED 2.0", title: "Las piezas · 6 roles", caption: "Organización, administración, portería, residente titular, conviviente y propietario no residente trabajando sobre el mismo registro." },
    { src: asset("/projects/saed/03-admin-cartera.webp"), alt: "Panel de cartera y cobros con antigüedad de deuda", title: "Administración · Cartera", caption: "Recaudo, saldos vencidos a 30/60/90+ días y mora crítica por apartamento." },
    { src: asset("/projects/saed/04-admin-pagos.webp"), alt: "Gestión de pagos y aprobación de soportes", title: "Finanzas · Conciliación", caption: "Saldos por residente, abonos manuales y bandeja de aprobación de comprobantes." },
    { src: asset("/projects/saed/05-residente-dashboard.webp"), alt: "Centro operativo del residente", title: "Residente · Centro operativo", caption: "Cuotas, visitantes en portería, paquetes por retirar, reservas y avisos de la comunidad." },
    { src: asset("/projects/saed/06-residente-operaciones.webp"), alt: "Pago con Wompi y pases QR", title: "Residente · Wompi y pases QR", caption: "Pago de administración por PSE o tarjeta y credenciales QR para invitados." },
    { src: asset("/projects/saed/07-porteria-paquetes.webp"), alt: "Consola de portería para paquetería con PIN", title: "Portería · Paquetes con PIN", caption: "Registro de encomiendas con foto de evidencia y PIN de retiro enviado al residente." },
  ] satisfies Shot[],
  roles: [
    { id: "superadmin", label: "Superadmin", scope: "SCOPE_SUPERADMIN", who: "Dueño de la plataforma", does: ["Alta de organizaciones y onboarding guiado", "Planes comerciales, membresías y suscripciones", "Métricas globales y auditoría de la plataforma"], limit: "No interviene en la operación interna de cada copropiedad." },
    { id: "organizacion", label: "Organización", scope: "SCOPE_ADMIN_ORGANIZACION", who: "Empresa administradora o inmobiliaria", does: ["Portafolio de propiedades a su cargo", "Cartera y gastos consolidados entre conjuntos", "Plantillas de contratos, analítica y reportes"], limit: "Solo ve las propiedades asignadas a su organización." },
    { id: "admin", label: "Administración", scope: "SCOPE_ADMIN_PROPIEDAD", who: "Administrador del conjunto", does: ["Cartera, pagos, conciliación, presupuesto y flujo de caja", "Asambleas, actas, reglamentos, sanciones y multas", "Mantenimiento, obras, proveedores, empleados y pólizas"], limit: "Opera una copropiedad; el aislamiento lo impone la base de datos." },
    { id: "porteria", label: "Portería", scope: "SCOPE_PORTERO", who: "Vigilancia y recepción", does: ["Escáner QR de invitaciones en la garita", "Recepción y custodia de paquetes con PIN", "Control de parqueaderos de visitantes y salidas"], limit: "Sin acceso a finanzas ni datos de cartera." },
    { id: "residente", label: "Residente titular", scope: "SCOPE_RESIDENTE", who: "Propietario o arrendatario titular", does: ["Estado de cuenta y pago en línea con Wompi", "Invitaciones QR, reservas y PQRS", "Convivientes, documentos, asambleas y votaciones"], limit: "Solo su unidad, nunca la de un vecino." },
    { id: "convivencia", label: "Conviviente", scope: "SCOPE_RESIDENTE_CONVIVENCIA", who: "Familiar o habitante de la unidad", does: ["Paquetería con PIN y visitas QR", "Reservas de zonas comunes", "Solicitudes y comunicados"], limit: "Bloqueado (HTTP 403) para estados financieros y cobros." },
  ],
  modules: [
    { area: "Finanzas", items: ["Cartera y antigüedad", "Pagos con Wompi", "Conciliación", "Presupuesto", "Flujo de caja", "Gastos", "Facturación", "Paz y salvo", "Multas"] },
    { area: "Portería y seguridad", items: ["Visitas con QR", "Escáner en garita", "Paquetes con PIN", "Parqueaderos", "Emergencias", "Incidentes"] },
    { area: "Gobierno de la copropiedad", items: ["Asambleas", "Votaciones", "Actas", "Reglamentos", "Sanciones", "Documentos", "Pólizas y seguros"] },
    { area: "Operación", items: ["Mantenimiento", "Obras", "Activos", "Proveedores y contratos", "Empleados", "Consumos", "Automatizaciones"] },
    { area: "Comunidad", items: ["PQRS", "Reservas de zonas comunes", "Comunicaciones", "Buzón", "Convivientes"] },
    { area: "Plataforma SaaS", items: ["Organizaciones", "Planes y suscripciones", "Onboarding", "Métricas", "Auditoría global"] },
  ],
  architecture: [
    { layer: "Cliente", tech: "React 18 · Vite · Tailwind", detail: "SPA con rutas protegidas por rol y scope, desplegada en Vercel." },
    { layer: "API", tech: "Spring Boot 3.2 · Java 17", detail: "REST stateless con Spring Security, JWT y un contexto de sesión por petición. Contenedor Docker en Render." },
    { layer: "Datos", tech: "Oracle Autonomous DB · OCI", detail: "VPD / Row-Level Security: cada conexión fija SAED_CTX y el motor filtra por organización y propiedad." },
  ],
  integrations: ["Wompi · pagos y webhooks HMAC", "Brevo · correo transaccional", "API Colombia · 32 departamentos y +1.100 municipios"],
  decisions: [
    { title: "Cero confianza en la capa web", body: "Aunque un endpoint falle, Oracle VPD impide leer datos de otra organización: el aislamiento vive en el motor, no solo en el código." },
    { title: "Auditoría inmutable", body: "AUDITORIA_LOG es append-only: cualquier intento de modificarla dispara ORA-20099." },
    { title: "Sin secretos por defecto", body: "El backend no arranca sin variables reales en ningún perfil; los webhooks de Wompi se verifican con HMAC-SHA256." },
    { title: "Calidad comprobada", body: "JUnit 5 y Mockito en el backend, verificación estática del contrato API front/back y especificaciones E2E con Playwright." },
  ],
  stack: ["Java 17", "Spring Boot 3.2", "Spring Security", "React 18", "Vite", "Tailwind", "Oracle ATP", "PL/SQL", "OCI", "Docker", "Wompi", "Playwright"],
};

/* ──────────────────────── Comercio móvil: Miga y FC Motion ──────────────────────── */

export type MobileProject = {
  id: string;
  index: string;
  name: string;
  formerly?: string;
  kind: string;
  tagline: string;
  summary: string;
  status: string;
  url: string;
  accent: string;
  surface: string;
  highlights: { title: string; body: string }[];
  stack: string[];
  store: Shot[];
  admin: Shot[];
  video?: { mp4: string; webm: string; poster: string; label: string };
  note?: string;
};

export const MOBILE_PROJECTS: MobileProject[] = [
  {
    id: "miga",
    index: "02",
    name: "Baked Bliss Treats",
    formerly: "Miga",
    kind: "Repostería artesanal · tienda + panel de la dueña",
    tagline: "La tanda de hoy, en el bolsillo de cada cliente.",
    summary:
      "Tienda y back office para una repostería de Valledupar que vende galletas en tandas limitadas. El cliente ve lo que realmente queda en la bandeja, arma su pedido y lo envía por WhatsApp; la dueña lleva horno, insumos, pedidos y ganancias desde su iPhone.",
    status: "Pre-lanzamiento · cliente real",
    url: "https://baked-bliss-treats.vercel.app/",
    accent: "#a9446a",
    surface: "#fbe3ea",
    highlights: [
      { title: "Nunca vende de más", body: "El pedido se guarda y reserva stock en la base de datos antes de abrir WhatsApp. Si la tanda se acaba, la tienda invita a encargar." },
      { title: "Encargos con fecha", body: "Pedidos a futuro por tipo de galleta para eventos y regalos, con caja de 6 y descuento." },
      { title: "Insumos y costos reales", body: "Recetas por tanda: el sistema calcula materias primas y costo para cualquier cantidad a hornear." },
      { title: "Admin instalable", body: "PWA con notificaciones Web Push para cada pedido nuevo y exportes a Excel de ventas y compras." },
    ],
    stack: ["React 19", "Vite", "TypeScript", "Supabase", "Postgres + RLS", "Edge Functions", "Web Push", "Vitest"],
    store: [
      { src: asset("/projects/miga/01-tanda.webp"), alt: "Tienda de Baked Bliss Treats: la tanda de hoy", title: "La tanda de hoy", caption: "Cada galleta disponible se dibuja en la bandeja: el stock se ve, no se adivina." },
      { src: asset("/projects/miga/02-producto.webp"), alt: "Ficha de producto Choco Chips", title: "Ficha de la galleta", caption: "Detalle en hoja deslizable, pensada para usar con una mano." },
      { src: asset("/projects/miga/03-bolsa.webp"), alt: "Bolsa de compra con recogida o domicilio", title: "Bolsa y entrega", caption: "Recoger o domicilio, incentivo para completar la caja de 6 y envío por WhatsApp." },
      { src: asset("/projects/miga/04-encargo.webp"), alt: "Formulario de encargo con fecha", title: "Encarga tu tanda", caption: "Pedidos con fecha futura por tipo de galleta." },
    ],
    admin: [
      { src: asset("/projects/miga/a2-hoy.webp"), alt: "Panel Hoy del admin", title: "Hoy", caption: "Cobrado, por confirmar y galletas en la bandeja, con primeros pasos de configuración." },
      { src: asset("/projects/miga/a3-horno.webp"), alt: "Horno: registro de tandas", title: "Horno", caption: "La dueña registra cada tanda; la tienda nunca puede vender más de lo horneado." },
      { src: asset("/projects/miga/a4-insumos.webp"), alt: "Calculadora de insumos", title: "Insumos", caption: "Calculadora de materias primas y costos a partir de recetas." },
      { src: asset("/projects/miga/a5-numeros.webp"), alt: "Números y ganancia", title: "Números", caption: "Ganancia sobre pagos confirmados, compras y caja real." },
      { src: asset("/projects/miga/a1-login.webp"), alt: "Ingreso a la cocina", title: "Entrar a la cocina", caption: "Login con guía para instalar la app en el iPhone." },
    ],
    note: "Capturas tomadas en modo demostración, con datos de ejemplo.",
  },
  {
    id: "fcmotion",
    index: "03",
    name: "FC Motion",
    kind: "Ropa deportiva femenina · probador virtual + admin",
    tagline: "Pruébatela antes de pedirla.",
    summary:
      "Tienda de activewear con un probador virtual: la modelo cambia de prenda y color mientras la clienta navega, elige talla y cierra por WhatsApp. Las dos dueñas manejan pedidos, inventario por lotes, finanzas y clientas desde una app instalable.",
    status: "Pre-lanzamiento · cliente real",
    url: "https://fc-motion.vercel.app/",
    accent: "#9a5a45",
    surface: "#f8e6dc",
    highlights: [
      { title: "Probador virtual", body: "Cada color de cada prenda tiene su toma; el cambio se anima con un barrido de luz y sin recargar la página." },
      { title: "Stock honesto por variante", body: "Color × talla con existencias reales; la reserva vence sola (pg_cron) y las tallas agotadas ofrecen «Avísame»." },
      { title: "Cierre por WhatsApp", body: "Código FC-####, mensaje estructurado, comprobante de pago y seguimiento público del pedido." },
      { title: "Admin para las dueñas", body: "Lotes de compra con costo FIFO, números, clientas que vuelven, plantillas de mensajes y resumen diario por push." },
    ],
    stack: ["React 19", "Vite", "TypeScript", "Supabase", "pg_cron", "Edge Functions", "Vercel Middleware", "Vitest · 358 pruebas", "Playwright"],
    store: [
      { src: asset("/projects/fcmotion/02-probador.webp"), alt: "Probador virtual de FC Motion", title: "Probador", caption: "Categorías, prendas vecinas, color y talla en una sola barra." },
      { src: asset("/projects/fcmotion/01-intro.webp"), alt: "Portada de FC Motion", title: "Portada", caption: "Marca, propuesta de valor y acceso directo al probador." },
      { src: asset("/projects/fcmotion/03-detalle.webp"), alt: "Detalle de prenda", title: "Detalle de prenda", caption: "Galería por color, guía de tallas y disponibilidad." },
      { src: asset("/projects/fcmotion/04-coleccion.webp"), alt: "Colección completa", title: "Colección", caption: "Catálogo numerado como fotogramas, con colores disponibles." },
    ],
    admin: [
      { src: asset("/projects/fcmotion/a2-hoy.webp"), alt: "Panel Hoy con checklist de lanzamiento", title: "Hoy", caption: "Checklist de lanzamiento, ventas, ganancia y pedidos pagados." },
      { src: asset("/projects/fcmotion/a3-prendas.webp"), alt: "Inventario de prendas", title: "Prendas", caption: "Inventario por color y talla, margen y alertas de tallas agotadas." },
      { src: asset("/projects/fcmotion/a4-numeros.webp"), alt: "Números y ganancia neta", title: "Números", caption: "Ventas, costo de lo vendido, ganancia bruta y neta por periodo." },
      { src: asset("/projects/fcmotion/a5-clientes.webp"), alt: "Clientas y recompra", title: "Clientas", caption: "Ticket promedio, clientas que vuelven a comprar y ranking." },
      { src: asset("/projects/fcmotion/a1-login.webp"), alt: "Ingreso al panel", title: "Panel de FC Motion", caption: "Ingreso con instrucciones para instalar la app en el iPhone." },
    ],
    video: {
      mp4: asset("/projects/fcmotion/fcmotion-probador.mp4"),
      webm: asset("/projects/fcmotion/fcmotion-probador.webm"),
      poster: asset("/projects/fcmotion/probador-poster.webp"),
      label: "Probador en uso: cambio entre cuatro referencias",
    },
    note: "Fotos de prenda provisionales generadas con IA hasta la sesión oficial; nombres y precios de ejemplo.",
  },
];

/* ───────────────────────── Otros proyectos ───────────────────────── */

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  headline: string;
  description: string;
  highlights: string[];
  stack: string[];
  status: string;
  role: string;
  url?: string;
  github?: string;
  accent: string;
  tint: string;
  shots: Shot[];
};

export const PROJECTS: Project[] = [
  {
    id: "alexa",
    index: "04",
    name: "Alexa Beauty",
    kind: "E-commerce + punto de venta",
    headline: "De un emprendimiento a una tienda operativa.",
    description: "Tienda en línea de cosméticos con selector de tonos, inventario en vivo, checkout asistido por WhatsApp y un POS para las ventas de mostrador. En uso comercial con pedidos reales.",
    highlights: ["Selector rápido de tonos que valida stock por variante", "POS de mostrador que descuenta existencias al instante", "Admin con JWT HttpOnly, kardex e importación desde Excel"],
    stack: ["Java 21", "Spring Boot 3.4", "Next.js 15", "React 19", "PostgreSQL 16", "Supabase"],
    status: "En uso comercial",
    role: "Full Stack individual",
    url: "https://alexa-beauty.vercel.app/",
    github: "https://github.com/Sebasr0311/Alexa-Beauty",
    accent: "#7a4fb3",
    tint: "#ece4fb",
    shots: [
      { src: asset("/projects/alexa/01-hero-storefront.webp"), alt: "Portada de Alexa Beauty", title: "Tienda en producción" },
      { src: asset("/projects/alexa/02-catalogo-productos.webp"), alt: "Catálogo con variantes de tono", title: "Catálogo con stock en vivo" },
      { src: asset("/projects/alexa/04-selector-tonos.webp"), alt: "Selector rápido de tono", title: "Selector de tono" },
      { src: asset("/projects/alexa/03-detalle-producto.webp"), alt: "Ficha de producto", title: "Ficha de producto" },
      { src: asset("/projects/alexa/05-admin-pos.webp"), alt: "POS de punto físico", title: "POS de mostrador" },
      { src: asset("/projects/alexa/06-panel-admin.webp"), alt: "Panel administrativo", title: "Panel de pedidos" },
    ],
  },
  {
    id: "meditraje",
    index: "05",
    name: "MediTraje",
    kind: "Salud digital",
    headline: "Tecnología para ordenar la atención médica.",
    description: "Plataforma clínica con orientación de triaje, agenda sin colisiones, historia clínica inmutable y receta digital, sobre Oracle Cloud ATP.",
    highlights: ["Motor de triaje con 42 reglas y corte inmediato a la Línea 123 en Nivel I", "13 triggers PL/SQL que impiden alterar historias cerradas", "Argon2id, MFA TOTP (RFC 6238) y acceso de emergencia Break-Glass"],
    stack: ["Java 21", "Spring Boot 3.3", "Oracle ATP", "PL/SQL", "Flyway", "TOTP"],
    status: "Demo publicada",
    role: "Arquitectura y Full Stack",
    url: "https://meditraje.vercel.app/",
    github: "https://github.com/Sebasr0311/MediTraje",
    accent: "#23744f",
    tint: "#dbf2e6",
    shots: [
      { src: asset("/projects/meditraje/01-landing-hero.webp"), alt: "Portal de MediTraje", title: "Portal clínico" },
      { src: asset("/projects/meditraje/02-simulador-triaje.webp"), alt: "Simulador del motor de triaje", title: "Motor de triaje" },
      { src: asset("/projects/meditraje/03-corte-emergencia.webp"), alt: "Corte de emergencia Nivel I", title: "Corte de emergencia" },
      { src: asset("/projects/meditraje/04-agenda-medica.webp"), alt: "Agenda médica semanal", title: "Agenda médica" },
      { src: asset("/projects/meditraje/05-detalle-cita.webp"), alt: "Detalle de cita", title: "Detalle de cita" },
      { src: asset("/projects/meditraje/06-arquitectura-oracle.webp"), alt: "Arquitectura PL/SQL en Oracle ATP", title: "Arquitectura Oracle" },
    ],
  },
  {
    id: "notas",
    index: "06",
    name: "Digitalizador académico IA",
    kind: "IA aplicada · escritorio",
    headline: "Planillas manuscritas convertidas en Excel.",
    description: "Aplicación de escritorio en Python que lee planillas escolares escaneadas con Gemini Vision, marca lo dudoso para revisión docente y exporta libros de Excel por curso.",
    highlights: ["Marca en amarillo las celdas con menos de 80 % de confianza; no inventa datos", "Procesamiento multi-curso en segundo plano con reintentos y backoff", "Excel con una hoja por asignatura y ejecutable .exe"],
    stack: ["Python 3", "Gemini Vision", "CustomTkinter", "PyMuPDF", "OpenPyXL", "PyInstaller"],
    status: "Proyecto personal",
    role: "Desarrollo individual",
    github: "https://github.com/Sebasr0311/SistemadeNotas",
    accent: "#85660f",
    tint: "#faf0cc",
    shots: [
      { src: asset("/projects/notas/01-comparativa-ocr-ia.webp"), alt: "Planilla escaneada frente a tabla extraída", title: "De papel a tabla" },
      { src: asset("/projects/notas/02-carga-multicurso.webp"), alt: "Carga multi-curso", title: "Carga por lotes" },
      { src: asset("/projects/notas/03-tabla-revision-interactiva.webp"), alt: "Tabla de revisión con celdas dudosas", title: "Revisión docente" },
      { src: asset("/projects/notas/04-excel-consolidado.webp"), alt: "Excel consolidado", title: "Excel consolidado" },
    ],
  },
  {
    id: "dwh",
    index: "07",
    name: "Data Warehouse MusicBrainz",
    kind: "Ingeniería de datos · equipo",
    headline: "De 89 millones de filas a decisiones.",
    description: "Data Warehouse en PostgreSQL 16 (~16 GB) con arquitectura Medallón y esquema estrella Kimball sobre 15 millones de pistas. Mi aporte: ingesta, limpieza y auditoría ETL.",
    highlights: ["Ingesta masiva con COPY en streaming hacia 10 tablas en 3FN", "Hechos particionados por rango y 4 vistas materializadas", "Power BI con 26 medidas DAX y 0 huérfanos en la conciliación"],
    stack: ["Python", "PostgreSQL 16", "Medallón", "Kimball", "Power BI", "DAX", "Docker"],
    status: "Proyecto académico",
    role: "Ingeniería de datos",
    github: "https://github.com/srusso1/DWH-MusicBrainz",
    accent: "#2f6aa3",
    tint: "#ddebfa",
    shots: [
      { src: asset("/projects/dwh/01-powerbi-analisis.webp"), alt: "Dashboard Power BI de análisis", title: "Power BI · análisis" },
      { src: asset("/projects/dwh/02-powerbi-calidad.webp"), alt: "Dashboard de calidad e ISRC", title: "Power BI · calidad" },
      { src: asset("/projects/dwh/03-esquema-estrella.webp"), alt: "Esquema estrella", title: "Esquema estrella" },
      { src: asset("/projects/dwh/04-resumen-medallion.webp"), alt: "Resumen de la arquitectura Medallón", title: "Medallón" },
      { src: asset("/projects/dwh/06-auditoria-calidad.webp"), alt: "Auditoría de calidad", title: "Auditoría de calidad" },
    ],
  },
];

/* ───────────────────────── Stack ───────────────────────── */

export const SKILL_GROUPS = [
  { id: "backend", title: "Backend", lead: "APIs que aguantan negocio real.", items: ["Java 17/21", "Spring Boot", "Spring Security", "APIs REST", "JWT", "Clean Architecture"] },
  { id: "frontend", title: "Frontend y móvil", lead: "Interfaces pensadas primero para el teléfono.", items: ["React", "Next.js", "TypeScript", "Vite", "Tailwind", "PWA + Web Push"] },
  { id: "data", title: "Datos", lead: "Del modelo relacional al tablero.", items: ["Oracle SQL", "PL/SQL", "PostgreSQL", "Row-Level Security", "ETL en Python", "Power BI / DAX"] },
  { id: "cloud", title: "Cloud y DevOps", lead: "Desplegado, versionado y medido.", items: ["Oracle Cloud (OCI)", "Supabase", "Vercel", "Render", "Docker", "Flyway", "GitHub Actions"] },
  { id: "ai", title: "IA y automatización", lead: "Menos trabajo manual.", items: ["Google Gemini API", "Python", "Visión artificial", "Edge Functions", "pg_cron"] },
  { id: "quality", title: "Calidad", lead: "Lo que no se prueba, se rompe.", items: ["JUnit 5", "Mockito", "Vitest", "Playwright", "Scrum"] },
];

export const MARQUEE = ["Java", "Spring Boot", "React", "Next.js", "TypeScript", "Oracle ATP", "PL/SQL", "PostgreSQL", "Supabase", "Python", "Gemini", "Docker", "Power BI", "Playwright"];

/* ───────────────────────── Trayectoria ───────────────────────── */

export const EDUCATION = [
  { period: "2024 — actualidad", title: "Ingeniería de Sistemas", place: "Universidad Popular del Cesar · Valledupar", note: "5.º semestre en curso" },
  { period: "2025 — 2027 (previsto)", title: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)", place: "SENA", note: "Etapa lectiva · disponible para patrocinio y contrato de aprendizaje" },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  metric: string;
  summary: string;
  image: string;
  pdf: string;
  accent: string;
};

export const CERTIFICATES: Certificate[] = [
  { id: "mintic", title: "Bootcamp de Inteligencia Artificial — Nivel Básico", issuer: "MinTIC · Talento Tech · Universidad Libre", date: "Agosto 2026", metric: "159 horas", summary: "Formación intensiva en IA, machine learning, Python para datos y modelos generativos.", image: asset("/certificados/mintic-ia-basico.webp"), pdf: asset("/certificados/mintic-ia-basico.pdf"), accent: "#1f6f78" },
  { id: "oracle", title: "Oracle Cloud Infrastructure Foundations I", issuer: "Oracle Academy", date: "Septiembre 2026", metric: "Award of Completion", summary: "Arquitectura cloud, IAM, redes virtuales (VCN), cómputo, almacenamiento y Autonomous Database en OCI, en inglés.", image: asset("/certificados/oracle-cloud-foundations-i.webp"), pdf: asset("/certificados/oracle-cloud-foundations-i.pdf"), accent: "#a8452f" },
  { id: "oxford", title: "Oxford Placement Test — Inglés", issuer: "Oxford University Press", date: "Noviembre 2023", metric: "CEFR B1 · Use of English B2", summary: "Puntaje global 59/100 (B1), Use of English 60/100 (B2) y Listening 59/100 (B1).", image: asset("/certificados/oxford-placement-test-b1-card.webp"), pdf: asset("/certificados/oxford-placement-test-b1.pdf"), accent: "#4a54b8" },
];
