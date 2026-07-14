import { asLink, asText } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JsonLd from "@/components/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://terratonehotels.com";

/** Official identity URLs only — not broken OTA links from the crawl audit. */
const DEFAULT_SAME_AS = ["https://www.instagram.com/terratonehotels/"];

const DEFAULT_IMAGE =
  "https://images.prismic.io/terratone-hotels/aR8EZ2GnmrmGqEqn_5X8A2878_result-1-.webp?auto=format%2Ccompress&fit=max&w=1200";

function stripEmpty(value) {
  if (value === null || value === undefined || value === "") return undefined;
  if (Array.isArray(value)) {
    const next = value.map(stripEmpty).filter((v) => v !== undefined);
    return next.length ? next : undefined;
  }
  if (typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      const cleaned = stripEmpty(v);
      if (cleaned !== undefined) next[k] = cleaned;
    }
    return Object.keys(next).length ? next : undefined;
  }
  return value;
}

/**
 * Sitewide Hotel entity for SEO + local discovery ("hotels in Kollam").
 * Not visible on the page — only in HTML source as JSON-LD.
 */
export default async function HotelJsonLd() {
  let streetAddress;
  let telephone;
  let email;
  let hasMap;
  let sameAs = [...DEFAULT_SAME_AS];
  let ratingValue;
  let reviewCount;

  try {
    const client = createClient();
    const footer = await client.getSingle("footer_settings");
    const data = footer.data;

    streetAddress = asText(data.address)?.trim() || undefined;

    const directionUrl = asLink(data.direction);
    if (directionUrl) hasMap = directionUrl;

    for (const item of data.contacts_list || []) {
      const method = (item.method || "").toLowerCase();
      const text = (item.link_text || "").trim();
      if (method === "telephone" && text) {
        telephone = text.replace(/\s+/g, " ");
      }
      if (method === "mail" && text && text.includes("@")) {
        email = text;
      }
    }

    for (const item of data.follow_links || []) {
      const url = asLink(item.link);
      if (
        url &&
        !sameAs.includes(url) &&
        !url.includes("booking.com/https://")
      ) {
        sameAs.push(url);
      }
    }

    if (typeof data.rating === "number" && data.rating > 0) {
      ratingValue = data.rating;
    }
    const countRaw = asText(data.review_count)?.replace(/[^\d]/g, "");
    if (countRaw) reviewCount = Number(countRaw);
  } catch {
    // Still emit a valid Hotel entity with static Kollam facts
  }

  const schema = stripEmpty({
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${SITE_URL}/#hotel`,
    name: "Terratone",
    alternateName: [
      "Terratone Hotels",
      "Terratone Boutique Business Hotel",
    ],
    description:
      "Boutique business hotel in Kollam, Kerala — a coastal stay near Ashtamudi Lake and the Arabian Sea, with rooms, dining, and meeting spaces.",
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Kollam",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    telephone,
    email,
    hasMap,
    sameAs,
    priceRange: "$$",
    ...(ratingValue && reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            reviewCount,
            bestRating: 5,
          },
        }
      : {}),
  });

  return <JsonLd data={schema} />;
}
