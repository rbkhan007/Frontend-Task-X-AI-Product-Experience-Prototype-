"use client";

export const dynamic = "force-dynamic";

import { useState, useSyncExternalStore, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-store";
import { EASE_OUT_SOFT } from "@/lib/motion";
import {
  accessRequests,
  adminUsers,
  activityFeed,
  automations,
  kpis,
} from "@/lib/mock-data";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Activity,
  LogOut,
  Shield,
  ArrowRight,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
type IconComponent = React.FC<{ className?: string }>;

type AdminTab = "overview" | "requests" | "users" | "activity";

export default function AdminPage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const [tab, setTab] = useState<AdminTab>("overview");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => { document.title = "Admin · Xai"; }, []);

  if (!mounted) return null;
  if (!user) {
    return (
      <section className="relative flex min-h-[70vh] w-full items-center justify-center px-6">
        <div className="glass-strong relative max-w-md rounded-2xl p-8 text-center">
          <Shield className="mx-auto h-10 w-10 text-accent" />
          <h1 className="mt-4 text-display-sm font-semibold">Admin access required</h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Sign in with an admin account to view this page.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-[14px] font-semibold text-background transition-transform hover:scale-[1.01]"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }
  if (user.role !== "admin") {
    return (
      <section className="relative flex min-h-[70vh] w-full items-center justify-center px-6">
        <div className="glass-strong relative max-w-md rounded-2xl p-8 text-center">
          <Shield className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="mt-4 text-display-sm font-semibold">Not authorized</h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            Your account ({user.email}) doesn&apos;t have admin access.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-[14px] font-semibold text-background transition-transform hover:scale-[1.01]"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: IconComponent; badge?: string }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "requests", label: "Access requests", icon: Inbox, badge: String(accessRequests.filter((r) => r.status === "pending").length) },
    { id: "users", label: "Users", icon: Users },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  return (
    <section className="relative w-full px-5 pb-20 pt-28 sm:px-6 md:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-sec-core bg-grain" />
      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-surface-1">
                <Shield className="h-3.5 w-3.5 text-accent" />
              </span>
              <span className="font-mono text-[11px] font-semibold text-accent">ADMIN</span>
              <span className="h-px w-8 bg-gradient-to-r from-accent to-accent/30" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Control center
              </span>
            </div>
            <h1 className="mt-4 text-display-md font-semibold">
              Workspace{" "}
              <span className="text-gradient-accent">admin</span>
            </h1>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{user.name}</span> · {user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-hairline bg-surface-1 px-3 py-2 text-[13px] font-medium transition-colors hover:bg-surface-2"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Browse workspace
            </Link>
            <button
              onClick={() => {
                signOut();
                router.push("/signin");
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-hairline bg-surface-1 px-3 py-2 text-[13px] font-medium transition-colors hover:bg-surface-2"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </motion.div>

        {/* tabs */}
        <div className="mt-8 flex items-center gap-0.5 overflow-x-auto rounded-lg border border-hairline bg-surface-1 p-0.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
              {t.badge && (
                <span className="ml-1 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                  {t.badge}
                </span>
              )}
              {tab === t.id && (
                <motion.span
                  layoutId="admin-tab-pill"
                  className="absolute inset-0 rounded-md bg-surface-3"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
          className="mt-6"
        >
          {tab === "overview" && <OverviewTab />}
          {tab === "requests" && <RequestsTab />}
          {tab === "users" && <UsersTab />}
          {tab === "activity" && <ActivityTab />}
        </motion.div>
      </div>
    </section>
  );
}

function OverviewTab() {
  const pending = accessRequests.filter((r) => r.status === "pending").length;
  const activeUsers = adminUsers.filter((u) => u.status === "active").length;
  const activeAutomations = automations.filter((a) => a.active).length;

  const stats = [
    { label: "Access requests", value: String(pending), sub: "pending review", icon: Inbox, accent: true },
    { label: "Active users", value: String(activeUsers), sub: `of ${adminUsers.length} total`, icon: Users },
    { label: "Insights / wk", value: kpis[0].value, sub: kpis[0].delta, icon: Zap },
    { label: "Automations", value: String(activeAutomations), sub: "running", icon: Activity },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="glass lift relative overflow-hidden rounded-xl p-4"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-muted-foreground">{s.label}</span>
              <s.icon className={cn("h-4 w-4", s.accent ? "text-accent" : "text-muted-foreground/60")} />
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              <span className={s.accent ? "num-display-accent" : ""}>{s.value}</span>
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="glass rounded-xl p-5">
          <h3 className="text-[14px] font-semibold">Recent requests</h3>
          <div className="mt-4 space-y-2">
            {accessRequests.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-hairline bg-surface-1 px-3 py-2.5">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium">{r.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{r.company}</div>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-xl p-5">
          <h3 className="text-[14px] font-semibold">Recent activity</h3>
          <div className="mt-4 space-y-2">
            {activityFeed.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-start gap-2.5 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5">
                <ActivityDot type={e.type} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px]">{e.message}</div>
                  <div className="text-[10px] text-muted-foreground">{e.actor} · {e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestsTab() {
  const statusStyle: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-600",
    approved: "bg-accent/15 text-accent",
    invited: "bg-surface-3 text-foreground",
    declined: "bg-red-500/15 text-red-500",
  };
  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <span className="text-[14px] font-semibold">Access requests</span>
        <span className="font-mono text-[11px] text-muted-foreground">{accessRequests.length} total</span>
      </div>
      <div className="scrollbar-thin max-h-[600px] overflow-y-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="sticky top-0 bg-card/95 backdrop-blur">
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 font-medium">Applicant</th>
              <th className="px-5 py-2.5 font-medium">Company</th>
              <th className="px-5 py-2.5 font-medium">Use case</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 text-right font-medium">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {accessRequests.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group border-t border-hairline text-[12px] transition-colors hover:bg-surface-1"
              >
                <td className="px-5 py-3">
                  <div className="font-medium text-foreground">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">{r.email}</div>
                </td>
                <td className="px-5 py-3">
                  <div>{r.company}</div>
                  <div className="text-[11px] text-muted-foreground">{r.role}</div>
                </td>
                <td className="max-w-[200px] px-5 py-3 text-muted-foreground">
                  <div className="truncate">{r.useCase}</div>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] capitalize", statusStyle[r.status])}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-mono text-[11px] text-muted-foreground">{r.submittedAt}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersTab() {
  const roleStyle: Record<string, string> = {
    admin: "bg-accent/15 text-accent",
    member: "bg-surface-3 text-foreground",
    viewer: "bg-surface-2 text-muted-foreground",
  };
  const statusDot: Record<string, string> = {
    active: "bg-accent",
    invited: "bg-amber-500",
    suspended: "bg-red-500",
  };
  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <span className="text-[14px] font-semibold">Users</span>
        <button className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
          Invite user <ArrowRight className="h-3 w-3" />
        </button>
      </div>
      <div className="scrollbar-thin max-h-[600px] overflow-y-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="sticky top-0 bg-card/95 backdrop-blur">
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-2.5 font-medium">User</th>
              <th className="px-5 py-2.5 font-medium">Role</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 text-right font-medium">Insights</th>
              <th className="px-5 py-2.5 text-right font-medium">Last active</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u, i) => (
              <motion.tr
                key={u.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-t border-hairline text-[12px] transition-colors hover:bg-surface-1"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/40 text-[10px] font-semibold text-background">
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{u.name}</div>
                      <div className="text-[11px] text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] capitalize", roleStyle[u.role])}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] capitalize text-muted-foreground">
                    <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[u.status])} />
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right font-mono">{u.insights}</td>
                <td className="px-5 py-3 text-right font-mono text-[11px] text-muted-foreground">{u.lastActive}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-[14px] font-semibold">Activity feed</h3>
      <div className="mt-4 space-y-2">
        {activityFeed.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-start gap-3 rounded-lg border border-hairline bg-surface-1 px-4 py-3"
          >
            <ActivityDot type={e.type} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-foreground">{e.message}</div>
              <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {e.actor} · {e.time} · {e.id}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { icon: IconComponent; cls: string }> = {
    pending: { icon: Clock, cls: "bg-amber-500/15 text-amber-600" },
    approved: { icon: CheckCircle2, cls: "bg-accent/15 text-accent" },
    invited: { icon: Mail, cls: "bg-surface-3 text-foreground" },
    declined: { icon: XCircle, cls: "bg-red-500/15 text-red-500" },
  };
  const c = cfg[status] ?? cfg.pending;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] capitalize", c.cls)}>
      <c.icon className="h-2.5 w-2.5" />
      {status}
    </span>
  );
}

function ActivityDot({ type }: { type: string }) {
  const cfg: Record<string, { icon: IconComponent; cls: string }> = {
    insight: { icon: Zap, cls: "bg-accent/12 text-accent" },
    automation: { icon: Activity, cls: "bg-accent-warm/15 text-accent-warm" },
    user: { icon: Users, cls: "bg-surface-3 text-foreground" },
    source: { icon: LayoutDashboard, cls: "bg-surface-2 text-muted-foreground" },
  };
  const c = cfg[type] ?? cfg.insight;
  return (
    <span className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-hairline", c.cls)}>
      <c.icon className="h-3.5 w-3.5" />
    </span>
  );
}
