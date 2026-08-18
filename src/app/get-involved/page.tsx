import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, partner, sponsor, or donate to the MCR Palestine Film Festival.",
};

function FormField({
  id,
  label,
  type = "text",
  required,
  as = "input",
  options,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  options?: string[];
}) {
  const baseClass =
    "mt-2 w-full rounded-[4px] border border-white/20 bg-charcoal px-4 py-2 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
        {required && <span className="text-burgundy"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} required={required} rows={4} className={baseClass} />
      ) : as === "select" ? (
        <select id={id} name={id} required={required} className={baseClass}>
          <option value="">Select...</option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={id} type={type} required={required} className={baseClass} />
      )}
    </div>
  );
}

function FormSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[4px] bg-card-slate p-8">
      <h2 className="text-xl font-bold text-brand-yellow">{title}</h2>
      <p className="mt-2 text-sm text-white/70">{description}</p>
      <form className="mt-6 space-y-4" action={`/api/${id}`} method="post">
        {children}
        <button
          type="submit"
          className="rounded-[4px] bg-brand-yellow px-6 py-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-charcoal"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="Join us as a volunteer, partner, sponsor, or supporter."
      />

      <div className="container-site section-spacing space-y-12">
        <FormSection id="volunteer" title="Volunteer" description="Help us deliver an unforgettable festival experience.">
          <FormField id="name" label="Full name" required />
          <FormField id="email" label="Email" type="email" required />
          <FormField
            id="role"
            label="Role interest"
            as="select"
            required
            options={[
              "Front of house",
              "Programming support",
              "Marketing & social",
              "Accessibility support",
              "General volunteer",
            ]}
          />
          <FormField id="availability" label="Availability" required />
          <FormField id="statement" label="Why do you want to volunteer?" as="textarea" required />
        </FormSection>

        <FormSection
          id="partner"
          title="Partner With Us"
          description="Collaborate with the festival on programming, outreach, or community events."
        >
          <FormField id="org-name" label="Organisation name" required />
          <FormField id="contact-name" label="Contact name" required />
          <FormField id="email" label="Email" type="email" required />
          <FormField id="message" label="Tell us about your organisation" as="textarea" required />
        </FormSection>

        <FormSection
          id="sponsor"
          title="Sponsor"
          description="Support Palestinian cinema and reach engaged Manchester audiences."
        >
          <FormField id="company" label="Company / organisation" required />
          <FormField id="email" label="Email" type="email" required />
          <FormField id="tier" label="Sponsorship tier interest" as="select" options={["Gold", "Silver", "Bronze", "In-kind"]} />
          <FormField id="message" label="Message" as="textarea" />
        </FormSection>

        <FormSection
          id="press"
          title="Press Accreditation"
          description="Request media accreditation for festival screenings and events."
        >
          <FormField id="outlet" label="Publication / outlet" required />
          <FormField id="name" label="Your name" required />
          <FormField id="email" label="Email" type="email" required />
          <FormField id="role" label="Role / title" required />
        </FormSection>

        <section id="donate" className="scroll-mt-24 rounded-[4px] bg-card-slate p-8">
          <h2 className="text-xl font-bold text-brand-yellow">Donate</h2>
          <p className="mt-2 text-sm text-white/70">
            Your donation helps us bring Palestinian cinema to Manchester audiences.
            Payments are processed securely via our hosted checkout — no card details
            are collected on this site.
          </p>
          <a
            href="https://donate.stripe.com/example"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-[4px] bg-brand-yellow px-6 py-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-charcoal"
          >
            Donate Now
          </a>
        </section>

        <section id="newsletter" className="scroll-mt-24 rounded-[4px] bg-card-slate p-8">
          <h2 className="text-xl font-bold text-brand-yellow">Newsletter</h2>
          <p className="mt-2 text-sm text-white/70">
            Festival updates, programme announcements, and ticket alerts.
          </p>
          <form className="mt-6 flex flex-col gap-4 sm:flex-row" action="/api/newsletter" method="post">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-[4px] border border-white/20 bg-charcoal px-4 py-2 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-[4px] bg-brand-yellow px-6 py-3 text-[15px] font-semibold uppercase tracking-[0.04em] text-charcoal"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
