/**
 * Local markdown provider (default).
 *
 * Posts live in src/content/posts/*.md with YAML front matter:
 *
 *   ---
 *   title: "..."
 *   description: "..."
 *   date: "2026-10-27"
 *   author: "..."
 *   tags: ["trade fairs", "india"]
 *   ---
 *
 * Add a file, commit, deploy. No CMS login required to publish.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Post, PostSummary } from "./types";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

marked.setOptions({ gfm: true, breaks: false });

function readDir(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

function wordsPerMinute(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
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

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const plain = stripMarkdown(content);

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? "Talkative Company"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: wordsPerMinute(plain),
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    html: marked.parse(content) as string,
    plain,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  return readDir()
    .map((f) => {
      const { html, plain, ...summary } = parse(f);
      void html;
      void plain;
      return summary;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!readDir().includes(file)) return null;
  return parse(file);
}

export async function getPostSlugs(): Promise<string[]> {
  return readDir().map((f) => f.replace(/\.md$/, ""));
}
