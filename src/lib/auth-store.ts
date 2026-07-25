"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthRole = "admin" | "member";

export type AuthUser = {
  name: string;
  email: string;
  role: AuthRole;
};

type AuthState = {
  user: AuthUser | null;
  signIn: (_email: string, _password: string) => { ok: boolean; error?: string };
  signOut: () => void;
  isLoading: boolean;
};

const DEMO_CREDENTIALS: Record<string, { password: string; user: AuthUser }> = {
  [process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "admin@xai.app"]: {
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "xai-demo",
    user: { name: "Ava Reyes", email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "admin@xai.app", role: "admin" },
  },
  [process.env.NEXT_PUBLIC_DEMO_MEMBER_EMAIL ?? "member@xai.app"]: {
    password: process.env.NEXT_PUBLIC_DEMO_MEMBER_PASSWORD ?? "xai-demo",
    user: { name: "Marcus Webb", email: process.env.NEXT_PUBLIC_DEMO_MEMBER_EMAIL ?? "member@xai.app", role: "member" },
  },
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      signIn: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const record = DEMO_CREDENTIALS[normalized];
        if (!record) {
          return { ok: false, error: "No account found for that email." };
        }
        if (record.password !== password) {
          return { ok: false, error: "Incorrect password. Try again." };
        }
        set({ user: record.user, isLoading: false });
        return { ok: true };
      },
      signOut: () => set({ user: null, isLoading: false }),
    }),
    { name: "xai-auth" }
  )
);
