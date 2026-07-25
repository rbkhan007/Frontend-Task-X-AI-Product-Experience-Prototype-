"use client";

import { motion } from "framer-motion";
import { flowStages } from "@/lib/mock-data";
import { PremiumSectionLabel } from "@/components/site/premium-section-label";
import { EASE_OUT_SOFT, viewportOnce } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_SOFT },
  },
};

export function InsightFlow({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id="flow"
      className="relative w-full overflow-hidden bg-sec-flow bg-grain px-5 sm:px-6"
      aria-label="How Xai turns data into insight"
    >
      {!embedded && (
        <div className="mx-auto max-w-6xl pt-16 md:pt-24 lg:pt-32">
          <SectionLabel>02 · The flow</SectionLabel>
          <h2 className="mt-5 max-w-2xl text-balance text-display-lg font-semibold">
            Three stages from{" "}
            <span className="text-muted-foreground">noise</span> to{" "}
            <span className="text-gradient-accent">signal</span>.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Each stage is a deliberate transformation — geometric, revealed on
            scroll, and surfaced as something a decision-maker can act on.
          </p>
        </div>
      )}

      <div className="mx-auto max-w-6xl pb-16 md:pb-24 lg:pb-32">
        <div className={embedded ? "mt-6 space-y-16 md:space-y-24" : "mt-10 space-y-16 md:mt-14 md:space-y-24"}>
          {flowStages.map((s, i) => (
            <motion.div
              key={s.key}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
            >
              <motion.div variants={fadeUp} className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="font-mono text-[12px] text-accent">
                  Stage {s.index}
                </div>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {s.title}
                  <span className="block text-base font-normal text-muted-foreground sm:text-lg">
                    {s.subtitle}
                  </span>
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {s.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-3 py-1 font-mono text-[11px] text-foreground/80">
                  {s.metric}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className={`relative aspect-square w-full max-w-[400px] justify-self-center md:max-w-none ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                {i === 0 && <IngestVisual />}
                {i === 1 && <AnalyzeVisual />}
                {i === 2 && <GenerateVisual />}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <PremiumSectionLabel>{children}</PremiumSectionLabel>;
}

/* ---------------- SVG Visuals ---------------- */

function IngestVisual() {
  const sources = [80, 140, 200, 260, 320];
  return (
    <VisualFrame>
      <defs>
        <linearGradient id="ingest-line-stacked" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {sources.map((y, i) => (
          <motion.g
            key={i}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
            }}
          >
            <motion.circle
              cx="36" cy={y} r="4" className="fill-foreground/40"
              variants={{
                hidden: { scale: 0 },
                visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
              }}
            />
            <motion.text
              x="14" y={y - 10} className="fill-muted-foreground"
              style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.4 } },
              }}
            >
              src{i + 1}
            </motion.text>
            <motion.path
              d={`M40 ${y} C 150 ${y}, 200 200, 300 200`}
              stroke="url(#ingest-line-stacked)" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: "easeOut" }}
            />
          </motion.g>
        ))}
      </motion.g>
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { delay: 0.7, staggerChildren: 0.1 } },
        }}
      >
        <motion.circle
          cx="300" cy="200" r="22" className="fill-accent/10 stroke-accent" strokeWidth="1.5"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 12 } },
          }}
        />
        <motion.circle
          cx="300" cy="200" r="8" className="fill-accent"
          variants={{
            hidden: { scale: 0 },
            visible: { scale: 1, transition: { type: "spring", stiffness: 400, damping: 10 } },
          }}
        />
        <motion.circle
          cx="300" cy="200" r="34" className="stroke-accent/30" strokeWidth="1"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
          }}
        />
        <motion.text
          x="300" y="252" textAnchor="middle" className="fill-muted-foreground"
          style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)" }}
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          unified schema
        </motion.text>
      </motion.g>
    </VisualFrame>
  );
}

function AnalyzeVisual() {
  const colX = [90, 200, 310];
  const layerNodes = [
    [110, 170, 230, 290],
    [140, 200, 260],
    [160, 240],
  ];
  const nodes: { x: number; y: number; layer: number; idx: number }[] = [];
  layerNodes.forEach((ys, li) =>
    ys.forEach((y, idx) => nodes.push({ x: colX[li], y, layer: li, idx }))
  );
  const edges: string[] = [];
  for (let li = 0; li < 2; li++) {
    layerNodes[li].forEach((y1) => {
      layerNodes[li + 1].forEach((y2) => {
        edges.push(`M${colX[li]} ${y1} L ${colX[li + 1]} ${y2}`);
      });
    });
  }
  const signal = `M${colX[0]} ${layerNodes[0][1]} L ${colX[1]} ${layerNodes[1][1]} L ${colX[2]} ${layerNodes[2][0]}`;

  return (
    <VisualFrame>
      <defs>
        <linearGradient id="edge-grad-stacked" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      >
        {edges.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#edge-grad-stacked)" strokeWidth="0.8"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
          />
        ))}
      </motion.g>
      <motion.path
        d={signal}
        stroke="currentColor" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      />
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
      >
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.layer === 2 ? 6 : 4.5}
            className={n.layer === 2 ? "fill-accent stroke-accent/40" : "fill-foreground/70 stroke-foreground/10"}
            strokeWidth="1"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 250, damping: 12 } },
            }}
          />
        ))}
      </motion.g>
      {["input", "models", "signal"].map((l, i) => (
        <motion.text
          key={l}
          x={colX[i]} y={350} textAnchor="middle" className="fill-muted-foreground"
          style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)" }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
        >
          {l}
        </motion.text>
      ))}
    </VisualFrame>
  );
}

function GenerateVisual() {
  const cols = 5;
  const rows = 5;
  const cell = 44;
  const ox = 90;
  const oy = 60;
  const hot = new Set(["0-2", "1-4", "2-1", "3-3", "4-0", "2-4", "4-2"]);
  const cells: { r: number; c: number; hot: boolean; key: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ r, c, hot: hot.has(`${r}-${c}`), key: `${r}-${c}` });
    }
  }
  const cards = [
    { x: 250, y: 150, w: 110, h: 46, label: "INS-2041" },
    { x: 262, y: 210, w: 110, h: 46, label: "INS-2038" },
    { x: 274, y: 270, w: 110, h: 46, label: "INS-2035" },
  ];

  return (
    <VisualFrame>
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.02, delayChildren: 0.1 } } }}
      >
        {cells.map((c) => (
          <motion.rect
            key={c.key}
            x={ox + c.c * cell}
            y={oy + c.r * cell}
            width={cell - 8}
            height={cell - 8}
            rx="4"
            className={c.hot ? "fill-accent/70" : "fill-foreground/10"}
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
            }}
          />
        ))}
      </motion.g>
      <motion.g
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } }}
      >
        {cards.map((c) => (
          <motion.g
            key={c.label}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_SOFT } },
            }}
          >
            <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="8" className="fill-card stroke-accent/40" strokeWidth="1" />
            <rect x={c.x} y={c.y} width={3} height={c.h} className="fill-accent" />
            <text x={c.x + 12} y={c.y + 18} className="fill-foreground" style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)" }}>
              {c.label}
            </text>
            <text x={c.x + 12} y={c.y + 34} className="fill-muted-foreground" style={{ fontSize: 8 }}>
              insight · 94% conf.
            </text>
          </motion.g>
        ))}
      </motion.g>
      <motion.text
        x={ox + (cols * cell) / 2}
        y={oy + rows * cell + 24}
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{ fontSize: 9, fontFamily: "var(--font-geist-mono)" }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        findings → structured insights
      </motion.text>
    </VisualFrame>
  );
}

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full text-accent" fill="none" aria-hidden>
      {children}
    </svg>
  );
}
