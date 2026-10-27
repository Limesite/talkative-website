import Link from "next/link";

export function CtaBand({
  heading = "Tell us which show, and we’ll tell you if it’s worth it.",
  body = "A 20-minute call. We look at your product, the European buyer side, and the next three fairs that fit. If none of them do, we’ll say so.",
  primary = { label: "Book a call", href: "/book" },
  secondary = { label: "See the fair calendar", href: "/trade-fairs" },
}: {
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="band band-ink">
      <div className="shell">
        <div className="max-w-2xl">
          <h2 className="text-paper">{heading}</h2>
          <p className="measure-wide mt-5 text-[1.0625rem] leading-relaxed text-paper/75">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn btn-onink">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="btn btn-onink-ghost">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
