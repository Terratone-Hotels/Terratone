import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";
import ParallaxGallery from "@/components/ParallaxGallery";
import RichTextRenderer from "@/components/RichTextRenderer";
/**
 * @typedef {import("@prismicio/client").Content.DiningCtaSlice} DiningCtaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DiningCtaSlice>} DiningCtaProps
 * @type {import("react").FC<DiningCtaProps>}
 */
const DiningCta = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-20 "}
    >
      <div className="flex flex-col md:flex-row-reverse  justify-between gap-6">
        <div className="h-[290px]  md:w-[40%] md:h-[320px] lg:h-[440px] flex justify-end">
          <ParallaxGallery
            field={slice.primary.image_one}
            className=" w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col ">
          <div className="font-serif font-medium capitalize text-[25px] md:text-[38px] lg:text-[42px] leading-8 lg:leading-12">
            <RichTextRenderer field={slice.primary.heading} />
          </div>

          <div className="text-sm lg:text-lg font-barlow md:w-[70%] lg:w-[80%] pt-2 pb-5 md:pt-8 md:pb-10">
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
      </div>
      {/*Repeatable Group Below*/}
  {/* Mobile screen size
  width: 256.97705078125;
    height: 290.57476806640625;
    top: 1778.41px;
    left: 119.02px;
    angle: 0 deg;
    opacity: 1;
  */}
      <div>
        {slice.primary.parallax.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? "items-start" : "items-end"}  justify-center`}
          >
            <ParallaxGallery
              field={item.parallax_images}
              className=" w-[256px] h-[290px] lg:w-[566px] lg:h-[640px]"
            />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default DiningCta;
