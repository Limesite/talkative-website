import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  fairs,
  getFair,
  formatRange,
  upcomingFairs,
} from "@/content/fairs";
import { LeadGate } from "@/components/lead-gate";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, eventSchema, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return fairs.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fair = getFair(slug);
  if (!fair) return {};
  return pageMeta({
    title: `${fair.name} ${fair.edition} — ${formatRange(fair.start, fair.end)}, ${fair.city}`,
    description: fair.summary,
    path: `/trade-fairs/${fair.slug}`,
  });
}

export default async function FairPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fair = getFair(slug);
  if (!fair) notFound();

  const others = upcomingFairs()
    .filter((f) => f.slug !== fair.slug)
    .slice(0, 3);

  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-soft">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/trade-fairs" className="hover:text-ink">
              Trade fairs
            </Link>{" "}
            /{" "}
            <span className="text-ink">
              {fair.name} {fair.edition}
            </span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <h1>
                {fair.name} {fair.edition}
              </h1>
              <p className="tnum mt-5 text-lead font-medium">
                {formatRange(fair.start, fair.end)}, in {fair.city}
              </p>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">
                {fair.venue}, {fair.country}
              </p>

              {!fair.datesConfirmed && fair.dateNote && (
                <p className="mt-6 border-l-[3px] border-marker bg-white py-3 pl-4 pr-4 text-[0.875rem] leading-relaxed">
                  <strong className="font-semibold">Dates unconfirmed.</strong>{" "}
                  {fair.dateNote}
                </p>
              )}

              <p className="measure mt-7 text-[1.0625rem] leading-relaxed">
                {fair.summary}
              </p>

              <h2 className="mt-10 text-h3">Why it matters if you’re exporting</h2>
              <p className="measure mt-4 leading-relaxed text-ink-soft">
                {fair.whyItMatters}
              </p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
                {fair.facts.map((fact) => (
                  <div key={fact.label} className="border-t border-ink pt-4">
                    <dt className="text-[0.8125rem] text-ink-soft">
                      {fact.label}
                    </dt>
                    <dd className="tnum mt-1.5 text-[1.0625rem] font-semibold leading-snug">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/book" className="btn btn-primary">
                  Talk about covering this show
                </Link>
                <a
                  href={fair.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.875rem] font-medium underline underline-offset-4"
                >
                  Organiser’s official site
                </a>
              </div>
            </div>

            <div className="lg:pt-2">
              <LeadGate
                fairSlug={fair.slug}
                fairName={`${fair.name} ${fair.edition}`}
                includes={fair.briefIncludes}
              />
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="band band-deep">
          <div className="shell">
            <h2 className="text-h3">Shows near this one</h2>
            <ul className="mt-7 grid gap-5 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/trade-fairs/${other.slug}`}
                    className="stand block h-full p-6 transition-colors hover:border-ink"
                  >
                    <span className="tnum text-[0.8125rem] font-semibold text-ink-soft">
                      {formatRange(other.start, other.end)}
                    </span>
                    <h3 className="mt-2 text-h4">
                      {other.name} {other.edition}
                    </h3>
                    <p className="mt-1.5 text-[0.875rem] text-ink-soft">
                      {other.city} — {other.sectors[0]}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        heading={`Thinking about ${fair.name}?`}
        body="Twenty minutes on a call and we’ll tell you whether your category belongs at this show, who we’d try to book, and what it would cost. If the answer is no, that’s the answer."
        secondary={{ label: "See all fairs", href: "/trade-fairs" }}
      />

      <JsonLd
        data={[
          eventSchema(fair),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Trade fairs", path: "/trade-fairs" },
            {
              name: `${fair.name} ${fair.edition}`,
              path: `/trade-fairs/${fair.slug}`,
            },
          ]),
        ]}
      />
    </>
  );
}
