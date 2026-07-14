/**
 * Renders Schema.org JSON-LD (invisible in the UI; for search / answer engines).
 * Uses dangerouslySetInnerHTML so the JSON is emitted as raw script content (React standard for JSON-LD).
 * Content is our controlled schema object only — not visitor HTML.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
