import {
  allGenres,
  festivalYears,
  films,
  getAllScreeningsWithFilms,
  getFeaturedFilms,
  getFilmBySlug,
  getRelatedFilms,
  getScreeningsForFilm,
  partners,
  siteSettings,
  sponsors,
  teamMembers,
  venues,
} from "./data/mock";
import type { Film, FilmWithScreenings, Venue } from "./types";

export function getSiteSettings() {
  return siteSettings;
}

export function getFeaturedFilmsData(): Film[] {
  return getFeaturedFilms();
}

export function getAllFilms(): Film[] {
  return films;
}

export function getFilm(slug: string): FilmWithScreenings | null {
  const film = getFilmBySlug(slug);
  if (!film) return null;
  return { ...film, screenings: getScreeningsForFilm(film._id) };
}

export function getProgrammeData() {
  return getAllScreeningsWithFilms();
}

export function getGenres() {
  return allGenres;
}

export function getVenues(): Venue[] {
  return venues;
}

export function getSponsors() {
  return sponsors;
}

export function getPartners() {
  return partners;
}

export function getTeam() {
  return teamMembers;
}

export function getFestivalYears() {
  return festivalYears;
}

export function getRelatedFilmsData(film: Film) {
  return getRelatedFilms(film);
}
