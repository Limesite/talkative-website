# context.md

A single file that explains this project to any human or LLM joining it.
Read this before changing anything.

---

## 1. What the business is

**Talkative Company** (talkativecompany.com) is a Berlin-based firm that
attends German and European B2B trade fairs **on behalf of exporters who
cannot travel**. India is the lead market, but the offer is written for any
non-EU exporter.

The one-sentence version, which should stay quotable and consistent
everywhere (it lives in `src/lib/site.ts` as `oneLiner`):

> Talkative Company is a Berlin-based firm that attends German and European
> B2B trade fairs on behalf of exporters who cannot travel, handling
> pre-booked meetings, stand staffing and lead follow-up in German and
> English.

### The problem being solved

A manufacturer in India wants European buyers. Getting their people to a
German trade fair costs far more than the flight:

- **Visa friction.** German missions in India have published longer
  appointment waits and processing times. The mission states explicitly that
  booking under the "urgent business" or "trade fair urgent" category does
  **not** speed up the decision, which can still take up to 15 days.
- **Fair-week hotel rates.** Rooms near a venue during a show bear no
  relation to normal pricing, and the closest ones go to exhibitors months
  ahead.
- **The one-show ceiling.** A trip from India realistically covers one fair.
  The European calendar is dense — electronica and Space Tech Expo Europe are
  a week apart in Nov 2026; Formnext overlaps Space Tech almost exactly.
- **Language.** German procurement leads will speak English, but are more
  likely to take the meeting in German.

### The three services

| Service | Price | Slug |
|---|---|---|
| Show representation — we attend in your place | From €1,900 per show | `show-representation` |
| Stand staffing — bilingual people on your booth | €450–650 per person/day | `stand-staffing` |
| Turnkey stand — the whole exhibit | 15% of stand budget | `turnkey-stand` |

### Origin story (real, do not embellish)

The founder represented **Mark Tech Pro and Consultants** — a relative's
company working in aerospace, defence and automotive — at **ILA Berlin 2026**
(10–14 June 2026, Berlin ExpoCenter Airport). They briefed us on the product,
we printed materials in Berlin, attended, had conversations, and sent the
contacts back for their team to follow up.

Competitive research afterwards found that the **US Commercial Service** sells
almost exactly this as a product ("Trade Show Representation", priced by
company size) to American exporters. Nothing equivalent exists for Indian
exporters. That gap is the company.

---

## 2. The constraint that shapes the whole product

**German fairgrounds prohibit distributing advertising material or soliciting
business outside a rented stand.** Messe Berlin requires prior written
permission to distribute printed matter. Messe Frankfurt bans advertising,
offering goods or services, and taking orders outside exhibition stands
without express permission. Leipziger Messe bans commercial activity outside
its own contracts. Enforcement means removal, exclusion or a ban.

**Therefore the business model is NOT "walk the halls handing out brochures."**
It is:

1. Research the exhibitor list, client approves a shortlist.
2. Book meetings in advance by email and phone, in German.
3. Hold them at the *other* company's stand, by invitation.
4. Fill free organiser matchmaking slots (Enterprise Europe Network runs these
   at Space Tech Expo Europe, Hannover Messe, ILA Berlin and others — open to
   visitors, not just exhibitors, and widely underused).

**Never write marketing copy for this site that implies floor-walking or
unsolicited brochure distribution.** It is legally wrong and it is the thing
the competitor-check page exists to address.

### Representation honesty

We attend as **authorised European representative** under a signed letter of
authorisation. We never claim to be the client's employees. Aerospace, defence
and automotive buyers verify. This is stated on `/how-it-works`, in the FAQ,
and on the show-representation service page. Do not soften it.

---

## 3. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG/ISR, TypeScript, React 19 |
| Styling | Tailwind CSS v4 | Tokens in `@theme` in `src/app/globals.css`. No component library. |
| Content | Markdown → `marked` | Contentful adapter already written, inactive |
| Fonts | Archivo + Source Serif 4 | via `next/font/google`, self-hosted at build |
| Hosting | Vercel | Zero config needed |
| Forms | Route handler → Resend + Google Sheets | Both optional and independent |

