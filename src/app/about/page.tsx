import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { getFestivalYears, getPartners, getSponsors, getTeam } from "@/lib/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the MCR Palestine Film Festival — our mission, story, team, and partners.",
};

export default function AboutPage() {
  const team = getTeam();
  const sponsors = getSponsors();
  const partners = getPartners();
  const years = getFestivalYears();

  return (
    <>
      <PageHero title="About" subtitle="Celebrating Palestinian cinema in Manchester since 2023." />

      <div className="container-site section-spacing space-y-24">
        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Mission</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
            The MCR Palestine Film Festival exists to bring Palestinian stories to
            Manchester audiences — on the big screen, in community, and with the
            urgency they deserve. We believe cinema is a vital act of witness,
            connection, and resistance. Our programme spans feature-length drama,
            documentary, and short film, curated to challenge, inspire, and open
            conversation.
          </p>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Our Story</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-white/80">
            Born from a grassroots collective of filmmakers, activists, and cinema
            lovers in Manchester, the festival launched in 2023 with a single venue
            and a handful of screenings. Each year since, we&apos;ve grown — more films,
            more venues, more voices — while staying true to our founding belief:
            that Palestinian cinema belongs on every screen, and every audience
            deserves access to it.
          </p>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Timeline</h2>
          <div className="relative mt-10 border-l-2 border-burgundy pl-8">
            {years.map((year) => (
              <div key={year.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow">
                  <span className="h-2 w-2 rounded-full bg-charcoal" />
                </span>
                <p className="font-display text-2xl font-semibold text-brand-yellow">{year.year}</p>
                {year.summaryStats && (
                  <p className="mt-2 text-sm text-white/60">
                    {year.summaryStats.films} films · {year.summaryStats.venues} venues ·{" "}
                    {year.summaryStats.attendance?.toLocaleString()} attendees
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Team</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                {member.photo && (
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      quality={65}
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="mt-4 font-semibold text-white">{member.name}</p>
                <p className="text-sm text-white/60">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Sponsors</h2>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            {sponsors.map((s) => (
              <a key={s._id} href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">
                <div className="relative h-16 w-32">
                  <Image src={s.logo} alt={s.name} fill quality={60} sizes="128px" className="object-contain" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Partners</h2>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            {partners.map((p) => (
              <a key={p._id} href={p.url} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">
                <div className="relative h-16 w-32">
                  <Image src={p.logo} alt={p.name} fill quality={60} sizes="128px" className="object-contain" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[28px] font-bold text-brand-yellow">Press Resources</h2>
          <p className="mt-4 max-w-2xl text-white/80">
            Download our media kit for logos, press releases, and high-resolution
            imagery. For press enquiries, contact{" "}
            <a href="mailto:press@mcrpalff.org" className="text-brand-yellow hover:text-burgundy">
              press@mcrpalff.org
            </a>
            .
          </p>
          <a
            href="/media-kit.pdf"
            className="mt-6 inline-flex rounded-[4px] border border-brand-yellow px-6 py-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-brand-yellow"
          >
            Download Media Kit
          </a>
        </section>
      </div>
    </>
  );
}
