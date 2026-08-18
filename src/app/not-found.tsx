import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-[40px] font-bold text-brand-yellow">404</h1>
      <p className="mt-4 text-lg text-white/70">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 rounded-[4px] bg-brand-yellow px-6 py-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-charcoal"
      >
        Back to Home
      </Link>
    </div>
  );
}
