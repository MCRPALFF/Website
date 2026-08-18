import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FilmCard } from "@/components/cards/FilmCard";
import { getAllFilms, getFestivalYears } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Archive",
  description: "Past editions of the MCR Palestine Film Festival.",
};

export default function ArchivePage() {
  const years = getFestivalYears();
  const allFilms = getAllFilms();

  return (
    <>
      <PageHero title="Archive" subtitle="Explore past editions of the festival." />

      <div className="container-site section-spacing space-y-20">
        {years.map((edition) => {
          const editionFilms = allFilms.filter((f) => edition.linkedFilmIds.includes(f._id));

          return (
            <section key={edition.year}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-[40px] font-bold text-brand-yellow">{edition.year}</h2>
                  <p className="text-white/60">
                    {new Date(edition.dates.start).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    –{" "}
                    {new Date(edition.dates.end).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {edition.summaryStats && (
                  <dl className="flex flex-wrap gap-6 text-sm">
                    {edition.summaryStats.films != null && (
                      <div>
                        <dt className="text-white/50">Films</dt>
                        <dd className="font-semibold text-brand-yellow">{edition.summaryStats.films}</dd>
                      </div>
                    )}
                    {edition.summaryStats.attendance != null && (
                      <div>
                        <dt className="text-white/50">Attendance</dt>
                        <dd className="font-semibold text-brand-yellow">
                          {edition.summaryStats.attendance.toLocaleString()}
                        </dd>
                      </div>
                    )}
                    {edition.summaryStats.soldOutScreenings != null && (
                      <div>
                        <dt className="text-white/50">Sold Out</dt>
                        <dd className="font-semibold text-brand-yellow">
                          {edition.summaryStats.soldOutScreenings}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              {editionFilms.length > 0 && (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {editionFilms.map((film) => (
                    <FilmCard key={film._id} film={film} />
                  ))}
                </div>
              )}

              {edition.linkedPress && edition.linkedPress.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-brand-yellow">Press Coverage</h3>
                  <ul className="mt-4 space-y-2">
                    {edition.linkedPress.map((item) => (
                      <li key={item.url}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/70 hover:text-burgundy"
                        >
                          {item.title} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}

        <p className="text-center text-white/60">
          Looking for the current programme?{" "}
          <Link href="/program" className="text-brand-yellow hover:text-burgundy">
            View Programme →
          </Link>
        </p>
      </div>
    </>
  );
}
