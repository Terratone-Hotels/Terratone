import Bounded from "@/components/Bounded";
import { PrismicNextImage , PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
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
    >
      SLICE STARTS HERE
      {/* <div className="flex flex-row-reverse">
        <div>
          <PrismicNextImage field={slice.primary.image_one} />
        </div>
        <div>
          <div>
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div>
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div>
            <PrismicNextLink field={slice.primary.button_link}>
              {slice.primary.button_text}
            </PrismicNextLink>
          </div>
        </div>
      </div> */}
    </Bounded>
  );
};

export default DiningCta;
