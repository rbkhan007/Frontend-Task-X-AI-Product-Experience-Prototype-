"use client";

import { useSyncExternalStore } from "react";

export type ThemeColors = {
  accent: string;
  accentSoft: string;
  accentWarm: string;
  mutedFg: string;
  foreground: string;
  card: string;
  hairline: string;
  baseline: string;
  barInactive: string;
};

const FALLBACK: ThemeColors = {
  accent: "oklch(0.78 0.15 162)",
  accentSoft: "oklch(0.78 0.15 162 / 0.35)",
  accentWarm: "oklch(0.82 0.15 75)",
  mutedFg: "oklch(0.68 0.008 250)",
  foreground: "oklch(0.97 0.003 250)",
  card: "oklch(0.205 0.005 250)",
  hairline: "oklch(1 0 0 / 10%)",
  baseline: "oklch(0.6 0.01 250)",
  barInactive: "oklch(0.5 0.01 250 / 0.4)",
};

let cached: ThemeColors = FALLBACK;
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

function compute(): ThemeColors {
  if (typeof window === "undefined") return FALLBACK;
  const root = getComputedStyle(document.documentElement);
  const get = (v: string, fb: string) => {
    const val = root.getPropertyValue(v).trim();
    return val || fb;
  };
  const accent = get("--accent", FALLBACK.accent);
  const mutedFg = get("--muted-foreground", FALLBACK.mutedFg);
  const foreground = get("--foreground", FALLBACK.foreground);
  const card = get("--card", FALLBACK.card);
  const hairline = get("--hairline", FALLBACK.hairline);
  return {
    accent,
    accentSoft: `color-mix(in oklab, ${accent}, transparent 65%)`,
    accentWarm: get("--accent-warm", FALLBACK.accentWarm),
    mutedFg,
    foreground,
    card,
    hairline,
    baseline: `color-mix(in oklab, ${mutedFg}, transparent 30%)`,
    barInactive: `color-mix(in oklab, ${mutedFg}, transparent 55%)`,
  };
}

function recompute() {
  cached = compute();
  listeners.forEach((l) => l());
}

function ensureWatching() {
  if (typeof window === "undefined") return;
  if (observer) return;
  cached = compute();
  observer = new MutationObserver(recompute);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function subscribe(listener: () => void) {
  ensureWatching();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && observer) {
      observer.disconnect();
      observer = null;
    }
  };
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot() {
  return FALLBACK;
}

export function useThemeColors(): ThemeColors {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return cached;
}

