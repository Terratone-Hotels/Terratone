"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSectionMobile({ data, sectionHeading }) {
  // Group content by heading
  const grouped = {};
  data?.primary?.content?.forEach((item) => {
    const key = item.heading?.trim() || "Untitled";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  // Convert object to array for rendering
  const groupedContent = Object.entries(grouped);

  return (
    <div>
      {/* Section heading */}
      <div className="font-serif text-[30px] font-medium px-4 py-4">
        <PrismicText field={sectionHeading} />
      </div>

      {/* Grouped content */}
      <div>
        {groupedContent.map(([heading, items], index) => (
          <div key={index} className=" font-barlow ">
            {/* Heading */}
            <div className="sticky bg-stone top-12 z-10 ">
              <h2 className="text-lg font-semibold px-4 py-3 border-y">{heading}</h2>
            </div>

            {/* Items under this heading */}
            {items.map((item, i) => (
              <div key={i} className="px-4 py-3">
                {item.image && (
                  <PrismicNextImage field={item.image} className=" mb-3 w-full aspect-[8/6] object-cover" />
                )}
                <div className="rich-text">
                  {item.description?.length > 0 && (
                    <PrismicRichText field={item.description} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
