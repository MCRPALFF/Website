import type { Film } from "@/lib/types";
import { FilmCard } from "@/components/cards/FilmCard";

export function FeaturedFilms({ films }: { films: Film[] }) {
  return (
    <section className="section-spacing" aria-labelledby="featured-heading">
      <div className="container-site">
        <h2
          id="featured-heading"
          className="text-[28px] font-bold leading-tight text-brand-yellow md:text-[40px]"
        >
          Featured Films
        </h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Curated highlights from this year&apos;s programme — stories that demand
          to be seen on the big screen.
        </p>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:mt-10 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 sm:gap-6">
          {films.map((film, i) => (
            <div key={film._id} className="w-[80vw] shrink-0 snap-start sm:w-auto sm:shrink">
              <FilmCard film={film} priority={i < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
