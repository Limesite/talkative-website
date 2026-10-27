import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band band-first">
      <div className="shell">
        <p className="tnum text-[0.875rem] font-semibold text-signal-deep">404</p>
        <h1 className="mt-3">Nothing in this hall</h1>
        <p className="measure mt-6 text-lead leading-relaxed text-ink-soft">
          That page doesn’t exist. The fair calendar is probably what you
          were after.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/trade-fairs" className="btn btn-primary">
            Trade fair calendar
          </Link>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
