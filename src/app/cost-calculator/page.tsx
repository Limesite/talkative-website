import type { Metadata } from "next";
import { Calculator } from "@/components/calculator";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Trade fair cost calculator",
  description:
    "Compare the real cost of sending your own team to a German trade fair — flights, fair-week hotels, visas, time out of the business — against hiring a representative already in Europe.",
  path: "/cost-calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>What a European show actually costs you</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            Most budgets count the flight and the hotel. The expensive lines are
            the visa cycle and a week of senior people out of the business. Put
            your own numbers in — every assumption is editable, and no email
            address is required to see the answer.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <Calculator />
        </div>
      </section>

      <CtaBand
        heading="Numbers are a starting point. The question is which show."
        body="Bring your result to a 20-minute call and we’ll go through which fairs suit your category, who we’d try to book, and what a realistic first programme looks like."
        secondary={{ label: "See the fair calendar", href: "/trade-fairs" }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cost calculator", path: "/cost-calculator" },
        ])}
      />
    </>
  );
}
