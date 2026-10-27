export type Service = {
  slug: string;
  name: string;
  /** Used in nav and cards */
  short: string;
  price: string;
  priceNote: string;
  /** One sentence, quotable, answers "what is this" */
  summary: string;
  forWhom: string;
  includes: string[];
  excludes: string[];
  /** Section body: heading + paragraphs. No filler sections. */
  sections: { heading: string; body: string[] }[];
};

export const services: Service[] = [
  {
    slug: "show-representation",
    name: "Show representation",
    short: "We attend in your place",
    price: "From €1,900",
    priceNote: "per show, plus tickets and travel at cost",
    summary:
      "We attend a European trade fair in your place as your authorised representative, work a pre-booked meeting schedule, and send you a qualified lead report within 48 hours of the show closing.",
    forWhom:
      "Exporters who want to test European demand before committing to a stand, and exporters whose team cannot get a visa or spare the week.",
    includes: [
      "Product and capability briefing with your team before the show",
      "Exhibitor list research and a shortlist you approve",
      "Pre-booked meetings, arranged in German where it helps",
      "One or two of our people on the floor for the full trade days",
      "Printed materials and business cards, produced in Germany",
      "A lead report in your CRM format within 48 hours",
      "A follow-up call round in German, two weeks after the show",
    ],
    excludes: [
      "Fair entry tickets (we buy them at cost and pass them through)",
      "Travel and accommodation outside Berlin, at cost",
      "Stand space — that is Turnkey stand",
    ],
    sections: [
      {
        heading: "What we actually do on the floor",
        body: [
          "Most German fairgrounds forbid handing out marketing material or soliciting anywhere outside a rented stand. Messe Berlin, Messe Frankfurt and Leipziger Messe all state this plainly in their house rules, and enforcement is real: you can lose your badge.",
          "So we do not walk the halls pushing brochures. We arrive with a booked schedule. Meetings are agreed in advance by email and phone, slotted against the hall plan, and confirmed the week before. Where the show runs a free Enterprise Europe Network matchmaking programme, we fill those slots too. Everything else happens at the other company’s stand, by invitation, which is exactly where a buyer is willing to have the conversation.",
        ],
      },
      {
        heading: "How we represent you honestly",
        body: [
          "We carry a signed letter of authorisation from you and introduce ourselves as your authorised European representative. We do not claim to be your employees.",
          "This matters more than it might sound. Aerospace, defence and automotive buyers check. Being caught misrepresenting a relationship ends the relationship. Being a credible local partner office is a selling point in its own right — it signals you are serious about Europe, not just visiting.",
        ],
      },
      {
        heading: "Where the technical limit is, and how we handle it",
        body: [
          "We are not your engineers. We will not improvise an answer about tolerances, certification scope or lead times.",
          "Before the show we run a briefing session and build a one-page technical card with the twenty questions buyers actually ask. Anything beyond it, we schedule a video call with your engineer during European working hours, often while the buyer is still standing there. Saying “let me get you the person who knows” is a better answer than a confident guess, and buyers read it as competence.",
        ],
      },
    ],
  },
  {
    slug: "stand-staffing",
    name: "Stand staffing",
    short: "Bilingual people on your stand",
    price: "€450–650",
    priceNote: "per person per day, two-person minimum",
    summary:
      "Bilingual, product-briefed staff who work your existing stand — whether that is your own booth or your space in a country pavilion.",
    forWhom:
      "Companies who already hold stand space but cannot get enough of their own people into Europe to cover it properly.",
    includes: [
      "Product briefing and a technical card before the show",
      "German and English on the stand, all opening hours",
      "Lead capture in your format, scanned or written",
      "Daily end-of-day summary while the show is running",
      "Stand open and close, materials restocked",
    ],
    excludes: [
      "Stand build and logistics — that is Turnkey stand",
      "Travel and accommodation outside Berlin, at cost",
    ],
    sections: [
      {
        heading: "Why an empty stand is worse than no stand",
        body: [
          "A built-up booth in the EEPC India Pavilion at Hannover Messe has been priced at around ₹58,000 per square metre. A modest nine-square-metre space is a serious spend before anyone has flown anywhere.",
          "If visa timing or cost then limits you to one or two people for a four-day show, that space sits thinly covered during the hours buyers actually walk. Our staffing costs a fraction of the space you already paid for, and it is the cheapest possible way to protect that investment.",
        ],
      },
      {
        heading: "Not hostesses",
        body: [
          "Event agencies will place a hostess on your stand for roughly €15 to €18 an hour. If you need someone to hand out tote bags and smile, book that instead — we will tell you so on the call.",
          "We price higher because we do a different job: we read your product documentation beforehand, we hold a technical conversation in German, we qualify rather than greet, and we write up what was said. That is worth paying for only if your product needs explaining. Many do.",
        ],
      },
    ],
  },
  {
    slug: "turnkey-stand",
    name: "Turnkey stand",
    short: "Your whole exhibit, handled",
    price: "15% of stand budget",
    priceNote: "or a fixed project fee, agreed up front",
    summary:
      "We book the space, manage the stand build through German contractors, produce your materials, staff the booth and run the follow-up — you approve decisions and never board a plane.",
    forWhom:
      "Companies ready to exhibit properly in Europe, usually after one or two shows where we represented them as a visitor first.",
    includes: [
      "Space booking and organiser paperwork",
      "Stand design and build through vetted German contractors",
      "Print, signage and giveaways produced locally",
      "Freight and customs coordination for your exhibits",
      "Bilingual staffing for all show days",
      "Post-show lead report and a follow-up call round",
    ],
    excludes: [
      "Space rental, build cost and organiser fees, which you pay directly at cost",
    ],
    sections: [
      {
        heading: "We would rather you did this second",
        body: [
          "If you have never exhibited in Europe, committing to a stand is an expensive way to find out whether the demand is there. We will usually suggest you start with show representation at one fair, read the lead report, and decide from evidence.",
          "If the meetings were good, a stand at the next edition is an obvious call and you will brief us far better for having seen a real lead list first. If they were thin, you have learned that for a fraction of the cost of a booth.",
        ],
      },
      {
        heading: "Why the fee is a percentage",
        body: [
          "Stand budgets vary enormously between a nine-square-metre corner and a custom two-storey build, and a flat fee would either overcharge the small one or underserve the large one.",
          "We quote 15% of the stand budget or a fixed project fee, whichever you prefer, agreed before any work starts. Contractor invoices pass through to you at cost with the original documents attached. We do not take a margin on the build.",
        ],
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const faqs: { q: string; a: string }[] = [
  {
    q: "Do you pretend to be our employees?",
    a: "No. We carry a signed letter of authorisation from you and introduce ourselves as your authorised European representative. Buyers in aerospace, defence and automotive verify relationships, and being caught misrepresenting one ends the deal. Having a local partner office in Europe is a credibility signal in its own right.",
  },
  {
    q: "How can you talk about our product if you are not engineers?",
    a: "We run a briefing session with your team before the show and build a one-page technical card covering the twenty questions buyers actually ask. For anything deeper we put your engineer on a video call during the show, often while the buyer is still at the stand. We do not guess at tolerances, certification scope or lead times.",
  },
  {
    q: "Is it legal to represent a company that is not exhibiting?",
    a: "Attending as a trade visitor on your behalf is normal. What is not allowed at most German fairgrounds is handing out marketing material or soliciting outside a rented stand — Messe Berlin, Messe Frankfurt and Leipziger Messe all prohibit it in their house rules. That is why our model is pre-booked meetings at other companies' stands and in matchmaking programmes, not walking the halls with brochures.",
  },
  {
    q: "What if nobody wants to meet us?",
    a: "You find that out for the price of one show instead of the price of a stand plus flights. We will also tell you before we take the booking if we think your category is wrong for a given fair. Our founding-client terms include a minimum of ten qualified conversations, or the next show is half price.",
  },
  {
    q: "How do you handle confidential drawings and specifications?",
    a: "We sign an NDA before the briefing. We only carry material you have approved for public distribution, and we do not discuss controlled technical data. If your products touch export-control rules, that stays with you and your compliance team — we will not be the ones to get that wrong on your behalf.",
  },
  {
    q: "Why Berlin rather than an agency in India?",
    a: "Because the meetings get booked in German by someone in the same time zone as the buyer, and because being already in Europe is what removes the flight, the hotel and the visa from your cost. Germany has published longer appointment waits and processing times for Schengen visas from India, and an urgent trade-fair appointment does not speed up the decision.",
  },
];
