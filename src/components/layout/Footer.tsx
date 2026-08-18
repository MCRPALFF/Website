import Link from "next/link";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card-slate">
      <div className="container-site section-spacing">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo compact />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Manchester&apos;s celebration of Palestinian cinema — stories that
              matter, screened across the city.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-brand-yellow">
              Navigate
            </h2>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-burgundy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-brand-yellow">
              Connect
            </h2>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:info@mcrpalff.org" className="hover:text-burgundy">
                  info@mcrpalff.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.04em] text-brand-yellow">
              Newsletter
            </h2>
            <form className="flex flex-col gap-2" action="/api/newsletter" method="post">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="rounded-[4px] border border-white/20 bg-charcoal px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-[4px] bg-brand-yellow px-4 py-2 text-sm font-semibold uppercase tracking-[0.04em] text-charcoal"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-white/50">
          &copy; {new Date().getFullYear()} MCR Palestine Film Festival · mcrpalff.org
        </p>
      </div>
    </footer>
  );
}
