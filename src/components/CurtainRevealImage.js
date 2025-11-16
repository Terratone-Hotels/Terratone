"use client";

import { PrismicNextImage } from "@prismicio/next";

/**
 * CLEAN VERSION — NO ANIMATION
 * Only renders the Prismic image safely.
 */
export default function CurtainRevealImage({
  field,
  alt = "Image",
  className = "",
}) {
  return (
    <div
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 0 }}
    >
      {field ? (
        <PrismicNextImage
          field={field}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 text-sm">
          Missing Image
        </div>
      )}
    </div>
  );
}
