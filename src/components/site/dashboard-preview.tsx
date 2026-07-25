"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useThemeColors } from "@/lib/use-theme-colors";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  LayoutGrid,
  Sparkles,
  Cpu,
  Workflow,
  Database,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Zap,
} from "lucide-react";
import { SectionLabel } from "@/components/site/insight-flow";
import {
  kpis,
  insightTrend,
  throughputBars,
  insightRows,
  dataSources,
  automations,
} from "@/lib/mock-data";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Sparkles, label: "Insights", badge: "12" },
  { icon: Cpu, label: "Models" },
  { icon: Workflow, label: "Automations" },
  { icon: Database, label: "Sources" },
];

const tabs = ["Overview", "Models", "Insights", "Sources", "Automations"] as const;
type Tab = (typeof tabs)[number];

export function DashboardPreview({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("Overview");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.02]);
  const frameY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section
      id="workspace"
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden bg-sec-workspace bg-grain px-5 sm:px-6",
        embedded ? "pb-20 md:pb-40" : "section-y"
      )}
      aria-label="Intelligence workspace preview"
    >
      <div className="mx-auto max-w-6xl">
        {!embedded && (
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>03 · The workspace</SectionLabel>
              <h2 className="mt-5 max-w-2xl text-balance text-display-lg font-semibold">
                A calm surface for{" "}
                <span className="text-gradient-accent">complex</span> intelligence.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground md:text-right">
              Every signal, model, and automation in one view — ranked by impact,
              ready to act on.
            </p>
          </div>
        )}

        {/* perspective wrapper */}
        <div className={cn("[perspective:1600px]", embedded ? "mt-4" : "mt-10 md:mt-16")}>
          <motion.div
            style={{ rotateX, scale, y: frameY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT_SOFT }}
            className="glass-strong relative overflow-hidden rounded-2xl"
          >
            {/* top edge accent glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            {/* window chrome */}
            <div className="relative flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
              <div className="mx-auto flex items-center gap-2 rounded-md border border-hairline bg-surface-1 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                xai.app/workspace
              </div>
            </div>

            {/* app body */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
              <Sidebar />
              <div className="min-w-0 border-t border-hairline md:border-l md:border-t-0">
                <TopBar tab={tab} setTab={setTab} />
                <div className="border-t border-hairline p-3 sm:p-4 md:p-6">
                  <AnimatePresence mode="wait">
                    {tab === "Overview" && <OverviewPanel key="ov" />}
                    {tab === "Models" && <ModelsPanel key="md" />}
                    {tab === "Insights" && <InsightsPanel key="in" />}
                    {tab === "Sources" && <SourcesPanel key="src" />}
                    {tab === "Automations" && <AutomationsPanel key="aut" />}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="hidden flex-col justify-between border-r border-hairline bg-sidebar/60 p-3 md:flex">
      <div>
        <div className="px-2 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Workspace
          </span>
        </div>
        <nav className="mt-1 flex flex-col gap-0.5">
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors",
                item.active
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:bg-surface-1 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                  {item.badge}
                </span>
              )}
              {item.active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 h-5 w-0.5 rounded-full bg-accent"
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
      <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-hairline bg-surface-1 p-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/40 text-[11px] font-semibold text-background">
          AR
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-medium">Ava Reyes</div>
          <div className="truncate text-[10px] text-muted-foreground">
            Data lead
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
        <span>Workspace</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground">{tab}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-hairline bg-surface-1 px-3 py-1.5 text-[12px] text-muted-foreground lg:flex">
          <Search className="h-3.5 w-3.5" />
          <span>Search insights…</span>
          <kbd className="ml-4 rounded border border-hairline px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </div>
        {/* tabs */}
        <div className="flex items-center gap-0.5 rounded-lg border border-hairline bg-surface-1 p-0.5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
                tab === t
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-md bg-surface-3"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Panels ---------------- */

function OverviewPanel() {
  const c = useThemeColors();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
      className="space-y-5"
    >
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="glass lift group relative overflow-hidden rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-muted-foreground">
                {k.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[10px]",
                  k.positive ? "text-accent" : "text-red-500"
                )}
              >
                {k.delta}
              </span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              {k.value}
            </div>
            <Sparkline data={k.spark} positive={k.positive} />
          </motion.div>
        ))}
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr]">
        <ChartCard title="Insight velocity" sub="This week">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={insightTrend} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={c.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="t"
                tick={{ fill: c.mutedFg, fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: c.mutedFg, fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ stroke: c.hairline }}
                contentStyle={{
                  background: c.card,
                  border: `1px solid ${c.hairline}`,
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: "var(--font-geist-mono)",
                }}
                labelStyle={{ color: c.mutedFg }}
                itemStyle={{ color: c.foreground }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={c.accent}
                strokeWidth={2}
                fill="url(#area-fill)"
                dot={false}
                activeDot={{ r: 3, fill: c.accent }}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke={c.baseline}
                strokeWidth={1}
                strokeDasharray="3 3"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Throughput" sub="By hour">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={throughputBars} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
              <XAxis
                dataKey="t"
                tick={{ fill: c.mutedFg, fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: c.mutedFg, fontSize: 10, fontFamily: "var(--font-geist-mono)" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ fill: c.hairline }}
                contentStyle={{
                  background: c.card,
                  border: `1px solid ${c.hairline}`,
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: "var(--font-geist-mono)",
                }}
                labelStyle={{ color: c.mutedFg }}
                itemStyle={{ color: c.foreground }}
              />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {throughputBars.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i >= 3 ? c.accent : c.barInactive}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <InsightsTable compact />
    </motion.div>
  );
}

