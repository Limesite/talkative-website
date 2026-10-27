import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService } from "@/content/services";
import { CtaBand } from "@/components/cta-band";
import {
  JsonLd,
  pageMeta,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-soft">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>{" "}
            / <span className="text-ink">{service.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <h1>{service.name}</h1>
              <p className="measure mt-7 text-lead leading-relaxed text-ink-soft">
                {service.summary}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/book" className="btn btn-primary">
                  Book a 20-minute call
                </Link>
                <Link href="/pricing" className="btn btn-secondary">
                  Full pricing
                </Link>
              </div>
            </div>

            <div className="stand stand-let h-fit p-7">
              <p className="tnum text-[2.25rem] font-semibold leading-none tracking-[-0.03em]">
                {service.price}
              </p>
              <p className="mt-2 text-[0.875rem] text-ink-soft">
                {service.priceNote}
              </p>
              <h2 className="mt-7 text-[0.9375rem] font-semibold">Who it’s for</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                {service.forWhom}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-deep">
        <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-h3">What’s included</h2>
            <ul className="mt-6 border-t border-ink">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3.5 text-[0.9375rem] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">What’s not</h2>
            <ul className="mt-6 border-t border-ink">
              {service.excludes.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-soft">
              Anything passed through at cost arrives with the original invoice
              attached. We don’t take a margin on tickets, travel or print.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <div className="border-t border-ink">
            {service.sections.map((section) => (
              <div
                key={section.heading}
                className="grid gap-5 border-b border-rule py-10 lg:grid-cols-[18rem_minmax(0,42rem)] lg:gap-16"
              >
                <h2 className="text-h3 lg:text-h4">{section.heading}</h2>
                <div className="prose text-[1.0625rem]">
                  {section.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-deep">
        <div className="shell">
          <h2 className="text-h3">The other two</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="stand p-6 transition-colors hover:border-ink"
              >
                <h3 className="text-h4">{other.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-soft">
                  {other.short}
                </p>
                <p className="tnum mt-4 text-[1.125rem] font-semibold">
                  {other.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
            price: `${service.price} ${service.priceNote}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
