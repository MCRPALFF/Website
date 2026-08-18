import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  compact?: boolean;
}

export function Logo({ compact }: LogoProps) {
  return (
    <Link
      href="/"
      className="group inline-flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
      aria-label="MCR Palestine Film Festival — Home"
    >
      <span
        className={cn(
          "font-body font-normal uppercase tracking-[0.2em] text-white transition-colors group-hover:text-brand-yellow",
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        MCR
      </span>
      <span
        className={cn(
          "font-display font-semibold uppercase text-brand-yellow",
          compact ? "text-lg" : "text-2xl md:text-3xl"
        )}
      >
        Palestine
      </span>
      <span
        className={cn(
          "font-body font-normal uppercase tracking-[0.15em] text-white/80",
          compact ? "text-[10px]" : "text-xs"
        )}
      >
        Film Festival
      </span>
    </Link>
  );
}
