"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card-slate/95 backdrop-blur-sm">
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] font-semibold uppercase tracking-[0.04em] transition-colors hover:text-burgundy",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-brand-yellow"
                  : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("block h-0.5 w-6 bg-brand-yellow transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={cn("block h-0.5 w-6 bg-brand-yellow transition-opacity", open && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 bg-brand-yellow transition-transform", open && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="fixed inset-0 top-16 z-40 bg-charcoal md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-4 text-xl font-semibold uppercase tracking-wide",
                    pathname === link.href ? "text-brand-yellow" : "text-white"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
