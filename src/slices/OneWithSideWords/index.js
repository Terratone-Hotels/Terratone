import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.OneWithSideWordsSlice} OneWithSideWordsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OneWithSideWordsSlice>} OneWithSideWordsProps
 * @type {import("react").FC<OneWithSideWordsProps>}
 */
const OneWithSideWords = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center py-12"
    >
      {/* Top heading */}
      <div className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium">
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      {/* Video + side words wrapper */}
      <div className="flex items-center justify-center w-full mt-8">
        {/* Left word */}
        <div className="relative w-[20%] md:w-auto flex items-center justify-center">
          <div
            className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium
                          md:rotate-0 -rotate-90 md:text-right md:pr-10"
          >
            <PrismicRichText field={slice.primary.left_word} />
          </div>
        </div>

        {/* Video in the center */}
        <div className="w-[60%]">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right word */}
        <div className="relative w-[20%] md:w-auto flex items-center justify-center">
          <div
            className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium
                          md:rotate-0 rotate-90 md:text-left md:pl-10"
          >
            <PrismicRichText field={slice.primary.right_word} />
          </div>
        </div>
      </div>

      <div className="mt-8 font-barlow text-sm md:text-lg text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </Bounded>
  );
};

export default OneWithSideWords;
