import type { Metadata } from "next";
import { site } from "@/lib/site";
import { JsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book a call",
  description:
    "Twenty minutes on which European trade fairs suit your product, who we’d try to book, and what a first programme would cost. No pitch deck.",
  path: "/book",
});

const AGENDA = [
  "What you make, who buys it today, and what you’re certified for",
  "Which two or three European shows actually fit — and which don’t",
  "Who we’d try to book, and roughly how many meetings is realistic",
  "What a first programme costs, and whether founding terms apply",
];

export default function BookPage() {
  const placeholder = site.calendly.includes("placeholder");

  return (
    <>
      <section className="band band-first">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <h1>Book a call</h1>
            <p className="measure mt-7 text-[1.0625rem] leading-relaxed text-ink-soft">
              Twenty minutes, no deck. If your category doesn’t belong at
              the shows you’re considering, we’ll tell you on the call
              rather than after the invoice.
            </p>

            <h2 className="mt-10 text-h4">What we’ll cover</h2>
            <ul className="mt-5 border-t border-ink">
              {AGENDA.map((item) => (
                <li
                  key={item}
                  className="border-b border-rule py-3.5 text-[0.9375rem] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-h4">Useful to have ready</h2>
            <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              Your product brochure or spec sheet, a note of which
              certifications you hold, and any shows you’ve already looked
              at. None of it is required.
            </p>

            <p className="mt-10 text-[0.9375rem] text-ink-soft">
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div>
            {placeholder ? (
              <div className="stand stand-let flex min-h-[32rem] flex-col items-center justify-center p-10 text-center">
                <h2 className="text-h4">Calendly embed goes here</h2>
                <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Set <code>NEXT_PUBLIC_CALENDLY_URL</code> in your environment
                  variables and this placeholder is replaced by the live
                  scheduler automatically. Nothing else needs changing.
                </p>
                <p className="mt-4 text-[0.8125rem] text-ink-soft">
                  Every &ldquo;Book a call&rdquo; button on the site already
                  points here.
                </p>
              </div>
            ) : (
              <div className="stand overflow-hidden">
                <iframe
                  src={site.calendly}
                  title="Book a call with Talkative Company"
                  className="h-[46rem] w-full border-0"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book a call", path: "/book" },
        ])}
      />
    </>
  );
}
