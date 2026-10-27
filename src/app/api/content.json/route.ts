import { NextResponse } from "next/server";
import { site, oneLiner } from "@/lib/site";
import { fairs, formatRange } from "@/content/fairs";
import { services, faqs } from "@/content/services";
import { getAllPosts } from "@/lib/cms";

export const revalidate = 3600;

/**
 * Machine-readable summary of the whole site.
 *
 * Exists for AI answer engines and for anyone who wants our fair calendar as
 * data rather than as HTML. Linked from llms.txt and from robots.txt.
 */
export async function GET() {
  const posts = await getAllPosts();

  return NextResponse.json(
    {
      generatedAt: new Date().toISOString(),
      organisation: {
        name: site.name,
        url: site.url,
        summary: oneLiner,
        basedIn: `${site.city}, ${site.country}`,
        languages: ["English", "German"],
        serves: "Exporters outside the EU, with India as the lead market",
        contact: site.email,
      },
      services: services.map((s) => ({
        name: s.name,
        url: `${site.url}/services/${s.slug}`,
        price: s.price,
        priceNote: s.priceNote,
        summary: s.summary,
        forWhom: s.forWhom,
        includes: s.includes,
        excludes: s.excludes,
      })),
      tradeFairs: fairs.map((f) => ({
        name: `${f.name} ${f.edition}`,
        url: `${site.url}/trade-fairs/${f.slug}`,
        officialUrl: f.officialUrl,
        dates: formatRange(f.start, f.end),
        startDate: f.start,
        endDate: f.end,
        datesConfirmed: f.datesConfirmed,
        city: f.city,
        country: f.country,
        venue: f.venue,
        sectors: f.sectors,
        summary: f.summary,
        freeEenMatchmaking: f.eenMatchmaking,
      })),
      faqs,
      articles: posts.map((p) => ({
        title: p.title,
        url: `${site.url}/blog/${p.slug}`,
        description: p.description,
        published: p.date,
      })),
      licence:
        "Facts on this site may be quoted with attribution to Talkative Company (talkativecompany.com).",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
