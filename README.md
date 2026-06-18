# YCS Portfolio

Personal portfolio website for **Yap Chung Seng** — Application Developer specialising in BPM, low-code platforms, and AI-driven workflow automation.

🔗 **Live site:** [yapseng98.github.io/ycs_portfolio](https://yapseng98.github.io/ycs_portfolio)

---

## Overview

A modern, dark-themed portfolio built with vanilla HTML, CSS, and JavaScript. Features a neural network particle animation, typing effect, scroll-reveal animations, and a fully responsive mobile layout.

---

## Pages

| File | Description |
|---|---|
| `index.html` | Main page — hero, about/timeline, platforms, personal projects, contact |
| `serviceNow.html` | ServiceNow platform — 6 project cards |
| `powerApps.html` | Microsoft Power Platform — 2 project cards |
| `decisions.html` | Decisions BPM platform — 2 project cards |
| `personal.html` | Personal projects — ServiceNow × Claude AI integration, PFMT |

---

## Tech Stack

| Layer | Detail |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, glassmorphism, CSS Grid / Flexbox |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts — Inter |
| Hosting | GitHub Pages |

**No frameworks. No build tools. No dependencies.**

---

## Features

- **Neural network particle canvas** — animated AI-aesthetic background on the hero section
- **Typing animation** — cycles through job titles with typewriter effect
- **Scroll-reveal** — `IntersectionObserver`-based staggered fade-in for all sections
- **Animated stat counters** — hero stats count up on scroll into view
- **Sticky navbar** — glassmorphism blur, scrolled-state darkening, active link tracking
- **Mobile nav drawer** — slide-in menu with tap-outside-to-close overlay and Escape key support
- **Contact form** — submits via `mailto:` with pre-filled subject and body
- **Scroll to top** — fixed button that appears after scrolling 380px
- **Architecture diagram** — CSS-only flowchart on the personal projects page

---

## Project Structure

```
Portfolio/
├── index.html          # Main portfolio page
├── serviceNow.html     # ServiceNow projects
├── powerApps.html      # Power Platform projects
├── decisions.html      # Decisions BPM projects
├── personal.html       # Personal & self-exploration projects
├── style.css           # Main page styles
├── skills.css          # Sub-page styles + architecture diagram styles
├── portfolio.js        # All interactive behaviour
├── profile.jpg         # Profile photo
├── power.jpg           # Power Platform card image
├── serviceNow.jpg      # ServiceNow card image
├── decisions.jpeg      # Decisions card image
└── README.md
```

---

## Running Locally

No build step required — open directly in a browser:

```bash
git clone https://github.com/YapSeng98/ycs_portfolio.git
cd ycs_portfolio
open index.html        # macOS
# or: start index.html  (Windows)
# or: xdg-open index.html  (Linux)
```

Or serve with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

---

## Sections

### Home
Hero section with particle canvas, profile photo, typing animation, and animated stat counters (Years Exp. · Projects · Platforms).

### About
Two-column layout: career timeline (YTL Cement Shared Services → Activants Pte Ltd) and a tech stack card covering Languages, AI Tools & Agents, Competencies, and Education.

### Platforms
Three platform cards linking to dedicated project pages:
- **Microsoft Power Platform** — Power Apps, Power Automate, SharePoint
- **ServiceNow** — ITSM, Now Mobile, Flow Designer
- **Decisions BPM** — SAP Integration, approval matrices, invoice automation

### Personal Projects
- **ServiceNow × Claude AI** — Natural language interface to ServiceNow using Anthropic API + Node.js proxy, with a CSS architecture diagram showing the full integration flow
- **Personal Finance Money Tracker (PFMT)** — Full-stack web app using ServiceNow PDI as cloud backend via Scripted REST APIs, with Groq AI integration and GitHub Actions CI/CD

### Contact
Split layout with contact details (email, phone MY/SG, LinkedIn, location) and a mailto-backed contact form.

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
