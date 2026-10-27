export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold leading-snug marker:hidden">
            <span className="measure-wide">{item.q}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              className="mt-1 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </summary>
          <p className="measure-wide pb-6 text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
