# X-AI Product Experience Prototype — Submission Notes

An ultra-premium, production-ready frontend experience built with Next.js (App Router), Tailwind CSS, Framer Motion, and Prisma ORM + SQLite.

## 🛠️ Architectural & UX Implementations

### 1. Robust Component Stacking & Defect Resolution
- **Fluid Custom Select (`role-select.tsx`):** Eliminated element bleed-through and layout compression by engineering an accessible custom menu layered on an absolute stacking plane (`z-index: 50`). Handled rendering transitions through `AnimatePresence` with custom spring-physics variables (`y`, `opacity`, `filter: blur`). Fully compliant with WAI-ARIA patterns (Esc closure, arrow key selection).
- **Defensive Layout Scaling:** Fixed horizontal button and container text truncation across strict mobile break-points utilizing `shrink-0` bounds and zero-wrap layout formulas.
- **Content-Driven Proportions:** Removed rigid vertical height models (`vh`). Restructured layout pacing using flexible padding tiers (`py-16 md:py-24 lg:py-32`) to anchor interactive Three.js canvases safely without layout shifting (CLS).

### 2. Full-Stack Data Architecture
- **Relational Layer:** Structured an enterprise-ready `AccessRequest` Prisma relational schema backed by a SQLite data pipeline.
- **Type-Safe Validation Actions:** Routed ingestion pipelines through standard Next.js Server Actions backed by Zod schemas. Handled duplicate email exceptions (`P2002`) safely to return tailored dynamic interface states (Form, Success, Duplicate Alert, System Error).

### 3. Core Web Vitals Optimization
- **Code Splitting:** Code-split and lazy-loaded complex visualization chunks below the fold (`InsightFlow`, `DashboardPreview`, `Signature`, `Automations`) dynamically via `next/dynamic` to protect bundle sizes and boost initial paint scores.
- **Lenis Smooth Scroll:** Replaced CSS `scroll-behavior: smooth` with a high-performance Lenis instance — frictionless wheel/trackpad scrolling, no jank on low-end hardware.
- **Zero CLS:** All Three.js canvases use `absolute inset-0` positioning; no `<img>` tags on the landing page — zero layout shift from images.

---

## Product experience overview

> From raw data → structured intelligence → actionable insight → AI automations.

A single-page interactive product experience. Scroll top-to-bottom walks through the full transformation; the nav scrolls to each section anchor.

| Anchor | Section | What it demonstrates |
|---|---|---|
| `#top` | **Hero** | A Three.js particle field morphs from a chaotic "raw data" cloud into a structured Fibonacci sphere shell (auto-play on mount). Cursor parallax. |
| — | **Narrative band** | The 4-move transformation rail (raw data → structured intelligence → actionable insight → AI automation). |
| `#flow` | **Insight Flow** | Three scroll-reveal stages (Ingest → Analyze → Generate) with hand-built SVG geometry — no GSAP, no pin-scroll. |
| `#workspace` | **Intelligence Dashboard** | A mock product UI: sidebar nav, tabbed content with `layoutId` transitions, recharts area + bar charts, KPI sparklines, insights table. |
| `#core` | **Signature Interaction** | A 3D "intelligence core" — distorted icosahedron + wireframe shell + 54 orbiting nodes that reorganize from chaos into structure (auto-play on mount). |
| `#automations` | **AI Automations** | Trigger-action cards with success meters + a "new automation" composer. |
| — | **Pillars + Metrics** | The 3-stage system recap + four KPIs with animated baseline bars. |

## Technology stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, standalone output) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties, `oklch` |
| Animation | Framer Motion, Lenis (smooth scroll) |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Charts | Recharts |
| State | Zustand (auth store with localStorage persist) |
| Database | Prisma + SQLite (Server Actions) |
| Forms | Custom controlled forms + Zod validation |
| Icons | Lucide React |

## Getting started

```bash
# install dependencies
npm install

# generate Prisma client + create database
npx prisma db push

# start the dev server
npm run dev
```

Open `http://localhost:3000` and scroll through the landing.

### Available scripts

```bash
npm run dev       # start development server on port 3000
npm run build     # create production build
npm run start     # start production server
npm run lint      # run ESLint
npm run db:push   # push Prisma schema to database
```

## Project structure

