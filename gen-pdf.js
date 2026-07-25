const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({
  size: "A4",
  margin: 50,
  bufferPages: true,
  info: {
    Title: "Xai — Product Documentation",
    Author: "Xai",
    Subject: "Intelligence Workspace — complete product documentation",
    Creator: "Xai",
    Producer: "pdfkit",
  },
});

const out = fs.createWriteStream(
  path.resolve(process.cwd(), "Xai-Product-Documentation.pdf")
);
doc.pipe(out);

// Colors
const C = {
  bg: "#0a0f0d",
  fg: "#f0faf5",
  emerald: "#34d399",
  emeraldDim: "#1a5c45",
  amber: "#fbbf24",
  amberDim: "#5c3d0a",
  gray: "#94a3b8",
  muted: "#6b7280",
  card: "#13211a",
  cardBorder: "#1e3a30",
  surface: "#0f1714",
  white: "#ffffff",
  red: "#ef4444",
};

// Helper: dark background for every page
function pageBg() {
  doc.rect(0, 0, 595.28, 841.89).fill(C.bg);
}

// Helper: page footer
function pageFooter(pageNum, total) {
  doc.fontSize(7).fillColor(C.muted);
  doc.text("Xai — Intelligence Workspace", 50, 815, { continued: true });
  doc.text(`  |  ${pageNum} / ${total}`, { align: "right" });
}

// Helper: section heading bar
function sectionBadge(num, title) {
  doc.roundedRect(50, doc.y, 495, 22, 4).fill(C.emeraldDim);
  doc
    .fontSize(10)
    .fillColor(C.emerald)
    .font("Helvetica-Bold")
    .text(`  ${num}  ${title}`, 55, doc.y + 5);
  doc.moveDown(1.2);
}

// Helper: body text
function body(text, size = 9.5, color = C.fg) {
  doc.fontSize(size).fillColor(color).font("Helvetica").text(text, { lineGap: 3 });
  doc.moveDown(0.2);
}

// Helper: bullet
function bullet(text) {
  doc
    .fontSize(9)
    .fillColor(C.gray)
    .font("Helvetica")
    .text("  ▸  " + text, { lineGap: 2, indent: 10 });
  doc.moveDown(0.1);
}

// Helper: gap
function gap(h = 0.4) {
  doc.moveDown(h);
}

// Helper: draw a labeled box (diagram node)
function drawNode(x, y, w, h, label, sub, color = C.emerald) {
  doc.roundedRect(x, y, w, h, 4).fill(color + "22");
  doc.roundedRect(x, y, w, h, 4).lineWidth(0.5).stroke(color + "66");
  doc.fontSize(8).fillColor(color).font("Helvetica-Bold").text(label, x + 6, y + 6, { width: w - 12 });
  if (sub) {
    doc.fontSize(6.5).fillColor(C.gray).font("Helvetica").text(sub, x + 6, y + 20, { width: w - 12 });
  }
}

// Helper: draw an arrow between two points
function arrow(x1, y1, x2, y2, color = C.emerald) {
  doc
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .strokeColor(color + "55")
    .lineWidth(0.7)
    .stroke();
  // arrowhead
  const angle = Math.atan2(y2 - y1, x2 - x1);
  doc
    .moveTo(x2, y2)
    .lineTo(x2 - 5 * Math.cos(angle - 0.4), y2 - 5 * Math.sin(angle - 0.4))
    .moveTo(x2, y2)
    .lineTo(x2 - 5 * Math.cos(angle + 0.4), y2 - 5 * Math.sin(angle + 0.4))
    .strokeColor(color + "88")
    .lineWidth(0.7)
    .stroke();
}

// ====================== PAGE 1: COVER ======================
pageBg();
doc.rect(0, 0, 595.28, 841.89).fill(C.bg);

// Top accent line
doc.rect(50, 140, 495, 2).fill(C.emerald);

// Logo area - large X
doc.fontSize(72).fillColor(C.emerald).font("Helvetica-Bold").text("X", 50, 170, { align: "center" });
doc
  .fontSize(36)
  .fillColor(C.amber)
  .font("Helvetica")
  .text("Intelligence Workspace", { align: "center" });

doc
  .fontSize(13)
  .fillColor(C.gray)
  .font("Helvetica")
  .text("Product Documentation", { align: "center" });

doc
  .fontSize(9)
  .fillColor(C.muted)
  .font("Helvetica")
  .text("July 2026 · Version 2.0", { align: "center" });

// Tagline box
doc.roundedRect(120, 340, 355, 40, 6).fill(C.card);
doc.roundedRect(120, 340, 355, 40, 6).lineWidth(0.5).stroke(C.cardBorder);
doc
  .fontSize(10)
  .fillColor(C.emerald)
  .font("Helvetica-Oblique")
  .text("From raw data → structured intelligence →", 135, 350);
doc
  .fontSize(10)
  .fillColor(C.amber)
  .font("Helvetica-Oblique")
  .text("actionable insight → AI automations.", 135, 366);

