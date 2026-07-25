"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { FOOTER_LINKS } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-hairline bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
          className="glass-strong edge-glow relative overflow-hidden rounded-3xl px-5 py-10 text-center sm:px-8 sm:py-14 md:px-16 md:py-16"
        >
          <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
          <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-faded opacity-30" />
          <div className="relative">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-1 px-3.5 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Now onboarding design partners
            </div>
            <h2 className="mx-auto max-w-2xl text-balance text-display-lg font-semibold">
              Turn your data into{" "}
              <span className="text-gradient-accent">decisions</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-muted-foreground sm:text-base">
              Request access to the Xai Intelligence Workspace and ship your
              first automation this week.
            </p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 px-4 sm:flex-row sm:px-0">
              <Link
                href="/request-access"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-[14px] font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                Request access
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/signin"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-1 px-5 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 28 28" className="h-6 w-6" aria-hidden>
              <defs>
                <linearGradient id="footer-logo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.85 0.13 162)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.14 175)" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="26" height="26" rx="8" className="fill-background stroke-foreground/10" strokeWidth="1" />
              <path d="M9 9 L19 19 M19 9 L9 19" stroke="url(#footer-logo)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="14" r="2.2" className="fill-[url(#footer-logo)]" />
            </svg>
            <span className="text-[14px] font-semibold">Xai</span>
            <span className="text-[12px] text-muted-foreground">Intelligence Workspace</span>
          </Link>
          <div className="flex items-center gap-5 text-[12px] text-muted-foreground">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Xai — Intelligence Workspace
          </div>
        </div>
      </div>
    </footer>
  );
}