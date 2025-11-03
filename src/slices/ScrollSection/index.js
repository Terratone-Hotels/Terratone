"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Bounded from "@/components/Bounded";

gsap.registerPlugin(ScrollToPlugin);

const ScrollSection = ({ slice, context }) => {
  const content = slice?.primary?.content || [];
  const pinHeading = context?.pin_section_heading;

  // Helper: extract heading text safely
  const getHeadingText = (item) => {
    if (!item?.heading) return "";
    if (Array.isArray(item.heading) && item.heading[0]?.text)
      return item.heading[0].text;
    if (typeof item.heading === "string") return item.heading;
    return "";
  };

  // Unique headings (for left sidebar)
  const uniqueHeadings = useMemo(
    () =>
      Array.from(
        new Set(content.map((it) => getHeadingText(it)).filter(Boolean))
      ),
    [content]
  );

  // Map heading -> indices in content
  const headingToIndices = useMemo(() => {
    const map = {};
    content.forEach((item, idx) => {
      const h = getHeadingText(item);
      if (!h) return;
      if (!map[h]) map[h] = [];
      map[h].push(idx);
    });
    return map;
  }, [content]);

  const sectionRefs = useRef([]);
  const bulletRefs = useRef([]);
  const [activeHeading, setActiveHeading] = useState(uniqueHeadings[0] || "");

  // Observe active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heading = entry.target.dataset.heading;
            setActiveHeading(heading);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, [content]);

  // Animate bullet visibility
  useEffect(() => {
    bulletRefs.current.forEach((bullet, i) => {
      if (!bullet) return;
      const heading = uniqueHeadings[i];
      gsap.to(bullet, {
        scale: heading === activeHeading ? 1 : 0,
        opacity: heading === activeHeading ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  }, [activeHeading, uniqueHeadings]);

  // GSAP Smooth Scroll
  const handleScrollTo = (heading, occurrence = 0) => {
    const indices = headingToIndices[heading] || [];
    if (indices.length === 0) return;

    const targetIndex = indices[Math.min(occurrence, indices.length - 1)];
    const el = sectionRefs.current[targetIndex];
    if (!el) return;

    gsap.to(window, {
      duration: 1.5, // scroll duration
      scrollTo: { y: el, offsetY: 100 },
      ease: "power2.inOut", // slow start + slow end
    });
  };

  return (
    <Bounded className="scroll-section relative">
      <div className="border-t-1 border-b-1">
        <div className="mt-12 flex flex-col md:flex-row gap-2 mb-12">
          {/* LEFT: Sticky Headings */}
          <div className="w-full md:w-[40%] sticky top-[10vh] self-start h-fit">
            {pinHeading && (
              <h1 className="text-4xl xl:text-5xl  mb-15 font-serif font-medium text-black">
                <PrismicRichText field={pinHeading} />
              </h1>
            )}

            {uniqueHeadings.length > 0 ? (
              uniqueHeadings.map((heading, index) => (
                <div
                  key={`${heading}-${index}`}
                  onClick={() => handleScrollTo(heading, 0)}
                  className="flex items-center gap-2 mb-2 cursor-pointer select-none group"
                >
                  <div
                    ref={(el) => (bulletRefs.current[index] = el)}
                    className="w-5 h-5 rounded-full bg-black opacity-0 scale-0"
                  />
                  
                  <h1
                    className={`text-3xl xl:text-3xl font-barlow transition-colors duration-200 ${
                      heading === activeHeading
                        ? "text-black font-bold"
                        : "text-gray-400 group-hover:text-black"
                    }`}
                  >
                    {heading}
                  </h1>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No headings found.</p>
            )}
          </div>

          {/* RIGHT: Scrollable Content */}
          <div className="w-full md:w-[60%] border-l-1 pl-4">
            {content.length > 0 ? (
              content.map((item, index) => {
                const headingText = getHeadingText(item);
                const isEven = index % 2 === 0;

                // ✅ Handle all text field names gracefully
                const textField =
                  item.content ||
                  item.description ||
                  item.text ||
                  item.body ||
                  null;

                return (
                  <div
                    key={`section-${index}`}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    data-heading={headingText}
                    className="px-6 mb-32 flex flex-col items-center text-black font-barlow scroll-mt-32"
                  >
                    {/* IMAGE */}
                    {item.image?.url && (
                      <PrismicNextImage
                        field={item.image}
                        className={`aspect-square max-w-[300px] xl:max-w-[500px] object-cover ${
                          isEven ? "self-start" : "self-end"
                        }`}
                      />
                    )}

                    {/* DESCRIPTION */}
                    <div
                      className={`mt-12 md:w-[80%] font-medium  leading-tight text-xl xl:text-xl rich-text ${
                        isEven ? "self-end text-left" : "self-start text-left"
                      }`}
                    >
                      {textField ? (
                        <PrismicRichText field={textField} />
                      ) : (
                        <p className="text-gray-400 italic">
                          No content provided.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic">No content found.</p>
            )}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default ScrollSection;
