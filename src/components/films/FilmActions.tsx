"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function TrailerButton({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);
  const embed = url.replace("watch?v=", "embed/");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button variant="secondary" className="mt-4 w-full" onClick={() => setOpen(true)}>
        Watch Trailer
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Trailer for ${title}`}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[8px] bg-charcoal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-[4px] bg-charcoal/80 px-3 py-1 text-sm font-semibold text-white"
              aria-label="Close trailer"
            >
              Close
            </button>
            <div className="still-aspect w-full">
              <iframe
                src={embed}
                title={`Trailer for ${title}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ShareButton({ title }: { title: string }) {
  return (
    <Button
      variant="secondary"
      className="mt-4"
      onClick={() => {
        const url = window.location.href;
        if (navigator.share) navigator.share({ title, url });
        else navigator.clipboard.writeText(url);
      }}
    >
      Share this film
    </Button>
  );
}
