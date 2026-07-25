"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  User,
  Mail,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleSelect } from "@/components/ui/custom/role-select";
import { submitRequest, type RequestAccessResult } from "@/app/actions/request-access";
type IconComponent = React.FC<{ className?: string }>;

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
};

type PageState =
  | { phase: "form"; errors: Record<string, string>; serverError: string | null }
  | { phase: "submitting" }
  | { phase: "success"; name: string; email: string; company: string; role: string }
  | { phase: "duplicate"; email: string }
  | { phase: "error"; message: string };

export default function RequestAccessPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [page, setPage] = useState<PageState>({
    phase: "form",
    errors: {},
    serverError: null,
  });
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
  });

  useEffect(() => { document.title = "Request access · Xai"; }, []);

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const setRole = (role: string) => setForm((f) => ({ ...f, role }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage({ phase: "submitting" });

    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const result: RequestAccessResult = await submitRequest(fd);

    if (result.ok) {
      setPage({
        phase: "success",
        name: result.name,
        email: result.email,
        company: result.company,
        role: result.role,
      });
    } else if (result.fieldErrors) {
      setPage({
        phase: "form",
        errors: result.fieldErrors,
        serverError: result.error,
      });
    } else if (result.error.includes("already submitted")) {
      setPage({ phase: "duplicate", email: form.email });
    } else {
      setPage({ phase: "error", message: result.error });
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-5 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-sec-workspace bg-grain" />

      <AnimatePresence mode="wait">
        {page.phase === "success" ? (
          <SuccessCard key="success" {...page} />
        ) : page.phase === "duplicate" ? (
          <DuplicateCard key="duplicate" email={page.email} onRetry={() => setPage({ phase: "form", errors: {}, serverError: null })} />
        ) : page.phase === "error" ? (
          <ErrorCard key="error" message={page.message} onRetry={() => setPage({ phase: "form", errors: {}, serverError: null })} />
        ) : (
          <FormCard
            key="form"
            form={form}
            update={update}
            setRole={setRole}
            page={page}
            handleSubmit={handleSubmit}
            formRef={formRef}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Form                                                                */
/* ------------------------------------------------------------------ */

function FormCard({
  form,
  update,
  setRole,
  page,
  handleSubmit,
  formRef,
}: {
  form: FormState;
  update: (k: keyof FormState) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  setRole: (v: string) => void;
  page: Extract<PageState, { phase: "form" | "submitting" }>;
  handleSubmit: React.FormEventHandler;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  const busy = page.phase === "submitting";

  return (
    <motion.div
      key="form-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE_OUT_SOFT } }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
      className="glass-strong edge-glow relative w-full max-w-lg rounded-2xl p-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <svg viewBox="0 0 28 28" className="h-8 w-8" aria-hidden>
            <defs>
              <linearGradient id="ra-logo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.13 162)" />
                <stop offset="100%" stopColor="oklch(0.62 0.14 175)" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="26" height="26" rx="8" className="fill-background stroke-hairline-strong" strokeWidth="1" />
            <path d="M9 9 L19 19 M19 9 L9 19" stroke="url(#ra-logo)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.2" className="fill-[url(#ra-logo)]" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight">Xai</span>
        </Link>
        <h1 className="mt-6 text-display-sm font-semibold">
          Request{" "}
          <span className="text-gradient-accent">access</span>
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          We&apos;re onboarding design partners. Tell us about your team.
        </p>
      </div>

      {page.phase === "form" && page.serverError && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2 text-[12px] text-red-500"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {page.serverError}
        </motion.div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field icon={User} label="Full name" required error={page.phase === "form" ? page.errors.name : undefined}>
            <input
              required
              name="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Ava Reyes"
              className={cn("auth-input", page.phase === "form" && page.errors.name && "border-red-500/50")}
            />
          </Field>
          <Field icon={Mail} label="Work email" required error={page.phase === "form" ? page.errors.email : undefined}>
            <input
              required
              name="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="ava@company.com"
              className={cn("auth-input", page.phase === "form" && page.errors.email && "border-red-500/50")}
            />
          </Field>
          <Field icon={Building2} label="Company" required error={page.phase === "form" ? page.errors.company : undefined}>
            <input
              required
              name="company"
              value={form.company}
              onChange={update("company")}
              placeholder="Northwind Analytics"
              className={cn("auth-input", page.phase === "form" && page.errors.company && "border-red-500/50")}
            />
          </Field>
          <Field icon={Briefcase} label="Role" required error={page.phase === "form" ? page.errors.role : undefined}>
            <RoleSelect value={form.role} onChange={setRole} error={page.phase === "form" ? !!page.errors.role : false} />
          </Field>
        </div>

        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
            What would you use Xai for?
          </label>
          <textarea
            required
            name="useCase"
            value={form.useCase}
            onChange={update("useCase")}
            rows={3}
            placeholder="e.g. Churn detection + automated outreach for our enterprise cohort"
            className={cn(
              "h-auto w-full resize-none rounded-xl border border-hairline bg-surface-1 px-3 py-2.5 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/50 focus:bg-surface-2",
              page.phase === "form" && page.errors.useCase && "border-red-500/50"
            )}
          />
          {page.phase === "form" && page.errors.useCase && (
            <p className="mt-1 text-[11px] text-red-500">{page.errors.useCase}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="group flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-foreground text-[14px] font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
        >
          {busy ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
              Submitting…
            </span>
          ) : (
            <>
              Submit request
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-hairline pt-5 text-center">
        <p className="text-[13px] text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-accent transition-colors hover:text-accent/80">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success card                                                        */
/* ------------------------------------------------------------------ */

function SuccessCard({ name, email, company, role }: { name: string; email: string; company: string; role: string }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE_OUT_SOFT } }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
      className="glass-strong edge-glow relative w-full max-w-md rounded-2xl p-8 text-center"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30"
      >
        <CheckCircle2 className="h-8 w-8" />
      </motion.div>
      <h1 className="mt-6 text-display-sm font-semibold">Request received</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
        Thanks, {name.split(" ")[0] || "there"}. We&apos;ve received your access request and will review it within 1 business day. You&apos;ll get an invite at{" "}
        <span className="font-medium text-foreground">{email}</span>.
      </p>
      <div className="mt-6 rounded-xl border border-hairline bg-surface-1 p-4 text-left">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Your request</div>
        <div className="mt-1.5 text-[13px] font-medium">{name}</div>
        <div className="text-[12px] text-muted-foreground">{email}</div>
        <div className="mt-2 text-[12px] text-muted-foreground">{company} · {role}</div>
      </div>
      <Link
        href="/signin"
        className="group mt-6 inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-foreground text-[14px] font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95"
      >
        Back to sign in
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Duplicate card                                                      */
/* ------------------------------------------------------------------ */

function DuplicateCard({ email, onRetry }: { email: string; onRetry: () => void }) {
  return (
    <motion.div
      key="duplicate"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE_OUT_SOFT } }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
      className="glass-strong edge-glow relative w-full max-w-md rounded-2xl p-8 text-center"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-500 ring-1 ring-amber-500/30"
      >
        <AlertCircle className="h-8 w-8" />
      </motion.div>
      <h1 className="mt-6 text-display-sm font-semibold">Already submitted</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
        We already have a pending request for{" "}
        <span className="font-medium text-foreground">{email}</span>.
        We&apos;ll be in touch within 1 business day.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-1 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-2"
        >
          Submit with different email
        </button>
        <Link
          href="/signin"
          className="group flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-foreground text-[14px] font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95"
        >
          Sign in
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic error card                                                   */
/* ------------------------------------------------------------------ */

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE_OUT_SOFT } }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
      className="glass-strong edge-glow relative w-full max-w-md rounded-2xl p-8 text-center"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-red-500 ring-1 ring-red-500/30"
      >
        <AlertCircle className="h-8 w-8" />
      </motion.div>
      <h1 className="mt-6 text-display-sm font-semibold">Something went wrong</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-foreground text-[14px] font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95"
      >
        Try again
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Field helper                                                        */
/* ------------------------------------------------------------------ */

function Field({
  icon: Icon,
  label,
  required,
  error,
  children,
}: {
  icon: IconComponent;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
      {error && <p role="alert" className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
