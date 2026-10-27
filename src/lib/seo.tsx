import type { Metadata } from "next";
import { site, oneLiner } from "./site";
import type { Fair } from "@/content/fairs";
import { formatRange } from "@/content/fairs";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Omit on index-worthy pages; set true for thin or duplicate routes */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMeta({
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ── JSON-LD ─────────────────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: oneLiner,
    email: site.email,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Place", name: "Europe" },
    ],
    knowsLanguage: ["en", "de"],
    sameAs: [site.social.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  price: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    serviceType: "Trade fair representation",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Place", name: "Europe" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      description: input.price,
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function eventSchema(fair: Fair) {
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: `${fair.name} ${fair.edition}`,
    description: fair.summary,
    startDate: fair.start,
    endDate: fair.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${site.url}/trade-fairs/${fair.slug}`,
    sameAs: fair.officialUrl,
    location: {
      "@type": "Place",
      name: fair.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: fair.city,
        addressCountry: fair.country === "Germany" ? "DE" : "FR",
      },
    },
    about: fair.sectors,
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/blog/${input.slug}`,
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function fairListSchema(fairs: Fair[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "European B2B trade fair calendar",
    itemListElement: fairs.map((fair, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${fair.name} ${fair.edition} — ${formatRange(fair.start, fair.end)}, ${fair.city}`,
      url: `${site.url}/trade-fairs/${fair.slug}`,
    })),
  };
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
