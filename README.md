<div align="center">

  <img src="/logo.svg" alt="Xai" width="72" height="72">

  <h1>Xai — Intelligence Workspace</h1>

  <p>From <strong>raw data</strong> → <strong>structured intelligence</strong> → <strong>actionable insight</strong> → <strong>AI automations</strong>.</p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js" alt="Next.js 16">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat&logo=tailwindcss" alt="Tailwind v4">
    <img src="https://img.shields.io/badge/Three.js-R3F-000000?style=flat&logo=three.js" alt="Three.js">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma" alt="Prisma">
    <img src="https://img.shields.io/badge/ESLint-0_errors-4B32C3?style=flat&logo=eslint" alt="ESLint">
    <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT">
  </p>

</div>

---

## Overview

Xai is a premium single-page product experience that immerses the user in the full data-to-decision loop. Scroll through 8 interconnected sections — from a chaotic particle field representing raw data, through structured analysis, to AI-powered automation — all rendered with production-grade engineering (zero ESLint errors, zero TypeScript errors, zero CLS).

```mermaid
graph LR
    RD[Raw Data] --> SI[Structured Intelligence]
    SI --> AI[Actionable Insight]
    AI --> AA[AI Automation]
    AA -.->|feedback loop| RD
    style RD fill:#34d39922,stroke:#34d399,stroke-width:2px
    style SI fill:#34d39933,stroke:#34d399,stroke-width:2px
    style AI fill:#34d39944,stroke:#34d399,stroke-width:2px
    style AA fill:#fbbf2422,stroke:#fbbf24,stroke-width:2px
```

---

## Architecture

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        L[layout.tsx] --> Nav[SiteNav]
        L --> BG[Scene3DBackground]
        L --> Prog[ScrollProgress]
        L --> SS[SmoothScroll]
        L --> Footer[SiteFooter]
    end

    subgraph Pages["Pages (6 routes)"]
        direction LR
        Home["/ landing"]
        Signin["/signin"]
        RA["/request-access"]
        Admin["/admin"]
        API["/api"]
    end

    subgraph Sections["Landing Sections"]
        direction TB
        H[Hero] --> NB[NarrativeBand]
        NB --> IF[InsightFlow]
        IF --> DP[DashboardPreview]
        DP --> SC[SignatureCanvas]
        SC --> Aut[Automations]
        Aut --> PL[Pillars]
        PL --> MB[MetricsBand]
    end

    subgraph Three["Three.js Canvas"]
        HC[HeroCanvas] -->|GLSL Shader| PF[ParticleField<br/>1,800 particles]
        SigC[SignatureCanvas] -->|MeshDistortMaterial| CN[CoreNodes<br/>54 orbit nodes]
    end

    subgraph Data["Data Layer"]
        SA[Server Action] --> PR[Prisma ORM]
        PR --> PG[(PostgreSQL)]
        AUTH[Zustand Store] --> LS[localStorage]
    end

    Home --> Sections
    Sections --> Three
    RA --> SA
    Client --- Pages
