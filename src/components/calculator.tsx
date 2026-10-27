"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Cost calculator.
 *
 * Deliberately ungated and deliberately honest: every assumption is visible
 * and editable, and the result tells you to fly yourself when flying yourself
 * is cheaper. A calculator that always returns "hire us" converts worse,
 * because buyers can tell.
 *
 * All figures are indicative EUR and should be reviewed each season.
 * Sources for the defaults are documented in context.md.
 */

const ORIGINS = [
  { id: "in-west", label: "Mumbai / Pune / Ahmedabad", flight: 720 },
  { id: "in-north", label: "Delhi NCR / Chandigarh", flight: 690 },
  { id: "in-south", label: "Bengaluru / Chennai / Hyderabad", flight: 760 },
  { id: "in-east", label: "Kolkata", flight: 800 },
  { id: "other", label: "Elsewhere outside Europe", flight: 850 },
];

const DEFAULTS = {
  hotelPerNight: 240, // fair-week rate near a German venue
  perDiem: 85, // meals and local transport, per person per day
  visaAdmin: 120, // fee, courier, agent support, per person
  ticket: 95, // multi-day trade visitor pass
  dayRateLost: 420, // value of a senior day out of the business
};

const OUR_FEE = 2400; // mid-point of the Show Pass range
const OUR_PASSTHROUGH = 420; // tickets and travel at cost, typical German show

function euro(n: number): string {
  return `€${Math.round(n).toLocaleString("en-GB")}`;
}