```
src/
  app/
    layout.tsx                 # root layout: ThemeProvider + Lenis + nav/footer
    page.tsx                   # single-page experience (/) — dynamic imports
    globals.css                # dual-theme tokens + 3D/glass design system
    actions/
      request-access.ts        # Server Action: form validation + Prisma write
    api/route.ts               # basic API route
    request-access/page.tsx    # access request form with animated feedback cards
    signin/page.tsx            # sign-in page with demo credentials
    admin/page.tsx             # admin dashboard
    not-found.tsx              # 404 page
  components/
    site/
      hero.tsx                 # hero w/ R3F canvas (auto-play particle morph)
      insight-flow.tsx         # stacked scroll-reveal flow (no GSAP)
      dashboard-preview.tsx    # mock dashboard with tabs
      signature.tsx            # 3D core wrapper (auto-play reorganize)
      automations.tsx          # automation cards
      landing-sections.tsx     # narrative, pillars, metrics
      premium-section-label.tsx # section eyebrow label
      scene-3d-background.tsx  # site-wide depth backdrop (CSS only)
      site-nav.tsx             # nav + mobile menu + theme toggle
      site-footer.tsx          # footer with CTA band
      scroll-progress.tsx      # animated top gradient bar
      scroll-to-top.tsx        # floating scroll-to-top button
      smooth-scroll.tsx        # Lenis provider
    three/
      hero-canvas.tsx          # particle + sphere morph (GLSL shader)
      signature-canvas.tsx     # distorted core + orbiting nodes
    ui/
      custom/
        role-select.tsx        # custom animated dropdown (framer-motion)
      // ... Radix UI wrappers
  lib/
    motion.ts                  # shared easing + Framer Motion variants
    mock-data.ts               # all mock data + site constants
    utils.ts                   # cn() helper
    use-theme-colors.ts        # theme-aware CSS var reader for Recharts
    auth-store.ts              # mock auth (Zustand + localStorage persist)
    db.ts                      # PrismaClient singleton
prisma/
  schema.prisma                # AccessRequest model
public/
  favicon.svg                  # brand SVG favicon
  site.webmanifest             # PWA manifest
  _headers                     # Netlify security headers
```

## Key design decisions

- **GSAP eliminated** — the Insight Flow was rebuilt without GSAP/ScrollTrigger. Three stacked stages reveal on scroll via framer-motion `whileInView`. Saves ~56KB bundle and eliminates scroll-jack risk.
- **Removed all fixed vh** — Hero (`h-[180vh]`) and Signature (`h-[260vh]`) converted to `min-h-screen` + fluid padding. Their Three.js canvases auto-play their morph animation on mount instead of depending on scroll position.
- **Custom animated dropdown** — The Role select on the request-access form uses a framer-motion-animated panel (`absolute z-50`) with keyboard navigation, replacing the native `<select>`.
- **Prisma Server Action** — Form submissions go through a type-safe Server Action with Zod validation. Duplicate emails are caught (`P2002`) and render a dedicated animated feedback card.
- **Lenis** — Replaced CSS `scroll-behavior: smooth` for frictionless wheel/trackpad performance with configurable duration and easing.
- **Dynamic code splitting** — Four heavy components are lazy-loaded via `next/dynamic` (InsightFlow, DashboardPreview, Signature, Automations), keeping the initial bundle minimal.
- **`box-sizing: border-box`** — Already global via Tailwind preflight. All cards use `overflow-clip` (not `overflow-hidden`) so absolutely-positioned overlays aren't clipped.
- **Easing and restraint** — All transitions share one of three curves: `EASE`, `EASE_OUT_SOFT`, `EASE_IN_OUT`. Single emerald accent. Monochrome palette. Calm-but-powerful register.

## Evaluation criteria — where to look

- **UI / UX**: Shared fluid type scale, glass/depth system, single emerald accent, consistent container width.
- **Motion & Interaction**: Hero particle morph (auto-play), tab `layoutId` transitions, signature core reorganization, scroll-revealed insight flow, Lenis smooth scroll, animated dropdown.
- **Engineering Quality**: `lib/motion.ts` shared variants, dynamic import architecture, Server Action pattern, custom `role-select.tsx` with full keyboard a11y.
- **Product Thinking**: Core narrative rendered literally — raw cloud → structured sphere → ranked insights → triggered automations. Every section earns its place.

## Deliverables

| Deliverable | Location |
|---|---|
| **README** | This file. |
| **GitHub repository** | Private / public as requested. |
| **Live deployment** | Deploy to Netlify: import this repo, set `DATABASE_URL` env var, run `npx prisma migrate deploy`. |

---

Built for the RacoAI Frontend Challenge — Xai.
