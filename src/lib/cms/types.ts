/** Shared shape for a blog post, whatever the backing store is. */
export type PostSummary = {
  slug: string;
  title: string;
  /** Meta description and card blurb. Keep under 160 characters. */
  description: string;
  /** ISO date, e.g. "2026-10-27" */
  date: string;
  /** ISO date of last substantive edit. Used for schema.org dateModified. */
  updated?: string;
  author: string;
  /** Lowercase, hyphenated. Used for filtering, not for URLs. */
  tags: string[];
  /** Minutes, computed from body length */
  readingTime: number;
  /** Optional hero image path under /public */
  cover?: string;
  coverAlt?: string;
};

export type Post = PostSummary & {
  /** Rendered HTML, already sanitised at build time */
  html: string;
  /** Plain text, used for the AI content feed */
  plain: string;
};
