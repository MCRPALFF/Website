export type TicketState = "available" | "selling-fast" | "sold-out";

export interface Director {
  _id: string;
  name: string;
  bio?: string;
  headshot?: string;
  filmography?: string[];
}

export interface TicketType {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Seating {
  total: number;
  standard?: number;
  luxury?: number;
  sofas?: number;
  lowIncome?: number;
}

export interface Venue {
  _id: string;
  slug: string;
  name: string;
  address: string;
  description: string;
  travelInfo: string;
  accessibilityInfo: string;
  parkingInfo?: string;
  contact: { phone?: string; email?: string };
  gallery: string[];
  seating?: Seating;
  ticketTypes?: TicketType[];
}

export interface Screening {
  _id: string;
  filmId: string;
  venueId: string;
  date: string;
  time: string;
  ticketState: TicketState;
  qanda: boolean;
  externalBookingUrl?: string;
  screen?: string;
  seating?: Seating;
  ticketTypes?: TicketType[];
}

export interface Film {
  _id: string;
  slug: string;
  title: string;
  synopsis: string;
  director: Director;
  country: string;
  runtime: number;
  genreTags: string[];
  poster: string;
  still?: string;
  stills?: string[];
  trailerUrl?: string;
  featured?: boolean;
  hook?: string;
  festivalYear?: number;
}

export interface Sponsor {
  _id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

export interface FestivalYear {
  year: number;
  dates: { start: string; end: string };
  summaryStats?: {
    attendance?: number;
    films?: number;
    venues?: number;
    soldOutScreenings?: number;
  };
  linkedFilmIds: string[];
  linkedPress?: { title: string; url: string }[];
  archiveScreenings?: {
    title: string;
    certificate?: string;
    datetimeLabel: string;
    details?: string;
  }[];
}

export interface SiteSettings {
  festivalDates: { start: string; end: string };
  heroImage: string;
  ctaLabel: string;
  ctaLink: string;
  featuredFilmIds: string[];
}

export interface FilmWithScreenings extends Film {
  screenings: (Screening & { venue: Venue })[];
}
