/**
 * Trade fair calendar.
 *
 * This is the SEO + AEO engine of the site. Every field here is public and
 * crawlable — nothing in this file is gated. The gate sits on the per-fair
 * Buyer Brief (see components/lead-gate.tsx).
 *
 * `datesConfirmed: false` renders a visible "confirm with the organiser" note.
 * Never silently publish a date you have not checked against the organiser.
 *
 * When this list outgrows a file, move it to Contentful as a `tradeFair`
 * content type with these exact field names. See context.md.
 */

export type Fair = {
  slug: string;
  name: string;
  edition: string;
  /** ISO start/end, used for schema.org Event and for sorting */
  start: string;
  end: string;
  datesConfirmed: boolean;
  dateNote?: string;
  city: string;
  country: string;
  venue: string;
  sectors: string[];
  cadence: string;
  /** Plain-language summary. Written to be quotable by an answer engine. */
  summary: string;
  /** Why an exporter would care. Two or three sentences, no filler. */
  whyItMatters: string;
  /** Hard facts with sources, rendered as a stat strip */
  facts: { label: string; value: string }[];
  /** What is in the gated Buyer Brief for this fair */
  briefIncludes: string[];
  officialUrl: string;
  /** Does a free Enterprise Europe Network matchmaking programme run here? */
  eenMatchmaking: boolean;
};