**No client-side data fetching for content.** Everything a crawler needs is in
the server-rendered HTML.

Dependencies are deliberately minimal: `gray-matter`, `marked`, `next`,
`react`, `react-dom`. That is the whole runtime list. Keep it that way unless
there's a real reason.

---

## 4. File map

```
src/
  app/
    layout.tsx                  Fonts, global metadata, Organization + WebSite JSON-LD
    page.tsx                    Home
    globals.css                 ALL design tokens and component classes live here
    how-it-works/page.tsx
    services/[slug]/page.tsx    3 static params from content/services.ts
    pricing/page.tsx
    trade-fairs/page.tsx        Ungated calendar index (SEO engine)
    trade-fairs/[slug]/page.tsx Per-fair page + gated Buyer Brief form
    cost-calculator/page.tsx
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    book/page.tsx               Calendly embed, falls back to a placeholder
    privacy/page.tsx            DRAFT — see "Legal" below
    not-found.tsx
    sitemap.ts                  Auto, includes all fairs + posts
    robots.ts                   Explicitly welcomes AI crawlers
    api/lead/route.ts           Lead intake
    api/content.json/route.ts   Machine-readable site summary for AI engines
  components/
    site-header.tsx             Only client component in the chrome
    site-footer.tsx             Includes "Ask an AI about us" links
    hall-plan.tsx               The hero SVG. Server component, CSS-only animation.
    wordmark.tsx                PLACEHOLDER LOGO — single source of truth
    lead-gate.tsx               The gated form (client)
    calculator.tsx              Cost calculator (client)
    cta-band.tsx
    faq.tsx                     <details>/<summary>, no JS
  content/
    fairs.ts                    9 fairs. The most valuable data in the repo.
    services.ts                 3 services + 6 FAQs
    posts/*.md                  3 seed blog posts
  lib/
    site.ts                     URLs, nav, company facts, oneLiner
    seo.tsx                     pageMeta() + all JSON-LD builders + <JsonLd>
    cms/
      index.ts                  Switches provider on CONTENT_SOURCE
      types.ts                  Post / PostSummary
      local.ts                  Markdown provider (default)
      contentful.ts             Contentful provider (inactive, ready)
public/
  llms.txt                      AI crawler brief
  placeholders/README.md        What images are still needed and how to add them
```

---

## 5. Design system

The visual concept is **"the hall plan"** — the site borrows the vernacular of
a printed trade-fair hall plan.

### Tokens (`src/app/globals.css`, `@theme` block)

| Token | Hex | Use |
|---|---|---|
| `--color-paper` | `#f6f6f3` | Page background. Cool, deliberately NOT cream. |
| `--color-paper-deep` | `#eceee8` | Alternating recessed bands |
| `--color-ink` | `#11202e` | Wayfinding navy. Text and primary button fill. |
| `--color-ink-soft` | `#4a5a68` | Secondary text |
| `--color-hall` | `#e4e6e1` | Unlet stand blocks |
| `--color-signal` | `#f9c22e` | Messe yellow. Booked stands, highlights. |
| `--color-signal-deep` | `#e0a800` | Signal where contrast matters on light |
| `--color-marker` | `#d8402f` | "You are here" ONLY. Used three times site-wide. |

### Type

- **Archivo** (`--font-display`) — everything structural. Drawn for signage,
  which is why it suits a site built on fairground wayfinding.
- **Source Serif 4** (`--font-editorial`) — reserved strictly for long-form
  editorial: blog bodies, the home case note, the about story. Applied via
  `.prose`. **Do not use the serif for UI.** The role split is the point.

### Rules that keep this from looking AI-generated

These were deliberate. Please don't reintroduce them:

