import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProgrammeClient } from "@/components/programme/ProgrammeClient";
import { getGenres, getProgrammeData, getVenues } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Programme",
  description: "Browse the full MCR Palestine Film Festival programme.",
};

export default function ProgrammePage() {
  const items = getProgrammeData();
  const genres = getGenres();
  const venues = getVenues();
  const dates = [...new Set(items.map((i) => i.date))].sort();

  return (
    <>
      <PageHero
        title="Programme"
        subtitle="Browse screenings across three Manchester venues. Filter by date, venue, or genre."
      />
      <ProgrammeClient items={items} genres={genres} dates={dates} venues={venues} />
    </>
  );
}