// Footer info
doc.fontSize(8).fillColor(C.muted).font("Helvetica");
doc.text("Next.js 16 · TypeScript · Three.js · Framer Motion · Tailwind CSS v4 · PostgreSQL", 50, 700, { align: "center" });
doc.text("35 source files · ~5,000 lines · 0 ESLint errors · 0 TypeScript errors", 50, 715, { align: "center" });

pageFooter(1, 1);

// ====================== PAGE 2: TOC ======================
doc.addPage();
pageBg();
doc.fontSize(22).fillColor(C.emerald).font("Helvetica-Bold").text("Contents", 50, 60);
doc.rect(50, 90, 495, 1).fill(C.emeraldDim);

const tocEntries = [
  ["01", "Product Overview", "The narrative arc and core metaphor"],
  ["02", "Tech Stack", "Framework, languages, libraries, and tools"],
  ["03", "Architecture", "System layers and component relationships"],
  ["04", "Page Routes", "Route table with types and descriptions"],
  ["05", "Section Breakdown", "All 8 landing sections in detail"],
  ["06", "Three.js Interactions", "Particle field and 3D core mechanics"],
  ["07", "Auth & Data Flow", "Authentication and access request flow"],
  ["08", "Component Decomposition", "Every UI component documented"],
  ["09", "Design System", "CSS tokens, themes, utilities, and sections"],
  ["10", "Performance & Deployment", "Metrics and deployment configuration"],
  ["11", "Project Structure", "Complete source tree"],
];

tocEntries.forEach(([num, title, sub], i) => {
  const y = 110 + i * 28;
  doc.roundedRect(50, y, 495, 24, 3).fill(i % 2 === 0 ? C.surface : C.card);
  doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text(num, 62, y + 5);
  doc.fontSize(11).fillColor(C.fg).font("Helvetica-Bold").text(title, 95, y + 5);
  doc.fontSize(7).fillColor(C.muted).font("Helvetica").text(sub, 95, y + 16);
});

pageFooter(2, 1);
doc.bufferedPageRange().count = 2; // placeholder, will fix later

// ====================== PAGE 3: Overview ======================
doc.addPage();
pageBg();
sectionBadge("01", "Product Overview");

body("Xai is a premium single-page product experience that immerses the user in the full data-to-decision loop. The narrative arc moves from raw data ingestion, through structured intelligence and actionable insights, to AI-powered automation — all rendered as an immersive, scrollable web experience.");
gap();
body("The core metaphor: data enters as chaos, is shaped into structure by models, surfaces as ranked insight, and triggers automated actions. Each scroll section represents one stage in this transformation.");
gap();

// Mini flow diagram
const flowY = doc.y;
const boxW = 100;
const boxH = 40;
const centers = [75, 195, 315, 435];
const labels = ["Raw Data", "Structured", "Actionable", "AI Auto."];
const colors = [C.emerald, C.emerald, C.emerald, C.amber];

centers.forEach((cx, i) => {
  drawNode(cx - boxW / 2, flowY, boxW, boxH, labels[i]);
});
centers.slice(0, -1).forEach((cx, i) => {
  arrow(cx + boxW / 2, flowY + boxH / 2, centers[i + 1] - boxW / 2, flowY + boxH / 2);
});
// feedback loop
doc
  .moveTo(centers[3], flowY + boxH + 15)
  .lineTo(centers[0], flowY + boxH + 15)
  .strokeColor(C.amber + "44")
  .lineWidth(0.7)
  .stroke();
doc.fontSize(6).fillColor(C.amber).font("Helvetica-Oblique").text("feedback loop", centers[0] + 70, flowY + boxH + 17);

doc.y = flowY + boxH + 30;
gap();

body("Built as a front-end prototype with a PostgreSQL-backed access request flow, the experience demonstrates production-grade engineering:");
bullet("Zero ESLint errors, zero TypeScript errors, zero CLS");
bullet("Dual light/dark themes in oklch color space");
bullet("Responsive Three.js canvases (particle/node counts halved on mobile)");
bullet("Accessible custom dropdown with keyboard navigation (WAI-ARIA)");
bullet("4 heavy components lazy-loaded via next/dynamic");
bullet("PostgreSQL database with Prisma ORM and Zod v4 validation");
gap();

body("Key narrative pillars:", 9.5, C.emerald);
bullet("Raw data becomes intelligence (Hero section)");
bullet("Three stages from noise to signal (Insight Flow)");
bullet("A calm surface for complex intelligence (Dashboard)");
bullet("One core that reorganizes itself (Signature)");
bullet("Insight becomes action, on its own (Automations)");
bullet("Built for the full loop (Pillars + Metrics)");

pageFooter(3, 1);

// ====================== PAGE 4: Tech Stack ======================
doc.addPage();
pageBg();
sectionBadge("02", "Tech Stack");

