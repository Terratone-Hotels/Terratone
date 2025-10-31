"use client";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.TipsExploreSlice} TipsExploreSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TipsExploreSlice>} TipsExploreProps
 * @type {import("react").FC<TipsExploreProps>}
 */
const TipsExplore = ({ slice }) => {
  const tips = slice.primary.tips || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full flex flex-col items-center justify-center py-20"
    >
      {/* Slice Heading */}
      <div className="text-center text-5xl mb-12 px-4">
        <RichTextRenderer field={slice.primary.heading} />
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-6xl w-full px-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`border-t  pt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 text-left ${
              index % 2 === 1 ? "md:pl-12" : "md:pr-12"
            }`}
          >
            {/* Tip Heading */}
            <div className="sm:w-1/2">
              <RichTextRenderer
                field={tip.heading}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="text-lg font-semibold">{children}</h3>
                  ),
                  paragraph: ({ children }) => (
                    <p className="text-lg font-semibold">{children}</p>
                  ),
                }}
              />
            </div>

            {/* Tip Description */}
            <div className="sm:w-1/2 black leading-relaxed">
              <RichTextRenderer
                field={tip.description}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsExplore;
