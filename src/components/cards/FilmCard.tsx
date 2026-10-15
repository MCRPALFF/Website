import Image from "next/image";
import Link from "next/link";
import type { Film, Screening, Venue } from "@/lib/types";
import { cn, formatDate, formatTime, fromPrice, isPastScreening, seatingLabel } from "@/lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { TicketTable } from "../ui/TicketTable";

interface FilmCardProps {
  film: Film;
  screening?: Screening & { venue?: Venue };
  className?: string;
  priority?: boolean;
}

function getBadges(screening?: Screening & { venue?: Venue }) {
  const badges: { variant: "selling-fast" | "qanda" | "sold-out"; label: string }[] = [];
  if (!screening) return badges;
  if (screening.ticketState === "sold-out") badges.push({ variant: "sold-out", label: "Sold Out" });
  else if (screening.ticketState === "selling-fast") badges.push({ variant: "selling-fast", label: "Selling Fast" });
  if (screening.qanda) badges.push({ variant: "qanda", label: "Panel Discussion" });
  return badges;
}

export function FilmCard({ film, screening, className, priority }: FilmCardProps) {
  const past = screening ? isPastScreening(screening.date, screening.time) : false;
  const badges = getBadges(screening);
  const soldOut = screening?.ticketState === "sold-out";
  const priceLabel = fromPrice(screening?.ticketTypes ?? screening?.venue?.ticketTypes);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[4px] bg-card-slate transition-transform duration-150 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        past && "opacity-60",
        className
      )}
    >
      <Link href={`/films/${film.slug}`} className="relative block poster-aspect overflow-hidden">
        <Image
          src={film.poster}
          alt={`Poster for ${film.title}`}
          fill
          priority={priority}
          quality={65}
          sizes="(max-width: 640px) 85vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {badges.map((b) => (
              <Badge key={b.label} variant={b.variant}>
                {b.label}
              </Badge>
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/films/${film.slug}`}>
          <h3 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-brand-yellow">
            {film.title}
          </h3>
        </Link>
        <p className="text-sm text-white/60">
          {film.director.name} · {film.country}
        </p>
        {film.hook && (
          <p className="line-clamp-2 text-sm leading-relaxed text-white/80">{film.hook}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-[13px] text-white/50">
          <span>{film.runtime} min</span>
          {screening?.venue && (
            <span className="rounded-[4px] bg-charcoal px-2 py-0.5">
              {screening.venue.name}
              {screening.screen ? ` · ${screening.screen}` : ""}
            </span>
          )}
          {priceLabel && <span>{priceLabel}</span>}
        </div>
        <div className="pt-2">
          {past ? (
            <Button variant="disabled" disabled>
              Screening Ended
            </Button>
          ) : soldOut ? (
            <Button variant="disabled" disabled>
              Sold Out
            </Button>
          ) : (
            <Button href={`/films/${film.slug}`} variant="secondary" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function ScreeningRow({ screening }: { screening: Screening & { venue: Venue } }) {
  const past = isPastScreening(screening.date, screening.time);
  const soldOut = screening.ticketState === "sold-out";
  const tickets = screening.ticketTypes ?? screening.venue.ticketTypes;

  return (
    <div className="flex flex-col gap-4 rounded-[4px] bg-card-slate p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-white">{formatDate(screening.date)}</p>
          <p className="text-sm text-white/60">
            {formatTime(screening.time)} · {screening.venue.name}
          </p>
          {seatingLabel(screening) && (
            <p className="mt-1 text-[13px] text-white/50">{seatingLabel(screening)}</p>
          )}
          {screening.qanda && (
            <Badge variant="qanda" className="mt-2">
              Panel Discussion
            </Badge>
          )}
        </div>
        {past ? (
          <Button variant="disabled" disabled>
            Screening Ended
          </Button>
        ) : soldOut ? (
          <Button variant="disabled" disabled>
            Sold Out
          </Button>
        ) : (
          <Button href={screening.externalBookingUrl} external variant="primary">
            Book Tickets (External)
          </Button>
        )}
      </div>
      {tickets && tickets.length > 0 && <TicketTable ticketTypes={tickets} />}
    </div>
  );
}
