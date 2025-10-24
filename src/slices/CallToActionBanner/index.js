import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import CurtainRevealImage from "@/components/CurtainRevealImage";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.CallToActionBannerSlice} CallToActionBannerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CallToActionBannerSlice>} CallToActionBannerProps
 * @type {import("react").FC<CallToActionBannerProps>}
 */
const CallToActionBanner = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Container for the image and content, with a fixed height and relative positioning */}
      <div className="relative w-full h-[524px]">
        {/* Image container */}
        <div className="absolute inset-0">
          <CurtainRevealImage
            field={slice.primary.image}
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content Container: Centers the text and button */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          {/* Text/Message container */}
          <div className="max-w-[76%] text-center text-white font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            <RichTextRenderer
              field={slice.primary.message}
             
            />
          </div>

          {/* Button Link container */}
          <div className="mt-5">
            <Button className="bg-white px-2 py-1">
              <PrismicNextLink
                field={slice.primary.button_link}
              >{slice.primary.button_text}</PrismicNextLink>
            </Button>
          </div>
        </div>

    
      </div>
    </Bounded>
  );
};

export default CallToActionBanner;
