@AGENTS.md

## Typography System

This project uses three font families. Follow these rules when building any page or component.

### Font Families & Roles

| Token | Font | CSS Class | Role |
|-------|------|-----------|------|
| `--font-sans` | DM Sans | `font-sans` | UI text: nav links, labels, tags, body copy, descriptions, numbers/counters |
| `--font-serif` | Cormorant Garamond | `font-serif` | Editorial prose: long-form body text, poetic/reflective content, italic emphasis |
| `--font-display` | Outfit | `font-display` | Display/headlines: page titles, section headings, the Y—G monogram, large hero text |

### Weight Rules

- **Display (Outfit):** Use 300 for page/section titles (uppercase, letter-spacing ~0.08em). Use 800–900 only for massive hero/decorative text (e.g. the name typography on the about page).
- **Sans (DM Sans):** Use 300 for body/descriptions, 400 for labels/tags/nav links, 500 sparingly for inline emphasis (`<strong>`).
- **Serif (Cormorant Garamond):** Use 300 for body prose, 400 for the "Ying Ge" wordmark. Use italic style for closing/emphasis lines in editorial content.

### Sizing Guidelines

| Element | Size | Line Height |
|---------|------|-------------|
| Body copy (sans) | `clamp(1rem, 1.3vw, 1.1rem)` – `clamp(1.1rem, 2.2vw, 1.6rem)` | 1.6–1.8 |
| Editorial prose (serif) | 1.15rem–1.3rem | 2.0–2.2 |
| Page titles (display) | `clamp(2.4rem, 4.5vw, 4.5rem)` | 1.0–1.15 |
| Nav links (sans) | 0.72rem | — |
| Tags/labels (sans) | 0.6rem–0.75rem | — |
| Hero decorative (display) | `clamp(5rem, 20vw, 22rem)` | 0.8 |

### Letter Spacing Conventions

- **Tags/labels:** 0.25em–0.35em (always uppercase)
- **Nav links:** 0.22em (always uppercase)
- **Display titles (uppercase):** 0.08em
- **Display titles (tight/hero):** -0.02em to -0.05em
- **Body text:** 0 (default)

### Do Not

- Do not introduce new font families. Three is the maximum.
- Do not use more than three weights per family on a single page.
- Do not use serif (Cormorant Garamond) for UI elements (buttons, labels, nav).
- Do not use display (Outfit) for body copy or small text.
- Do not set body text below 16px (1rem).
- Do not use justified text alignment.

## Responsive Design

All pages and components must be responsive across device types and screen sizes (mobile, tablet, desktop).

- Use `clamp()` for font sizes, padding, and spacing rather than fixed values.
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for layout shifts (e.g. stacking columns on mobile).
- Test that touch targets are at least 44px on mobile.
- Hide decorative elements on small screens when they cause overflow (use `hidden sm:block` pattern).
- Navigation must remain usable on mobile — consider collapsing or simplifying nav for small viewports.
- Cards and content containers should be full-width on mobile with appropriate padding (`px-4` minimum).

## Color Palette

Source of truth: `docs/concept-2f-levitt-energy.html`

| Name | Value | Usage |
|------|-------|-------|
| Deep plum | #2A1520 | Darkest tone, deep backgrounds |
| Bordeaux | #4C191B | Primary brand color, dark sections, headlines |
| Berry | #963D5A | Secondary accent, tags, labels |
| Violet | #B07DD4 | Accent highlights, interactive elements |
| Lavender | #E3DAFF | Surface/card backgrounds, light accent areas |
| Mist | #F5F0F6 | Default page background |
| Cream | #FAF6F2 | Warm light surface, text on dark backgrounds |