- No all-caps tracked-out eyebrow labels above headings.
- No meta strings joined with middle dots (`A · B · C`).
- No `→` appended to link or button text.
- No monospace for small data labels (Archivo's tabular figures via `.tnum`).
- No drop shadows anywhere. Structure is carried by 1px hairline borders.
- Numbered markers only where content genuinely is a sequence (the 3-step
  process, the show timeline). Not as decoration.
- **One** animated element on the whole site: the hero hall plan filling its
  booked stands on load. Nothing animates on scroll.

### Section rhythm

All vertical spacing lives in `.band` / `.band-first` / `.band-deep` /
`.band-ink` in `globals.css`. This is intentional — it stops selector
specificity fights over padding. Use those classes; don't add ad-hoc
`py-*` to sections.

---

## 6. The lead-conversion mechanism

Deliberately split in two:

**Ungated (the SEO engine):** the entire fair calendar. Dates, venues,
sectors, why each show matters. No form, no email. This is what ranks and
what AI answer engines cite. **Never put this behind a gate.**

**Gated (the magnet):** a per-fair **Buyer Brief**. On each fair page, after
the open content, the form offers that show's brief — hall breakdown, target
list of 20 companies, cost comparison. Content defined per fair in
`fairs.ts` → `briefIncludes`.

Why per-fair rather than one generic download:
1. Far higher intent — they're telling you which show they care about.
2. It regenerates automatically for every fair you add.
3. The submission itself is the first sales-call question, pre-answered.

**Fields:** name, company, work email required. **Phone optional by design.** A
required phone field measurably depresses B2B completion, and GDPR expects a
defensible purpose per field. Flip `REQUIRE_PHONE` at the top of
`src/components/lead-gate.tsx` if you decide otherwise.

The calculator is the second magnet and is **deliberately ungated and
deliberately honest** — set the inputs low enough and it tells the visitor to
send their own team. A calculator that always returns "hire us" converts worse
because buyers can tell.

### Lead capture wiring

`src/app/api/lead/route.ts` has two independent sinks. If one isn't
configured the other still runs, and the visitor never sees a failure caused
by a missing env var.

**1. Email via Resend.** Set `RESEND_API_KEY`, `LEAD_NOTIFY_TO`,
`LEAD_NOTIFY_FROM` (a verified sender on your Resend domain).

**2. Google Sheets.** Create a sheet, then Extensions → Apps Script, paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.timestamp, d.kind, d.fair, d.name, d.company,
                   d.email, d.phone, d.source]);
  return ContentService.createTextOutput("ok");
}
```

Deploy → New deployment → Web app → Execute as *me*, Access *Anyone*. Copy
the URL into `SHEETS_WEBHOOK_URL`.

Add a header row: `Timestamp | Kind | Fair | Name | Company | Email | Phone | Source`.

To add a CRM later, write a third `async function` in the same file and add it
to the `Promise.allSettled` array. Nothing else changes.

---

## 7. Publishing content

### Now (markdown)

Add `src/content/posts/your-slug.md`:

```markdown
---
title: "Headline, sentence case"
description: "Under 160 characters. This is the meta description."
date: "2026-11-04"
author: "Talkative Company"
tags: ["trade fairs", "india"]
---

