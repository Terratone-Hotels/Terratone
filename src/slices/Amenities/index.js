"use client";

import { useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AmenitiesInteractiveListHover = ({ slice }) => {
  const amenities = slice.primary.amenities || [];
  if (amenities.length === 0) return null;

  /* ------------------ PARALLAX –10% → +10% ------------------ */
  useEffect(() => {
    const containers = gsap.utils.toArray(".parallax-box");

    containers.forEach((box) => {
      const img = box.querySelector(".parallax-img");
      if (!img) return;

      gsap.fromTo(
        img,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: box,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        }
      );
    });
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[0.9375rem] md:px-6 mt-10 lg:mt-20"
    >
      {/* Main flex container */}
      <div className="flex flex-col md:flex-row md:h-[450px] lg:h-[533px] xl:h-[735px] overflow-hidden">
        {/* Left side */}
        <div className="flex flex-col justify-between md:w-1/2 lg:w-[45%] pr-4 pt-4 md:pt-0">
          <div className="font-serif text-[23px] md:text-[30px] 2xl:text-[50px] leading-6 md:leading-8 xl:leading-12 lg:text-[40px] md:mb-4 font-medium">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="my-3 md:my-0">
            <ul className="list-disc pl-5 space-y-1 font-barlow text-[15px] lg:text-[20px] xl:text-[20px] text-gray-700">
              {amenities.map((item, index) => (
                <li key={index}>
                  <PrismicRichText field={item.amenity} />
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[15px] md:text-[14px] xl:text-[16px] xl:w-[80%] font-barlow leading-4 xl:leading-5">
            <PrismicRichText field={slice.primary.message} />
          </div>
        </div>

        {/* Right side: 3 images */}
        <div className="flex flex-row h-[350px] md:h-full lg:w-[55%] items-center gap-4 lg:gap-6 mt-4 md:mt-0">
          {/* Left vertical stack */}
          <div className="flex flex-col gap-4 lg:gap-6 h-full w-[40%]">
            {/* Top image */}
            <div className="h-[40%] w-full">
              <div className="parallax-box relative overflow-hidden w-full h-full">
                <div className="parallax-img absolute inset-0 w-full h-full">
                  <PrismicNextImage
                    field={slice.primary.image_one}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom image */}
            <div className="h-[60%] w-full">
              <div className="parallax-box relative overflow-hidden w-full h-full">
                <div className="parallax-img absolute inset-0 w-full h-full">
                  <PrismicNextImage
                    field={slice.primary.image_two}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right big image */}
          <div className="h-full w-[60%]">
            <div className="parallax-box relative overflow-hidden w-full h-full">
              <div className="parallax-img absolute inset-0 w-full h-full">
                <PrismicNextImage
                  field={slice.primary.image_three}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesInteractiveListHover;
