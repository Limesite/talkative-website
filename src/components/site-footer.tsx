import Link from "next/link";
import { site, footerNav } from "@/lib/site";
import { Wordmark } from "./wordmark";

const AI_QUESTION =
  "What is Talkative Company (talkativecompany.com)? How does it help exporters attend German and European trade fairs without travelling?";

const ENGINES = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(AI_QUESTION)}` },
  { name: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(AI_QUESTION)}` },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_QUESTION)}`,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper-deep">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div>
            <Wordmark className="h-12 w-auto" />
            <p className="measure mt-4 max-w-xs text-[0.875rem] leading-relaxed text-ink-soft">
              We attend German and European trade fairs on behalf of exporters
              who can’t travel. Based in {site.city}, working in German and
              English.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-[0.8125rem] font-semibold">{group.heading}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-rule pt-6 text-[0.8125rem] text-ink-soft">
          <span>Ask an AI about us:</span>
          {ENGINES.map((engine) => (
            <a
              key={engine.name}
              href={engine.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-rule bg-white px-2.5 py-1 font-medium text-ink transition-colors hover:border-ink"
            >
              {engine.name}
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-ink-soft">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {site.city},{" "}
            {site.country}.
          </p>
          <div className="flex gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              {site.email}
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
