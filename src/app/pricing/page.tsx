import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Pricing",
  description:
    "Published prices for trade fair representation in Europe. Show representation from €1,900 per show, stand staffing €450–650 per person per day, turnkey stands at 15% of stand budget.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>Pricing</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            Published, because you should be able to work out whether this is
            worth a call without having one. Everything passed through at cost
            arrives with the original invoice attached.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className={`stand flex flex-col p-7 ${i === 0 ? "stand-let" : ""}`}
              >
                <h2 className="text-h4">{service.name}</h2>
                <p className="tnum mt-5 text-[2rem] font-semibold leading-none tracking-[-0.03em]">
                  {service.price}
                </p>
                <p className="mt-2 text-[0.875rem] text-ink-soft">
                  {service.priceNote}
                </p>

                <ul className="mt-7 flex-1 space-y-2.5 text-[0.9375rem]">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 bg-signal-deep"
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="btn btn-secondary mt-8"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-deep">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h3">What’s extra, and what it costs</h2>
            <table className="datatable mt-7">
              <thead>
                <tr>
                  <th>Add-on</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong className="font-semibold">
                      German translation of your materials
                    </strong>
                    <span className="mt-1 block text-ink-soft">
                      Brochures, spec sheets, cards. Worth more than the
                      printing — most Indian materials arrive English-only.
                    </span>
                  </td>
                  <td className="tnum text-right">From €340</td>
                </tr>
                <tr>
                  <td>
                    <strong className="font-semibold">
                      Print, produced in Germany
                    </strong>
                    <span className="mt-1 block text-ink-soft">
                      No freight, no customs, no damaged boxes. At cost plus
                      handling.
                    </span>
                  </td>
                  <td className="tnum text-right">At cost</td>
                </tr>
                <tr>
                  <td>
                    <strong className="font-semibold">
                      German landing page for the show
                    </strong>
                    <span className="mt-1 block text-ink-soft">
                      A single page in German behind the QR code on your card,
                      so the follow-up starts before you’ve sent an email.
                    </span>
                  </td>
                  <td className="tnum text-right">From €900</td>
                </tr>
                <tr>
                  <td>
                    <strong className="font-semibold">
                      Extended follow-up round
                    </strong>
                    <span className="mt-1 block text-ink-soft">
                      Beyond the one round included: a 30-day calling sprint on
                      the full lead list, in German.
                    </span>
                  </td>
                  <td className="tnum text-right">From €1,200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-h3">Retainer</h2>
            <p className="measure mt-5 leading-relaxed text-ink-soft">
              Most of the value compounds. The second show is better than the
              first because we know your product, the third is better again
              because the buyers already met us. If you want several shows a
              quarter plus the follow-up between them, that’s a retainer.
            </p>
            <p className="tnum mt-7 text-[2rem] font-semibold leading-none tracking-[-0.03em]">
              €1,500–3,000
            </p>
            <p className="mt-2 text-[0.875rem] text-ink-soft">
              per month, scoped to the number of shows
            </p>

            <div className="stand mt-10 border-ink p-6">
              <h3 className="text-h4">Founding client terms</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">
                For our first clients at each show: a minimum of ten qualified
                conversations, or the next show is half price. We’d rather
                carry that risk than ask you to.
              </p>
              <Link href="/book" className="btn btn-primary mt-6">
                Ask about founding terms
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <h2 className="measure text-h3">Before you commit to anything</h2>
          <p className="measure-wide mt-5 leading-relaxed text-ink-soft">
            Put your own numbers in the calculator. It includes the lines people
            forget — fair-week hotel rates, visa admin, and the cost of senior
            people being out of the business for a week. If it tells you to send
            your own team, send your own team.
          </p>
          <Link href="/cost-calculator" className="btn btn-primary mt-8">
            Open the calculator
          </Link>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={services.map((s) =>
          serviceSchema({
            name: s.name,
            description: s.summary,
            path: `/services/${s.slug}`,
            price: `${s.price} ${s.priceNote}`,
          })
        )}
      />
    </>
  );
}
