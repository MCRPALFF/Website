"use client";

import { useState } from "react";

export function MapEmbed({ name, address }: { name: string; address: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="mt-4 flex still-aspect w-full items-center justify-center rounded-[4px] bg-card-slate text-sm font-semibold uppercase tracking-wide text-brand-yellow"
      >
        Load interactive map
      </button>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-[4px] still-aspect">
      <iframe
        title={`Map of ${name}`}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        className="h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
