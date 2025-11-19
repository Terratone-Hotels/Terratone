import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import VideoComponent from "@/components/VideoComponent";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * @typedef {import("@prismicio/client").Content.ReversedDestinationHighlightsSlice} ReversedDestinationHighlightsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ReversedDestinationHighlightsSlice>} ReversedDestinationHighlightsProps
 * @type {import("react").FC<ReversedDestinationHighlightsProps>}
 */
const ReversedDestinationHighlights = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">
            {/* Left Side Text */}
            <div className="md:sticky md:top-10 md:w-1/2 space-y-3 lg:space-y-5">
              {/* Animated Heading */}
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[25px] lg:text-[42px]  font-serif font-medium leading-5 md:leading-[2rem] "
              />

              {/* Animated Description */}
              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg  font-barlow text-black leading-tight md:w-full"
              />

              {/* Button */}
              <div>
                <Button className="px-2.5 py-1">
                  {slice.primary.button_text}
                </Button>
              </div>

              {/* Optional Link */}
              {slice.primary.explore_button?.url && (
                <PrismicNextLink field={slice.primary.explore_button} />
              )}
            </div>

            {/* Right Side Media */}
            <div className="w-full items-end flex gap-3 md:gap-6 ">
              {/* LEFT SMALL BLOCK */}
              <div
                className="
      
      w-[15%]
             /* half size */
   
      self-end          /* push to bottom */
      overflow-hidden
    "
              >
                {slice.primary.video_id ? (
                  <VideoComponent
                    srcMp4={slice.primary.video_id}
                    className="w-full h-full object-cover object-center aspect-square"
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="w-full h-full object-cover object-center aspect-square"
                  />
                )}
              </div>

              {/* RIGHT BIG BLOCK (YOUR EXISTING ONE) */}
              <div
                className="
      
     w-[85%] 
      h-[10rem]
      md:h-[25rem]
      lg:h-[35rem]
      overflow-hidden
    "
              >
                {slice.primary.video_id ? (
                  <VideoComponent
                    srcMp4={slice.primary.video_id}
                    className="w-full h-full object-cover object-center "
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === "oppositeLayout" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className={"overflow-hidden "}
        >
          <div className="flex flex-col md:flex-row lg:px-30 gap-5 md:items-center">
            {/* Left Side Media */}
            <div
              className="
                  w-full
                  md:w-1/2 
                  h-[21.875rem]
                  md:h-[32rem]
                  lg:h-[36rem]
                  overflow-hidden
                "
            >
              {slice.primary.video_id ? (
                <VideoComponent
                  srcMp4={slice.primary.video_id}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>

            {/* Right Side Text */}
            <div className="lg:pl-30 md:w-1/2 space-y-5">
              {/* Animated Heading */}
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[2.625rem]  font-serif font-medium leading-7 md:leading-[3rem]"
              />

              {/* Animated Description */}
              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg font-barlow text-black leading-tight md:w-[65%]"
              />

              {/* Button */}
              <div>
                <Button className="px-2.5 py-1">
                  {slice.primary.button_text}
                </Button>
              </div>

              {/* Optional Link */}
              {slice.primary.explore_button?.url && (
                <PrismicNextLink field={slice.primary.explore_button} />
              )}
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === "centeredRightLeft" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className={"overflow-hidden "}
        >
          <div className="flex flex-col-reverse md:flex-row gap-5 lg:px-30 md:items-center ">
            {/* Left Side Text */}
            <div className="md:w-1/2 space-y-5">
              {/* Animated Heading */}
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[2.625rem] lg:text-6xl font-serif font-medium leading-7 md:leading-12"
              />

              {/* Animated Description */}
              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg font-barlow text-black leading-tight md:w-[65%]"
              />

              {/* Button */}
              <div>
                <Button className="px-2.5 py-1">
                  <PrismicNextLink field={slice.primary.button_link}>
                    {slice.primary.button_text}
                  </PrismicNextLink>
                </Button>
              </div>
            </div>

            {/* Right Side Media */}
            <div
              className="
                  w-full
                  md:w-1/2 
                  h-[21.875rem]
                  md:h-[32rem]
                  lg:h-[36rem]
                  overflow-hidden
                "
            >
              {slice.primary.video_id ? (
                <VideoComponent
                  srcMp4={slice.primary.video_id}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default ReversedDestinationHighlights;
