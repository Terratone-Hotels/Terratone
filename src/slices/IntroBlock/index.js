import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import RichTextRenderer from "@/components/RichTextRenderer";
import GuitarStrings from "@/components/GuitarStrings";
import SplitButton from "@/components/SplitButton";

/**
 * @typedef {import("@prismicio/client").Content.IntroBlockSlice} IntroBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroBlockSlice>} IntroBlockProps
 * @type {import("react").FC<IntroBlockProps>}
 */
const IntroBlock = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"h-auto"}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="text-center font-serif font-medium text-[28px] lg:text-[2.625rem] capitalize leading-8 lg:leading-12">
          <RichTextRenderer field={slice.primary.heading} />
        </div>
        <div className="lg:w-[35%] w-[95%] md:w-[33%] text-center font-barlow  text-sm lg:text-lg leading-tight lg:pt-7 pt-5 pb-7 lg:pb-12">
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
    </Bounded>
  );
};

export default IntroBlock;
