import type { TicketType } from "@/lib/types";
import { formatGBP } from "@/lib/utils";

export function TicketTable({
  ticketTypes,
  heading = "Tickets",
}: {
  ticketTypes: TicketType[];
  heading?: string;
}) {
  if (!ticketTypes.length) return null;

  const totalTickets = ticketTypes.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <div className="mt-4 overflow-hidden rounded-[4px] border border-white/10">
      <p className="bg-charcoal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-brand-yellow">
        {heading}
      </p>
      <table className="w-full text-sm">
        <caption className="sr-only">{heading}</caption>
        <thead className="border-b border-white/10 text-left text-[13px] uppercase tracking-wide text-white/50">
          <tr>
            <th className="px-4 py-2 font-semibold">Type</th>
            <th className="px-4 py-2 font-semibold">Tickets</th>
            <th className="px-4 py-2 text-right font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketTypes.map((ticket) => (
            <tr key={ticket.id} className="border-b border-white/5 last:border-0">
              <td className="px-4 py-2 text-white">{ticket.name}</td>
              <td className="px-4 py-2 text-white/70">{ticket.quantity}</td>
              <td className="px-4 py-2 text-right font-semibold text-brand-yellow">
                {formatGBP(ticket.price)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-white/60">
            <td className="px-4 py-2">Total on sale</td>
            <td className="px-4 py-2">{totalTickets}</td>
            <td className="px-4 py-2 text-right">{fromRange(ticketTypes)}</td>
          </tr>
        </tfoot>
      </table>
      {ticketTypes.some((t) => t.id === "sofa") && (
        <p className="px-4 py-3 text-[13px] leading-relaxed text-white/50">
          Each sofa seats 2.
        </p>
      )}
      {ticketTypes.some((t) => t.id === "low-income") && (
        <p className="px-4 py-3 text-[13px] leading-relaxed text-white/50">
          Low Income tickets are limited. Please only book this rate if you need it,
          so it stays available for those who do.
        </p>
      )}
    </div>
  );
}

function fromRange(ticketTypes: TicketType[]) {
  const prices = ticketTypes.map((t) => t.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return formatGBP(min);
  return `${formatGBP(min)}–${formatGBP(max)}`;
}
