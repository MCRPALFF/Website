import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { VenueSection } from "@/components/venues/VenueSection";
import { getVenues } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Venues",
  description:
    "Screening venues for MCR Palestine Film Festival — The Savoy, Heaton Moor; Northern Light Cinema Sale; and Northern Light Cinema Stretford.",
};

export default function VenuesPage() {
  const venues = getVenues();

  return (
    <>
      <PageHero title="Venues" subtitle="Three independent cinemas across Greater Manchester." />
      <div className="container-site section-spacing space-y-16">
        {venues.map((venue) => (
          <VenueSection key={venue._id} venue={venue} />
        ))}
      </div>
    </>
  );
}