```

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) | SSR, routing, server actions |
| **Language** | [TypeScript](https://typescriptlang.org) 5 | Type safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) v4 + CSS custom properties (`oklch`) | Design system |
| **3D** | [Three.js](https://threejs.org) via [R3F](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) | Particle fields, 3D core |
| **Animation** | [Framer Motion](https://framer.com/motion) 12 + [Lenis](https://lenis.darkroom.engineering) | Scroll, layout, transitions |
| **Charts** | [Recharts](https://recharts.org) | Dashboard visualizations |
| **State** | [Zustand](https://zustand.docs.pmnd.rs) 5 | Auth with localStorage persist |
| **Database** | [PostgreSQL](https://postgresql.org) + [Prisma](https://prisma.io) ORM 6 | Access request storage |
| **Validation** | [Zod](https://zod.dev) v4 | Form validation |
| **Icons** | [Lucide React](https://lucide.dev) | UI iconography |
| **Font** | [Geist](https://vercel.com/font) (sans + mono) | Typography |

---

## Sections

```mermaid
flowchart TD
    subgraph Landing["Landing Page Flow"]
        direction TB
        A[Hero<br/><sub>#top</sub>] --> B[Narrative Band]
        B --> C[Insight Flow<br/><sub>#flow</sub>]
        C --> D[Dashboard<br/><sub>#workspace</sub>]
        D --> E[Signature Core<br/><sub>#core</sub>]
        E --> F[Automations<br/><sub>#automations</sub>]
        F --> G[Pillars]
        G --> H[Metrics]
    end

    A -.- note1(("auto-oscillate<br/>~15.7s period"))
    E -.- note2(("auto-oscillate<br/>~20.9s period"))

    style A fill:#34d39922,stroke:#34d399,stroke-width:2px
    style E fill:#34d39922,stroke:#34d399,stroke-width:2px
    style note1 fill:#fbbf2411,stroke:#fbbf24,stroke-dasharray: 3 3
    style note2 fill:#fbbf2411,stroke:#fbbf24,stroke-dasharray: 3 3
```

| Anchor | Section | Interaction |
|--------|---------|-------------|
| `#top` | **Hero** | Three.js particle field: 1,800 particles (800 mobile) morph chaos → Fibonacci sphere via GLSL shader. Auto-oscillates on mount. Cursor parallax. |
| — | **Narrative Band** | 4-move transformation rail with animated gradient connector line. Glass-morphism cards with lift-on-hover. |
| `#flow` | **Insight Flow** | 3 scroll-reveal stages (Ingest → Analyze → Generate). Custom SVG visuals per stage. No GSAP. |
| `#workspace` | **Dashboard** | Full mock product UI. Recharts area/bar charts, KPI sparklines, 5 tabbed panels with `layoutId` spring transitions. Perspective 3D card. |
| `#core` | **Signature Core** | Three.js distorted icosahedron + 54 orbiting nodes (28 mobile) reorganizing chaos → structure. Dual-tone lighting (emerald + amber). |
| `#automations` | **Automations** | Trigger-action cards with success meters. Pipeline rail animation. "New automation" composer card. |
| — | **Pillars** | 3-stage system recap (Ingest, Analyze, Automate) with hover glow effects. |
| — | **Metrics** | 4 animated KPIs (9 sources, 1,284 insights/wk, 248ms p50, 37 automations) with baseline bars. |

---

## Page Routes

```mermaid
flowchart LR
    Home["/"] --> Static((Static SSG))
    Signin["/signin"] --> Static
    RA["/request-access"] --> Static
    Admin["/admin"] --> Static
    NF["/_not-found"] --> Static
    API["/api"] --> Dynamic((Server Dynamic))

    style Static fill:#34d39922,stroke:#34d399,stroke-width:2px
    style Dynamic fill:#fbbf2422,stroke:#fbbf24,stroke-width:2px
```

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static SSG | Landing page — 8 sections, 4 dynamically imported heavy components |
| `/signin` | Static SSG | Sign-in form with demo credential fill buttons (admin/member) |
| `/request-access` | Static SSG | 5-phase animated state machine (form → submitting → success/duplicate/error) |
| `/admin` | Static SSG | Admin dashboard, 4 tabs (overview/requests/users/activity), role-gated |
| `/api` | Server Dynamic | Health check endpoint |

---

## Auth Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as SignIn Form
    participant Z as Zustand Store
    participant LS as localStorage

    U->>F: Enter email + password
    F->>Z: signIn(email, password)
    Z->>Z: Match against DEMO_CREDENTIALS
    alt Match found
        Z->>LS: persist user session
        Z-->>F: { ok: true }
        F->>U: Redirect to /
    else No match
        Z-->>F: { ok: false, error }
        F->>U: Show error alert
    end
```

Two hard-coded demo accounts (configurable via env vars):

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@xai.app | xai-demo |
| Member | member@xai.app | xai-demo |

---

## Data Flow (Access Request)

```mermaid
sequenceDiagram
    participant U as User
    participant F as Form
    participant SA as Server Action
    participant Z as Zod v4
    participant P as Prisma
    participant DB as PostgreSQL

    U->>F: Fill form
    F->>SA: submitRequest(FormData)
    SA->>Z: validate(name, email, company, role, useCase)
    alt Invalid
        Z-->>SA: fieldErrors
        SA-->>F: { ok: false, fieldErrors }
        F->>U: Highlight invalid fields
    else Valid
        SA->>P: accessRequest.create({...})
        P->>DB: INSERT
        alt Unique constraint violation (P2002)
            DB-->>P: error
            P-->>SA: PrismaKnownError
            SA-->>F: { ok: false, error: "already submitted" }
            F->>U: Show duplicate card
        else Success
            DB-->>P: row
            P-->>SA: record
            SA-->>F: { ok: true }
            F->>U: Show success card with details
        end
    end
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **PostgreSQL** 14+ running on `localhost:5432` (or override via `DATABASE_URL`)

### Installation

```bash
# Clone
git clone https://github.com/your-org/xai.git
cd xai

# Install dependencies
npm install

# Configure database connection (edit .env)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/xai_prototype?schema=public"

# Push Prisma schema to PostgreSQL
npx prisma db push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev           # Development server on port 3000
npm run build         # Production build (lint + TS check + compile)
npm run start         # Start production server
npm run lint          # ESLint across src/
npm run db:push       # Push Prisma schema to database
npm run db:generate   # Regenerate Prisma client
npm run db:migrate    # Create a new migration
npm run db:reset      # Reset database
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — ThemeProvider, Lenis, nav/footer
│   ├── page.tsx                  # Landing — 8 sections, 4 dynamic imports
│   ├── globals.css               # Dual-theme design system (588 lines, oklch)
│   ├── not-found.tsx             # 404 with motion animations
│   ├── signin/page.tsx           # Sign-in with demo fill buttons
│   ├── request-access/page.tsx   # 5-phase state machine (431 lines)
│   ├── admin/page.tsx            # Admin dashboard (4 tabs, 450 lines)
│   ├── actions/request-access.ts # Server Action — Zod v4 + Prisma
│   └── api/route.ts              # Health check endpoint
├── components/
│   ├── site/                     # 12 section/layout components
│   │   ├── hero.tsx              # R3F particle field (auto-play morph)
│   │   ├── signature.tsx         # 3D core wrapper (auto-play)
│   │   ├── insight-flow.tsx      # Scroll-reveal stages + SVG visuals
│   │   ├── dashboard-preview.tsx # Mock UI (charts, tabs, panels, 719 lines)
│   │   ├── automations.tsx       # Automation cards + pipeline rail
│   │   ├── landing-sections.tsx  # Narrative band, pillars, metrics
│   │   ├── scene-3d-background.tsx # CSS-only depth backdrop
│   │   ├── site-nav.tsx          # Fixed nav + mobile menu
│   │   ├── site-footer.tsx       # CTA band + footer
│   │   ├── premium-section-label.tsx # 5 unique SVG section icons
│   │   ├── scroll-progress.tsx   # Top gradient bar
│   │   ├── scroll-to-top.tsx     # Floating scroll button
│   │   └── smooth-scroll.tsx     # Lenis provider
│   ├── three/                    # Three.js canvases
│   │   ├── hero-canvas.tsx       # GLSL shader, 1,800 particles
│   │   └── signature-canvas.tsx  # Icosahedron + 54 orbit nodes
│   └── ui/                       # Shared UI primitives
│       ├── toast.tsx             # Radix toast
│       ├── toaster.tsx           # Toast renderer
│       └── custom/role-select.tsx # Animated dropdown (keyboard nav)
├── hooks/                        # Custom React hooks
│   └── use-toast.ts              # Toast reducer state machine
├── lib/                          # Shared utilities
│   ├── motion.ts                 # Framer Motion easing + variants
│   ├── mock-data.ts              # All mock data + site constants
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── auth-store.ts             # Zustand auth (localStorage persist)
│   ├── use-theme-colors.ts       # Recharts ↔ CSS var sync
│   └── db.ts                     # PrismaClient singleton
├── prisma/
│   └── schema.prisma             # AccessRequest model (PostgreSQL)
└── public/
    ├── favicon.ico               # Legacy favicon (32x32)
    ├── favicon.svg               # Modern SVG favicon
    ├── logo.svg                  # Brand mark
    ├── site.webmanifest          # PWA manifest
    ├── robots.txt                # SEO crawl rules
    └── _headers                  # Netlify security headers
```

---

## Design System

```mermaid
mindmap
  root((Design Tokens<br/>80+ CSS vars))
    Colors
      oklch color space
        --accent Emerald #34d399
        --accent-warm Amber #fbbf24
        --background Dark/light pair
        --foreground
        --muted-foreground
    Surfaces
      --hairline Border tint
      --surface-1/2/3 Layer tints
      .glass Blur + saturate
      .glass-strong Stronger blur
    Typography
      Geist Sans Headings
      Geist Mono Code/metrics
      .text-display-xl  clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem)
      .text-display-lg
      .text-display-md
      .text-display-sm
    Effects
      .lift Hover translateY(-4px)
      .edge-glow Pseudo gradient border
      .bg-grain SVG feTurbulence noise
      .aurora Radial gradient ambient
    Sections
      bg-sec-narrative Emerald canopy
      bg-sec-flow Cool data-stream
      bg-sec-workspace Warm studio
      bg-sec-core Dramatic deep-field
      bg-sec-automations Dual-tone energy
      bg-sec-pillars Structured wash
      bg-sec-metrics Closing gradient
    Shared Easing
      EASE 0.22, 1, 0.36, 1
      EASE_OUT_SOFT 0.16, 1, 0.3, 1
      EASE_IN_OUT 0.65, 0, 0.35, 1
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No GSAP** | Insight Flow uses Framer Motion `whileInView` — saves ~56 KB, no scroll-jack risk |
| **Auto-play 3D** | Three.js canvases auto-oscillate via sin × smoothstep — no scroll dependency, works immediately |
| **PostgreSQL** | Single `AccessRequest` table with unique email; duplicate detection via Prisma P2002 |
| **Zod v4** | Server Action validation with type-safe schema → typed 5-phase result (form/success/duplicate/error) |
| **CSS-only 3D bg** | `scene-3d-background.tsx` creates depth with pure CSS (grid, orbs, parallax) — no WebGL overhead on every page |
| **Custom dropdown** | `role-select.tsx` replaces native `<select>` with animated panel + full keyboard a11y (WAI-ARIA) |
| **Lenis** | Configurable frictionless smooth scrolling vs CSS `scroll-behavior` |
| **Dynamic imports** | 4 heavy sections lazy-loaded via `next/dynamic` — minimal initial JS bundle |
| **Theme-aware charts** | `useThemeColors` hook syncs Recharts with CSS custom properties — no hardcoded chart colors |
| **Responsive 3D** | Particle/node counts halved on mobile; camera dolly and FOV adjust per viewport |
| **oklch color space** | All 80+ CSS variables use perceptual `oklch()` — consistent lightness across light/dark themes |

---

## Performance

| Metric | Value |
|--------|-------|
| ESLint errors | 0 |
| ESLint warnings | 0 |
| TypeScript errors | 0 |
| Build tool | Turbopack (Next.js 16) |
| Build time | ~8s cold cache |
| Total source files | 35 |
| Total source lines | ~5,000 |
| Routes | 5 static + 1 dynamic |
| Dynamic imports | 4 (InsightFlow, DashboardPreview, Signature, Automations) |
| Lazy-loaded (ssr:false) | 2 Three.js canvases |
| CLS | 0 — fixed-position canvases, no `<img>` tags |
| npm packages | ~507 (post-cleanup) |

---

## Deployment

```mermaid
flowchart LR
    subgraph CI["CI/CD (Netlify)"]
        direction LR
        GH[Git Push] --> NF[Netlify Import]
        NF --> Build[npm run build]
        Build --> Deploy[.next/ → Production]
    end

    Deploy --> CDN[Global CDN]
    Deploy --> HDR[Security Headers<br/>HSTS · XFO · CSP]

    style GH fill:#34d39922,stroke:#34d399
    style Deploy fill:#34d39922,stroke:#34d399
```

Pre-configured via `netlify.toml` + `public/_headers`:

| Config | Value |
|--------|-------|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Security | `X-Frame-Options: DENY`, `HSTS`, `Permissions-Policy` |
| Routing | SPA catch-all redirect |
| Required env | `DATABASE_URL` (PostgreSQL connection string) |

---

<div align="center">
  <sub>
    Built with Next.js 16 · Three.js · Framer Motion · Tailwind v4 · PostgreSQL<br/>
    <a href="https://github.com/your-org/xai">GitHub</a> &nbsp;·&nbsp; <a href="https://phenomenal-tulumba-88d206.netlify.app">Live Demo</a>
  </sub>
</div>
