import Bounded from "@/components/Bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";
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
      <div className="flex flex-col md:flex-row-reverse ">
        <div className="h-[290px] md:h-[540px] lg:h-[640px] justify-items-end ">
          <PrismicNextImage
            field={slice.primary.image_one}
            className="w-[256px] lg:w-[566px] h-full object-cover justify-items-end"
          />
        </div>
        <div className=" mt-15 lg:w-1/2 flex flex-col flex-1">
          <div className="font-serif font-medium capitalize text-[25px] md:text-[42px] leading-8 lg:leading-12 ">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div className="text-sm lg:text-lg font-barlow lg:w-[50%] pt-2 pb-5 md:pt-8 md:pb-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div>
            <Button className={"uppercase"}>
              <PrismicNextLink field={slice.primary.button_link}>
                {slice.primary.button_text}
              </PrismicNextLink>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-15 lg:-mt-40">
          <PrismicNextImage
            field={slice.primary.image_two}
            className=" w-[256px] lg:w-[566px] h-[290px] lg:h-[640px]"
          />
        </div>
        <div className="flex justify-end pt-[56px]">
          <PrismicNextImage
            field={slice.primary.image_three}
            className=" w-[256px] lg:w-[566px] h-[290px] lg:h-[640px] md:mr-20 "
          />
        </div>
      </div>
    </Bounded>
  );
};

export default DiningCta;
