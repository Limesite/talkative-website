import Link from "next/link";
import type { Metadata } from "next";
import { fairs, upcomingFairs, formatRange, monthYear } from "@/content/fairs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, fairListSchema, eventSchema } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "European B2B trade fair calendar",
  description:
    "Dates, venues and sectors for the major German and European B2B trade fairs — electronica, Space Tech Expo, Formnext, DSEI Germany, Hannover Messe, LIGNA, JEC World and more. Free, no registration.",
  path: "/trade-fairs",
});

export default function TradeFairsPage() {
  const upcoming = upcomingFairs();
  const past = fairs.filter((f) => !upcoming.includes(f));

  const grouped = upcoming.reduce<Record<string, typeof upcoming>>((acc, fair) => {
    const key = monthYear(fair.start);
    (acc[key] ||= []).push(fair);
    return acc;
  }, {});

  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>European trade fair calendar</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            The shows we cover, with dates we’ve checked against the
            organiser and a straight answer on what each one is good for. No
            form, no download, no email address. If a date is unconfirmed, we
            say so on the page rather than quietly publishing it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/cost-calculator" className="btn btn-secondary">
              Work out what a show would cost you
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          {Object.entries(grouped).map(([month, list]) => (
            <div key={month} className="mb-14 last:mb-0">
              <h2 className="text-h4 font-semibold">{month}</h2>
              <ul className="mt-5 border-t border-ink">
                {list.map((fair) => (
                  <li key={fair.slug}>
                    <Link
                      href={`/trade-fairs/${fair.slug}`}
                      className="grid gap-3 border-b border-rule py-6 transition-colors hover:bg-white md:grid-cols-[12rem_1fr_11rem] md:gap-8"
                    >
                      <div>
                        <span className="tnum block text-[0.9375rem] font-semibold">
                          {formatRange(fair.start, fair.end)}
                        </span>
                        {!fair.datesConfirmed && (
                          <span className="mt-1 block text-[0.75rem] font-medium text-marker">
                            Dates not yet confirmed
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-[1.0625rem] font-semibold">
                          {fair.name} {fair.edition}
                        </h3>
                        <p className="measure mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                          {fair.summary}
                        </p>
                        {fair.eenMatchmaking && (
                          <p className="mt-2.5 inline-block border border-rule bg-signal px-2 py-0.5 text-[0.75rem] font-medium">
                            Free EEN matchmaking runs here
                          </p>
                        )}
                      </div>
                      <div className="text-[0.875rem] text-ink-soft">
                        <p className="font-medium text-ink">
                          {fair.city}, {fair.country}
                        </p>
                        <p className="mt-1">{fair.venue}</p>
                        <p className="mt-2">{fair.sectors.join(", ")}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {past.length > 0 && (
            <div className="mt-16 border-t border-rule pt-8">
              <h2 className="text-h4">Already happened</h2>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-ink-soft">
                {past.map((fair) => (
                  <li key={fair.slug}>
                    <Link
                      href={`/trade-fairs/${fair.slug}`}
                      className="underline underline-offset-4 hover:text-ink"
                    >
                      {fair.name} {fair.edition}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        heading="Not sure which of these is yours?"
        body="Tell us what you make and we’ll tell you which two shows are worth your money and which seven aren’t. That part of the conversation is free and takes twenty minutes."
      />

      <JsonLd data={[fairListSchema(upcoming), ...upcoming.map(eventSchema)]} />
    </>
  );
}
