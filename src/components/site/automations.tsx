"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Plus } from "lucide-react";
import { SectionLabel } from "@/components/site/insight-flow";
import { automations } from "@/lib/mock-data";
import { EASE_OUT_SOFT, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Automations({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id="automations"
      className={cn(
        "relative w-full overflow-hidden bg-sec-automations bg-grain px-5 sm:px-6",
        embedded ? "pb-20 md:pb-40" : "section-y"
      )}
      aria-label="AI automations"
    >
      <div className="mx-auto max-w-6xl">
        {!embedded && (
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionLabel>05 · Automations</SectionLabel>
              <h2 className="mt-5 max-w-2xl text-balance text-display-lg font-semibold">
                Insight becomes{" "}
                <span className="text-gradient-accent">action</span>, on its own.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground md:text-right">
              Every insight can trigger a workflow — notify, test, page, or
              reorder — without leaving the workspace.
            </p>
          </div>
        )}

        {/* pipeline rail */}
        <div className={cn("relative", embedded ? "mt-6" : "mt-10 md:mt-14")}>
          <PipelineRail />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {automations.map((a) => (
              <AutomationCard key={a.name} a={a} />
            ))}
            <NewAutomationCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PipelineRail() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
      <div className="relative mx-auto h-full max-w-6xl overflow-hidden">
        <div className="absolute inset-0 bg-surface-2" />
        <motion.div
          initial={{ x: "-40%" }}
          whileInView={{ x: "120%" }}
          viewport={viewportOnce}
          transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      </div>
    </div>
  );
}

function AutomationCard({
  a,
}: {
  a: (typeof automations)[number];
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
      }}
      className="glass lift edge-glow group relative overflow-hidden rounded-2xl p-5"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-[14px] font-semibold">{a.name}</span>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[10px]",
            a.active ? "text-accent" : "text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              a.active ? "bg-accent" : "bg-muted-foreground/40"
            )}
          />
          {a.active ? "active" : "paused"}
        </span>
      </div>

      <div className="mt-5 space-y-2 font-mono text-[11px]">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-muted-foreground">if</span>
          <span className="text-foreground/90">{a.trigger}</span>
        </div>
        <div className="flex items-start gap-2">
          <ArrowRight className="mt-0.5 h-3 w-3 text-accent" />
          <span className="text-foreground/90">{a.action}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
        <div>
          <div className="font-mono text-[14px] font-semibold">
            {a.runs.toLocaleString()}
          </div>
          <div className="text-[10px] text-muted-foreground">runs</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[14px] font-semibold text-accent">
            {a.success}%
          </div>
          <div className="text-[10px] text-muted-foreground">success</div>
        </div>
      </div>
      <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${a.success}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-accent/50 to-accent"
        />
      </div>
    </motion.div>
  );
}

function NewAutomationCard() {
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_SOFT } },
      }}
      className="lift group flex min-h-[230px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-hairline-strong bg-surface-1/60 p-5 text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
        <Plus className="h-4 w-4 transition-colors group-hover:text-accent" />
      </div>
      <span className="text-[13px] font-medium">New automation</span>
      <span className="text-[11px] text-muted-foreground">
        Trigger from any insight
      </span>
    </motion.button>
  );
}