export function Calculator() {
  const [origin, setOrigin] = useState(ORIGINS[0].id);
  const [people, setPeople] = useState(2);
  const [shows, setShows] = useState(1);
  const [nights, setNights] = useState(5);
  const [countTime, setCountTime] = useState(true);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [a, setA] = useState(DEFAULTS);

  const flight = ORIGINS.find((o) => o.id === origin)!.flight;

  const diy = useMemo(() => {
    // One trip can realistically cover one show; a second show in the same
    // window means a second trip unless the dates happen to be adjacent.
    const trips = shows;
    const rooms = Math.ceil(people / 1); // single occupancy, business travel
    const flights = flight * people * trips;
    const hotel = a.hotelPerNight * rooms * nights * trips;
    const perDiem = a.perDiem * people * nights * trips;
    const visa = a.visaAdmin * people * trips;
    const tickets = a.ticket * people * trips;
    const time = countTime ? a.dayRateLost * people * nights * trips : 0;
    return {
      flights,
      hotel,
      perDiem,
      visa,
      tickets,
      time,
      total: flights + hotel + perDiem + visa + tickets + time,
    };
  }, [flight, people, shows, nights, countTime, a]);

  const ours = useMemo(() => {
    const fee = OUR_FEE * shows;
    const pass = OUR_PASSTHROUGH * shows;
    return { fee, pass, total: fee + pass };
  }, [shows]);

  const diff = diy.total - ours.total;
  const weFavour = diff > 0;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <label className="field-label" htmlFor="calc-origin">
            Travelling from
          </label>
          <select
            id="calc-origin"
            className="field"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {ORIGINS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <Stepper
          id="calc-people"
          label="People you’d send"
          value={people}
          min={1}
          max={6}
          onChange={setPeople}
        />
        <Stepper
          id="calc-shows"
          label="Shows you want to cover"
          value={shows}
          min={1}
          max={6}
          onChange={setShows}
        />
        <Stepper
          id="calc-nights"
          label="Nights away per show"
          value={nights}
          min={2}
          max={10}
          onChange={setNights}
        />

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <input
            type="checkbox"
            checked={countTime}
            onChange={(e) => setCountTime(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--color-ink)]"
          />
          <span className="text-[0.875rem] leading-snug">
            Count the cost of senior people being out of the business
            <span className="block text-[0.8125rem] text-ink-soft">
              {euro(a.dayRateLost)} per person per day
            </span>
          </span>
        </label>

        <button
          type="button"
          onClick={() => setShowAssumptions((v) => !v)}
          className="text-[0.8125rem] font-medium underline underline-offset-4"
        >
          {showAssumptions ? "Hide assumptions" : "Change the assumptions"}
        </button>

        {showAssumptions && (
          <div className="space-y-3 border-t border-rule pt-5">
            <AssumptionField
              label="Hotel per night, fair week"
              value={a.hotelPerNight}
              onChange={(v) => setA({ ...a, hotelPerNight: v })}
            />
            <AssumptionField
              label="Meals and local travel, per person per day"
              value={a.perDiem}
              onChange={(v) => setA({ ...a, perDiem: v })}
            />
            <AssumptionField
              label="Visa fee and admin, per person"
              value={a.visaAdmin}
              onChange={(v) => setA({ ...a, visaAdmin: v })}
            />
            <AssumptionField
              label="Fair entry pass, per person"
              value={a.ticket}
              onChange={(v) => setA({ ...a, ticket: v })}
            />
            <AssumptionField
              label="Value of a senior day, per person"
              value={a.dayRateLost}
              onChange={(v) => setA({ ...a, dayRateLost: v })}
            />
            <button
              type="button"
              onClick={() => setA(DEFAULTS)}
              className="text-[0.8125rem] underline underline-offset-4"
            >
              Reset to defaults
            </button>
          </div>
        )}
      </div>

      {/* Result */}
      <div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="stand p-6">
            <h3 className="text-[0.9375rem] font-semibold text-ink-soft">
              Sending your own team
            </h3>
            <p className="tnum mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
              {euro(diy.total)}
            </p>
            <table className="datatable mt-6">
              <tbody>
                <Row label="Flights" value={diy.flights} />
                <Row label="Hotel" value={diy.hotel} />
                <Row label="Meals and local travel" value={diy.perDiem} />
                <Row label="Visa fees and admin" value={diy.visa} />
                <Row label="Fair entry" value={diy.tickets} />
                {countTime && <Row label="Time out of the business" value={diy.time} />}
              </tbody>
            </table>
          </div>

          <div className="stand stand-let p-6">
            <h3 className="text-[0.9375rem] font-semibold">
              Talkative representing you
            </h3>
            <p className="tnum mt-2 text-[2.5rem] font-semibold leading-none tracking-[-0.03em]">
              {euro(ours.total)}
            </p>
            <table className="datatable mt-6">
              <tbody>
                <Row
                  label={`Show representation × ${shows}`}
                  value={ours.fee}
                />
                <Row label="Tickets and travel, at cost" value={ours.pass} />
                <tr>
                  <td className="text-ink-soft">No flights</td>
                  <td className="text-right text-ink-soft">—</td>
                </tr>
                <tr>
                  <td className="text-ink-soft">No hotels</td>
                  <td className="text-right text-ink-soft">—</td>
                </tr>
                <tr>
                  <td className="text-ink-soft">No visa risk</td>
                  <td className="text-right text-ink-soft">—</td>
                </tr>
                <tr>
                  <td className="text-ink-soft">Nobody out of the business</td>
                  <td className="text-right text-ink-soft">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 border-t border-ink pt-7">
          {weFavour ? (
            <>
              <p className="text-h3 font-semibold tracking-[-0.026em]">
                You’d keep{" "}
                <span className="highlight">{euro(diff)}</span> and cover the
                same {shows === 1 ? "show" : `${shows} shows`}.
              </p>
              <p className="measure-wide mt-4 text-ink-soft">
                That is only the money. The better argument is that the same
                budget covers more fairs in more countries, and that a visa
                refusal three weeks out can no longer cancel your year.
              </p>
            </>
          ) : (
            <>
              <p className="text-h3 font-semibold tracking-[-0.026em]">
                On these numbers, send your own people.
              </p>
              <p className="measure-wide mt-4 text-ink-soft">
                At this scale our fee doesn’t pay for itself, and we’d
                rather tell you that than take the booking. If you still want
                German-speaking support on the stand once you’re here,
                stand staffing is the cheaper half of what we do.
              </p>
            </>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-primary">
              Talk it through
            </Link>
            <Link href="/pricing" className="btn btn-secondary">
              See full pricing
            </Link>
          </div>

          <p className="measure-wide mt-7 text-[0.8125rem] leading-relaxed text-ink-soft">
            Indicative figures in euros, not a quote. Flight and hotel defaults
            assume normal booking notice and fair-week rates near a German
            venue; both move a lot by season and city. Our own figure uses the
            mid-point of the show representation range. Every assumption above
            is editable, and a real quote comes from a real conversation.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <tr>
      <td>{label}</td>
      <td className="tnum text-right font-medium">{euro(value)}</td>
    </tr>
  );
}

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center gap-0">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-rule border-r-0 bg-white text-lg leading-none disabled:opacity-40"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          className="field tnum h-11 rounded-none text-center"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
        />
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-rule border-l-0 bg-white text-lg leading-none disabled:opacity-40"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function AssumptionField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[0.8125rem] leading-snug text-ink-soft">{label}</span>
      <input
        type="number"
        className="field tnum w-24 text-right"
        value={value}
        min={0}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
      />
    </div>
  );
}
