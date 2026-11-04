# Portafolio web — Juan Sebastián Rincón Farelo

Portafolio profesional de una sola página, diseñado para mostrar proyectos reales, trayectoria, tecnología y disponibilidad para patrocinio SENA. Desarrollado con **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4**, componentes de la arquitectura **shadcn/ui** y una adaptación TypeScript del efecto **SpotlightCard de React Bits**.

## Qué incluye

- Diseño profesional, editorial y responsive (escritorio, tablet y móvil).
- Fotografía profesional original y optimizada en `/public`.
- Introducción, experiencia, proyectos filtrables, tecnologías, formación, certificaciones y contacto.
- **Cinco proyectos**: SAED, Alexa Beauty, MediTraje, Digitalizador académico IA, Data Warehouse MusicBrainz.
- Estados honestos de cada proyecto (desarrollo, uso comercial, demo, académico).
- Enlaces a GitHub, LinkedIn, WhatsApp, correo y PDF del CV.
- Interacción de tarjetas con **React Bits SpotlightCard**, filtros accesibles con **Radix Tabs** y botones shadcn/ui.
- Efectos de aparición sutiles, control de movimiento reducido, navegación por teclado, metadatos SEO/Open Graph.
- Vista previa estática independiente en `preview/index.html` que se puede abrir sin instalar Node (solo para ver el diseño; la versión de producción es Next.js).

## Requisitos

- Node.js 20.9 o superior (recomendado: Node.js 22 LTS).
- npm.

## Ejecutar en local

```bash
npm install
npm run dev
```

Luego visita `http://localhost:3000`.

### Comprobar tipos y compilación

```bash
npm run typecheck
npm run lint
npm run build
```

> **Importante:** el proyecto se generó en un entorno sin acceso a la red de npm. Por eso se verificaron la sintaxis TypeScript y una vista previa estática responsive, pero **no se ejecutó `npm install`, ni un `next build` real**. Ejecuta esos comandos en tu equipo o en el pipeline de Vercel antes de publicarlo.

## Publicar en Vercel

1. Sube la carpeta `portafolio-juan-sebastian` a un repositorio de GitHub.
2. En Vercel, selecciona **New Project** e importa ese repositorio.
3. Preset: `Next.js`. Build: `npm run build` (normalmente se detecta automáticamente).
4. Opcional: define `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com` para los enlaces absolutos Open Graph.
5. Haz **Deploy** y prueba todos los enlaces.

No necesitas una base de datos ni claves API: es un portafolio de presentación, sin formulario con backend.

## Personalizar contenido

- **Proyectos:** `src/components/portfolio-page.tsx` → arreglo `PROJECTS`.
- **Filtros:** `FILTERS`.
- **Tecnologías:** `SKILLS`.
- **Fotografía:** sustituye `public/juan-sebastian-portrait.jpg`.
- **CV PDF:** sustituye `public/CV_Juan_Sebastian_Rincon_Farelo.pdf`.
- **Correo y redes:** `LINKS`.
- **Colores, animaciones y diseño:** `src/app/globals.css`.
- **Título y metadatos:** `src/app/layout.tsx`.

## Notas sobre privacidad y exactitud

- El sistema institucional de seguimiento de egresados **no está publicado**, ni se incluyen detalles internos, repositorios privados ni datos de terceros.
- SAED aparece correctamente como **proyecto individual en desarrollo, con piloto pendiente**.
- Alexa Beauty se identifica como proyecto individual en **uso comercial** y con pedidos reales.
- En MusicBrainz se describe el aporte específico del autor: **ingesta, limpieza y auditoría ETL** dentro de un equipo.
- La autorización para iniciar anticipadamente la etapa productiva SENA **no se da por concedida**.
- El portafolio muestra datos de contacto que serán públicos si se despliega. Revisa teléfono, correo y perfil antes de publicar.

## React Bits

`src/components/react-bits/spotlight-card.tsx` adapta la lógica del componente público React Bits `SpotlightCard` de David Haz (seguimiento de puntero y gradiente CSS), con tipos de TypeScript y estilos del portafolio.

Fuente: https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/SpotlightCard/SpotlightCard.jsx

La registry oficial está configurada en `components.json`. Para instalar otros componentes React Bits cuando tengas conexión:

```bash
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @react-bits/AnimatedContent-TS-TW
```

Los elementos UI locales emplean el patrón shadcn/ui con CVA, Radix Slot y Radix Tabs. Puedes ampliarlos con `npx shadcn@latest add button badge tabs` si quieres sincronizarlos con la versión más reciente de la registry.

## Estructura

```text
src/
  app/
    layout.tsx           # Metadata y raíz HTML
    page.tsx             # Ruta principal
    globals.css          # Diseño y responsive
  components/
    portfolio-page.tsx   # Contenido e interacciones
    ui/                  # shadcn/ui compatible
    react-bits/          # SpotlightCard (React Bits)
  lib/utils.ts
public/
  juan-sebastian-portrait.jpg
  CV_Juan_Sebastian_Rincon_Farelo.pdf
  social-preview.png
  favicon.svg
preview/
  index.html             # Vista estática opcional
  styles.css
```

## Detalles de accesibilidad

- Botón **Saltar al contenido** y navegación semántica.
- Menú móvil con `aria-expanded` y cierre por `Escape`.
- Tabs de proyectos con Radix, utilizables mediante teclado.
- Respeta `prefers-reduced-motion` y no impide leer sin JavaScript.
- Los enlaces externos incluyen `rel="noopener noreferrer"`.

© 2026 Juan Sebastián Rincón Farelo. Código de React Bits sujeto a sus avisos de licencia.
