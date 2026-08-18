import Link from "next/link";
import type { Venue } from "@/lib/types";

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link
      href={`/venues#${venue.slug}`}
      className="group flex flex-col rounded-[4px] bg-card-slate p-6 transition-colors hover:border-brand-yellow/30 border border-transparent focus-visible:border-brand-yellow"
      aria-label={`View details for ${venue.name}`}
    >
      <h3 className="text-xl font-semibold text-brand-yellow transition-colors group-hover:text-white">
        {venue.name}
      </h3>
      <p className="mt-2 text-sm text-white/60">{venue.address}</p>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/80">
        {venue.description}
      </p>
      <span className="mt-4 text-sm font-semibold uppercase tracking-[0.04em] text-white/50 transition-colors group-hover:text-burgundy">
        View venue →
      </span>
    </Link>
  );
}
