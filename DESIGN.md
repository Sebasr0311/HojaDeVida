# DESIGN.md — HojaDeVida (Juan Sebastian Rincón Farelo)

Visual system recorded from the built world. HTML + Bootstrap 5 CSS — no JavaScript
(CDN CSS only, no bundle).

## World

Bootstrap 5 components and utilities in a neutral zinc-ish palette. The site reads
like a quiet engineering brief: white ground, near-black ink, hairline borders.
Bootstrap's default blue is replaced by zinc-900 via its CSS variables
(`--bs-primary`, `--bs-link-color`).

## Foundations

- **Framework**: Bootstrap 5.3.3 CSS + Bootstrap Icons 1.11.3 (both CDN, CSS only).
- **Type**: Bootstrap system-ui stack. No external fonts.
- **Colors**: Bootstrap tokens overridden in `index.css` (`:root`): primary =
  zinc-900 `#18181b`. `text-secondary`/`text-bg-light` utilities carry the neutral
  scale. Semantic success (badge "En curso") uses `--bs-success`.
- **Radius**: Bootstrap defaults (cards 0.375rem, pills 50rem).

## Layout

- **Grid**: Bootstrap `container` + `row`/`col` with `g-4` gutters. Cards use
  `h-100` + `d-flex flex-column` + `flex-grow-1` on descriptions for equal heights.
- **Sections** (professor rubric): `py-5`; alternate sections use `bg-light`.
  Headings `text-center fw-bold`. Section order: Hero → Información personal
  (avatar with initials, contact list) → Perfil profesional → Formación académica
  (with periods) → Habilidades (technical + personal) → Proyectos → Experiencia
  laboral (honest "no formal experience" card + project practice) → Información
  adicional (courses/certifications incl. Oxford B2, languages with progress bars)
  → Datos de contacto (email mailto:, phone tel:, GitHub, LinkedIn placeholder).
- **Navbar**: custom `sticky-top` header with `d-flex flex-column flex-md-row`
  utilities — links always visible, stack on mobile. No collapse, no hamburger,
  no JavaScript.
- **Hero**: `d-flex align-items-center text-center`, `min-height: 90vh`, subtle
  radial tint via `--bs-light-rgb`. One authored motion moment: blinking caret on
  the role line (`::after`), disabled by `prefers-reduced-motion`.

## Components

- **Cards**: `card` + `card-body` with hover lift (`translateY(-2px)` + soft shadow)
  defined in `index.css`.
- **Badges**: `badge rounded-pill text-bg-light border` for tags and project
  badges; `text-bg-success-subtle` for the active education status.
- **Buttons**: Bootstrap variants — `btn-primary` (zinc via token), `btn-outline-dark`,
  `btn-outline-secondary`, `btn-sm` in cards.
- **Icons**: Bootstrap Icons classes (`bi bi-github`, `bi bi-mortarboard`, …),
  sized with `fs-3`/`fs-5`/`display-6`, tinted `text-secondary`/`text-dark`.

## Constraints

- **No JavaScript** (curriculum): all interactivity is Bootstrap CSS/utilities only.
  No collapse, dropdown, or accordion components.
- Content is factual and user-owned: names, projects, links, placeholders
  ("Por definir") must not be invented.
- The dead Vercel demo link (`prueba-proyecto-gamma`) stays out until the
  deployment is live again.