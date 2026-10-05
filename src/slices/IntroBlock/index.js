"use client";

import Button from "@/components/Button";
import WhatsappButton from "@/components/WhatsappButton";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * @typedef {import("@prismicio/client").Content.IntroBlockSlice} IntroBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroBlockSlice>} IntroBlockProps
 * @type {import("react").FC<IntroBlockProps>}
 */
const IntroBlock = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-30"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="text-center font-serif font-medium text-[28px] lg:text-[2.625rem] capitalize leading-8 lg:leading-9">
              <RichTextRenderer field={slice.primary.heading} />
            </div>
            <div className="lg:w-[35%] w-[95%] md:w-[33%] text-center font-barlow  text-sm lg:text-lg leading-tight lg:pt-7 pt-5 pb-7 lg:pb-6">
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
        </section>
      )}
      {slice.variation === "withWhatsappButton" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-30"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="text-center font-serif font-medium text-[28px] lg:text-[2.625rem] capitalize leading-8 lg:leading-9">
              <RichTextRenderer field={slice.primary.heading} />
            </div>
            <div className="lg:w-[35%] w-[95%] md:w-[40%] text-center font-barlow  text-sm lg:text-lg leading-tight lg:pt-7 pt-5 pb-7 lg:pb-6">
              <RichTextRenderer field={slice.primary.description} />
            </div>
            <div className="flex flex-row items-center justify-center gap-5">
              <Button className="px-2.5 py-1">
                <PrismicNextLink field={slice.primary.button_link}>
                  {slice.primary.button_text}
                </PrismicNextLink>
              </Button>
              {isFilled.link(slice.primary.whatsapp_link) && (
                <WhatsappButton
                  field={slice.primary.whatsapp_link}
                  className="text-xs lg:text-sm"
                  arrowSpan="self-center"
                  arrowClassName="w-3! h-3!"
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default IntroBlock;
