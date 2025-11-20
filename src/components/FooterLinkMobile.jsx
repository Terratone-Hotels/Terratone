"use client";
import { PrismicNextLink } from "@prismicio/next";

export default function FooterLinkMobile({
  field,
  children,
  method,
  nextLinkClasses,
  innerSpanClassName,
}) {
  // Telephone

  if (method === "Telephone") {
    return (
      <PrismicNextLink
        href={`tel:${field}`}
        className={`group inline-flex items-end relative ${nextLinkClasses}`}
      >
        <div className="flex flex-row hover:text-black font-medium gap-1">
          <span className={innerSpanClassName}>{children}</span>
        </div>
      </PrismicNextLink>
    );
  }

  // Mail
  if (method === "Mail") {
    return (
      <PrismicNextLink
        href={`mailto:${field}`}
        className={`group inline-flex items-end relative ${nextLinkClasses}`}
      >
        <div className="flex flex-row hover:text-black font-medium gap-1">
          <span className={innerSpanClassName}>{children}</span>
        </div>
      </PrismicNextLink>
    );
  }

  // ✅ Check if field is a valid Prismic link object
  const isPrismicLink =
    field && typeof field === "object" && "link_type" in field;

  if (isPrismicLink) {
    return (
      <PrismicNextLink
        field={field}
        className={`group inline-flex items-end relative ${nextLinkClasses}`}
      >
        <div className="flex flex-row hover:text-black font-medium gap-1">
          <span className={innerSpanClassName}>{children}</span>
        </div>
      </PrismicNextLink>
    );
  }
  return null;
}
