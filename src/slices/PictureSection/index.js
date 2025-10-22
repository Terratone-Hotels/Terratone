import Bounded from "@/components/Bounded";
import CurtainRevealImage from "@/components/CurtainRevealImage";
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
      className={"mt-35"}
    >
      <div className="w-full h-screen">
        <CurtainRevealImage
          field={slice.primary.image}
          className="w-full h-full object-cover"
        />
      </div>
    </Bounded>
  );
};

export default PictureSection;