export const fairs: Fair[] = [
  {
    slug: "electronica-2026",
    name: "electronica",
    edition: "2026",
    start: "2026-11-10",
    end: "2026-11-13",
    datesConfirmed: true,
    city: "Munich",
    country: "Germany",
    venue: "Messe München",
    sectors: ["Electronics", "Semiconductors", "EMS", "Embedded systems"],
    cadence: "Every two years",
    summary:
      "electronica is the world’s leading trade fair for electronics, held every two years at Messe München. The 2026 edition runs 10–13 November.",
    whyItMatters:
      "For Indian EMS providers and component manufacturers, electronica is the single densest concentration of European buyers in the calendar. European OEMs are actively diversifying their supply base away from single-country dependence, and electronica is where that sourcing conversation happens in person.",
    facts: [
      { label: "Next edition", value: "10–13 November 2026" },
      { label: "Venue", value: "Messe München" },
      { label: "Cycle", value: "Biennial, even years" },
    ],
    briefIncludes: [
      "Which halls match your product category",
      "European buyers and distributors confirmed as attending",
      "What a two-person visit from India costs, line by line",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://electronica.de",
    eenMatchmaking: true,
  },
  {
    slug: "space-tech-expo-europe-2026",
    name: "Space Tech Expo Europe",
    edition: "2026",
    start: "2026-11-17",
    end: "2026-11-19",
    datesConfirmed: true,
    city: "Bremen",
    country: "Germany",
    venue: "Messe Bremen / CONGRESS BREMEN",
    sectors: ["Space", "Satellites", "Propulsion", "Precision components"],
    cadence: "Annual",
    summary:
      "Space Tech Expo Europe is the continent’s largest B2B exhibition for the space supply chain, held at Messe Bremen. The 2026 edition runs 17–19 November and is the last to be held in Bremen.",
    whyItMatters:
      "This is a supply-chain show, not a showcase — the attendee list is weighted towards procurement and engineering rather than press. Enterprise Europe Network runs free 20-minute B2B matchmaking in Halls 5 and 6 across all three days, which means a structured meeting schedule is available to a visitor, not only to exhibitors.",
    facts: [
      { label: "Next edition", value: "17–19 November 2026" },
      { label: "Venue", value: "Messe Bremen, Halls 4–7" },
      { label: "Free EEN matchmaking", value: "All three days" },
    ],
    briefIncludes: [
      "Tier-1 primes and integrators attending",
      "How the EEN matchmaking slots work and how to fill them",
      "Which halls suit precision machining versus electronics",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.spacetechexpo-europe.com",
    eenMatchmaking: true,
  },
  {
    slug: "formnext-2026",
    name: "Formnext",
    edition: "2026",
    start: "2026-11-17",
    end: "2026-11-20",
    datesConfirmed: true,
    city: "Frankfurt",
    country: "Germany",
    venue: "Messe Frankfurt",
    sectors: [
      "Additive manufacturing",
      "Industrial 3D printing",
      "Materials",
      "Post-processing",
    ],
    cadence: "Annual",
    summary:
      "Formnext is the largest additive manufacturing exhibition in the world, held annually at Messe Frankfurt. The 2026 edition runs 17–20 November.",
    whyItMatters:
      "Formnext overlaps with Space Tech Expo Europe almost exactly, which is a planning problem for a company sending its own people and a non-problem for us — we can cover both. If you sell materials, machining services or post-processing, the European AM supply chain is still forming and relationships made now are cheap.",
    facts: [
      { label: "Next edition", value: "17–20 November 2026" },
      { label: "Venue", value: "Messe Frankfurt" },
      { label: "Overlaps with", value: "Space Tech Expo Europe" },
    ],
    briefIncludes: [
      "Service bureaus and OEMs sourcing from outside the EU",
      "Which halls match materials versus machines versus services",
      "How to cover Formnext and Space Tech in the same week",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://formnext.mesago.com",
    eenMatchmaking: false,
  },
  {
    slug: "jec-world-2027",
    name: "JEC World",
    edition: "2027",
    start: "2027-03-02",
    end: "2027-03-04",
    datesConfirmed: true,
    city: "Paris",
    country: "France",
    venue: "Paris Nord Villepinte",
    sectors: ["Composites", "Advanced materials", "Aerospace", "Automotive"],
    cadence: "Annual",
    summary:
      "JEC World is the only trade show that brings the entire global composites industry together, held at Paris Nord Villepinte. The 2027 edition runs 2–4 March.",
    whyItMatters:
      "Composites is one of the areas where Indian manufacturers compete on genuine capability rather than price alone. JEC is also our reminder that Europe is not only Germany — a Berlin base is three hours from Paris by air and under eight by rail, which is why a European programme costs you little more than a German one.",
    facts: [
      { label: "Next edition", value: "2–4 March 2027" },
      { label: "Venue", value: "Paris Nord Villepinte" },
      { label: "2026 edition", value: "1,400+ exhibitors, 45,000+ visitors" },
    ],
    briefIncludes: [
      "Aerospace and automotive buyers in attendance",
      "How JEC compares to exhibiting at a German show",
      "Travel and cost breakdown from Berlin",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.jec-world.events",
    eenMatchmaking: true,
  },
  {
    slug: "enforce-tac-2027",
    name: "Enforce Tac",
    edition: "2027",
    start: "2027-03-02",
    end: "2027-03-04",
    datesConfirmed: false,
    dateNote:
      "The organiser has published both 1–3 and 2–4 March following a schedule change. Confirm directly before booking anything.",
    city: "Nuremberg",
    country: "Germany",
    venue: "NürnbergMesse",
    sectors: ["Internal security", "Tactical equipment", "Law enforcement", "Defence"],
    cadence: "Annual",
    summary:
      "Enforce Tac is Europe’s leading trade fair for internal and external security, held at NürnbergMesse. The 2027 edition expands to eight halls and roughly 73,000 m².",
    whyItMatters:
      "Enforce Tac is access-restricted — admission is vetted and not open to the general public. That is precisely why a local representative with the right credentials and documentation is worth more here than at an open show. Expect a longer lead time on accreditation.",
    facts: [
      { label: "Next edition", value: "Early March 2027" },
      { label: "2027 floor space", value: "Approx. 73,000 m², eight halls" },
      { label: "Access", value: "Vetted. Not open to the public" },
    ],
    briefIncludes: [
      "Accreditation requirements and realistic lead times",
      "What export-control rules mean for your materials",
      "Which halls match your category under the 2027 cluster plan",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.enforcetac.com",
    eenMatchmaking: false,
  },
  {
    slug: "dsei-germany-2027",
    name: "DSEI Germany",
    edition: "2027",
    start: "2027-03-09",
    end: "2027-03-12",
    datesConfirmed: true,
    city: "Hannover",
    country: "Germany",
    venue: "Hannover Exhibition Grounds",
    sectors: ["Defence", "Security", "Industrial supply chain", "Cyber"],
    cadence: "First edition",
    summary:
      "DSEI Germany is the German edition of the DSEI defence and security exhibition, debuting 9–12 March 2027 at the Hannover Exhibition Grounds in partnership with Deutsche Messe.",
    whyItMatters:
      "This is the most interesting show on the calendar for a supplier, because it has never run before. Demand was strong enough that the organisers opened a fourth hall, taking indoor space from 82,000 to 100,000 m², with a further 25,000 m² outdoors. A first edition means no incumbent relationships and a buyer side that is actively looking.",
    facts: [
      { label: "First edition", value: "9–12 March 2027" },
      { label: "Indoor space", value: "100,000 m² across four halls" },
      { label: "Zones", value: "Land, Air & Space, Naval, Cyber, Industrial Solutions" },
    ],
    briefIncludes: [
      "What the Industrial Solutions zone means for a component supplier",
      "Export-control checklist for Indian defence-adjacent exporters",
      "Accreditation lead times and who can be admitted",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.dsei-germany.com",
    eenMatchmaking: false,
  },
  {
    slug: "hannover-messe-2027",
    name: "Hannover Messe",
    edition: "2027",
    start: "2027-04-05",
    end: "2027-04-08",
    datesConfirmed: true,
    city: "Hannover",
    country: "Germany",
    venue: "Hannover Exhibition Grounds",
    sectors: ["Industrial automation", "Engineering", "Energy", "Digital manufacturing"],
    cadence: "Annual",
    summary:
      "Hannover Messe is the world’s leading industrial technology trade fair, held annually at the Hannover Exhibition Grounds. The 2027 edition runs 5–8 April.",
    whyItMatters:
      "India has had a large coordinated presence here for years — EEPC India runs an India Pavilion with built-up booths priced at around ₹58,000 per m². If you already hold space in that pavilion but can’t get people into Germany, our stand staffing is far cheaper than leaving the booth thinly covered. Enterprise Europe Network also runs free Technology & Business Cooperation Days matchmaking on the grounds.",
    facts: [
      { label: "Next edition", value: "5–8 April 2027" },
      { label: "India Pavilion", value: "Coordinated by EEPC India" },
      { label: "Free EEN matchmaking", value: "On the fairground, Solutions Lab" },
    ],
    briefIncludes: [
      "How the India Pavilion works and what it costs",
      "How to register for free EEN matchmaking as a visitor",
      "Which of the co-located shows actually matches your product",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.hannovermesse.de",
    eenMatchmaking: true,
  },
  {
    slug: "ligna-2027",
    name: "LIGNA",
    edition: "2027",
    start: "2027-05-10",
    end: "2027-05-14",
    datesConfirmed: true,
    city: "Hannover",
    country: "Germany",
    venue: "Hannover Exhibition Grounds",
    sectors: ["Woodworking machinery", "Tools", "Furniture production", "Materials"],
    cadence: "Every two years",
    summary:
      "LIGNA is the world’s leading trade fair for woodworking and wood processing machinery, held in Hannover. The 2027 edition runs 10–14 May, its 50th, on new dates detached from the Ascension Day holiday.",
    whyItMatters:
      "Over 80% of exhibition space was already booked well ahead of the show, which tells you the buyer side will be there too. LIGNA 2027 has been deliberately scheduled just before interzum in Cologne, so a single trip can cover both — exactly the kind of sequencing that makes a representative cheaper than a flight.",
    facts: [
      { label: "Next edition", value: "10–14 May 2027" },
      { label: "Space booked", value: "Over 80% well ahead of the show" },
      { label: "Pairs with", value: "interzum Cologne, immediately after" },
    ],
    briefIncludes: [
      "How to cover LIGNA and interzum in one trip",
      "Tooling and component buyers worth targeting",
      "Which halls match machinery versus tooling versus materials",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.ligna.de",
    eenMatchmaking: false,
  },
  {
    slug: "ila-berlin-2028",
    name: "ILA Berlin",
    edition: "2028",
    start: "2028-05-17",
    end: "2028-05-21",
    datesConfirmed: false,
    dateNote:
      "Organiser-published forward dates. Confirm once ILA opens 2028 registration.",
    city: "Berlin",
    country: "Germany",
    venue: "Berlin ExpoCenter Airport (BER)",
    sectors: ["Aerospace", "Defence", "Space", "Civil aviation"],
    cadence: "Every two years",
    summary:
      "ILA Berlin is Germany’s aerospace and defence trade show, running biennially at the Berlin ExpoCenter Airport beside BER. The 2026 edition drew 750+ expected exhibitors from 37 countries and over 100,000 visitors.",
    whyItMatters:
      "This is the show where we started. We represented Mark Tech Pro and Consultants on the floor at ILA Berlin 2026 while their team stayed in India. It is also our home fair — the venue is a 40-minute drive from our desk, which keeps the cost of covering it lower than any other show on this list.",
    facts: [
      { label: "Next edition", value: "May 2028 (biennial)" },
      { label: "2026 edition", value: "750+ exhibitors, 37 countries" },
      { label: "Trade days", value: "First three days, then public" },
    ],
    briefIncludes: [
      "How the trade days differ from the public days",
      "Tier-1 aerospace primes and their supplier programmes",
      "What we learned representing a supplier here in 2026",
      "A target list of 20 companies worth a meeting",
    ],
    officialUrl: "https://www.ila-berlin.de",
    eenMatchmaking: true,
  },
];

export function getFair(slug: string): Fair | undefined {
  return fairs.find((f) => f.slug === slug);
}

/** Fairs that have not yet finished, soonest first. */
export function upcomingFairs(from: Date = new Date()): Fair[] {
  const cutoff = from.toISOString().slice(0, 10);
  return fairs
    .filter((f) => f.end >= cutoff)
    .sort((a, b) => a.start.localeCompare(b.start));
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "10–13 November 2026" or "28 February – 2 March 2027" */
export function formatRange(start: string, end: string): string {
  const [sy, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  if (sy === ey && sm === em) return `${sd}–${ed} ${MONTHS[sm - 1]} ${sy}`;
  if (sy === ey)
    return `${sd} ${MONTHS[sm - 1]} – ${ed} ${MONTHS[em - 1]} ${sy}`;
  return `${sd} ${MONTHS[sm - 1]} ${sy} – ${ed} ${MONTHS[em - 1]} ${ey}`;
}

export function monthYear(start: string): string {
  const [y, m] = start.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
