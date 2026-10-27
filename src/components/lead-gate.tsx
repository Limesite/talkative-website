"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * The gate.
 *
 * Sits on every fair page offering that fair’s Buyer Brief. Name, work email
 * and company are required; phone is optional by design — a required phone
 * field measurably depresses B2B form completion, and under GDPR every field
 * collected needs a defensible purpose. Flip REQUIRE_PHONE to true if you
 * decide you’d rather have fewer, hotter leads.
 */
const REQUIRE_PHONE = false;

type State = "idle" | "sending" | "done" | "error";

export function LeadGate({
  fairSlug,
  fairName,
  includes,
}: {
  fairSlug: string;
  fairName: string;
  includes: string[];
}) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);

    // Honeypot: real people leave this empty.
    if (form.get("company_website")) {
      setState("done");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "buyer-brief",
          fairSlug,
          fairName,
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          phone: form.get("phone") || null,
          website: null,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setState("done");
    } catch {
      setState("error");
      setMessage(
        `We couldn’t send that. Email ${"hello@talkativecompany.com"} and we’ll reply with the brief directly.`
      );
    }
  }

  if (state === "done") {
    return (
      <div className="stand stand-let p-7">
        <h3 className="text-h4">The brief is on its way</h3>
        <p className="measure mt-3 text-ink-soft">
          Check your inbox in the next few minutes. If it hasn’t arrived,
          look in spam — and if it’s still not there, reply to this page’s
          contact address and we’ll send it by hand.
        </p>
        <p className="measure mt-4 text-ink-soft">
          If you’d rather just talk it through, that’s usually faster.
        </p>
        <Link href="/book" className="btn btn-primary mt-5">
          Book a 20-minute call
        </Link>
      </div>
    );
  }

  return (
    <div className="stand stand-let p-7">
      <h3 className="text-h4">Get the {fairName} buyer brief</h3>
      <p className="measure mt-3 text-ink-soft">
        We write one of these for every show we cover. It’s what we’d
        put in front of you on a first call.
      </p>

      <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
        {includes.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-signal-deep"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="lg-name">
              Name
            </label>
            <input
              id="lg-name"
              name="name"
              required
              autoComplete="name"
              className="field"
              placeholder="Priya Shah"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="lg-company">
              Company
            </label>
            <input
              id="lg-company"
              name="company"
              required
              autoComplete="organization"
              className="field"
              placeholder="Acme Precision Pvt Ltd"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="lg-email">
            Work email
          </label>
          <input
            id="lg-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            placeholder="priya@acmeprecision.com"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="lg-phone">
            Phone {REQUIRE_PHONE ? "" : "— optional, if you’d like us to call"}
          </label>
          <input
            id="lg-phone"
            name="phone"
            type="tel"
            required={REQUIRE_PHONE}
            autoComplete="tel"
            className="field"
            placeholder="+91 ..."
          />
        </div>

        {/* Honeypot */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="lg-website">Company website</label>
          <input
            id="lg-website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Sending…" : "Send me the brief"}
        </button>

        {state === "error" && (
          <p role="alert" className="text-[0.8125rem] text-marker">
            {message}
          </p>
        )}

        <p className="text-[0.75rem] leading-relaxed text-ink-soft">
          We use this to send the brief and to follow up once. No list, no
          resale, unsubscribe in one click. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy note
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
