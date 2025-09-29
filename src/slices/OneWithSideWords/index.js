import VideoComponent from "@/app/components/VideoComponent";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.OneWithSideWordsSlice} OneWithSideWordsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OneWithSideWordsSlice>} OneWithSideWordsProps
 * @type {import("react").FC<OneWithSideWordsProps>}
 */
const OneWithSideWords = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center px-4 py-12 mt-44 "
    >
      <div className="mb-6 text-3xl md:text-5xl font-serif ">
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      <div className="relative flex items-center justify-center w-full max-w-5xl">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xl md:text-2xl ">
          <PrismicRichText field={slice.primary.left_word} />
        </div>

        <div className="w-full md:w-3/4 aspect-video">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover  shadow-lg"
          />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xl md:text-2xl ">
          <PrismicRichText field={slice.primary.right_word} />
        </div>
      </div>

      <div className="mt-8 max-w-xl text-sm md:text-base text-gray-700">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default OneWithSideWords;