const techStack = [
  ["Framework", "Next.js 16 (App Router)", "SSR, routing, server actions"],
  ["Language", "TypeScript 5", "Type safety across the codebase"],
  ["Styling", "Tailwind CSS v4 + oklch vars", "Design system with 80+ tokens"],
  ["3D", "Three.js / R3F / Drei", "Particle fields, 3D core visualization"],
  ["Animation", "Framer Motion 12 + Lenis", "Scroll, layoutId transitions, smooth scroll"],
  ["Charts", "Recharts", "Area charts, bar charts, sparklines"],
  ["State", "Zustand 5 + persist middleware", "Auth store with localStorage hydration"],
  ["Database", "PostgreSQL + Prisma 6", "Access request storage and ORM"],
  ["Validation", "Zod v4", "Form schema with server-side validation"],
  ["Icons", "Lucide React", "UI icon set"],
  ["Font", "Geist (sans + mono)", "Typography via next/font"],
  ["Deployment", "Netlify + netlify.toml", "CI/CD, security headers, SPA rules"],
];

const startY = doc.y;
techStack.forEach(([cat, tech, purpose], i) => {
  const y = startY + i * 24;
  if (y > 780) return; // prevent overflow

  doc.roundedRect(50, y, 495, 21, 3).fill(i % 2 === 0 ? C.card : C.surface);

  doc.fontSize(9).fillColor(C.emerald).font("Helvetica-Bold").text(cat, 60, y + 5);
  doc.fontSize(8).fillColor(C.fg).font("Helvetica").text(tech, 165, y + 5);
  doc.fontSize(7).fillColor(C.gray).font("Helvetica").text(purpose, 320, y + 6);
});

doc.y = startY + techStack.length * 24 + 10;

pageFooter(4, 1);

// ====================== PAGE 5: Architecture ======================
doc.addPage();
pageBg();
sectionBadge("03", "Architecture");

body("The system is organized into four logical layers. The Client layer renders the root layout shell. Pages compose sections, which consume Three.js canvases. The Data layer provides persistence.");

gap();

// Architecture diagram using nodes
const archY = doc.y + 10;

// Client layer
drawNode(40, archY, 180, 55, "Client Layer", "layout.tsx · nav · footer\n3D bg · scroll · toast", C.emerald);
drawNode(240, archY, 180, 55, "Pages (6 routes)", "/ · /signin · /request-access\n/admin · /api · 404", C.emerald);
drawNode(440, archY, 120, 55, "Sections", "8 landing sections\n4 dynamically imported", C.amber);

arrow(220, archY + 27, 240, archY + 27);
arrow(420, archY + 27, 440, archY + 27);

// Three.js layer
const threeY = archY + 80;
drawNode(40, threeY, 250, 55, "Three.js Canvas", "HeroCanvas (1,800 particles, GLSL shader)\nSignatureCanvas (54 orbit nodes, MeshDistortMaterial)", C.emerald);
drawNode(310, threeY, 250, 55, "Design System", "80+ oklch CSS vars · 7 section gradients\nglass/lift/edge-glow utilities", C.amber);

doc
  .moveTo(140, archY + 55)
  .lineTo(165, threeY)
  .strokeColor(C.emerald + "44")
  .lineWidth(0.7)
  .stroke();
doc
  .moveTo(330, archY + 55)
  .lineTo(335, threeY)
  .strokeColor(C.amber + "44")
  .lineWidth(0.7)
  .stroke();

// Data layer
const dataY = threeY + 80;
drawNode(40, dataY, 250, 55, "Data Layer", "Server Actions → Prisma → PostgreSQL\nZustand Auth Store → localStorage", C.emerald);

doc
  .moveTo(165, threeY + 55)
  .lineTo(165, dataY)
  .strokeColor(C.emerald + "44")
  .lineWidth(0.7)
  .stroke();
doc
  .fontSize(6)
  .fillColor(C.muted)
  .font("Helvetica-Oblique")
  .text("request-access → submitRequest()", 170, dataY - 12);

doc.y = dataY + 65;
gap();

body("Key architectural properties:", 9.5, C.emerald);
bullet("All routes are static SSG except /api (server dynamic)");
bullet("Three.js canvases are lazy-loaded with ssr: false and fallback placeholders");
bullet("Auth is entirely client-side — two demo accounts in Zustand with localStorage persist");
bullet("Server Action pattern for form submission — Zod validation → Prisma write → typed result");

pageFooter(5, 1);

// ====================== PAGE 6: Page Routes ======================
doc.addPage();
pageBg();
sectionBadge("04", "Page Routes");

body("The application has 5 routes accessible to users plus a health check endpoint. All pages are statically generated at build time except the API route.");

gap();

const routes = [
  { route: "/", type: "Static SSG", desc: "Landing page with 8 sections. Dynamically imports InsightFlow, DashboardPreview, Signature, and Automations via next/dynamic()." },
  { route: "/signin", type: "Static SSG", desc: "Sign-in form with demo credential fill buttons for admin and member roles. Server-validated against two hard-coded accounts." },
  { route: "/request-access", type: "Static SSG", desc: "5-phase animated state machine: form → submitting → success / duplicate / error. Server Action writes to PostgreSQL." },
  { route: "/admin", type: "Static SSG", desc: "Admin dashboard with 4 tabs (overview, access requests, users, activity). Role-gated — only admin role can view." },
  { route: "/404", type: "Static SSG", desc: "Custom not-found page with motion-animated entrance. 'Lost in the data' theme with two CTA buttons." },
  { route: "/api", type: "Server Dynamic", desc: "Health check endpoint returning JSON with status and timestamp." },
];

