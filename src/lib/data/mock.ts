import type {
  Director,
  Film,
  FestivalYear,
  Partner,
  Screening,
  SiteSettings,
  Sponsor,
  TeamMember,
  Venue,
} from "../types";

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=60`;

const savoyTickets = [
  { id: "standard", name: "Standard Seat", quantity: 122, price: 13.5 },
  { id: "luxury", name: "Luxury Seat", quantity: 27, price: 15 },
  { id: "sofa", name: "Sofa", quantity: 9, price: 30 },
];

const savoySeating = {
  total: 167,
  standard: 122,
  luxury: 27,
  sofas: 9,
};

export const directors: Director[] = [
  {
    _id: "dir-1",
    name: "Georgia Scott & Sophia Scott",
    bio: "British filmmakers whose documentary portrait of Marwan Barghouti has screened at Palestinian film festivals worldwide.",
    headshot: img("photo-1494790108377-be9c29b29330", 160),
    filmography: ["Tomorrow's Freedom"],
  },
  {
    _id: "dir-2",
    name: "Cherien Dabis",
    bio: "Palestinian American filmmaker and actor, known for Amreeka and for bringing Palestinian family stories to an international audience.",
    headshot: img("photo-1573496359142-b8d87734a5a2", 160),
    filmography: ["Amreeka", "May in the Summer", "All That's Left of You"],
  },
  {
    _id: "dir-6",
    name: "Yuval Abraham & Rachel Szor",
    bio: "Israeli filmmakers and journalists. With Basel Adra and Hamdan Ballal they co-directed No Other Land. Naza looks at the systems used to calculate Palestinian civilian casualties in Gaza.",
    headshot: img("photo-1472099645785-5658abf4ff4e", 160),
    filmography: ["No Other Land", "Naza"],
  },
];

export const venues: Venue[] = [
  {
    _id: "venue-1",
    slug: "savoy",
    name: "The Savoy, Heaton Moor",
    address: "Heaton Moor, Stockport SK4 4NZ",
    description:
      "A beloved independent cinema in Heaton Moor, offering an intimate screening experience with a rich local history.",
    travelInfo:
      "Heaton Chapel station (Northern) — 8 min walk. Bus routes 197, 203 stop nearby on Heaton Moor Road.",
    accessibilityInfo:
      "Step-free access via side entrance. Reserved seating available on request. Hearing loop installed in main auditorium.",
    parkingInfo: "Free street parking on surrounding roads; limited spaces after 6pm.",
    contact: { phone: "0161 432 3232", email: "info@savoycinema.co.uk" },
    gallery: [img("photo-1489599849927-2ee91cede3ba", 640), img("photo-1517604931442-7e0c8ed2963c", 640)],
    seating: savoySeating,
    ticketTypes: savoyTickets,
  },
  {
    _id: "venue-2",
    slug: "northern-light-sale",
    name: "Northern Light Cinema Sale",
    address: "School Road, Sale M33 7XY",
    description:
      "A community-focused cinema space in Sale, known for its welcoming atmosphere and diverse programming.",
    travelInfo: "Sale Metrolink stop — 5 min walk. Bus routes 41, 263 serve School Road.",
    accessibilityInfo:
      "Fully step-free. Elevator access to all floors. Wheelchair spaces in every screen.",
    parkingInfo: "Multi-storey car park on School Road, 2 min walk.",
    contact: { phone: "0161 976 2000", email: "sale@northernlightcinema.co.uk" },
    gallery: [img("photo-1594909128353-5662fa9836db", 640), img("photo-1574267432644-f6102b936d50", 640)],
  },
  {
    _id: "venue-3",
    slug: "northern-light-stretford",
    name: "Northern Light Cinema Stretford",
    address: "Chester Road, Stretford M32 0QW",
    description:
      "Northern Light's Stretford venue brings independent cinema to Trafford with a focus on world and festival programming.",
    travelInfo: "Stretford Metrolink stop — 3 min walk. Bus routes 53, 84 along Chester Road.",
    accessibilityInfo:
      "Step-free access throughout. Accessible toilets on ground floor. Companion seats available.",
    parkingInfo: "Free parking at adjacent retail park after 6pm.",
    contact: { phone: "0161 876 3000", email: "stretford@northernlightcinema.co.uk" },
    gallery: [img("photo-1536440136628-849c177e76a1", 640), img("photo-1440404653325-ab127d49abc1", 640)],
  },
];

export const films: Film[] = [
  {
    _id: "film-1",
    slug: "tomorrows-freedom",
    title: "Tomorrow's Freedom",
    synopsis:
      "A portrait of Palestinian political leader Marwan Barghouti, often described as Palestine's Nelson Mandela, serving life sentences in an Israeli prison. Told through his wife Fadwa and their children, the film traces his political life, imprisonment, family visits, and the campaign for his release — revealing a man whose dream of Palestinian liberation remains unshaken.",
    director: directors[0],
    country: "United Kingdom",
    runtime: 97,
    genreTags: ["Documentary"],
    poster: "/films/tomorrows-freedom-poster.jpg",
    still: "/films/tomorrows-freedom-still.jpg",
    stills: [
      "/films/tomorrows-freedom-still-2.jpg",
      "/films/tomorrows-freedom-still-3.jpg",
    ],
    featured: true,
    hook: "An intimate portrait of Marwan Barghouti, Palestine's best-known political prisoner.",
    festivalYear: 2026,
  },
  {
    _id: "film-2",
    slug: "all-thats-left-of-you",
    title: "All That's Left of You",
    synopsis:
      "When a Palestinian teenager is caught in a West Bank protest, his mother begins to tell the story of their family. Cherien Dabis's sweeping drama spans three generations from the 1948 Nakba to the present, tracing dispossession, love, and the stubborn work of survival.",
    director: directors[1],
    country: "Palestine / Jordan / Germany",
    runtime: 146,
    genreTags: ["Drama"],
    poster: "/films/all-thats-left-poster.jpg",
    still: "/films/all-thats-left-still.jpg",
    stills: [
      "/films/all-thats-left-still-2.jpg",
      "/films/all-thats-left-still-3.jpg",
    ],
    featured: true,
    hook: "Three generations of a Palestinian family, from the Nakba to now.",
    festivalYear: 2026,
  },
  {
    _id: "film-6",
    slug: "naza",
    title: "Naza",
    synopsis:
      "Shot at night on rooftops in Tel Aviv, Naza follows Israeli soldiers and intelligence insiders as they describe the systems used to decide how many Palestinian civilians may be killed in a strike on Gaza. Yuval Abraham and Rachel Szor's film asks what it takes to speak about those calculations, and what stays unsaid.",
    director: directors[2],
    country: "United Kingdom",
    runtime: 80,
    genreTags: ["Documentary"],
    poster: img("photo-1489599849927-2ee91cede3ba", 800),
    still: img("photo-1440404653325-ab127d49abc1", 1600),
    featured: true,
    hook: "The systems behind civilian casualties in Gaza, described by the people who operate them.",
    festivalYear: 2026,
  },
];

export const screenings: Screening[] = [
  {
    _id: "scr-1",
    filmId: "film-1",
    venueId: "venue-1",
    date: "2026-11-13",
    time: "19:30",
    ticketState: "available",
    qanda: true,
    seating: savoySeating,
    ticketTypes: savoyTickets,
    externalBookingUrl: "https://example.com/tickets",
  },
  {
    _id: "scr-2",
    filmId: "film-2",
    venueId: "venue-1",
    date: "2026-11-20",
    time: "19:30",
    ticketState: "available",
    qanda: true,
    seating: savoySeating,
    ticketTypes: savoyTickets,
    externalBookingUrl: "https://example.com/tickets",
  },
  {
    _id: "scr-3",
    filmId: "film-6",
    venueId: "venue-1",
    date: "2026-11-27",
    time: "19:30",
    ticketState: "available",
    qanda: true,
    seating: savoySeating,
    ticketTypes: savoyTickets,
    externalBookingUrl: "https://example.com/tickets",
  },
];

export const siteSettings: SiteSettings = {
  festivalDates: { start: "2026-11-13", end: "2026-11-27" },
  heroImage: "/films/tomorrows-freedom-still.jpg",
  ctaLabel: "View Programme",
  ctaLink: "/program",
  featuredFilmIds: ["film-1", "film-2", "film-6"],
};

export const sponsors: Sponsor[] = [
  { _id: "sp-1", name: "Arts Council England", logo: img("photo-1560179707-f14e90ef3623", 200), url: "https://example.com" },
  { _id: "sp-2", name: "Manchester City Council", logo: img("photo-1557804506-669a67965ba0", 200), url: "https://example.com" },
];

export const partners: Partner[] = [
  { _id: "pt-1", name: "Palestine Film Institute", logo: img("photo-1556761175-5973dc0f32e7", 200), url: "https://example.com" },
  { _id: "pt-2", name: "HOME Manchester", logo: img("photo-1559136555-9303baea8ebd", 200), url: "https://example.com" },
];

export const teamMembers: TeamMember[] = [
  { name: "Sarah Ahmed", role: "Festival Director", photo: img("photo-1573496359142-b8d87734a5a2", 256) },
  { name: "James Morrison", role: "Programme Curator", photo: img("photo-1560250097-0b93528c311a", 256) },
  { name: "Layla Hassan", role: "Community Outreach", photo: img("photo-1580489944761-15a19d654956", 256) },
];

export const festivalYears: FestivalYear[] = [
  {
    year: 2025,
    dates: { start: "2025-11-08", end: "2025-11-11" },
    summaryStats: { attendance: 2400, films: 18, venues: 3, soldOutScreenings: 6 },
    linkedFilmIds: [],
    linkedPress: [
      { title: "Manchester Evening News — A vital window into Palestinian cinema", url: "https://example.com" },
    ],
  },
  {
    year: 2024,
    dates: { start: "2024-11-09", end: "2024-11-12" },
    summaryStats: { attendance: 1800, films: 15, venues: 2, soldOutScreenings: 4 },
    linkedFilmIds: [],
    archiveScreenings: [
      {
        title: "The Teacher",
        certificate: "18",
        datetimeLabel: "Friday 10th May - 20:00",
        details:
          "Q&A facilitated by Professor Anadi Ramamurthy, author of 'Struggling to be seen: The travails of Palestinian cinema'. The book explores the challenges Palestinian filmmakers confront to develop a cinema that gives expression to the national narrative.",
      },
      {
        title: "Gaza Fights for Freedom",
        certificate: "18",
        datetimeLabel: "Saturday 18th May - 20:00",
        details:
          "Including Q&A with Director Abby Martin (virtual session); facilitated by Mohammed Ghalayini, an atmospheric scientist and co-founder of Amplify Gaza Stories, which works to support the resilience of people in Gaza through community-led projects.",
      },
      {
        title: "200 Meters",
        certificate: "15",
        datetimeLabel: "Friday 31st May - 20:00",
        details:
          "Dr Ruth Abou Rached is a Lecturer in Arabic Cultural Studies for the Department of Arabic and Middle Eastern Studies, The University of Manchester. Dr Louis Brehony is author of the book Palestinian Music in Exile: Voices of Resistance and director of the award-winning film Kofia: A Revolution Through Music. An independent scholar and writer on culture, aesthetics and resistance, his work focuses on Palestine, Ireland and histories of anticolonial musicianship.",
      },
    ],
    linkedPress: [
      { title: "Watch the 2024 archive video", url: "https://www.youtube.com/watch?v=bqO0Z2kVLdk" },
    ],
  },
];

export const allGenres = [...new Set(films.flatMap((f) => f.genreTags))].sort();

function venueById(id: string) {
  return venues.find((v) => v._id === id);
}

export function getFilmBySlug(slug: string) {
  return films.find((f) => f.slug === slug);
}

export function getFeaturedFilms() {
  return siteSettings.featuredFilmIds
    .map((id) => films.find((f) => f._id === id))
    .filter((f): f is Film => Boolean(f));
}

export function getScreeningsForFilm(filmId: string) {
  return screenings
    .filter((s) => s.filmId === filmId)
    .map((s) => ({ ...s, venue: venueById(s.venueId)! }))
    .filter((s) => s.venue);
}

export function getAllScreeningsWithFilms() {
  return screenings.map((s) => ({
    ...s,
    film: films.find((f) => f._id === s.filmId)!,
    venue: venueById(s.venueId)!,
  }));
}

export function getRelatedFilms(film: Film, limit = 4) {
  return films
    .filter((f) => f._id !== film._id && f.genreTags.some((g) => film.genreTags.includes(g)))
    .slice(0, limit);
}
