"use client";

import { useEffect, useRef } from "react";

/**
 * Scene3DBackground — a fixed, full-viewport layered backdrop that gives the
 * entire site a cohesive 3D atmosphere. Sits behind all content (z-0).
 *
 * Layers (back → front):
 *   1. Base ambient wash (theme-aware)
 *   2. Perspective grid floor — a CSS 3D plane receding into the distance
 *   3. Two floating depth orbs (emerald + amber) that drift slowly + react to
 *      cursor (parallax) for a living, volumetric feel
 *   4. Top/bottom vignette for depth falloff
 *   5. Fine noise texture
 *
 * Pure CSS/SVG — no WebGL — so it's cheap, theme-aware, and never blocks
 * scroll or the hero/core Three.js canvases.
 */

export function Scene3DBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof globalThis !== "undefined" && globalThis.__THREE_CLOCK_FIXED !== true) {
      globalThis.__THREE_CLOCK_FIXED = true;
      try {
        // eslint-disable-next-line no-console
        const origWarn = console.warn;
        // eslint-disable-next-line no-console
        console.warn = (...args: unknown[]) => {
          if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
          origWarn.call(console, ...args);
        };
      } catch {
        // THREE.Clock patch — safe to ignore
      }
    }
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrap.style.setProperty("--px", x.toFixed(3));
        wrap.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
    >
      {/* 1. base ambient wash */}
      <div className="absolute inset-0 bg-ambient" />

      {/* 2. perspective grid floor (recedes downward) — visible on both themes */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] origin-bottom [perspective:600px]"
        style={{ transform: "translateZ(0)" }}
      >
        <div
          className="absolute inset-0 bg-grid-fine [transform:rotateX(70deg)] opacity-80"
          style={{
            maskImage:
              "linear-gradient(to top, #000 0%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to top, #000 0%, transparent 75%)",
            transform:
              "rotateX(70deg) translateZ(0) translateX(calc(var(--px) * -14px))",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>

      {/* 3a. emerald depth orb (drifts + cursor parallax) — boosted opacity so
           it reads on light backgrounds too */}
      <div
        className="absolute h-[44vmax] w-[44vmax] rounded-full blur-[70px]"
        style={{
          left: "calc(-10% + var(--px) * 28px)",
          top: "calc(-8% + var(--py) * 18px)",
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent), transparent 45%), transparent 68%)",
          opacity: 0.75,
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          animation: "drift-a 22s ease-in-out infinite",
        }}
      />
      {/* 3b. amber depth orb (opposite corner) */}
      <div
        className="absolute h-[36vmax] w-[36vmax] rounded-full blur-[80px]"
        style={{
          right: "calc(-8% + var(--px) * -22px)",
          bottom: "calc(-6% + var(--py) * -16px)",
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--chart-3), transparent 50%), transparent 68%)",
          opacity: 0.6,
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          animation: "drift-b 28s ease-in-out infinite",
        }}
      />

      {/* 4. vignette (depth falloff top + bottom) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 50%, color-mix(in oklab, var(--background), transparent 0%) 100%)",
          opacity: 0.7,
        }}
      />

      {/* keyframes */}
      <style>{`
        @keyframes drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4vmax, 3vmax, 0) scale(1.08); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-3vmax, -2vmax, 0) scale(1.06); }
        }
      `}</style>
    </div>
  );
}