const rtY = doc.y;
routes.forEach((r, i) => {
  const y = rtY + i * 38;
  doc.roundedRect(50, y, 495, 34, 4).fill(C.card);
  doc.roundedRect(50, y, 495, 34, 4).lineWidth(0.3).stroke(C.cardBorder);

  const typeColor = r.type === "Static SSG" ? C.emerald : C.amber;
  doc.fontSize(11).fillColor(C.fg).font("Helvetica-Bold").text(r.route, 60, y + 4);
  doc.fontSize(7).fillColor(typeColor).font("Helvetica").text(r.type, 120, y + 6);
  doc.fontSize(7.5).fillColor(C.gray).font("Helvetica").text(r.desc, 60, y + 20, { width: 470 });
});

pageFooter(6, 1);

// ====================== PAGE 7: Section Breakdown ======================
doc.addPage();
pageBg();
sectionBadge("05", "Section Breakdown");
body("The landing page consists of 8 sequentially revealed sections. Each section reinforces a stage in the data-to-decision loop with distinct visual treatments.");

gap(0.6);

const secs = [
  { name: "Hero (#top)", lines: [
    "Three.js particle field: 1,800 particles on desktop, 800 on mobile",
    "Auto-oscillates between chaotic cloud and Fibonacci sphere (~15.7s period)",
    "GLSL shader morphs position, color, and point size",
    "Cursor parallax drives group rotation and camera dolly",
    "CSS aurora + grid background provides atmospheric depth"
  ]},
  { name: "Narrative Band", lines: [
    "Four-card transformation rail: Raw → Structured → Insight → Action",
    "Animated gradient sweep connects the cards on desktop",
    "Glass-morphism cards with ghost index numbers and lift-on-hover",
    "2-column grid on mobile, 4-column on desktop"
  ]},
  { name: "Insight Flow (#flow)", lines: [
    "Three scroll-reveal stages: Ingest, Analyze, Generate",
    "Each stage pairs text with a hand-built SVG visualization",
    "Ingest: converging source streams → unified schema",
    "Analyze: 3-layer network diagram with signal path highlight",
    "Generate: grid heatmap + insight cards with confidence labels",
    "No GSAP — uses framer-motion whileInView exclusively"
  ]},
  { name: "Dashboard (#workspace)", lines: [
    "Full mock product UI embedded as a perspective scroll-reveal card",
    "Sidebar nav with user avatar, tabbed top nav with spring layoutId",
    "4 KPI cards with sparklines (Recharts SVG polyline)",
    "Area chart (insight velocity) + Bar chart (throughput)",
    "5 tabbed panels: Overview, Models, Insights, Sources, Automations",
    "Theme-aware via useThemeColors hook syncing CSS vars to Recharts"
  ]},
  { name: "Signature (#core)", lines: [
    "Three.js 3D core: distorted icosahedron inside wireframe shell",
    "54 orbiting nodes (28 mobile) reorganize from chaos to planar rings",
    "Two torus rings rotate at different Euler angles",
    "Dual point lights: emerald (warm) + amber (cool) — auto-oscillates ~20.9s",
    "MeshDistortMaterial with animated distort and emissiveIntensity"
  ]},
  { name: "Automations (#automations)", lines: [
    "Trigger-action cards: if/else logic with success rate meters",
    "4 automations: Churn guard, Pricing optimizer, Release monitor, Inventory rebalance",
    "Progress bars animate on scroll via whileInView",
    "Pipeline rail with sweeping gradient light across all cards",
    "Dashed-border 'New automation' composer card"
  ]},
  { name: "Pillars", lines: [
    "3-stage system recap: Ingest, Analyze, Automate",
    "Hover glow effect: radial gradient expands on mouseover",
    "Metric badges and 'Explore the flow' CTA links",
    "Large ghost stage numbers for depth"
  ]},
  { name: "Metrics", lines: [
    "4 animated KPIs: 9 sources, 1,284 insights/wk, 248ms p50, 37 automations",
    "Alternating accent colors (emerald / amber)",
    "Animated baseline progress bars that fill on scroll",
    "Accent corner marks on each metric card"
  ]},
];

secs.forEach((s) => {
  doc.fontSize(11).fillColor(C.emerald).font("Helvetica-Bold").text(s.name);

  // Check if we need a new page
  if (doc.y > 750) {
    doc.addPage();
    pageBg();
  }

  s.lines.forEach((l) => bullet(l));
  gap(0.3);
});

pageFooter(7, 1);

