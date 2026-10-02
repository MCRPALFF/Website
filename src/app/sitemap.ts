import type { MetadataRoute } from "next";
import { getAllFilms } from "@/lib/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mcrpalff.org";
  const films = getAllFilms();

  const staticRoutes = ["", "/program", "/venues", "/about", "/archive", "/get-involved"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const filmRoutes = films.map((film) => ({
    url: `${baseUrl}/films/${film.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...filmRoutes];
}
