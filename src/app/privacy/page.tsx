import type { Metadata } from "next";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description:
    "What Talkative Company does with the information you give us through this site.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <section className="band band-first">
      <div className="shell">
        <h1>Privacy</h1>

        <div className="prose mt-9 max-w-[42rem]">
          <p className="border-l-[3px] border-marker bg-white py-3 pl-4 pr-4 text-[0.9375rem] not-italic">
            <strong>Placeholder.</strong> This page is a working draft so the
            lead form has something to point at. Before you run paid traffic or
            register the company, have it reviewed — and add an Impressum under
            §5 DDG at the same time, which German law requires of a commercial
            site.
          </p>

          <h2>What we collect</h2>
          <p>
            If you request a buyer brief, we collect your name, company, work
            email and — only if you choose to give it — a phone number. If you
            book a call, our scheduling provider collects whatever you enter
            there.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To send you the brief you asked for and to follow up about it once.
            That is the whole purpose. We do not sell, rent or share your
            details with third parties, and we do not add you to a list you did
            not ask to join.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Two years from your last contact with us, unless you ask us to
            delete it sooner.
          </p>

          <h2>Your rights</h2>
          <p>
            Under the GDPR you can ask us for a copy of what we hold about you,
            ask us to correct it, or ask us to delete it. Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will act
            within thirty days. You can also complain to your data protection
            authority.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            This site uses privacy-friendly analytics that do not set cookies or
            track you across sites, which is why you are not being asked to
            dismiss a banner.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}, {site.city}, {site.country}.{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