// ====================== PAGE 8: Three.js ======================
doc.addPage();
pageBg();
sectionBadge("06", "Three.js Interactions");
body("Both 3D scenes are lazy-loaded via next/dynamic with ssr: false. Each includes a pulsing fallback placeholder (animated gradient blur) that displays while the WebGL canvas initializes.");
gap();

doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text("Hero Canvas — Particle Field");
gap(0.2);

// Particle field diagram
const pfY = doc.y;
drawNode(50, pfY, 200, 50, "ParticleField", "1,800 particles (800 mobile)\nBufferGeometry + ShaderMaterial", C.emerald);
drawNode(290, pfY, 130, 50, "Chaos State", "Random distribution\nHigh entropy", C.amber);
drawNode(440, pfY, 120, 50, "Structure", "Fibonacci sphere\nLow entropy", C.emerald);

arrow(250, pfY + 25, 290, pfY + 25);
doc
  .moveTo(420, pfY + 25)
  .lineTo(440, pfY + 25)
  .strokeColor(C.emerald + "55")
  .lineWidth(0.7)
  .stroke();

doc.y = pfY + 60;
gap(0.2);

body("The particle field uses a custom ShaderMaterial with GLSL vertex and fragment shaders:", 9, C.gray);
bullet("Two attribute arrays (aChaos, aStructure) store the morph targets");
bullet("uProgress uniform (0→1) lerps between chaos and structure positions");
bullet("uTime drives continuous drift on chaos positions and shimmer on structure positions");
bullet("Theme-aware uniforms: uColorChaos (slate), uColorStructure (emerald), uLight (0|1)");
bullet("Point size computed in vertex shader from distance, base size, and progress");
bullet("Fragment shader applies radial gradient alpha, color mix, and hot particle highlights");

gap(0.6);
doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text("Signature Canvas — Intelligence Core");
gap(0.2);

const scY = doc.y;
drawNode(50, scY, 220, 50, "Core Structure", "Icosahedron + MeshDistortMaterial\nWireframe shell + Sphere glow", C.emerald);
drawNode(290, scY, 140, 50, "Orbit Nodes", "54 nodes (28 mobile)\n3 tiers, 2 torus rings", C.amber);
drawNode(450, scY, 100, 50, "Lighting", "2 point lights\nEmerald + Amber", C.emerald);

doc.y = scY + 60;
gap(0.2);

body("The core visual centers on a distorted icosahedron:", 9, C.gray);
bullet("MeshDistortMaterial with animated distort (0.18 → 0.52) and emissiveIntensity pulses");
bullet("Inner sphere (0.6 radius) with emerald glow, outer wireframe shell (1.85 radius)");
bullet("54 orbit nodes organized into 3 tiers, transitioning from random to planar rings");
bullet("Two torus rings at different angles (emerald + amber) for orbital depth cues");
bullet("Camera dolly responsive: 11.0 → 9.5 on desktop, 12.5 → 10.7 on mobile");
bullet("Pointer parallax drives subtle rotation offset on the group");

pageFooter(8, 1);

// ====================== PAGE 9: Auth & Data Flow ======================
doc.addPage();
pageBg();
sectionBadge("07", "Auth & Data Flow");
gap();

doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text("Authentication");
gap(0.2);
body("Auth is entirely client-side, using Zustand with the persist middleware to hydrate from localStorage:", 9, C.gray);
bullet("Two hard-coded demo accounts: admin@xai.app (role: admin) and member@xai.app (role: member)");
bullet("Credentials can be overridden via NEXT_PUBLIC_DEMO_ADMIN_* and NEXT_PUBLIC_DEMO_MEMBER_* env vars");
bullet("signIn() returns { ok: true } or { ok: false, error: string } — no real server verification");
bullet("Admin page uses useSyncExternalStore for SSR-safe hydration check (mounted guard)");
bullet("signOut() clears user state and redirects to /signin");

gap(0.6);
doc.fontSize(12).fillColor(C.amber).font("Helvetica-Bold").text("Access Request Flow");
gap(0.2);

// Flow diagram
const flowStart = doc.y;
drawNode(50, flowStart, 100, 35, "Form Input", "5 fields", C.emerald);
drawNode(170, flowStart, 100, 35, "Zod v4", "Validate", C.emerald);
drawNode(290, flowStart, 100, 35, "Prisma", "INSERT", C.emerald);
drawNode(410, flowStart, 100, 35, "PostgreSQL", "Storage", C.amber);

arrow(150, flowStart + 17, 170, flowStart + 17);
arrow(270, flowStart + 17, 290, flowStart + 17);
arrow(390, flowStart + 17, 410, flowStart + 17);

doc.y = flowStart + 50;
gap();

body("The form submission follows a Server Action pattern:", 9, C.gray);
bullet("Form data is collected via FormData and passed to submitRequest()");
bullet("Zod v4 validates all fields (name, email, company, role, useCase)");
bullet("On validation failure, field-level errors are returned and highlighted");
bullet("Prisma attempts to insert into the AccessRequest table");
bullet("On success → animated success card with request summary");
bullet("On P2002 (unique email violation) → animated duplicate card");
bullet("On any other error → animated error card with retry button");

