import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FilmCard, ScreeningRow } from "@/components/cards/FilmCard";
import { ShareButton, TrailerButton } from "@/components/films/FilmActions";
import { getAllFilms, getFilm, getRelatedFilmsData } from "@/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return { title: "Film Not Found" };

  return {
    title: film.title,
    description: film.hook || film.synopsis.slice(0, 160),
    alternates: {
      canonical: `/films/${film.slug}`,
    },
    openGraph: {
      title: film.title,
      description: film.hook || film.synopsis.slice(0, 160),
      url: `https://mcrpalff.org/films/${film.slug}`,
      images: [{ url: film.still || film.poster }],
    },
    twitter: {
      card: "summary_large_image",
      title: film.title,
      description: film.hook || film.synopsis.slice(0, 160),
      images: [film.still || film.poster],
    },
  };
}

export function generateStaticParams() {
  return getAllFilms().map((f) => ({ slug: f.slug }));
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  const relatedFilms = getRelatedFilmsData(film);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            name: film.title,
            description: film.synopsis,
            image: film.poster,
            director: { "@type": "Person", name: film.director.name },
            duration: `PT${film.runtime}M`,
            countryOfOrigin: film.country,
          }),
        }}
      />

      <section className="relative still-aspect w-full md:min-h-[50vh]">
        <Image
          src={film.still || film.poster}
          alt={`Still from ${film.title}`}
          fill
          priority
          quality={65}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="container-site absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
          <h1 className="text-[40px] font-bold leading-tight text-brand-yellow md:text-[56px]">
            {film.title}
          </h1>
          <p className="mt-2 text-lg text-white/80">
            {film.director.name} · {film.country} · {film.runtime} min
          </p>
        </div>
      </section>

      <div className="container-site section-spacing">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative poster-aspect overflow-hidden rounded-[4px]">
              <Image
                src={film.poster}
                alt={`Poster for ${film.title}`}
                fill
                quality={65}
                sizes="280px"
                className="object-cover"
              />
            </div>
            {film.trailerUrl && <TrailerButton title={film.title} url={film.trailerUrl} />}
          </aside>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-brand-yellow">Synopsis</h2>
              <p className="mt-4 text-base leading-relaxed text-white/90">{film.synopsis}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-yellow">Director</h2>
              <div className="mt-4 flex gap-4">
                {film.director.headshot && (
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={film.director.headshot}
                      alt={film.director.name}
                      fill
                      quality={65}
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{film.director.name}</p>
                  {film.director.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{film.director.bio}</p>
                  )}
                  {film.director.filmography && (
                    <ul className="mt-2 text-sm text-white/50">
                      {film.director.filmography.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            {film.stills && film.stills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-brand-yellow">Gallery</h2>
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                  {film.stills.map((still, i) => (
                    <div key={still} className="relative still-aspect w-72 shrink-0 overflow-hidden rounded-[4px]">
                      <Image
                        src={still}
                        alt={`Still ${i + 1} from ${film.title}`}
                        fill
                        quality={65}
                        sizes="288px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold text-brand-yellow">Screenings</h2>
              <div className="mt-4 space-y-3">
                {film.screenings.map((s) => (
                  <ScreeningRow key={s._id} screening={s} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-yellow">Share</h2>
              <ShareButton title={film.title} />
            </section>
          </div>
        </div>

        {relatedFilms.length > 0 && (
          <section className="mt-16">
            <h2 className="text-[28px] font-bold text-brand-yellow">Related Films</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedFilms.map((f) => (
                <FilmCard key={f._id} film={f} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
