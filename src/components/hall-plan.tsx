/**
 * The hall plan.
 *
 * The site’s one piece of real artwork, and the only animated element.
 * It is a simplified exhibition hall: grey blocks are stands we have no
 * business at, filled blocks are meetings booked for the client, and the
 * single red marker is the client’s own position — which is nowhere,
 * because they are in India. That is the whole pitch in one picture.
 *
 * Pure CSS animation with staggered delays, so this stays a server
 * component and ships no JavaScript. Respects prefers-reduced-motion.
 */

type Stand = { x: number; y: number; w: number; h: number; booked?: number };

// Four aisles of stands. `booked` carries the fill order.
const STANDS: Stand[] = [
  // Row A
  { x: 24, y: 42, w: 56, h: 46 },
  { x: 84, y: 42, w: 38, h: 46, booked: 1 },
  { x: 126, y: 42, w: 46, h: 46 },
  { x: 176, y: 42, w: 70, h: 46 },
  { x: 250, y: 42, w: 38, h: 46 },
  { x: 292, y: 42, w: 52, h: 46, booked: 4 },
  { x: 348, y: 42, w: 44, h: 46 },
  { x: 396, y: 42, w: 60, h: 46 },
  // Row B
  { x: 24, y: 102, w: 44, h: 60 },
  { x: 72, y: 102, w: 64, h: 60 },
  { x: 140, y: 102, w: 44, h: 60, booked: 2 },
  { x: 188, y: 102, w: 44, h: 60 },
  { x: 236, y: 102, w: 76, h: 60 },
  { x: 316, y: 102, w: 40, h: 60 },
  { x: 360, y: 102, w: 48, h: 60, booked: 6 },
  { x: 412, y: 102, w: 44, h: 60 },
  // Row C
  { x: 24, y: 176, w: 70, h: 52 },
  { x: 98, y: 176, w: 40, h: 52 },
  { x: 142, y: 176, w: 54, h: 52, booked: 3 },
  { x: 200, y: 176, w: 40, h: 52 },
  { x: 244, y: 176, w: 44, h: 52 },
  { x: 292, y: 176, w: 56, h: 52 },
  { x: 352, y: 176, w: 44, h: 52 },
  { x: 400, y: 176, w: 56, h: 52, booked: 7 },
  // Row D
  { x: 24, y: 242, w: 48, h: 44 },
  { x: 76, y: 242, w: 44, h: 44 },
  { x: 124, y: 242, w: 60, h: 44 },
  { x: 188, y: 242, w: 44, h: 44, booked: 5 },
  { x: 236, y: 242, w: 40, h: 44 },
  { x: 280, y: 242, w: 64, h: 44 },
  { x: 348, y: 242, w: 44, h: 44 },
  { x: 396, y: 242, w: 60, h: 44 },
];

export function HallPlan({ className = "" }: { className?: string }) {
  const bookedCount = STANDS.filter((s) => s.booked).length;

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 480 326"
        role="img"
        aria-labelledby="hallplan-title hallplan-desc"
        className="w-full h-auto"
      >
        <title id="hallplan-title">
          An exhibition hall plan with seven stands marked as booked meetings
        </title>
        <desc id="hallplan-desc">
          A simplified trade fair hall showing rows of exhibitor stands. Seven
          stands are highlighted to represent meetings arranged on a client’s
          behalf. A marker at the hall entrance shows where the client would
          have been standing had they travelled.
        </desc>

        {/* Hall outline */}
        <rect
          x="12"
          y="12"
          width="456"
          height="286"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />

        {/* Aisle guides */}
        {[96, 170, 236].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="460"
            y2={y}
            stroke="var(--color-rule)"
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        ))}

        {/* Stands */}
        {STANDS.map((s, i) => {
          const isBooked = Boolean(s.booked);
          return (
            <g key={i}>
              <rect
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                fill={isBooked ? "var(--color-signal)" : "var(--color-hall)"}
                stroke={isBooked ? "var(--color-ink)" : "none"}
                strokeWidth="1.25"
                className={isBooked ? "plan-booked" : undefined}
                style={
                  isBooked
                    ? { animationDelay: `${260 + s.booked! * 150}ms` }
                    : undefined
                }
              />
            </g>
          );
        })}

        {/* Entrance gap on the left wall */}
        <line
          x1="12"
          y1="148"
          x2="12"
          y2="186"
          stroke="var(--color-paper)"
          strokeWidth="4"
        />

        {/* "You are here" — except you are not */}
        <g>
          <circle cx="12" cy="167" r="5.5" fill="var(--color-marker)" />
          <circle
            cx="12"
            cy="167"
            r="11"
            fill="none"
            stroke="var(--color-marker)"
            strokeWidth="1"
            opacity="0.45"
          />
        </g>

        {/* Hall label */}
        <text
          x="24"
          y="30"
          fill="var(--color-ink-soft)"
          fontSize="11"
          fontFamily="var(--font-display)"
          letterSpacing="0.02em"
        >
          Hall plan
        </text>
        <text
          x="456"
          y="30"
          textAnchor="end"
          fill="var(--color-ink)"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-display)"
        >
          {bookedCount} meetings booked
        </text>
      </svg>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border border-ink bg-signal" />
          Meetings we booked for you
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 bg-hall" />
          Everyone else
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-marker" />
          Where you’d have been standing
        </span>
      </figcaption>
    </figure>
  );
}
