"use client";
import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";
import ParallaxGallery from "@/components/ParallaxGallery";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * @typedef {import("@prismicio/client").Content.DiningCtaSlice} DiningCtaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DiningCtaSlice>} DiningCtaProps
 * @type {import("react").FC<DiningCtaProps>}
 */
const DiningCta = ({ slice }) => {
  return (
    // The Bounded component wraps the entire slice content
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[0.9375rem] md:px-6 mt-15 lg:mt-30"
    >
      {/* Section 1: The main CTA content */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-start gap-6">
        <div className="h-[290px] w-full md:w-[40%] md:h-[320px] lg:h-[440px] flex-shrink-0">
          {/* --- CHANGE 1: Use PrismicNextImage for the single CTA image --- */}
          {/* ParallaxGallery is for a list of images, so PrismicNextImage is the correct component for a single image field. */}
          <PrismicNextImage
            field={slice.primary.image_one}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="font-serif font-medium capitalize text-[25px] md:text-[38px] lg:text-[42px] leading-8  items-start">
            <RichTextRenderer field={slice.primary.heading} />
          </div>

          <div className="text-sm lg:text-lg font-barlow md:w-[70%] lg:w-[80%] pt-2 pb-5 md:pt-8 md:pb-10">
            <RichTextRenderer field={slice.primary.description} />
          </div>

          <div>
            <Button className="px-2.5 py-1">
              <PrismicNextLink field={slice.primary.button_link}>
                {slice.primary.button_text}
              </PrismicNextLink>
            </Button>
          </div>
        </div>

        {/* --- CHANGE 2: The old simple image map is removed from here --- */}
      </div>

      {/* --- CHANGE 3: The ParallaxGallery component is added here --- */}
      {/* It sits outside the flex container to take up its own space and follows the CTA. */}
      {/* We pass the entire 'slice' object to it, as the component is designed to find the parallax images within it. */}
      <div className="mt-20">
        <ParallaxGallery slice={slice} />
      </div>
    </section>
  );
};

export default DiningCta;
