# MCR Palestine Film Festival

Website for [mcrpalff.org](https://mcrpalff.org).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

## Environment

Copy `.env.example` to `.env.local` and set values as needed:

- `NEXT_PUBLIC_SITE_URL` for canonical/sitemap/robots URLs.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` to enable bot protection on public forms.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/program` | Programme with filters |
| `/films/[slug]` | Film detail |
| `/venues` | Venue logistics |
| `/about` | Mission, team, partners |
| `/archive` | Past editions |
| `/get-involved` | Volunteer, partner, donate |
