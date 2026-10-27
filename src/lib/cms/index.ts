/**
 * Content layer.
 *
 * Every page reads posts through this module and never touches a file system
 * or an API directly. That means moving to Contentful is one file (contentful.ts)
 * plus one env var (CONTENT_SOURCE=contentful) — no page component changes.
 *
 * See context.md -> "Moving to Contentful" for the exact content model.
 */

import type { Post, PostSummary } from "./types";
import * as local from "./local";
import * as contentful from "./contentful";

export type { Post, PostSummary } from "./types";

const source = process.env.CONTENT_SOURCE === "contentful" ? contentful : local;

export async function getAllPosts(): Promise<PostSummary[]> {
  return source.getAllPosts();
}

export async function getPost(slug: string): Promise<Post | null> {
  return source.getPost(slug);
}

export async function getPostSlugs(): Promise<string[]> {
  return source.getPostSlugs();
}