Body in markdown.
```

Commit and push. The route, sitemap entry, Article JSON-LD and reading time
are all generated. Blog routes use `revalidate = 3600`.

### Moving to Contentful

1. Create content type **`blogPost`** with these exact field IDs:

   | Field ID | Type | Maps to |
   |---|---|---|
   | `slug` | Short text, unique | URL |
   | `title` | Short text | `title` |
   | `description` | Short text (max 160) | meta description |
   | `publishDate` | Date | `date` |
   | `author` | Short text | `author` |
   | `tags` | Short text, list | `tags` |
   | `body` | **Long text (Markdown)** | rendered HTML |
   | `cover` | Media, single | `cover` |
   | `coverAlt` | Short text | `coverAlt` |

   Use **Long text / Markdown**, not Rich Text. It keeps the adapter a few
   lines long and renders identically to local markdown. If you later want
   Rich Text, swap `marked()` for `@contentful/rich-text-html-renderer` in
   `contentful.ts` only.

2. Set env vars: `CONTENT_SOURCE=contentful`, `CONTENTFUL_SPACE_ID`,
   `CONTENTFUL_DELIVERY_TOKEN`, `CONTENTFUL_ENVIRONMENT=master`.

3. Add a Contentful webhook pointing at a Vercel Deploy Hook so publishing
   triggers a rebuild. Otherwise the 1-hour ISR window applies.

**No page component changes are required.** That's the point of
`src/lib/cms/index.ts`.

### Adding a trade fair

Append to the `fairs` array in `src/content/fairs.ts`. Everything else — the
route, sitemap, Event JSON-LD, the Buyer Brief gate, the calendar grouping —
is generated.

**Rule: check the date against the organiser's own site.** If you can't
confirm it, set `datesConfirmed: false` and write a `dateNote`. The page then
renders a visible red "Dates not yet confirmed" warning. This is a trust
feature, not an inconvenience — publishing a wrong date is how a site like
this loses credibility with exactly the audience it needs.

Current unconfirmed entries: **Enforce Tac 2027** (organiser has published
both 1–3 and 2–4 March after a schedule change) and **ILA Berlin 2028**
(forward dates only).

---

## 8. SEO and AEO

| Mechanism | Where |
|---|---|
| Organization, WebSite | `layout.tsx`, every page |
| Service | service pages, pricing |
| FAQPage | home, how-it-works |
| ExhibitionEvent | every fair page + calendar index |
| Article | every blog post |
| BreadcrumbList | all nested pages |
| ItemList | fair calendar index |
| `sitemap.xml` | `app/sitemap.ts`, auto |
| `robots.txt` | `app/robots.ts`, explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended |
| `llms.txt` | `public/llms.txt` |
| JSON content feed | `/api/content.json` |
| AI prompt links | footer |

`/api/content.json` is a complete machine-readable dump of the organisation,
services, fairs, FAQs and articles. **Keep it in sync** — it's a cheap, high-
leverage asset for answer-engine visibility. It regenerates automatically from
the same data files the pages use, so it stays in sync as long as new content
goes into `content/` rather than being hard-coded into a page.

### Target queries this site is built for

- "trade fair representation Germany"
- "attend trade fair on my behalf Europe"
- "exhibit in Germany from India"
- "German trade fair cost for Indian exporters"
- "[fair name] [year] dates exhibitors" — the per-fair pages
- "can someone attend a trade show for my company"

---

## 9. Legal — unfinished, read this

The company is **not yet registered**, so at the owner's instruction there is
**no Impressum**. Before trading commercially or running paid traffic:

1. **Add an Impressum.** German law (§5 DDG, formerly §5 TMG) requires one on
   a commercial website. Missing it is a known target for Abmahnung.
2. **Replace `/privacy`.** It is a working draft, currently `noindex`, written
   so the lead form has something to point at. GDPR applies to that form the
   moment it collects an EU resident's name and email — regardless of whether
   the company is registered.
3. Confirm VAT treatment with a Steuerberater. B2B services to non-EU
   businesses are usually outside German VAT, but confirm.
4. If you move to commission-based ongoing representation, check German
   commercial agent law (Handelsvertreter, §§84 ff. HGB) with a lawyer — it
   carries compensation obligations on termination.

---

## 10. Placeholders still open

| What | Where | Status |
|---|---|---|
| Calendly URL | `NEXT_PUBLIC_CALENDLY_URL` | `/book` shows an explanatory placeholder until set |
| Logo | `src/components/wordmark.tsx` | Placeholder mark. Single source of truth — replacing it updates header and footer. |
| ILA Berlin photo | Home, "Where this started" | Grey block with instructions |
| Founder photo | `/about` | Grey block with instructions |
| OG image | `public/og-default.png` | Not yet created |
| Lead email | `LEAD_NOTIFY_TO` | Required for notifications |

See `public/placeholders/README.md` for sizes and swap instructions.

---

## 11. Voice

Plain, specific, and willing to say the unflattering thing. The site tells
visitors when **not** to hire us — the calculator can return "send your own
team", the turnkey page says "we'd rather you did this second", the staffing
page says "if you need someone to hand out tote bags, book a hostess instead."

That is a positioning decision, not a drafting accident. The audience is
procurement-adjacent engineers who are suspicious of an unknown foreign agency,
and the fastest route to their trust is visibly declining to oversell.

Concrete numbers beat adjectives. Every factual claim on this site traces to a
real source — organiser house rules, published fair data, government service
pages. **If you can't source it, cut it.**

---

## 12. Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, must pass before pushing
npm run start
npm run typecheck
```

Last verified: build clean, 31 static routes, no TypeScript errors,
Next.js 15.5.28.