gap(0.4);
body("The 5-phase state machine (431 lines):", 9, C.emerald);
bullet("form — editable fields with optional error highlights");
bullet("submitting — loading spinner on submit button, fields disabled");
bullet("success — checkmark animation + request details card + 'Back to sign in' CTA");
bullet("duplicate — amber warning icon + 'Submit with different email' option");
bullet("error — red error icon + message + 'Try again' button");

pageFooter(9, 1);

// ====================== PAGE 10: Components ======================
doc.addPage();
pageBg();
sectionBadge("08", "Component Decomposition");
body("Every reusable component in the codebase, from layout shell to UI primitives.");

gap(0.4);

const comps = [
  { name: "site-nav.tsx", desc: "Fixed-position nav bar with scroll-aware background transition (transparent → blurred glass). Desktop nav links with hover underline. Mobile hamburger menu with AnimatePresence slide-down panel. Body overflow lock when menu open. Theme toggle integrated." },
  { name: "site-footer.tsx", desc: "Full-width footer with glass-strong CTA band. Animated ping indicator for 'Now onboarding design partners'. Copyright with dynamic year. Scroll-triggered entrance animation via whileInView." },
  { name: "smooth-scroll.tsx", desc: "Lenis smooth scroll provider wrapping children. Configurable duration (1.2s) and easing. Respects prefers-reduced-motion. Vertical orientation with gesture detection." },
  { name: "scroll-progress.tsx", desc: "Fixed 2px gradient bar at top of viewport. Scales from 0 to 1 based on scroll progress. Uses useSpring for smooth animation (stiffness: 100, damping: 30). Z-index 60 — above nav." },
  { name: "scroll-to-top.tsx", desc: "Floating button that appears after 600px scroll. RAF-throttled scroll listener. AnimatePresence for enter/exit animation (scale + fade). Smooth scroll to top on click." },
  { name: "premium-section-label.tsx", desc: "Section eyebrow component that parses 'NN · Title' format. Renders 5 unique hand-crafted SVG geometric icons (loop, branching nodes, panel grid, concentric core, bolt). Number badge in monospace with accent color." },
  { name: "scene-3d-background.tsx", desc: "CSS-only layered depth backdrop. Perspective grid floor receding into distance (rotateX 70°). Two floating orbs (emerald + amber) with slow drift animations (22s/28s periods). Cursor parallax via CSS custom properties. THREE.Clock deprecation warning suppression. Top/bottom vignette for depth falloff." },
  { name: "role-select.tsx", desc: "Custom animated dropdown replacing native <select>. WAI-ARIA combobox pattern with role=listbox. Keyboard navigation: arrow keys, Enter/Space to select, Escape to close. Focus tracking via focusedRef. scrollIntoView on focused item. layoutId checkmark for selected state. AnimatePresence for panel open/close." },
  { name: "toast.tsx / toaster.tsx", desc: "Radix UI toast primitives with CVA variant system (default, destructive). Forwarded refs on all components. Animated viewport positioning." },
];

comps.forEach((c) => {
  // Check page space
  if (doc.y > 740) {
    doc.addPage();
    pageBg();
    gap(0.2);
  }

  doc.fontSize(9.5).fillColor(C.emerald).font("Helvetica-Bold").text(c.name);
  doc.fontSize(8).fillColor(C.gray).font("Helvetica").text(c.desc, { lineGap: 2, indent: 8 });
  gap(0.35);
});

pageFooter(10, 1);

// ====================== PAGE 11: Design System ======================
doc.addPage();
pageBg();
sectionBadge("09", "Design System");
body("The design system is built on 80+ CSS custom properties using the oklch color space for perceptual uniformity across light and dark themes.");
gap();

