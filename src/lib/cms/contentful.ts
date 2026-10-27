/**
 * Contentful provider.
 *
 * Not active until CONTENT_SOURCE=contentful. Implemented against the
 * Content Delivery API over plain fetch, so there is no SDK dependency
 * to install or keep up to date.
 *
 * Expected content type: `blogPost`
 *   slug         Short text, unique         -> slug
 *   title        Short text                 -> title
 *   description  Short text (max 160)       -> description
 *   publishDate  Date                       -> date
 *   author       Short text                 -> author
 *   tags         Short text, list           -> tags
 *   body         Long text (Markdown)       -> html
 *   cover        Media, single              -> cover
 *   coverAlt     Short text                 -> coverAlt
 *
 * Using Long text / Markdown rather than Rich Text keeps this adapter a few
 * lines long and renders identically to the local provider. If you later want
 * Rich Text, swap marked() for @contentful/rich-text-html-renderer here only.
 *
 * Remember to add a Contentful webhook -> Vercel Deploy Hook so publishing
 * triggers a rebuild, or rely on the 1-hour ISR window set on the blog routes.
 */

import { marked } from "marked";
import type { Post, PostSummary } from "./types";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const ENV = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;

type Entry = {
  fields: Record<string, unknown>;
};

type Asset = {
  sys: { id: string };
  fields: { file?: { url?: string }; description?: string };
};

function configured(): boolean {
  return Boolean(SPACE && TOKEN);
}

async function query(params: Record<string, string>): Promise<{
  items: Entry[];
  includes?: { Asset?: Asset[] };
}> {
  if (!configured()) {
    throw new Error(
      "CONTENT_SOURCE is 'contentful' but CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN is missing."
    );
  }
  const search = new URLSearchParams({
    access_token: TOKEN!,
    content_type: "blogPost",
    ...params,
  });
  const url = `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries?${search}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Contentful responded ${res.status}`);
  return res.json();
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toPost(entry: Entry, assets: Asset[] = []): Post {
  const f = entry.fields;
  const body = String(f.body ?? "");
  const plain = stripMarkdown(body);

  let cover: string | undefined;
  const coverRef = f.cover as { sys?: { id?: string } } | undefined;
  if (coverRef?.sys?.id) {
    const asset = assets.find((a) => a.sys.id === coverRef.sys!.id);
    const url = asset?.fields.file?.url;
    if (url) cover = url.startsWith("//") ? `https:${url}` : url;
  }

  return {
    slug: String(f.slug ?? ""),
    title: String(f.title ?? "Untitled"),
    description: String(f.description ?? ""),
    date: String(f.publishDate ?? "1970-01-01").slice(0, 10),
    author: String(f.author ?? "Talkative Company"),
    tags: Array.isArray(f.tags) ? (f.tags as unknown[]).map(String) : [],
    readingTime: Math.max(1, Math.round(plain.split(/\s+/).length / 225)),
    cover,
    coverAlt: f.coverAlt ? String(f.coverAlt) : undefined,
    html: marked.parse(body) as string,
    plain,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await query({ order: "-fields.publishDate", limit: "200" });
  return data.items.map((item) => {
    const { html, plain, ...summary } = toPost(item, data.includes?.Asset);
    void html;
    void plain;
    return summary;
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await query({ "fields.slug": slug, limit: "1" });
  if (!data.items.length) return null;
  return toPost(data.items[0], data.includes?.Asset);
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await query({ select: "fields.slug", limit: "200" });
  return data.items.map((i) => String(i.fields.slug ?? "")).filter(Boolean);
}
