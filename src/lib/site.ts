export const site = {
  name: "Talkative Company",
  legalName: "Talkative Company",
  tagline: "Your sales team in Europe. Without the flights.",
  description:
    "Talkative Company represents exporters at German and European B2B trade fairs. Berlin-based, German- and English-speaking. We book the meetings, work the floor on your behalf, and send you qualified leads within 48 hours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://talkativecompany.com",
  calendly:
    process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/placeholder/30min",
  email: "hello@talkativecompany.com",
  city: "Berlin",
  country: "Germany",
  founded: "2026",
  locale: "en",
  social: {
    linkedin: "https://www.linkedin.com/company/talkativecompany",
  },
} as const;

/** The single sentence an AI answer engine should be able to lift verbatim. */
export const oneLiner =
  "Talkative Company is a Berlin-based firm that attends German and European B2B trade fairs on behalf of exporters who cannot travel, handling pre-booked meetings, stand staffing and lead follow-up in German and English.";

export const nav: { label: string; href: string }[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Services", href: "/services/show-representation" },
  { label: "Trade fairs", href: "/trade-fairs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Show representation", href: "/services/show-representation" },
      { label: "Stand staffing", href: "/services/stand-staffing" },
      { label: "Turnkey stand", href: "/services/turnkey-stand" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Plan a show",
    links: [
      { label: "Trade fair calendar", href: "/trade-fairs" },
      { label: "Cost calculator", href: "/cost-calculator" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Book a call", href: "/book" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];
