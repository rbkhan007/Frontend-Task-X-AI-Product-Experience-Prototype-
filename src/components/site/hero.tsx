"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { EASE_OUT_SOFT } from "@/lib/motion";

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => <HeroFallback />,
  }
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-accent/10 blur-2xl" />
    </div>
  );
}

export function Hero() {
  const progressRef = useRef(0);
  const { resolvedTheme } = useTheme();
  const theme: "light" | "dark" =
    resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const raw = Math.sin(elapsed * 0.4);
      const t = (raw + 1) / 2;
      progressRef.current = t * t * (3 - 2 * t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-faded opacity-40" />

      <div className="absolute inset-0">
        <HeroCanvas progressRef={progressRef} theme={theme} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 0.35 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-3.5 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Intelligence Workspace · v2
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: EASE_OUT_SOFT, delay: 0.45 }}
          className="max-w-4xl text-balance text-display-xl font-semibold"
        >
          Raw data becomes{" "}
          <span className="text-gradient-accent text-glow-accent">
            intelligence
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.65 }}
          className="mt-5 max-w-xl text-pretty text-[15px] text-muted-foreground sm:text-lg"
        >
          Xai ingests every source, finds the signal with models, and turns it
          into structured insight — then automates the next step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.8 }}
          className="mt-8 flex flex-col items-stretch justify-center gap-3 px-6 sm:flex-row sm:px-0"
        >
          <Link
            href="#flow"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-[14px] font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            See how it works
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="#workspace"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-1 px-5 py-3 text-[14px] font-medium text-foreground backdrop-blur-md transition-colors hover:bg-surface-2"
          >
            Explore workspace
          </Link>
        </motion.div>
      </div>

      <HeroHud />
    </section>
  );
}

function HeroHud() {
  const items = [
    { k: "Sources", v: "9" },
    { k: "Models", v: "14" },
    { k: "p50", v: "248ms" },
  ];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between px-8 pb-10 md:flex">
      <div className="flex gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.k}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
            className="font-mono text-[11px]"
          >
            <div className="text-muted-foreground">{it.k}</div>
            <div className="text-foreground/90">{it.v}</div>
          </motion.div>
        ))}
      </div>
      <div className="font-mono text-[11px] text-muted-foreground">
        raw → structured → insight → action
      </div>
    </div>
  );
}
