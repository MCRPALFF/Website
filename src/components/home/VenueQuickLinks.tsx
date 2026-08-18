import type { Venue } from "@/lib/types";
import { VenueCard } from "@/components/cards/VenueCard";

export function VenueQuickLinks({ venues }: { venues: Venue[] }) {
  return (
    <section className="section-spacing bg-card-slate/50" aria-labelledby="venues-heading">
      <div className="container-site">
        <h2
          id="venues-heading"
          className="text-[28px] font-bold leading-tight text-brand-yellow md:text-[40px]"
        >
          Venues
        </h2>
        <p className="mt-2 text-white/70">
          Three independent cinemas across Greater Manchester.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      </div>
    </section>
  );
}
