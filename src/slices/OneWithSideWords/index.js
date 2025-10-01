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
      className="flex flex-col items-center justify-center text-center px-4 py-12"
    >
      {/* Top heading */}
      <div className="mb-6 text-[1.75rem] md:text-[2.625rem] font-serif font-medium">
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      {/* Video + side words wrapper */}
      <div className="w-full max-w-5xl flex items-center justify-center gap-4">
        {/* Left word */}
        <div className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium -rotate-90 md:rotate-0">
          <PrismicRichText field={slice.primary.left_word} />
        </div>

        {/* Video in the center */}
        <div className=" w-3/4 md:w-3/4 aspect-video">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Right word */}
        <div className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium rotate-90 md:rotate-0">
          <PrismicRichText field={slice.primary.right_word} />
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 items-center font-barlow text-sm md:text-lg text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </Bounded>
  )
};

export default OneWithSideWords;
