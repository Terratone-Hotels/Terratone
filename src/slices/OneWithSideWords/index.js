import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
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
      className="flex flex-col items-center justify-center text-center py-12 mt-8 md:mt-44"
    >
      {/* Top heading */}
      <div className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium">
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      {/* Video + side words wrapper */}
      <div className="flex items-center justify-center w-full ">
        {/* Left word */}
        <div className="relative w-[20%] lg:w-auto flex items-center justify-center ">
          <div
            className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium
                          lg:rotate-0 -rotate-90 lg:text-right lg:pr-10"
          >
            <PrismicRichText field={slice.primary.left_word} />
          </div>
        </div>

        {/* Video in the center */}
        {/* Video in the center */}
        <div className="w-full md:w-[60%] aspect-[21/9] md:aspect-[21/9]">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right word */}
        <div className="relative w-[20%] lg:w-auto flex items-center justify-center">
          <div
            className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium
                          lg:rotate-0 rotate-90 md:text-left lg:pl-10"
          >
            <PrismicRichText field={slice.primary.right_word} />
          </div>
        </div>
      </div>

      <div className="mt-8 leading-tight font-barlow text-sm md:text-[18px]  text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>
      <div className="mt-6 flex justify-center items-center gap-2  ">
        <Button variant="secondary" className=" font-barlow">
          ABOUT US
        </Button>
        <Button showArrow variant="secondary" />
      </div>
    </Bounded>
  );
};

export default OneWithSideWords;
