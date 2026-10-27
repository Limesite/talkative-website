import Link from "next/link";
import type { Metadata } from "next";
import { HallPlan } from "@/components/hall-plan";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { services, faqs } from "@/content/services";
import { upcomingFairs, formatRange } from "@/content/fairs";
import { JsonLd, faqSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Trade fair representation in Germany and Europe",
  description:
    "We attend German and European B2B trade fairs on behalf of exporters who can’t travel. Berlin-based, German and English, pre-booked meetings, leads in your inbox within 48 hours.",
  path: "/",
});

const PROBLEMS = [
  {
    figure: "Up to 15 days",
    detail:
      "German Schengen processing time from India once the application reaches the consulate — and the mission states plainly that an urgent trade-fair appointment does not speed up the decision.",
  },
  {
    figure: "One show",
    detail:
      "What a two-person trip from India realistically covers. electronica and Space Tech Expo Europe are a week apart; Formnext overlaps Space Tech almost exactly.",
  },
  {
    figure: "Fair-week rates",
    detail:
      "Hotel pricing near a German venue during a show bears no relation to the rest of the year, and the rooms closest to the halls go to exhibitors months ahead.",
  },
  {
    figure: "German",
    detail:
      "The language your buyer’s procurement lead thinks in. Most of them will speak English to you. Fewer of them will take the meeting in the first place.",
  },
];

const STEPS = [
  {
    title: "You brief us once",
    body: "A working session with your team: what you make, what you’re certified for, what you can’t promise. We leave with a one-page technical card covering the twenty questions buyers actually ask.",
  },
  {
    title: "We fill a diary before the doors open",
    body: "We research the exhibitor list, you approve a shortlist, and we book meetings by email and phone — in German where that’s what gets a reply. Free organiser matchmaking programmes get filled too.",
  },
  {
    title: "You get a lead report in 48 hours",
    body: "Every conversation, who said it, what they’re buying, what they asked that we couldn’t answer. In your CRM format. Then a follow-up call round in German two weeks later, because that’s where most fair leads die.",
  },
];

