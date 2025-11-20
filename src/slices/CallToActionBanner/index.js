"use client";

import { useEffect } from "react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import CurtainRevealImage from "@/components/CurtainRevealImage";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToActionBanner = ({ slice }) => {
  /* ------------------ PARALLAX (–10% → +10%) ------------------ */
  useEffect(() => {
    const wrappers = gsap.utils.toArray(".cta-parallax-container");

    wrappers.forEach((wrapper) => {
      const img = wrapper.querySelector(".cta-parallax-img");
      if (!img) return;

      gsap.fromTo(
        img,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
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
      {/* Container with fixed height */}
      <div className="relative w-full h-[524px] overflow-hidden cta-parallax-container">
        {/* Parallax Image */}
        <div className="absolute inset-0">
          <div className="cta-parallax-img w-full h-full">
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 top-10 flex flex-col items-center justify-center">
          <div className="z-10 max-w-[80%] text-center text-white font-serif tracking-tight text-3xl sm:text-4xl md:text-5xl font-light leading-tight lg:leading-10">
            <RichTextRenderer field={slice.primary.message} />
          </div>

          <div className="mt-5 z-10">
            <Button className="bg-white px-2 py-1">
              <PrismicNextLink field={slice.primary.button_link}>
                {slice.primary.button_text}
              </PrismicNextLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
