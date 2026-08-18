interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-card-slate">
      <div className="container-site py-16 md:py-24">
        <h1 className="text-[40px] font-bold leading-tight text-brand-yellow md:text-[56px]">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}