function ModelsPanel() {
  const models = [
    { name: "Anomaly detector", kind: "Statistical", acc: 94, status: "Live" },
    { name: "Causal inference", kind: "Graph", acc: 88, status: "Live" },
    { name: "Forecasting", kind: "Time-series", acc: 91, status: "Live" },
    { name: "Summarizer", kind: "LLM", acc: 86, status: "Beta" },
    { name: "Intent classifier", kind: "LLM", acc: 79, status: "Draft" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
      className="space-y-2"
    >
      {models.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="glass lift flex items-center gap-4 rounded-xl p-4"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium">{m.name}</span>
              <span className="rounded-full border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                {m.kind}
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.acc}%` }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: EASE_OUT_SOFT }}
                className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
              />
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[13px]">{m.acc}%</div>
            <div
              className={cn(
                "font-mono text-[10px]",
                m.status === "Live"
                  ? "text-accent"
                  : m.status === "Beta"
                  ? "text-amber-500"
                  : "text-muted-foreground"
              )}
            >
              {m.status}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function InsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
    >
      <InsightsTable />
    </motion.div>
  );
}

function InsightsTable({ compact = false }: { compact?: boolean }) {
  const rows = compact ? insightRows.slice(0, 4) : insightRows;
  const statusStyle: Record<string, string> = {
    shipped: "bg-accent/15 text-accent",
    reviewing: "bg-amber-500/15 text-amber-600",
    draft: "bg-surface-2 text-muted-foreground",
  };
  const impactDot: Record<string, string> = {
    high: "bg-accent",
    medium: "bg-amber-500",
    low: "bg-muted-foreground/40",
  };
  return (
    <div className="overflow-hidden rounded-xl border border-hairline">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <div className="text-[13px] font-medium">Recent insights</div>
        <button className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
          View all <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      <div className="scrollbar-thin max-h-[260px] overflow-x-auto overflow-y-auto">
        <table className="w-full min-w-[480px] text-left">
          <thead className="sticky top-0 bg-card/95 backdrop-blur">
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2 font-medium">Insight</th>
              <th className="hidden px-4 py-2 font-medium sm:table-cell">Source</th>
              <th className="px-4 py-2 font-medium">Conf.</th>
              <th className="hidden px-4 py-2 font-medium sm:table-cell">Status</th>
              <th className="px-4 py-2 text-right font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group border-t border-hairline text-[12px] transition-colors hover:bg-surface-1"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", impactDot[r.impact])} />
                    <span className="font-medium">{r.title}</span>
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted-foreground sm:hidden">
                    {r.source}
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {r.source}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-foreground/90">{r.confidence}%</span>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] capitalize", statusStyle[r.status])}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-[11px] text-muted-foreground">
                  {r.updated}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SourcesPanel() {
  const statusStyle: Record<string, string> = {
    healthy: "bg-accent/15 text-accent",
    syncing: "bg-amber-500/15 text-amber-600",
    warning: "bg-red-500/15 text-red-500",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium">Connected sources</span>
        <button className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
          Add source <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-2">
        {dataSources.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="glass lift flex items-center gap-4 rounded-xl p-3.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent ring-1 ring-accent/20">
              <Database className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[13px] font-medium">{s.name}</span>
                <span className="shrink-0 rounded-full border border-hairline px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                  {s.type}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <span>{s.rows} rows</span>
                <span>·</span>
                <span>{s.lastSync}</span>
              </div>
            </div>
            <div className="hidden w-24 shrink-0 sm:block">
              <div className="mb-1 flex justify-between font-mono text-[9px] text-muted-foreground">
                <span>health</span>
                <span>{s.health}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.health}%` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: EASE_OUT_SOFT }}
                  className={cn(
                    "h-full rounded-full",
                    s.health >= 95 ? "bg-accent" : s.health >= 85 ? "bg-amber-500" : "bg-red-500"
                  )}
                />
              </div>
            </div>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] capitalize", statusStyle[s.status])}>
              {s.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AutomationsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium">Active automations</span>
        <button className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
          New automation <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {automations.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="glass lift rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/12 text-accent ring-1 ring-accent/20">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-semibold">{a.name}</span>
              </div>
              <span className={cn("flex items-center gap-1.5 font-mono text-[10px]", a.active ? "text-accent" : "text-muted-foreground")}>
                <span className={cn("h-1.5 w-1.5 rounded-full", a.active ? "bg-accent" : "bg-muted-foreground/40")} />
                {a.active ? "active" : "paused"}
              </span>
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-[10px]">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">if</span>
                <span className="text-foreground/90">{a.trigger}</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-2.5 w-2.5 text-accent" />
                <span className="text-foreground/90">{a.action}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
              <span className="font-mono text-[12px] font-semibold">{a.runs.toLocaleString()}</span>
              <span className="font-mono text-[12px] font-semibold text-accent">{a.success}%</span>
            </div>
            <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-surface-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${a.success}%` }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE_OUT_SOFT }}
                className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ChartCard({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[13px] font-medium">{title}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{sub}</span>
      </div>
      {children}
    </div>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const c = useThemeColors();
  const w = 100;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d - min) / range) * h;
    return `${x},${y}`;
  });
  const color = positive ? c.accent : c.accentWarm;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-7 w-full" preserveAspectRatio="none">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
