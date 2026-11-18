# YCS Portfolio

Personal portfolio website for **Yap Chung Seng** — Application Developer building enterprise workflows on Decisions, ServiceNow and Power Platform, and full-stack apps with React, Supabase and AI.

🔗 **Live site:** [yapseng98.github.io/ycs_portfolio](https://yapseng98.github.io/ycs_portfolio)

---

## Overview

A dark-first (with a light theme) portfolio built with vanilla HTML, CSS and JavaScript. Features a neural-network particle hero, a filterable bento grid of projects, case-study pages with architecture diagrams, and a fully responsive mobile layout.

**No frameworks. No build tools. No dependencies.**

---

## Pages

| File | Description |
|---|---|
| `index.html` | Main page — hero, about/timeline + tech stack, filterable work grid, contact |
| `personal.html` | Case studies for 8 personal builds (anchors: `#homeset`, `#sn-claude`, `#nexauto`, `#biztrack`, `#daily-brief`, `#planner`, `#pfmt`, `#mini-game`) |
| `serviceNow.html` | ServiceNow client work — 6 projects |
| `powerApps.html` | Microsoft Power Platform client work — 2 projects |
| `decisions.html` | Decisions BPM client work — 2 projects |

---

## Project Structure

```
Portfolio/
├── index.html          # Main page
├── personal.html       # Case studies (personal builds)
├── serviceNow.html     # ServiceNow projects
├── powerApps.html      # Power Platform projects
├── decisions.html      # Decisions BPM projects
├── base.css            # Shared: theme tokens (dark + light), navbar, buttons, chips, footer, motion
├── style.css           # index.html only: hero, about, work grid, contact
├── skills.css          # Sub-pages: platform project cards, case studies, flow diagrams
├── portfolio.js        # All interactive behaviour (shared by every page)
├── favicon.svg
├── profile.jpg         # Profile photo (also the link-preview image)
├── power.jpg / serviceNow.jpg / decisions.jpeg   # Platform logos
└── README.md
```

---

## Design System

- **Tokens** live at the top of `base.css` — `:root` is dark (default), `:root[data-theme="light"]` overrides for light.
- **Accent colours:** every project/platform has one (`--c-homeset`, `--c-servicenow`, …). Put `class="accent-<name>"` on an element and its children get `--accent`, `--accent-ink` (readable text, auto-darkened in light mode), `--accent-soft` (fill) and `--accent-line` (border).
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (labels) via Google Fonts. Icons: Font Awesome 6.5.

---

## Features

- **Light / dark theme** — toggle in the navbar, remembered per visitor, applied before paint (no flash)
- **Filterable work grid** — All / Enterprise / AI / Personal builds; counts are computed from each tile's `data-cat`
- **Case studies** — stats, flow diagrams and "what it does / how it's built" for each project, with a sticky project index that tracks your scroll position
- **Live demo links** for projects with a public demo (Homeset, NEXAUTO, BizTrack)
- **Particle canvas** — pauses when off-screen or in a background tab, and doesn't reset when mobile browsers resize on scroll
- **Reduced motion** — particles, typing, counters and reveals all respect `prefers-reduced-motion`
- **Accessibility** — skip link, real `<button>` controls with `aria-expanded`/`aria-pressed`, keyboard-reachable cards, Escape closes the menu
- **SEO / sharing** — meta description, canonical URL and Open Graph tags on every page
- **Contact form** — opens the visitor's email app via `mailto:` with subject and body filled in

---

## Adding a Project

1. **Main page:** copy an `<article class="tile …">` in `index.html` → set its `accent-*` class, `data-cat` (any of `enterprise ai personal`), text and link.
2. **Case study:** copy an `<article class="case …">` in `personal.html` → give it an `id`, then add a matching link to the `.case-index` nav.
3. **New colour:** add `--c-<name>` to `:root` in `base.css`, an `.accent-<name>` rule, and add it to the accent-helper selector list just below.
4. Update the **Projects** stat in the hero (`data-target`) and the counts in `personal.html`'s page header.

---

## Running Locally

No build step — open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# then visit http://localhost:3000
```

---

## Contact

| Channel | Detail |
|---|---|
| Email | ycseng0398@gmail.com |
| LinkedIn | [Chung Seng Yap](https://www.linkedin.com/in/chung-seng-yap-9478111bb/) |
| GitHub | [YapSeng98](https://github.com/YapSeng98) |
| Phone (MY) | +6017-5810599 |
| Phone (SG) | +65 9899 6682 |

---

## License

This project is open source. Feel free to use the design and code as inspiration — a credit back would be appreciated.
