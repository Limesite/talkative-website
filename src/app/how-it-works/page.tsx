import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { Faq } from "@/components/faq";
import { faqs } from "@/content/services";
import { JsonLd, pageMeta, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "How it works",
  description:
    "What we actually do at a German trade fair on your behalf: pre-booked meetings, authorised representation, free organiser matchmaking — and the house rules that shape all of it.",
  path: "/how-it-works",
});

const TIMELINE = [
  {
    when: "6–8 weeks out",
    title: "Briefing and target list",
    body: "A working session with your team covering product, certifications, capacity and the things you can’t promise. We pull the exhibitor list for the show, propose a shortlist, and you approve it. Nothing goes out under your name that you haven’t seen.",
  },
  {
    when: "4–6 weeks out",
    title: "Outreach, in German",
    body: "We contact the shortlist by email and phone. German first where that’s what gets a reply — which, with procurement teams at Mittelstand companies, it usually is. Where the organiser runs a free matchmaking programme, we register and fill those slots too.",
  },
  {
    when: "1–2 weeks out",
    title: "Confirmed diary and materials",
    body: "Meetings are confirmed and slotted against the hall plan so the day actually works geographically. Brochures and cards are printed here in Germany, in German where it helps. You get the schedule before we go.",
  },
  {
    when: "Show days",
    title: "On the floor",
    body: "One or two of us, in the meetings, for the full trade days. If a technical question lands outside the briefing, we get your engineer on video while the buyer is still standing there rather than guessing.",
  },
  {
    when: "Within 48 hours",
    title: "Lead report",
    body: "Every conversation written up: company, person, what they buy, what they asked, what they need from you next, and an honest read on whether it’s real. In whatever format your CRM wants.",
  },
  {
    when: "+2 weeks",
    title: "Follow-up round",
    body: "We call the warm ones back, in German. This is where most trade fair leads die, usually because the follow-up arrives three weeks late from a different time zone in a second language.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>How it works</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            Short version: we don’t walk the halls handing out brochures.
            We arrive with a diary already full. Here is the whole sequence, and
            the rules that shape it.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <h2 className="measure">The sequence of a show</h2>
          <ol className="mt-12 border-t border-ink">
            {TIMELINE.map((step) => (
              <li
                key={step.title}
                className="grid gap-3 border-b border-rule py-7 md:grid-cols-[10rem_1fr] md:gap-10"
              >
                <span className="text-[0.875rem] font-semibold text-signal-deep">
                  {step.when}
                </span>
                <div>
                  <h3 className="text-h4">{step.title}</h3>
                  <p className="measure-wide mt-2.5 leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band band-deep">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h3">The rule that shapes everything</h2>
            <div className="prose mt-5 text-[1.0625rem]">
              <p>
                German fairgrounds prohibit handing out marketing material or
                soliciting business outside a rented stand. Messe Berlin
                requires prior written permission to distribute printed matter
                on the grounds. Messe Frankfurt states that without express
                permission, advertising of any kind, offering goods or services,
                and taking orders outside exhibition stands is not allowed.
                Leipziger Messe bans commercial activity outside its own
                contracts.
              </p>
              <p>
                Enforcement is real: removal from the grounds, exclusion from
                the event, or a ban. Some organisers state explicitly that the
                rule covers non-exhibitors and that charges apply if solicitation
                is discovered after the fact.
              </p>
              <p>
                So the model that works once — walk in, work the aisles — is a
                risk nobody should be selling you. Ours runs on invitations:
                conversations at the other company’s stand, by prior
                arrangement, which is the one place a commercial conversation is
                unambiguously welcome.
              </p>
              <p>
                <Link href="/blog/can-someone-attend-a-trade-fair-on-your-behalf">
                  The longer write-up, with the specific house rules
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-h3">Who we say we are</h2>
            <div className="prose mt-5 text-[1.0625rem]">
              <p>
                We carry a signed letter of authorisation from you and introduce
                ourselves as your authorised European representative. We never
                claim to be your employees.
              </p>
              <p>
                Aerospace, defence and automotive buyers check. Being caught
                misrepresenting a relationship ends the relationship, and
                probably ends it loudly in a small industry. Meanwhile a
                credible local partner in Europe reads as commitment — it
                suggests you intend to supply this market, not visit it.
              </p>
              <p>
                We sign an NDA before the briefing, carry only material you have
                approved for public distribution, and do not discuss controlled
                technical data. If your products touch export-control rules,
                that boundary is set by you and your compliance team, and we
                work inside it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <h2>Questions</h2>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
        ]}
      />
    </>
  );
}
