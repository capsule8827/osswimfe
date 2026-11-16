import { competitions } from "@/lib/data";

const BASE_URL = "https://osswimfe.vercel.app";
const LAST_MODIFIED = "2026-11-16";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  const staticRoutes = ["", "/about", "/competitions", "/results", "/news"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: LAST_MODIFIED,
  }));

  const competitionRoutes = competitions.map((competition) => ({
    url: `${BASE_URL}/competitions/${competition.id}`,
    lastModified: LAST_MODIFIED,
  }));

  return [...staticRoutes, ...competitionRoutes];
}
