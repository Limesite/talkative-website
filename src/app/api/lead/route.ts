import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Lead intake.
 *
 * Two sinks, both optional and independent — if one is not configured the
 * other still runs, and the visitor never sees a failure caused by a missing
 * env var on a side channel.
 *
 *   1. Email notification via Resend          (RESEND_API_KEY)
 *   2. Append a row to Google Sheets via a    (SHEETS_WEBHOOK_URL)
 *      Google Apps Script Web App
 *
 * Swapping in HubSpot, Pipedrive or anything else means adding a third
 * function below. Nothing else in the app changes. See context.md.
 */

type LeadPayload = {
  kind: string;
  fairSlug?: string;
  fairName?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string | null;
  website?: string | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max = 200): string {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

async function notifyByEmail(lead: LeadPayload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!key || !to || !from) return;

  const subject = lead.fairName
    ? `Brief request — ${lead.fairName} — ${lead.company}`
    : `New enquiry — ${lead.company}`;

  const lines = [
    `Name:    ${lead.name}`,
    `Company: ${lead.company}`,
    `Email:   ${lead.email}`,
    `Phone:   ${lead.phone || "not given"}`,
    `Request: ${lead.kind}`,
    lead.fairName ? `Fair:    ${lead.fairName} (${lead.fairSlug})` : "",
    "",
    `Received ${new Date().toISOString()}`,
  ].filter(Boolean);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject,
      text: lines.join("\n"),
    }),
  });
}

async function appendToSheet(lead: LeadPayload) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      kind: lead.kind,
      fair: lead.fairName ?? "",
      fairSlug: lead.fairSlug ?? "",
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone ?? "",
      source: site.url,
    }),
  });
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently accept so bots don’t learn anything.
  if (body.website) return NextResponse.json({ ok: true });

  const lead: LeadPayload = {
    kind: clean(body.kind, 40) || "enquiry",
    fairSlug: clean(body.fairSlug, 80) || undefined,
    fairName: clean(body.fairName, 120) || undefined,
    name: clean(body.name, 120),
    email: clean(body.email, 160).toLowerCase(),
    company: clean(body.company, 160),
    phone: clean(body.phone, 40) || null,
  };

  if (!lead.name || !lead.company || !EMAIL_RE.test(lead.email ?? "")) {
    return NextResponse.json(
      { error: "Please check your name, company and email address." },
      { status: 422 }
    );
  }

  const results = await Promise.allSettled([
    notifyByEmail(lead),
    appendToSheet(lead),
  ]);

  // Log failures for Vercel’s runtime logs, but don’t fail the visitor’s
  // request because a side channel is misconfigured.
  results.forEach((r) => {
    if (r.status === "rejected") console.error("lead sink failed:", r.reason);
  });

  return NextResponse.json({ ok: true });
}
