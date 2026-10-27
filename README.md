# Talkative Company

Marketing site for [talkativecompany.com](https://talkativecompany.com) — trade
fair representation in Germany and Europe for exporters who can't travel.

Next.js 15 (App Router) · TypeScript · Tailwind v4 · deployed on Vercel.

> **New here?** Read [`context.md`](./context.md) first. It explains the
> business, the design system, the content model and the open placeholders.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything is optional for dev
npm run dev                  # http://localhost:3000
```

```bash
npm run build       # must pass before pushing
npm run typecheck
npm run start
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import it. Framework is
   auto-detected; no build settings to change.
3. Add environment variables (Settings → Environment Variables). See below.
4. Add `talkativecompany.com` under Settings → Domains.

### Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Canonical URLs, sitemap, JSON-LD. No trailing slash. |
| `NEXT_PUBLIC_CALENDLY_URL` | Yes | Every "Book a call" CTA. `/book` shows a placeholder until this is set. |
| `RESEND_API_KEY` | For lead emails | [resend.com](https://resend.com) API key |
| `LEAD_NOTIFY_TO` | For lead emails | Where notifications land |
| `LEAD_NOTIFY_FROM` | For lead emails | Verified sender on your Resend domain |
| `SHEETS_WEBHOOK_URL` | For the spreadsheet | Google Apps Script Web App URL — script is in `context.md` §6 |
| `CONTENT_SOURCE` | No | `local` (default) or `contentful` |
| `CONTENTFUL_*` | Only if using Contentful | See `context.md` §7 |

The site builds and runs with none of these set. Lead capture degrades
gracefully: each sink is independent, and a missing key never shows the
visitor an error.

## Publishing a blog post

Add `src/content/posts/your-slug.md` with front matter, commit, push. The
route, sitemap entry, Article JSON-LD and reading time are generated.
Full format in `context.md` §7.

## Adding a trade fair

Append to `fairs` in `src/content/fairs.ts`. The page, calendar entry, Event
schema and gated Buyer Brief are generated.

**Always check the date against the organiser's own site.** If you can't
confirm it, set `datesConfirmed: false` and add a `dateNote` — the page then
renders a visible warning instead of silently publishing a guess.

## What still needs you

- Calendly URL
- Real logo (placeholder lives in `src/components/wordmark.tsx`)
- Photo from the ILA Berlin 2026 floor
- Founder photo
- OG image
- **An Impressum and a real privacy policy before trading commercially** — see
  `context.md` §9

Sizes and swap instructions: `public/placeholders/README.md`.

## Structure

```
src/app/         Routes. Spacing lives in globals.css, not in page files.
src/components/  UI. hall-plan.tsx is the hero artwork.
src/content/     fairs.ts, services.ts, posts/*.md — all the editable content
src/lib/         site config, SEO/JSON-LD builders, CMS adapter
public/          llms.txt, placeholder docs
```