export default function HomePage() {
  const next = upcomingFairs().slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="band band-first">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <h1>Your sales team in Europe. Without the flights.</h1>
            <p className="measure mt-7 text-lead leading-relaxed text-ink-soft">
              We’re a Berlin firm that attends German and European trade
              fairs on behalf of exporters who can’t be there. We book the
              meetings, hold them in German, and send you a lead report before
              the halls are swept.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/book" className="btn btn-primary">
                Book a 20-minute call
              </Link>
              <Link href="/cost-calculator" className="btn btn-secondary">
                See what a show would cost you
              </Link>
            </div>
            <p className="mt-7 text-[0.875rem] text-ink-soft">
              We work in German and English, cover Germany, France and the
              Netherlands, and represented our first client at ILA Berlin 2026.
            </p>
          </div>

          <HallPlan className="lg:pl-4" />
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="band band-deep">
        <div className="shell">
          <h2 className="measure-wide">
            Exporting to Europe is not expensive because of the stand. It’s
            expensive because of everything around it.
          </h2>
          <dl className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p) => (
              <div key={p.figure} className="border-t border-ink pt-5">
                <dt className="text-[1.375rem] font-semibold leading-tight tracking-[-0.022em]">
                  {p.figure}
                </dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {p.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="measure">How a show works with us</h2>
            <Link
              href="/how-it-works"
              className="text-[0.875rem] font-medium underline underline-offset-4"
            >
              The longer version, including the rules
            </Link>
          </div>

          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t border-ink pt-5">
                <span className="tnum block text-[0.8125rem] font-semibold text-signal-deep">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-h4">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="band band-deep">
        <div className="shell">
          <h2 className="measure">Three ways to be at a show you’re not at</h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`stand group flex flex-col p-7 transition-colors hover:border-ink ${
                  i === 0 ? "stand-let" : ""
                }`}
              >
                <h3 className="text-h4">{service.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  {service.short}
                </p>
                <p className="tnum mt-6 text-[1.75rem] font-semibold leading-none tracking-[-0.026em]">
                  {service.price}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-ink-soft">
                  {service.priceNote}
                </p>
                <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed">
                  {service.summary}
                </p>
                <span className="mt-6 text-[0.875rem] font-medium underline underline-offset-4">
                  What’s included
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-[0.875rem] text-ink-soft">
            Prices are published in full on{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              the pricing page
            </Link>
            . No quote-on-request.
          </p>
        </div>
      </section>

      {/* ── Case note ────────────────────────────────────── */}
      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <h2>Where this started</h2>
            <p className="mt-6 text-[0.9375rem] text-ink-soft">
              ILA Berlin 2026, at the Berlin ExpoCenter Airport, 10–14 June 2026
            </p>
            {/* IMAGE PLACEHOLDER — see public/placeholders/README.md */}
            <div className="stand mt-8 flex aspect-[4/3] items-center justify-center bg-hall p-8 text-center">
              <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                Photo placeholder
                <span className="mt-1 block">
                  Replace with a shot from the ILA Berlin floor.
                  <br />
                  Recommended 1200×900, see
                  <br />
                  <code className="text-[0.75rem]">
                    public/placeholders/README.md
                  </code>
                </span>
              </p>
            </div>
          </div>

          <div className="prose">
            <p>
              A relative’s company, Mark Tech Pro and Consultants, works in
              aerospace, defence and automotive. They wanted to be at ILA
              Berlin — Germany’s aerospace show, which drew exhibitors from
              37 countries and over a hundred thousand visitors that June — and
              getting their people from India to Schönefeld for it was going to
              cost more than the opportunity was worth on a first attempt.
            </p>
            <p>
              We live forty minutes from the venue. So they briefed us on the
              product, we had cards and brochures printed here, and we went and
              had the conversations. We came back with contacts and context, and
              sent the lot over for their team to follow up.
            </p>
            <p>
              It worked well enough that we went looking for who else does this
              for Indian exporters. The US government sells almost exactly this
              service to American companies, priced by company size. Nobody sells
              it to India. That gap is this company.
            </p>
            <p>
              We’ve changed one thing since. Walking a hall handing out
              brochures is against the house rules at most German fairgrounds,
              and it doesn’t scale. Everything we do now runs on meetings
              booked before the doors open — which is also simply the better way
              to work a show.
            </p>
          </div>
        </div>
      </section>

      {/* ── Fair calendar preview ────────────────────────── */}
      <section className="band band-deep">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="measure">What’s next in Europe</h2>
              <p className="measure mt-4 text-ink-soft">
                Dates, venues and what each show is actually good for. Free to
                read, no form.
              </p>
            </div>
            <Link
              href="/trade-fairs"
              className="text-[0.875rem] font-medium underline underline-offset-4"
            >
              All {upcomingFairs().length} fairs
            </Link>
          </div>

          <ul className="mt-11 border-t border-ink">
            {next.map((fair) => (
              <li key={fair.slug}>
                <Link
                  href={`/trade-fairs/${fair.slug}`}
                  className="group grid gap-2 border-b border-rule py-5 transition-colors hover:bg-white sm:grid-cols-[13rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="tnum text-[0.9375rem] font-semibold">
                    {formatRange(fair.start, fair.end)}
                  </span>
                  <span>
                    <span className="text-[1.0625rem] font-semibold">
                      {fair.name} {fair.edition}
                    </span>
                    <span className="ml-2 text-[0.9375rem] text-ink-soft">
                      {fair.city}
                    </span>
                  </span>
                  <span className="text-[0.875rem] text-ink-soft">
                    {fair.sectors.slice(0, 2).join(", ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <div>
            <h2>The questions buyers ask us first</h2>
            <p className="measure mt-5 text-ink-soft">
              Mostly about whether this is legitimate. Fair enough — so here are
              the real answers, including the parts that aren’t flattering.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
