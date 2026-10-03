import type { MetadataRoute } from "next";

const BASE =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://lighthearted-donut-ea2217.netlify.app";

// Canonical public routes only (duplicates intentionally excluded).
const routes = [
  "",
  "/pricing",
  "/enterprise",
  "/government",
  "/cybersecurity",
  "/developer",
  "/education",
  "/academy",
  "/research",
  "/blog",
  "/about",
  "/careers",
  "/contact",
  "/docs",
  "/apireference",
  "/changelog",
  "/status",
  "/marketplace",
  "/app-builder",
  "/audio-lab",
  "/image-generation",
  "/knowledge-base",
  "/rivinity-lm",
  "/security",
  "/compliance",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
  }));
}
