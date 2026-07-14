import { createClient } from "@/prismicio";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://terratonehotels.com";

/**
 * Public marketing routes only.
 * /our-story intentionally omitted (page paused — do not index via sitemap).
 */
const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/stay", changeFrequency: "weekly", priority: 0.9 },
  { path: "/stay/deluxe-suite", changeFrequency: "weekly", priority: 0.8 },
  { path: "/stay/deluxe-king", changeFrequency: "weekly", priority: 0.8 },
  { path: "/stay/deluxe-twin", changeFrequency: "weekly", priority: 0.8 },
  { path: "/dine", changeFrequency: "weekly", priority: 0.8 },
  { path: "/discover", changeFrequency: "weekly", priority: 0.8 },
  { path: "/meet", changeFrequency: "weekly", priority: 0.8 },
  { path: "/meet/banquet-hall", changeFrequency: "weekly", priority: 0.7 },
  { path: "/meet/conference-room", changeFrequency: "weekly", priority: 0.7 },
  { path: "/meet/media-room", changeFrequency: "weekly", priority: 0.7 },
];

/**
 * App Router sitemap — served at /sitemap.xml
 * Production host: terratonehotels.com (not *.vercel.app)
 */
export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  let dynamicEntries = [];

  try {
    const client = createClient();
    const pages = await client.getAllByType("page");

    dynamicEntries = pages
      .filter((page) => page.uid && page.uid !== "our-story")
      .map((page) => ({
        url: `${SITE_URL}/${page.uid}`,
        lastModified: page.last_publication_date
          ? new Date(page.last_publication_date)
          : now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch {
    dynamicEntries = [];
  }

  return [...staticEntries, ...dynamicEntries];
}
