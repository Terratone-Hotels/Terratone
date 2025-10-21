import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
/**
 * @typedef {import("@prismicio/client").Content.AboutTheRoomSlice} AboutTheRoomSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AboutTheRoomSlice>} AboutTheRoomProps
 * @type {import("react").FC<AboutTheRoomProps>}
 */
const AboutTheRoom = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-20"}
    >
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row">
        {/* Left side */}
        <div className="lg:w-[50%] mb-4">
          <div className="lg:w-[80%] font-serif text-[25px] font-medium capitalize lg:text-[42px] leading-tight lg:leading-12">
            <PrismicRichText field={slice.primary.quote} />
          </div>
        </div>
        {/* Right side  */}
        <div className="lg:w-[50%]">
          <div className="lg:w-[55%] font-barlow leading-tight">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div className="mt-9">
            <Button className="px-2 py-1">
              <PrismicNextLink field={slice.primary.button_link}>
                {slice.primary.button_text}
              </PrismicNextLink>
            </Button>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default AboutTheRoom;
