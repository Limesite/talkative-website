# Image placeholders

Every placeholder in the site is a bordered grey block with instructions
inside it. Search the codebase for `IMAGE PLACEHOLDER` to find them all.

## What's needed

| # | Where | File to add | Size | Notes |
|---|-------|-------------|------|-------|
| 1 | Home → "Where this started" | `public/ila-berlin-floor.jpg` | 1200×900 | A real shot from the ILA Berlin 2026 floor. Stand, badge, conversation — anything that proves you were there. Avoid anything with other companies' confidential material visible. |
| 2 | About → founder photo | `public/founder.jpg` | 900×1125 | Natural light, plain background, no stock photography. A portrait at a venue is better than one at a desk. |
| 3 | Open Graph default | `public/og-default.png` | 1200×630 | Wordmark on the ink navy, plus the line "Trade fair representation in Europe". Used when a page is shared. |
| 4 | Favicon | `public/favicon.ico` + `public/icon.svg` | 32×32, SVG | Replace the placeholder mark in `src/components/wordmark.tsx` at the same time. |

## How to swap one in

1. Drop the file into `public/`.
2. Replace the placeholder `<div>` with a `next/image` component:

```tsx
import Image from "next/image";

<Image
  src="/ila-berlin-floor.jpg"
  alt="Describe what is happening, not what it looks like"
  width={1200}
  height={900}
  className="stand w-full"
/>
```

3. Write a real `alt`. It is read by screen readers and by search engines.

## Logo

`src/components/wordmark.tsx` holds a placeholder mark: a stand block with a
speech-mark counter cut out of it. It is the only place the mark is drawn, so
replacing it updates the header, the footer and nothing else breaks.
