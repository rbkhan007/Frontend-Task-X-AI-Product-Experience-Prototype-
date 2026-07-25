"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-sec-core bg-grain" />
      <div className="relative">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          404 · lost in the data
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-balance text-display-xl font-semibold"
        >
          This page{" "}
          <span className="text-gradient-accent">couldn&apos;t be found</span>.
        </motion.h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-muted-foreground">
          The signal got lost. Let&apos;s get you back to the workspace.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-[14px] font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            Back to home
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/signin"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-1 px-5 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Sign in
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
