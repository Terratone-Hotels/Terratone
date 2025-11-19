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
    <>
      {slice.variation === "default" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-20"
        >
          <div className="w-full h-dvh">
            <CurtainRevealImage
              field={slice.primary.image}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {slice.variation === "doublePictures" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="lg:w-[50%] h-1/2 md:h-dvh">
              <CurtainRevealImage
                field={slice.primary.image}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-[50%]  h-1/2 md:h-dvh">
              <CurtainRevealImage
                field={slice.primary.image_2}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === "trippleImage" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          
        >
          <div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="lg:w-[50%] lg:h-screen">
                <CurtainRevealImage
                  field={slice.primary.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-[50%] lg:h-screen">
                <CurtainRevealImage
                  field={slice.primary.image_2}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full mt-6 lg:h-screen">
              <CurtainRevealImage
                field={slice.primary.image_3}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default PictureSection;
