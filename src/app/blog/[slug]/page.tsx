import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPostSlugs, getAllPosts } from "@/lib/cms";
import { CtaBand } from "@/components/cta-band";
import {
  JsonLd,
  pageMeta,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function longDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const more = (await getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <section className="band band-first">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-soft">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/blog" className="hover:text-ink">
                Writing
              </Link>
            </nav>

            <div className="mt-8 max-w-[46rem]">
              <h1>{post.title}</h1>
              <p className="tnum mt-6 text-[0.875rem] text-ink-soft">
                {post.author}, {longDate(post.date)}. {post.readingTime} minute
                read.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="shell">
            <div
              className="prose max-w-[42rem]"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </section>
      </article>

      {more.length > 0 && (
        <section className="band band-deep">
          <div className="shell">
            <h2 className="text-h3">More</h2>
            <ul className="mt-7 grid gap-5 sm:grid-cols-2">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="stand block h-full p-6 transition-colors hover:border-ink"
                  >
                    <h3 className="text-h4">{p.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {p.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />

      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            updated: post.updated,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
