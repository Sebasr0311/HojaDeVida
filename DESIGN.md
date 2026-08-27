# DESIGN.md — HojaDeVida (Juan Sebastian Rincón Farelo)

Visual system recorded from the built world. Pure HTML + CSS — no JavaScript.

## World

shadcn/ui "new-york" design language in zinc, light mode only. The site reads like a
quiet engineering brief: white ground, near-black ink, hairline borders, no glow,
no gradient text, no neon. One radius token family, one typeface.

## Tokens

| Token | Value |
| --- | --- |
| `--background` / `--card` | `hsl(0 0% 100%)` |
| `--foreground` | `hsl(240 10% 3.9%)` (zinc-950) |
| `--muted-foreground` | `hsl(240 3.8% 40%)` (zinc-600 — ≥4.5:1 on white) |
| `--primary` | `hsl(240 5.9% 10%)` (zinc-900), foreground `hsl(0 0% 98%)` |
| `--secondary` / `--accent` | `hsl(240 4.8% 95.9%)` (zinc-100) |
| `--border` / `--input` | `hsl(240 5.9% 90%)` (zinc-200) |
| `--ring` | `hsl(240 5.9% 10%)` |
| `--success` | `hsl(160 84% 30%)` on `hsl(152 76% 95%)` (semantic only: active status) |
| `--radius` | `0.5rem` controls · `0.75rem` cards |
| Shadows | soft offset only: `0 1px 2px`, `0 4px 12px -2px`, `0 12px 32px -8px` |

## Typography

- Inter (Google Fonts), weights 400–800. No mono (mono removed from labels; the
  `<JSRF/>` logo keeps its bracket mark in Inter 700).
- Display: `clamp(1.75rem, 4vw, 2.5rem)` section titles, `clamp(2.5rem, 7vw, 4.25rem)`
  hero name, weight 800, tracking `-0.03em`.
- Body: 1rem/1.65, measure 60–75ch. Muted text at zinc-600 for contrast.

## Components

- **Buttons** — shadcn variants: `primary` (zinc-900 bg, white text), `outline`
  (white, border-input), `ghost` (transparent). Height 2.5rem, radius 0.5rem, focus
  ring 2px offset 2px.
- **Cards** — border-only elevation (zinc-200), radius 0.75rem, hover: border
  darkens + `shadow-md` + `translateY(-2px)`.
- **Badges / tags / status chips** — secondary bg, border, radius 0.5rem. Active
  status = success green chip (the only semantic color).
- **Icons** — lucide-style inline SVGs, 24×24 viewBox, stroke 2, round caps/joins,
  `currentColor`. 40–44px secondary-tinted containers. Zero emoji.
- **Timeline** — 12px dots (zinc-300 / success for active), 1px line, cards.
- **Navbar** — fixed, white/85 + backdrop blur, 1px bottom border. Mobile: CSS
  checkbox hack (`#menu-toggle`) slides a fixed column menu; hamburger animates to X,
  44×44px touch target, focus ring on `:focus-visible`. Closed menu is
  `visibility: hidden` (removed from tab order).

## Motion

One authored moment: the blinking caret (`::after`) on the hero role line,
`caret-blink 1.1s step-end infinite`. Everything else is static; hover states only.

## Browser surfaces

Selection (zinc-900 bg / white text), thin custom scrollbar in zinc tones,
caret-color ring, focus-visible rings on all interactive elements.

## Responsive

- ≤768px: hamburger menu, single-column about grid, full-width buttons (max 280px),
  reduced section padding.
- ≤480px: single-column grids, 32px timeline gutter.

## Constraints

- No JavaScript (professor curriculum): all interactions are CSS-only.
- Content is factual and user-owned: names, projects, links, placeholders
  ("Por definir") must not be invented.