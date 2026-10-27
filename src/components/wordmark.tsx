/**
 * Placeholder wordmark.
 *
 * A speech-mark counter cut out of a stand block — "talkative" plus the
 * exhibition grid. Replace public/logo.svg and this component when the real
 * identity lands; nothing else in the codebase references the mark.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-[1.1em] w-[1.1em] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="22"
          rx="2"
          fill="var(--color-ink)"
        />
        <rect x="5" y="6" width="6" height="6" fill="var(--color-signal)" />
        <rect x="13" y="6" width="6" height="6" fill="var(--color-paper)" opacity="0.55" />
        <path
          d="M5 14h6v4l-3.2-1.6H5z"
          fill="var(--color-signal)"
        />
        <rect x="13" y="14" width="6" height="4" fill="var(--color-paper)" opacity="0.3" />
      </svg>
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em] leading-none">
        Talkative
      </span>
    </span>
  );
}
