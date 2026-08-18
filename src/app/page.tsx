import { Hero } from "@/components/home/Hero";
import { FeaturedFilms } from "@/components/home/FeaturedFilms";
import { VenueQuickLinks } from "@/components/home/VenueQuickLinks";
import { getFeaturedFilmsData, getSiteSettings, getVenues } from "@/lib/queries";

export default function HomePage() {
  const settings = getSiteSettings();
  const featuredFilms = getFeaturedFilmsData();
  const venues = getVenues();

  return (
    <>
      <Hero
        heroImage={settings.heroImage}
        festivalDates={settings.festivalDates}
        ctaLabel={settings.ctaLabel}
        ctaLink={settings.ctaLink}
      />
      <FeaturedFilms films={featuredFilms} />
      <VenueQuickLinks venues={venues} />
    </>
  );
}
