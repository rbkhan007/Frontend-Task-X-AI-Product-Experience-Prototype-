"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-store";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const signIn = useAuth((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Sign in · Xai"; }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signIn(email, password);
      setLoading(false);
      if (result.ok) {
        router.push("/");
      } else {
        setError(result.error ?? "Sign-in failed.");
      }
    }, 500);
  };

  const fillDemo = (role: "admin" | "member") => {
    setEmail(`${role}@xai.app`);
    setPassword("xai-demo");
    setError(null);
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-5 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-sec-workspace bg-grain" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
        className="glass-strong edge-glow relative w-full max-w-md rounded-2xl p-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        {/* header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <svg viewBox="0 0 28 28" className="h-8 w-8" aria-hidden>
              <defs>
                <linearGradient id="signin-logo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.85 0.13 162)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.14 175)" />
                </linearGradient>
              </defs>
              <rect x="1" y="1" width="26" height="26" rx="8" className="fill-background stroke-hairline-strong" strokeWidth="1" />
              <path d="M9 9 L19 19 M19 9 L9 19" stroke="url(#signin-logo)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="14" r="2.2" className="fill-[url(#signin-logo)]" />
            </svg>
            <span className="text-[15px] font-semibold tracking-tight">Xai</span>
          </Link>
          <h1 className="mt-6 text-display-sm font-semibold">
            Sign in to your{" "}
            <span className="text-gradient-accent">workspace</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Welcome back. Pick up where the signal left off.
          </p>
        </div>

        {/* demo credentials banner */}
        <div className="mb-6 rounded-xl border border-accent/20 bg-accent/[0.06] p-3.5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-foreground">Demo credentials</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                admin@xai.app / member@xai.app · password: xai-demo
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo("admin")}
                  className="rounded-lg border border-hairline bg-surface-1 px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-surface-2"
                >
                  Fill admin
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("member")}
                  className="rounded-lg border border-hairline bg-surface-1 px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-surface-2"
                >
                  Fill member
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 w-full rounded-xl border border-hairline bg-surface-1 pl-10 pr-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/50 focus:bg-surface-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-hairline bg-surface-1 pl-10 pr-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/50 focus:bg-surface-2"
              />
            </div>
          </div>

          {error && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-[12px] text-red-500"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-foreground text-[14px] font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
            {!loading && (
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>

        {/* footer */}
        <div className="mt-6 border-t border-hairline pt-5 text-center">
          <p className="text-[13px] text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/request-access" className="font-medium text-accent transition-colors hover:text-accent/80">
              Request access
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
