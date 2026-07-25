"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS } from "@/lib/mock-data";

export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4",
          scrolled || open
            ? "border-hairline bg-background/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">Xai</span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Intelligence Workspace
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/signin"
            className="hidden rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/request-access"
            className="group relative hidden items-center gap-1.5 overflow-hidden rounded-lg bg-foreground px-3.5 py-1.5 text-[13px] font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 sm:inline-flex"
          >
            Request access
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-surface-1 text-foreground transition-colors hover:bg-surface-2 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-3 top-[64px] z-50 origin-top rounded-2xl border border-hairline bg-background/95 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
              >
                <a
                  href={l.href}
                  onClick={closeMenu}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-surface-1 hover:text-foreground"
                >
                  {l.label}
                  <span className="font-mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </span>
                </a>
              </motion.div>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-hairline pt-2">
              <Link
                href="/signin"
                onClick={closeMenu}
                className="flex min-h-[44px] items-center justify-center rounded-xl border border-hairline bg-surface-1 px-4 py-3 text-[14px] font-medium transition-colors hover:bg-surface-2"
              >
                Sign in
              </Link>
              <Link
                href="/request-access"
                onClick={closeMenu}
                className="flex min-h-[44px] items-center justify-center rounded-xl bg-foreground px-4 py-3 text-[14px] font-semibold text-background"
              >
                Request access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center">
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id="xai-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.13 162)" />
            <stop offset="100%" stopColor="oklch(0.62 0.14 175)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" rx="8" className="fill-background stroke-hairline-strong" strokeWidth="1" />
        <path d="M9 9 L19 19 M19 9 L9 19" stroke="url(#xai-logo)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2.2" className="fill-[url(#xai-logo)]" />
      </svg>
    </span>
  );
}