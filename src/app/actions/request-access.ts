"use server";

import { z } from "zod/v4";
import { Prisma } from "@prisma/client";
import { getDb } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.string().trim().email("Valid email is required."),
  company: z.string().trim().min(1, "Company is required."),
  role: z.string().min(1, "Please select a role."),
  useCase: z.string().trim().min(1, "Use case is required."),
});

export type RequestAccessResult =
  | { ok: true; name: string; email: string; company: string; role: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitRequest(data: FormData): Promise<RequestAccessResult> {
  const parsed = schema.safeParse(Object.fromEntries(data));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };
  }

  const { name, email, company, role, useCase } = parsed.data;

  try {
    const db = getDb();
    await db.accessRequest.create({ data: { name, email, company, role, useCase } });

    return { ok: true, name, email, company, role };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return {
        ok: false,
        error:
          "This email has already submitted a request. We'll be in touch within 1 business day. If you haven't heard back, check your spam folder or reach out to support@xai.app.",
      };
    }
    return { ok: false, error: "Something went wrong. Please try again later." };
  }
}
