import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Talkative Company is a Berlin firm that represents exporters at German and European trade fairs. We started by standing in for an aerospace supplier at ILA Berlin 2026.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>About</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            A small Berlin firm doing one thing: standing in for companies at
            European trade fairs they can’t get to.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            {/* IMAGE PLACEHOLDER — see public/placeholders/README.md */}
            <div className="stand flex aspect-[4/5] items-center justify-center bg-hall p-8 text-center">
              <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                Founder photo placeholder
                <span className="mt-1 block">
                  Recommended 900×1125, natural light,
                  <br />
                  no stock photography.
                </span>
              </p>
            </div>
            <div className="mt-8 border-t border-ink pt-5">
              <h2 className="text-[0.9375rem] font-semibold">Where we are</h2>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                Berlin, Germany. Forty minutes from the ILA grounds, a train
                from Hannover and Leipzig, a short flight from Munich, Frankfurt
                and Paris.
              </p>
              <h2 className="mt-6 text-[0.9375rem] font-semibold">Languages</h2>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                German and English, on the floor and on the phone.
              </p>
            </div>
          </div>

          <div className="prose">
            <p>
              In June 2026 a relative’s company — Mark Tech Pro and
              Consultants, who work in aerospace, defence and automotive —
              wanted to be at ILA Berlin. It’s Germany’s aerospace
              show, held at the ExpoCenter beside BER, and that year it drew
              exhibitors from 37 countries and well over a hundred thousand
              visitors.
            </p>
            <p>
              Getting their people from India to Schönefeld was going to cost
              more than a first attempt was worth. We were already here. So they
              briefed us on the product, we had brochures and cards printed in
              Berlin, we went, and we had the conversations. Afterwards we sent
              the contacts and the context back for their team to work.
            </p>

            <h2>Then we went looking for the competition</h2>
            <p>
              We expected to find a crowded market. What we found was that the
              US government sells this exact service to American exporters — a
              trade show representation product covering pre-show promotion,
              representing the client at the show, displaying their materials
              and reaching out to buyers in attendance, priced by company size.
            </p>
            <p>
              It’s only available to US companies. There are capable sales
              outsourcing firms in Germany, and there are hostess agencies, but
              nobody sells event representation to Indian exporters as a
              product. For a country with tens of thousands of engineering
              exporters and a visa corridor that keeps getting slower, that gap
              is strange.
            </p>

            <h2>What we changed</h2>
            <p>
              One thing, and it matters. On that first show we worked the floor
              the obvious way — walk, introduce, hand over a brochure. It worked.
              It is also against the house rules at most German fairgrounds,
              which prohibit distributing advertising material or soliciting
              outside a rented stand, and enforcement means losing your badge.
            </p>
            <p>
              So the model now is meetings arranged before the doors open, held
              at the other company’s stand by invitation, plus the free
              matchmaking programmes that organisers already run and almost
              nobody fully uses. It is both the legal way and, as it turns out,
              much the better way: a confirmed diary beats a hopeful walk.
            </p>

            <h2>What we are not</h2>
            <p>
              We are not your engineers, and we will not pretend to be. We are
              not a hostess agency — if you need someone to smile and hand over
              tote bags, that exists and costs less. And we are not going to tell
              you every show is right for you. The{" "}
              <Link href="/cost-calculator">calculator on this site</Link> will
              happily tell you to send your own team, because sometimes you
              should.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