const sysGroups = [
  { title: "Core Colors", items: [
    "--accent: oklch(0.80 0.16 162) — Emerald primary",
    "--accent-warm: oklch(0.82 0.15 75) — Amber co-accent",
    "--background, --foreground, --card, --muted-foreground",
  ]},
  { title: "Surfaces & Tints", items: [
    "--hairline: oklch(1 0 0 / 9%) — Border tint",
    "--surface-1/2/3 — Layered opacity tints (3%, 6%, 9%)",
    "--card, --popover, --sidebar-* tokens",
  ]},
  { title: "Effects", items: [
    ".glass — backdrop-filter blur(12px) saturate(120%) with inset highlight",
    ".glass-strong — blur(20px) saturate(130%) for modals and CTAs",
    ".lift — hover translateY(-4px) with accent border glow",
    ".edge-glow — CSS pseudo-element gradient border overlay",
    ".bg-grain — SVG feTurbulence noise overlay (opacity 0.5, mix-blend-mode: overlay)",
    ".aurora — multi-stop radial gradient ambient glow",
    ".text-gradient-accent — emerald → amber linear gradient text",
  ]},
  { title: "Section Backgrounds", items: [
    "bg-sec-narrative — Emerald canopy: top-lit radial mesh",
    "bg-sec-flow — Cool data-stream: emerald + teal lateral mesh with grid lines",
    "bg-sec-workspace — Warm studio: amber-warm neutral with dual gradients",
    "bg-sec-core — Dramatic deep-field: darkest, most atmospheric (the WOW moment)",
    "bg-sec-automations — Dual-tone energy: emerald + amber intersecting",
    "bg-sec-pillars — Calm structured: even dual-tone wash",
    "bg-sec-metrics — Closing gradient: emerald fade to background",
  ]},
  { title: "Shared Easing", items: [
    "EASE: cubic-bezier(0.22, 1, 0.36, 1) — Standard transitions",
    "EASE_OUT_SOFT: cubic-bezier(0.16, 1, 0.3, 1) — Entrance animations",
    "EASE_IN_OUT: cubic-bezier(0.65, 0, 0.35, 1) — Modals",
  ]},
  { title: "Fluid Typography", items: [
    ".text-display-xl: clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem) — Hero heading",
    ".text-display-lg: clamp(2rem, 1.5rem + 2.4vw, 3.5rem) — Section headings",
    ".text-display-md: clamp(1.625rem, 1.3rem + 1.6vw, 2.75rem) — Sub-headings",
    ".text-display-sm: clamp(1.375rem, 1.2rem + 0.9vw, 1.875rem) — Card titles",
  ]},
];

sysGroups.forEach((g) => {
  if (doc.y > 750) {
    doc.addPage();
    pageBg();
  }

  doc.fontSize(10).fillColor(C.emerald).font("Helvetica-Bold").text(g.title);
  g.items.forEach((i) => bullet(i));
  gap(0.3);
});

pageFooter(11, 1);

// ====================== PAGE 12: Performance & Deployment ======================
doc.addPage();
pageBg();
sectionBadge("10", "Performance & Deployment");
gap();

doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text("Performance");
gap(0.2);

const perfData = [
  ["Metric", "Value"],
  ["ESLint errors", "0"],
  ["ESLint warnings", "0"],
  ["TypeScript errors", "0"],
  ["Build tool", "Turbopack (Next.js 16)"],
  ["Build time", "~8s cold cache"],
  ["Total source files", "35"],
  ["Total source lines", "~5,000"],
  ["Routes", "5 static + 1 dynamic"],
  ["Dynamic imports", "4 (InsightFlow, DashboardPreview, Signature, Automations)"],
  ["Lazy-loaded (ssr: false)", "2 Three.js canvases"],
  ["CLS", "0 — fixed-position canvases, no <img> tags"],
  ["npm packages", "~507 (post-cleanup)"],
  ["CSS custom properties", "80+ oklch tokens"],
];

const perfY = doc.y;
// Table header
doc.roundedRect(50, perfY, 495, 18, 3).fill(C.emeraldDim);
doc.fontSize(8).fillColor(C.emerald).font("Helvetica-Bold").text("  Metric", 55, perfY + 4);
doc.fontSize(8).fillColor(C.emerald).font("Helvetica-Bold").text("Value", 350, perfY + 4);

perfData.slice(1).forEach(([m, v], i) => {
  const y = perfY + 20 + i * 18;
  const bg = i % 2 === 0 ? C.card : C.surface;
  doc.roundedRect(50, y, 495, 16, 2).fill(bg);
  doc.fontSize(7.5).fillColor(C.fg).font("Helvetica").text("  " + m, 55, y + 3);
  doc.fontSize(7.5).fillColor(v === "0" ? C.emerald : C.gray).font("Helvetica-Bold").text(v, 350, y + 3);
});

doc.y = perfY + 20 + perfData.length * 18 + 10;
gap();

doc.fontSize(12).fillColor(C.emerald).font("Helvetica-Bold").text("Deployment (Netlify)");
gap(0.2);

body("The project is pre-configured for Netlify via netlify.toml and public/_headers:");

const deployData = [
  ["Config", "Value"],
  ["Build command", "npm run build"],
  ["Publish directory", ".next"],
  ["Favicon", "favicon.ico (32x32 legacy) + favicon.svg (modern)"],
  ["Security", "X-Frame-Options: DENY, HSTS, X-Content-Type-Options, Permissions-Policy"],
  ["Routing", "Catch-all redirect for SPA client-side navigation"],
  ["Required env", "DATABASE_URL — PostgreSQL connection string"],
];

const depY = doc.y;
deployData.slice(1).forEach(([k, v], i) => {
  const y = depY + i * 18;
  const bg = i % 2 === 0 ? C.card : C.surface;
  doc.roundedRect(50, y, 495, 16, 2).fill(bg);
  doc.fontSize(7.5).fillColor(C.emerald).font("Helvetica-Bold").text("  " + k, 55, y + 3);
  doc.fontSize(7).fillColor(C.gray).font("Helvetica").text(v, 190, y + 3, { width: 340 });
});

pageFooter(12, 1);

// ====================== PAGE 13: Project Structure ======================
doc.addPage();
pageBg();
sectionBadge("11", "Project Structure");
body("Complete source tree with 35 source files across the application.");

