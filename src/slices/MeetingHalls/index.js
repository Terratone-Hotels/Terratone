"use client";

import { useRef, useEffect } from "react";
import Button from "@/components/Button";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Bounded from "@/components/Bounded";
import DotWave from "@/components/DotWave";
import RichTextRenderer from "@/components/RichTextRenderer";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.MeetingHallsSlice} MeetingHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MeetingHallsSlice>} MeetingHallsProps
 * @type {import("react").FC<MeetingHallsProps>}
 */
const MeetingHalls = ({ slice }) => {
  const sectionRef = useRef(null);
  const desktopCardsRef = useRef([]);

  /* ------------------------ DESKTOP SCRUB ANIMATION ------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || slice.variation !== "default") return;

    const cards = desktopCardsRef.current.filter(Boolean);
    const section = sectionRef.current;

    if (!cards.length || !section) return;

    // Start cards lower
    gsap.set(cards, { y: 650 });

    gsap.to(cards, {
      y: 0,
      duration: 2.5, // smoother + slower
      ease: "power3.out",
      stagger: 0.3, // reveal one-by-one slowly
      scrollTrigger: {
        trigger: section,
        start: " 10%", // starts when section enters viewport
        end: "bottom center", // ends at mid-point
        scrub: true, // tied to scroll
        // markers: true,
      },
    });
  }, [slice.variation]);

  return (
    <>
      {/* ======================================================================= */}
      {/* DEFAULT VARIATION (WITH ANIMATION ON DESKTOP) */}
      {/* ======================================================================= */}
      {slice.variation === "default" && (
        <div>
          <Bounded
            ref={sectionRef}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="max-w-[90rem] mx-auto"
          >
            <DotWave />

            {/* Headings */}
            <div className="max-w-3xl mx-auto text-center mb-5 lg:mb-14 px-4 mt-8 md:mt-12">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-5xl font-serif font-medium mb-2 leading-6 md:leading-10 lg:mb-8"
              />
              <RichTextRenderer
                field={slice.primary.description}
                className="leading-tight font-barlow text-[0.875rem] md:text-[1.125rem]"
              />
            </div>

            {/* ---------------------- DESKTOP GRID (WITH ANIMATION) ---------------------- */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-20 max-w-[95%] mx-auto items-start">
              {slice.primary.rooms.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (desktopCardsRef.current[index] = el)}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {/* Hover Dark Layer */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Image */}
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />

                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <Button className="bg-white px-2 py-1 text-sm font-barlowNormal">
                        <PrismicNextLink field={item.room_link}>
                          {item.button_text}
                        </PrismicNextLink>
                      </Button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="mt-6 flex flex-col justify-start text-left min-h-[120px] ">
                    <h3 className="text-[28px] font-medium font-serif">
                      {item.card_title}
                    </h3>
                    <p className="text-[14px] font-barlow mt-2 leading-tight">
                      {item.card_description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Bounded>

          {/* ---------------------- MOBILE SWIPER (NO ANIMATION) ---------------------- */}
          <div className="lg:hidden pl-4">
            <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
              {slice.primary.rooms.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Hover dark layer */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 z-10" />

                      <PrismicNextImage
                        field={item.image}
                        className="w-full h-full object-cover"
                      />

                      {/* Button */}
                    </div>

                    {/* Text */}
                    <div className="mt-4 flex flex-col justify-between min-h-[110px]">
                      <h3 className="text-lg font-serif font-medium leading-snug">
                        {item.card_title}
                      </h3>
                      <p className="text-sm font-barlow leading-relaxed mt-2">
                        {item.card_description}
                      </p>
                      <div className="mt-4">
                        <Button className="px-1.5 py-1">
                          {" "}
                          <PrismicNextLink field={item.room_link}>
                            {item.button_text}
                          </PrismicNextLink>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WITH NUMBERS VARIATION — NO ANIMATION */}
      {/* ======================================================================= */}
      {slice.variation === "withNumbers" && (
        <div>
          <Bounded ref={sectionRef}>
            <div className="max-w-3xl mx-auto text-center px-4">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-5xl font-serif font-medium mb-2 lg:mb-8"
              />
              <RichTextRenderer
                field={slice.primary.description}
                className="leading-tight font-barlow text-[0.875rem] md:text-[1.125rem]"
              />
            </div>

            {/* NO ANIMATION */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6 items-start">
              {slice.primary.rooms.map((item, index) => (
                <div key={index} className="group flex flex-col">
                  <div className="relative aspect-square overflow-hidden">
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="mt-6 flex flex-col justify-start min-h-[120px]">
                    <div className="font-barlow font-medium text-lg">
                      {item.serial_no}
                    </div>
                    <h3 className="md:text-[24px] lg:text-[28px] font-medium font-serif">
                      {item.card_title}
                    </h3>
                    <p className="lg:text-[18px] font-barlow mt-2 leading-snug">
                      {item.card_description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button className="bg-white px-2 py-1">
                      <PrismicNextLink field={item.room_link}>
                        {item.button_text}
                      </PrismicNextLink>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Bounded>
          <div className="md:hidden pl-4 mt-10">
            <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
              {slice.primary.rooms.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <PrismicNextImage
                        field={item.image}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text */}
                    <div className="mt-4 flex flex-col justify-between min-h-[110px]">
                      <div className="font-barlow font-medium text-lg">
                        {item.serial_no}
                      </div>

                      <h3 className="text-lg font-serif font-medium leading-snug">
                        {item.card_title}
                      </h3>

                      <p className="text-sm font-barlow leading-relaxed mt-2">
                        {item.card_description}
                      </p>

                      <div className="mt-4">
                        <Button className="bg-white px-2 py-1 text-sm">
                          <PrismicNextLink field={item.room_link}>
                            {item.button_text}
                          </PrismicNextLink>
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingHalls;
