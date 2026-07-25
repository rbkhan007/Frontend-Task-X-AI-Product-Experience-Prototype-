"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SectionLabel } from "@/components/site/insight-flow";

const SignatureCanvas = dynamic(
  () =>
    import("@/components/three/signature-canvas").then(
      (m) => m.SignatureCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full bg-accent/10 blur-3xl" />
      </div>
    ),
  }
);

export function Signature() {
  const progressRef = useRef(0);
  const { resolvedTheme } = useTheme();
  const theme: "light" | "dark" =
    resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const raw = Math.sin(elapsed * 0.3 + 0.5);
      const t = (raw + 1) / 2;
      progressRef.current = t * t * (3 - 2 * t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="core"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-sec-core bg-grain py-16 md:py-24 lg:py-32"
      aria-label="The intelligence core"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="absolute inset-0">
        <SignatureCanvas progressRef={progressRef} theme={theme} />
      </div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 52% 42% at 50% 50%, color-mix(in oklab, var(--background), transparent 18%), color-mix(in oklab, var(--background), transparent 0%) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-5 text-center sm:px-6">
        <SectionLabel>04 · The signature</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-balance text-display-lg font-semibold [text-shadow:0_2px_30px_color-mix(in_oklab,var(--background),transparent_5%)]">
          One core that{" "}
          <span className="text-gradient-accent">reorganizes</span> itself.
        </h2>
        <p className="mt-4 max-w-md text-pretty text-[14px] text-muted-foreground [text-shadow:0_1px_16px_color-mix(in_oklab,var(--background),transparent_10%)] sm:max-w-lg sm:text-lg">
          As the core resolves from turbulence into structure — distortion
          settles, the cluster tightens, signal emerges.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-6">
        <div className="rounded-full border border-hairline bg-surface-1 px-4 py-2 font-mono text-[12px] text-muted-foreground backdrop-blur-md">
          structure achieved · signal locked →{" "}
          <span className="text-accent">automate</span>
        </div>
      </div>
    </section>
  );
}