gap(0.2);

const tree = [
  "src/",
  "  app/",
  "    layout.tsx              Root layout — ThemeProvider, Lenis, nav/footer, Toaster",
  "    page.tsx                Landing — 8 sections, 4 dynamic next/dynamic imports",
  "    globals.css             Dual-theme design system (588 lines, oklch)",
  "    not-found.tsx           404 page with motion-animated entrance",
  "    signin/page.tsx         Sign-in form with demo fill buttons",
  "    request-access/page.tsx 5-phase state machine (431 lines)",
  "    admin/page.tsx          Admin dashboard — 4 tabs (450 lines)",
  "    actions/request-access.ts  Server Action — Zod v4 + Prisma",
  "    api/route.ts            Health check endpoint",
  "  components/",
  "    site/                  12 layout + section components",
  "      hero.tsx             R3F particle field (auto-play morph)",
  "      signature.tsx        3D core wrapper (auto-play reorganize)",
  "      insight-flow.tsx     Scroll-reveal stages + SVG visuals",
  "      dashboard-preview.tsx  Mock UI — charts, tabs, panels (719 lines)",
  "      automations.tsx      Automation cards + pipeline rail",
  "      landing-sections.tsx  Narrative band + pillars + metrics",
  "      scene-3d-background.tsx  CSS-only depth backdrop",
  "      site-nav.tsx         Fixed nav + mobile hamburger menu",
  "      site-footer.tsx      CTA band + footer links",
  "      premium-section-label.tsx  5 unique SVG section icons",
  "      scroll-progress.tsx  Top gradient progress bar",
  "      scroll-to-top.tsx    Floating scroll-to-top button",
  "      smooth-scroll.tsx    Lenis smooth scroll provider",
  "    three/",
  "      hero-canvas.tsx      GLSL shader, 1,800 particles",
  "      signature-canvas.tsx  Icosahedron + 54 orbit nodes",
  "    ui/",
  "      toast.tsx            Radix UI toast primitives",
  "      toaster.tsx          Toast renderer",
  "      custom/role-select.tsx  Animated dropdown (keyboard a11y)",
  "  hooks/",
  "    use-toast.ts           Toast reducer state machine",
  "  lib/",
  "    motion.ts              Easing curves + Framer Motion variants",
  "    mock-data.ts           All mock data + site constants",
  "    utils.ts               cn() helper (clsx + tailwind-merge)",
  "    auth-store.ts          Zustand auth (localStorage persist)",
  "    use-theme-colors.ts    Recharts ↔ CSS variable sync",
  "    db.ts                  PrismaClient singleton",
  "prisma/",
  "  schema.prisma            AccessRequest model (PostgreSQL)",
  "public/",
  "  favicon.ico              Legacy favicon (32x32)",
  "  favicon.svg              Modern SVG favicon",
  "  logo.svg                 Brand mark",
  "  site.webmanifest         PWA manifest",
  "  robots.txt               SEO crawl rules",
  "  _headers                 Netlify security headers",
  "Root config files:",
  "  next.config.ts           Next.js configuration",
  "  postcss.config.mjs       PostCSS + Tailwind v4",
  "  eslint.config.mjs        ESLint 9 flat config",
  "  tsconfig.json            TypeScript configuration",
  "  netlify.toml             Netlify deploy configuration",
  "  components.json          shadcn/ui configuration",
];

const treeStart = doc.y;
tree.forEach((line, i) => {
  const indent = line.search(/\S/);
  const isDir = line.endsWith("/");
  const isConfig = line.startsWith("Root");

  if (isConfig) {
    gap(0.3);
    doc.fontSize(8).fillColor(C.amber).font("Helvetica-Bold").text(line, 50);
    return;
  }

  const x = 50 + indent * 2;
  const color = isDir ? C.emerald : line.includes(".tsx") || line.includes(".ts") || line.includes(".css") ? C.fg : C.gray;
  const font = isDir ? "Helvetica-Bold" : "Helvetica";
  const size = isDir ? 7.5 : 7;

  if (doc.y > 800) {
    doc.addPage();
    pageBg();
  }

  doc.fontSize(size).fillColor(color).font(font).text(line, x, doc.y, { lineGap: 1.5 });
});

pageFooter(13, 1);

// ====================== FINALIZE ======================
const totalPages = doc.bufferedPageRange().count - 1;
// Fix footers with correct page numbers
for (let i = 0; i <= totalPages; i++) {
  doc.switchToPage(i);
  doc.fontSize(7).fillColor(C.muted).font("Helvetica");
  doc.text("Xai — Intelligence Workspace", 50, 815, { continued: true });
  doc.text(`  |  ${i + 1} / ${totalPages + 1}`, { align: "right" });
}

doc.end();

out.on("finish", () => {
  const stats = fs.statSync(path.resolve(process.cwd(), "Xai-Product-Documentation.pdf"));
  console.log(`PDF generated: ${stats.size.toLocaleString()} bytes, ${totalPages + 1} pages`);
});
