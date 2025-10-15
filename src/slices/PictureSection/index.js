import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.PictureSectionSlice} PictureSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureSectionSlice>} PictureSectionProps
 * @type {import("react").FC<PictureSectionProps>}
 */
const PictureSection = ({ slice }) => {
  return (
   
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-20"}
    >
       {/*width: 1392;
          height: 779;
          top: 3065px;
          left: 24px;
          angle: 0 deg;
          opacity: 1;
      */}
      <div className="w-full h-[779px]">
        <PrismicNextImage field={slice.primary.image} className="w-full h-full object-cover" />
      </div>
    </Bounded>
  );
};

export default PictureSection;
