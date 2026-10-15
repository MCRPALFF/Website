export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const startStr = startDate.toLocaleDateString("en-GB", opts);
  const endStr = endDate.toLocaleDateString("en-GB", {
    ...opts,
    year: "numeric",
  });
  return `${startStr} – ${endStr}`;
}

export function isPastScreening(date: string, time: string): boolean {
  return new Date(`${date}T${time}`) < new Date();
}

export function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function fromPrice(ticketTypes?: { price: number }[]) {
  if (!ticketTypes?.length) return "";
  const lowest = Math.min(...ticketTypes.map((t) => t.price));
  return `From ${formatGBP(lowest)}`;
}

export function seatingLabel(screening: {
  screen?: string;
  seating?: { total: number; standard?: number; luxury?: number; sofas?: number; lowIncome?: number };
}) {
  const parts: string[] = [];
  if (screening.screen) parts.push(`${screening.screen} screen`);
  if (screening.seating) {
    const { total, standard, luxury, sofas, lowIncome } = screening.seating;
    if (standard != null && luxury != null && sofas != null) {
      const sofaSeats = sofas * 2;
      const people = standard + luxury + sofaSeats + (lowIncome ?? 0);
      parts.push(
        `${people} seats · ${standard} standard · ${luxury} luxury · ${sofas} sofas (${sofaSeats} seats)${
          lowIncome != null ? ` · ${lowIncome} low income` : ""
        }`
      );
    } else {
      parts.push(`${total} seats`);
    }
  }
  return parts.join(" · ");
}

export function getCountdown(targetDate: string) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}
