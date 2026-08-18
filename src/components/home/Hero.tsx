import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CountdownTicker } from "./CountdownTicker";
import { formatDateRange } from "@/lib/utils";

interface HeroProps {
  heroImage: string;
  festivalDates: { start: string; end: string };
  ctaLabel: string;
  ctaLink: string;
}

export function Hero({ heroImage, festivalDates, ctaLabel, ctaLink }: HeroProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] xl:min-h-[80vh]">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        quality={65}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      <div className="container-site relative flex min-h-[50vh] flex-col justify-end py-8 md:min-h-[60vh] xl:min-h-[80vh] xl:py-12">
        <h1 className="font-display text-2xl font-semibold text-brand-yellow md:text-3xl">
          MCR Palestine Film Festival
        </h1>
        <p className="mt-2 text-lg text-white/80">
          {formatDateRange(festivalDates.start, festivalDates.end)}
        </p>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Button href={ctaLink} variant="primary">
            {ctaLabel}
          </Button>
          <CountdownTicker festivalStartDate={festivalDates.start} />
        </div>
      </div>
    </section>
  );
}
