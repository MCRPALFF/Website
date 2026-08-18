"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

export function CountdownTicker({ festivalStartDate }: { festivalStartDate: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(festivalStartDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(festivalStartDate));
    }, 60_000);
    return () => clearInterval(interval);
  }, [festivalStartDate]);

  const startFormatted = new Date(festivalStartDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div aria-live="off" aria-label={`Festival opens ${startFormatted}`}>
      <p className="sr-only">Festival opens {startFormatted}</p>
      <div className="hidden items-center gap-6 sm:flex">
        <CountdownBlock value={countdown.days} label="Days" />
        <span className="text-brand-yellow/40">:</span>
        <CountdownBlock value={countdown.hours} label="Hours" />
        <span className="text-brand-yellow/40">:</span>
        <CountdownBlock value={countdown.minutes} label="Minutes" />
      </div>
      <p className="font-display text-lg font-semibold text-brand-yellow sm:hidden">
        {countdown.days}d {String(countdown.hours).padStart(2, "0")}h
      </p>
    </div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-semibold tabular-nums text-brand-yellow md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[13px] uppercase tracking-wide text-white/60">{label}</span>
    </div>
  );
}
