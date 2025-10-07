import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@prismicio/react";
import QuoteIcon from "@/components/quoteIcon";

/**
 * @typedef {import("@prismicio/client").Content.TestimonialsSlice} TestimonialsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialsSlice>} TestimonialsProps
 * @type {import("react").FC<TestimonialsProps>}
 */
const Testimonials = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"flex items-center justify-center w-full mt-10"}
    >
      <div className="flex flex-col justify-center items-center">
        <div className=" flex text-5xl font-medium  font-serif mb-10">
          <QuoteIcon></QuoteIcon>
        </div>

        <div className="flex flex-col items-center text-center md:w-1/2">
          {slice.primary.testimonials.map((item, index) => (
            <div
              key={index}
              className="justify-center items-center font-barlow text-sm md:text-lg"
            >
              <PrismicRichText field={item.quote} />
            </div>
          ))}
        </div>
        {/*div below is for the slider thing */}
        <div>Div for slider</div>
      </div>
    </Bounded>
  );
};

export default Testimonials;
