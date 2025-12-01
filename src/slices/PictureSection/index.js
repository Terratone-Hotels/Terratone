"use client";

import { useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import CurtainRevealImage from "@/components/CurtainRevealImage";

import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.PictureSectionSlice} PictureSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureSectionSlice>} PictureSectionProps
 * @type {import("react").FC<PictureSectionProps>}
 */
const PictureSection = ({ slice }) => {
  /* 🌟 Global Parallax (–10% → +10%) */
  useEffect(() => {
  if (typeof window === "undefined") return;

  let ctx;

  requestAnimationFrame(() => {
    ctx = gsap.context(() => {
      const containers = gsap.utils.toArray(".parallax-container");

      containers.forEach((wrapper) => {
        const img = wrapper.querySelector(".parallax-img");
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
    });
  });

  return () => ctx?.revert();
}, []);


  return (
    <>
      {/* ======================================================================= */}
      {/* DEFAULT */}
      {/* ======================================================================= */}
      {slice.variation === "default" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-20"
        >
          <div className="w-full h-dvh">
            {/* ⭐ PARALLAX WRAPPER */}
            <div className="parallax-container overflow-hidden h-full w-full">
              <div className="parallax-img w-full h-full">
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================================= */}
      {/* DOUBLE PICTURES */}
      {/* ======================================================================= */}
      {slice.variation === "doublePictures" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="lg:w-[50%] h-1/2 md:h-dvh">
              <div className="parallax-container overflow-hidden h-full w-full">
                <div className="parallax-img w-full h-full">
                  <CurtainRevealImage
                    field={slice.primary.image}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-[50%] h-1/2 md:h-dvh">
              <div className="parallax-container overflow-hidden h-full w-full">
                <div className="parallax-img w-full h-full">
                  <CurtainRevealImage
                    field={slice.primary.image_2}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Bounded>
      )}

      {/* ======================================================================= */}
      {/* TRIPLE IMAGES */}
      {/* ======================================================================= */}
      {slice.variation === "trippleImage" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div>
            {/* Top two images */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="lg:w-[50%] lg:h-screen">
                <div className="parallax-container overflow-hidden h-full w-full">
                  <div className="parallax-img w-full h-full">
                    <CurtainRevealImage
                      field={slice.primary.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:w-[50%] lg:h-screen">
                <div className="parallax-container overflow-hidden h-full w-full">
                  <div className="parallax-img w-full h-full">
                    <CurtainRevealImage
                      field={slice.primary.image_2}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom image */}
            <div className="w-full mt-6 lg:h-screen">
              <div className="parallax-container overflow-hidden h-full w-full">
                <div className="parallax-img w-full h-full">
                  <CurtainRevealImage
                    field={slice.primary.image_3}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default PictureSection;
