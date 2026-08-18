"use client";

import { useMemo, useState } from "react";
import type { Film, Screening, Venue } from "@/lib/types";
import { FilmCard } from "@/components/cards/FilmCard";
import { Button } from "@/components/ui/Button";
import { cn, formatDate, formatTime, fromPrice } from "@/lib/utils";

type SortOption = "date" | "title" | "venue";
type ViewMode = "grid" | "timeline";

interface ProgrammeItem extends Screening {
  film: Film;
  venue: Venue;
}

interface ProgrammeClientProps {
  items: ProgrammeItem[];
  genres: string[];
  dates: string[];
  venues: Venue[];
}

export function ProgrammeClient({
  items,
  genres,
  dates,
  venues,
}: ProgrammeClientProps) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("date");
  const [view, setView] = useState<ViewMode>("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const activeFilterCount =
    selectedDates.length + selectedVenues.length + selectedGenres.length;

  const filtered = useMemo(() => {
    let result = [...items];

    if (selectedDates.length) {
      result = result.filter((i) => selectedDates.includes(i.date));
    }
    if (selectedVenues.length) {
      result = result.filter((i) => selectedVenues.includes(i.venueId));
    }
    if (selectedGenres.length) {
      result = result.filter((i) =>
        i.film.genreTags.some((g) => selectedGenres.includes(g))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.film.title.toLowerCase().includes(q) ||
          i.film.director.name.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sort === "title") return a.film.title.localeCompare(b.film.title);
      if (sort === "venue") return a.venue.name.localeCompare(b.venue.name);
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });

    return result;
  }, [items, selectedDates, selectedVenues, selectedGenres, search, sort]);

  const filmsForGrid = useMemo(() => {
    const seen = new Set<string>();
    return filtered.filter((item) => {
      if (seen.has(item.filmId)) return false;
      seen.add(item.filmId);
      return true;
    });
  }, [filtered]);

  const timelineByDate = useMemo(() => {
    const groups: Record<string, ProgrammeItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.date]) groups[item.date] = [];
      groups[item.date].push(item);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  function toggleChip(
    value: string,
    selected: string[],
    setter: (v: string[]) => void
  ) {
    setter(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  }

  function clearFilters() {
    setSelectedDates([]);
    setSelectedVenues([]);
    setSelectedGenres([]);
    setSearch("");
  }

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <label htmlFor="programme-search" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-yellow">
          Search
        </label>
        <input
          id="programme-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Film title or director..."
          className="w-full rounded-[4px] border border-white/20 bg-charcoal px-4 py-2 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-yellow">Date</p>
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => toggleChip(date, selectedDates, setSelectedDates)}
              className={cn(
                "rounded-[4px] border px-3 py-1.5 text-sm transition-colors",
                selectedDates.includes(date)
                  ? "border-brand-yellow bg-brand-yellow text-charcoal"
                  : "border-white/20 text-white hover:border-brand-yellow"
              )}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-yellow">Venue</p>
        <div className="flex flex-wrap gap-2">
          {venues.map((venue) => (
            <button
              key={venue._id}
              type="button"
              onClick={() => toggleChip(venue._id, selectedVenues, setSelectedVenues)}
              className={cn(
                "rounded-[4px] border px-3 py-1.5 text-sm transition-colors",
                selectedVenues.includes(venue._id)
                  ? "border-brand-yellow bg-brand-yellow text-charcoal"
                  : "border-white/20 text-white hover:border-brand-yellow"
              )}
            >
              {venue.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-yellow">Genre</p>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleChip(genre, selectedGenres, setSelectedGenres)}
              className={cn(
                "rounded-[4px] border px-3 py-1.5 text-sm transition-colors",
                selectedGenres.includes(genre)
                  ? "border-brand-yellow bg-brand-yellow text-charcoal"
                  : "border-white/20 text-white hover:border-brand-yellow"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="programme-sort" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-brand-yellow">
          Sort
        </label>
        <select
          id="programme-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full rounded-[4px] border border-white/20 bg-charcoal px-4 py-2 text-white focus:border-brand-yellow focus:outline-none"
        >
          <option value="date">Date (soonest first)</option>
          <option value="title">Title A–Z</option>
          <option value="venue">Venue</option>
        </select>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container-site section-spacing">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop filters sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block" aria-label="Programme filters">
          {filterPanel}
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              className="relative rounded-[4px] border border-brand-yellow px-4 py-2 text-sm font-semibold uppercase tracking-wide text-brand-yellow lg:hidden"
              onClick={() => setFilterOpen(true)}
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-burgundy text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex gap-2" role="group" aria-label="View mode">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={cn(
                  "rounded-[4px] px-4 py-2 text-sm font-semibold uppercase tracking-wide",
                  view === "grid"
                    ? "bg-brand-yellow text-charcoal"
                    : "border border-white/20 text-white"
                )}
              >
                Poster Grid
              </button>
              <button
                type="button"
                onClick={() => setView("timeline")}
                className={cn(
                  "rounded-[4px] px-4 py-2 text-sm font-semibold uppercase tracking-wide",
                  view === "timeline"
                    ? "bg-brand-yellow text-charcoal"
                    : "border border-white/20 text-white"
                )}
              >
                Timeline
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-[4px] bg-card-slate p-12 text-center">
              <p className="text-lg text-white/80">No screenings match your filters</p>
              <div className="mt-4">
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filmsForGrid.map((item) => (
                <FilmCard
                  key={item.film._id}
                  film={item.film}
                  screening={item}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {timelineByDate.map(([date, dayItems]) => (
                <section key={date}>
                  <h2 className="mb-4 border-b border-burgundy pb-2 text-xl font-bold text-brand-yellow">
                    {formatDate(date)}
                  </h2>
                  <ul className="space-y-4">
                    {dayItems.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col gap-2 rounded-[4px] bg-card-slate p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <a
                            href={`/films/${item.film.slug}`}
                            className="text-lg font-semibold text-white hover:text-brand-yellow"
                          >
                            {item.film.title}
                          </a>
                          <p className="text-sm text-white/60">
                            {formatTime(item.time)} · {item.venue.name}
                            {item.screen ? ` · ${item.screen}` : ""} · {item.film.director.name}
                            {fromPrice(item.ticketTypes ?? item.venue.ticketTypes)
                              ? ` · ${fromPrice(item.ticketTypes ?? item.venue.ticketTypes)}`
                              : ""}
                          </p>
                        </div>
                        <Button href={`/films/${item.film.slug}`} variant="secondary">
                          View Details
                        </Button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-lg font-bold text-brand-yellow">Filters</h2>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="text-sm font-semibold uppercase tracking-wide text-white"
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filterPanel}</div>
          </div>
        </div>
      )}
    </div>
  );
}
