"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumSectionLabel } from "@/components/site/premium-section-label";
import {
  Database,
  Cpu,
  Workflow,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { EASE_OUT_SOFT, fadeUp, stagger, viewportOnce } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Reusable section label                                              */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return <PremiumSectionLabel>{children}</PremiumSectionLabel>;
}

/* ------------------------------------------------------------------ */
/*  1. Narrative band — the 4-move transformation                      */
/* ------------------------------------------------------------------ */

const moves = [
  {
    icon: Database,
    title: "Raw data",
    sub: "Every source, streaming in",
  },
  {
    icon: Sparkles,
    title: "Structured intelligence",
    sub: "Models find the signal",
  },
  {
    icon: Zap,
    title: "Actionable insight",
    sub: "Ranked by impact",
  },
  {
    icon: Workflow,
    title: "AI automation",
    sub: "The next step, shipped",
  },
];

export function NarrativeBand() {
  return (
    <section className="relative w-full overflow-hidden bg-sec-narrative bg-grain bg-drift px-5 sm:px-6 section-y" aria-label="The loop">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
        >
          <motion.div variants={fadeUp}>
            <Label>01 · The loop</Label>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-5 max-w-2xl text-balance text-display-lg font-semibold"
          >
            From raw data to decision, in{" "}
            <span className="text-gradient-accent">four moves</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-muted-foreground"
          >
            Xai collapses the distance between an event happening and a team
            acting on it — one continuous loop.
          </motion.p>
        </motion.div>

        {/* the 4-move rail */}
        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-surface-3 md:block">
            <motion.div
              initial={{ x: "-30%" }}
              whileInView={{ x: "130%" }}
              viewport={viewportOnce}
              transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
              className="h-full w-1/4 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
            {moves.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.12, duration: 0.7, ease: EASE_OUT_SOFT }}
                className="glass lift edge-glow relative overflow-hidden rounded-2xl p-5"
              >
                {/* large ghost index for depth */}
                <span className="pointer-events-none absolute -right-2 -top-3 font-mono text-[64px] font-bold leading-none text-foreground/[0.04]">
                  0{i + 1}
                </span>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/20">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="relative z-10 mt-4 text-[15px] font-semibold tracking-tight">
                  {m.title}
                </h3>
                <p className="relative z-10 mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {m.sub}
                </p>
                <div className="relative z-10 mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  move 0{i + 1} / 04
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Pillars — the three-stage system                                */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    icon: Database,
    title: "Ingest",
    desc: "Streams from warehouses, product events, and external APIs land in one unified, schema-aware layer.",
    metric: "9 sources · 4.2B rows",
  },
  {
    icon: Cpu,
    title: "Analyze",
    desc: "Statistical baselines, anomaly detection, and causal models run in parallel — only signal surfaces.",
    metric: "14 models · 248ms p50",
  },
  {
    icon: Workflow,
    title: "Automate",
    desc: "Each insight triggers a workflow — notify, test, page, reorder — without leaving the workspace.",
    metric: "37 active automations",
  },
];

export function Pillars() {
  return (
    <section className="relative w-full overflow-hidden bg-sec-pillars bg-grain px-5 sm:px-6 section-y" aria-label="The system">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger(0.1)}
          >
            <motion.div variants={fadeUp}>
              <Label>02 · The system</Label>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-2xl text-balance text-display-lg font-semibold"
            >
              Built for the full{" "}
              <span className="text-gradient-accent">loop</span>.
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
            className="max-w-sm text-sm text-muted-foreground md:text-right"
          >
            Three stages, one workspace. Each one earns its place by removing a
            step between data and decision.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="glass lift edge-glow group relative overflow-hidden rounded-2xl p-6"
            >
              {/* stage index + ambient glow */}
              <span className="pointer-events-none absolute -right-3 -top-4 font-mono text-[80px] font-bold leading-none text-foreground/[0.035]">
                0{i + 1}
              </span>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent ring-1 ring-accent/20">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    stage 0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-3 py-1 font-mono text-[11px] text-foreground/80">
                  {p.metric}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <Link
                    href="#flow"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    Explore the flow
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    → /flow
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Metrics band                                                    */
/* ------------------------------------------------------------------ */

const stats = [
  { v: "9", l: "Data sources" },
  { v: "1,284", l: "Insights / week" },
  { v: "248ms", l: "p50 latency" },
  { v: "37", l: "Active automations" },
];

export function MetricsBand() {
  return (
    <section className="relative w-full overflow-hidden bg-sec-metrics bg-grain px-5 sm:px-6 section-y" aria-label="By the numbers">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              variants={fadeUp}
              className="glass lift relative overflow-hidden rounded-2xl p-6 text-center md:text-left"
            >
              {/* accent corner mark */}
              <span className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent/60" />
              <div className="text-balance text-display-lg font-semibold tracking-[-0.02em] sm:text-display-xl">
                <span className={i % 2 === 0 ? "num-display-accent" : "num-display"}>
                  {s.v}
                </span>
              </div>
              <div className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {s.l}
              </div>
              {/* mini baseline bar */}
              <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${72 - i * 9}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
