import Image from "next/image";
import type { Venue } from "@/lib/types";
import { MapEmbed } from "./MapEmbed";
import { TicketTable } from "@/components/ui/TicketTable";

export function VenueSection({ venue }: { venue: Venue }) {
  return (
    <article id={venue.slug} className="scroll-mt-24 border-b border-white/10 pb-16 last:border-0">
      <h2 className="text-[28px] font-bold text-brand-yellow md:text-[40px]">{venue.name}</h2>
      <p className="mt-2 text-white/60">{venue.address}</p>
      <p className="mt-6 max-w-3xl leading-relaxed text-white/90">{venue.description}</p>

      {venue.seating && (
        <p className="mt-4 text-sm text-white/70">
          {venue.seating.total} tickets on sale
          {venue.seating.standard != null &&
            ` · ${venue.seating.standard} standard · ${venue.seating.luxury} luxury · ${venue.seating.sofas} sofas · ${venue.seating.lowIncome} low income`}
        </p>
      )}

      {venue.ticketTypes && venue.ticketTypes.length > 0 && (
        <div className="mt-6 max-w-xl">
          <TicketTable ticketTypes={venue.ticketTypes} heading="Ticket prices" />
        </div>
      )}

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-brand-yellow">Accessibility</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{venue.accessibilityInfo}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-yellow">Getting Here</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{venue.travelInfo}</p>
          {venue.parkingInfo && (
            <p className="mt-4 text-sm text-white/60">
              <strong className="text-white">Parking:</strong> {venue.parkingInfo}
            </p>
          )}
        </div>
      </div>

      {(venue.contact.phone || venue.contact.email) && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-brand-yellow">Contact</h3>
          <p className="mt-2 text-sm text-white/80">
            {venue.contact.phone && <span className="mr-4">{venue.contact.phone}</span>}
            {venue.contact.email && (
              <a href={`mailto:${venue.contact.email}`} className="text-brand-yellow hover:text-burgundy">
                {venue.contact.email}
              </a>
            )}
          </p>
        </div>
      )}

      {venue.gallery.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-brand-yellow">Gallery</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {venue.gallery.map((src, i) => (
              <div key={src} className="relative still-aspect overflow-hidden rounded-[4px]">
                <Image
                  src={src}
                  alt={`${venue.name} — photo ${i + 1}`}
                  fill
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-brand-yellow">Map</h3>
        <MapEmbed name={venue.name} address={venue.address} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MovieTheater",
            name: venue.name,
            address: venue.address,
          }),
        }}
      />
    </article>
  );
}
