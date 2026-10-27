import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/cms";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, pageMeta, breadcrumbSchema } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Writing",
  description:
    "Practical notes on exhibiting and selling in Europe: what German trade fairs cost, what fairground rules actually permit, and which shows are worth an exporter’s money.",
  path: "/blog",
});

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="band band-first">
        <div className="shell">
          <h1>Writing</h1>
          <p className="measure-wide mt-7 text-lead leading-relaxed text-ink-soft">
            Notes on exporting to Europe through trade fairs. What things cost,
            what the rules allow, and which shows deserve your budget.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          {posts.length === 0 ? (
            <div className="stand p-10">
              <h2 className="text-h4">Nothing published yet</h2>
              <p className="measure mt-3 text-ink-soft">
                Drop a markdown file into <code>src/content/posts/</code> and it
                appears here on the next deploy.
              </p>
            </div>
          ) : (
            <ul className="border-t border-ink">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="grid gap-3 border-b border-rule py-8 transition-colors hover:bg-white md:grid-cols-[9rem_1fr] md:gap-10"
                  >
                    <span className="tnum text-[0.875rem] text-ink-soft">
                      {shortDate(post.date)}
                      <span className="mt-1 block">{post.readingTime} min read</span>
                    </span>
                    <div>
                      <h2 className="text-h3">{post.title}</h2>
                      <p className="measure-wide mt-3 leading-relaxed text-ink-soft">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand
        heading="Rather ask us directly?"
        body="Twenty minutes on a call covers more than a month of reading. Bring the show you’re considering."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Writing", path: "/blog" },
        ])}
      />
    </>
  );
}
