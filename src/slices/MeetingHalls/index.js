"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Bounded from "@/components/Bounded";
import DotWave from "@/components/DotWave";
import RichTextRenderer from "@/components/RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.MeetingHallsSlice} MeetingHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MeetingHallsSlice>} MeetingHallsProps
 * @type {import("react").FC<MeetingHallsProps>}
 */
const MeetingHalls = ({ slice }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const curtainsRef = useRef([]);

  const colorList = [
    "var(--color-earth-green)",
    "var(--color-terra-pink)",
    "var(--color-toiled-gold)",
    "var(--color-sand)",
  ];

  const [curtainColors, setCurtainColors] = useState([]);

  // This useEffect sets the random colors only on the client to prevent hydration errors.
  useEffect(() => {
    const colors = slice.primary.rooms.map(
      () => colorList[Math.floor(Math.random() * colorList.length)]
    );
    setCurtainColors(colors);
  }, [slice.primary.rooms]);

  // This useEffect sets up BOTH animations.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const curtains = curtainsRef.current.filter(Boolean);

    if (!section || cards.length === 0 || curtains.length === 0) return;

    const timeout = setTimeout(() => {
      // --- ANIMATION 1: CARD SLIDE-UP (with scrub) ---
      const tlCards = gsap.fromTo(  
        cards,
        { y: 650 },
        {
          y: 0,

          duration: 3.5,
          ease: "power2.out",
          stagger: 0.55,
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            end: "bottom bottom",
            scrub: true, // ✅ This animation is always linked to the scrollbar
            // markers:true
          },
        }
      );

      // --- ANIMATION 2: CURTAIN REVEAL (one-time) ---
      const tlCurtains = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true, // ✅ This animation plays only once
        },
      });

      curtains.forEach((curtain, index) => {
        gsap.set(curtain, { y: "0%" });
        tlCurtains.to(
          curtain,
          {
            y: "-100%",
            duration: 1,
            ease: "power2.inOut",
          },
          index * 0.2
        );
      });

      // Cleanup function to kill both animations on unmount
      return () => {
        tlCards.scrollTrigger?.kill();
        tlCards.kill();
        tlCurtains.scrollTrigger?.kill();
        tlCurtains.kill();
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {slice.variation === "default" && (
        <div>
          <Bounded
            ref={sectionRef}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="max-w-[90rem] mx-auto"
          >
            <DotWave />
            <div className="max-w-3xl mx-auto text-center mb-14 px-4 mt-8 md:mt-12">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-5xl font-serif font-medium mb-2 lg:mb-8"
              />
              <RichTextRenderer
                field={slice.primary.description}
                className="leading-tight font-barlow text-[0.875rem] md:text-[1.125rem]"
              />
            </div>

            <div className="hidden lg:grid lg:grid-cols-3 gap-20 max-w-[95%] mx-auto items-start">
              {slice.primary.rooms.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <Button className="bg-white px-2 py-1 text-sm font-barlowNormal">
                        <PrismicNextLink field={item.room_link}>
                          {item.button_text}
                        </PrismicNextLink>
                      </Button>
                    </div>

                    {/* The curtain that will be animated */}
                    <div
                      ref={(el) => (curtainsRef.current[index] = el)}
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        backgroundColor: curtainColors[index] || "transparent",
                      }}
                    />
                  </div>

                  <div className="mt-6 flex flex-col justify-start text-left min-h-[120px]">
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

          {/* ====== Mobile Swiper (Untouched) ====== */}
          <div className="lg:hidden pl-4">
            <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
              {slice.primary.rooms.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <PrismicNextImage
                        field={item.image}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex flex-col justify-between min-h-[110px]">
                      <h3 className="text-lg font-serif font-medium leading-snug">
                        {item.card_title}
                      </h3>
                      <p className="text-sm font-barlow leading-relaxed mt-2">
                        {item.card_description}
                      </p>
                      <div className="mt-4">
                        <Button className="px-1.5 py-1">VIEW ROOM</Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      {slice.variation === "withNumbers" && (
        <div>
          <Bounded
            ref={sectionRef}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
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

            <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-6  items-start">
              {slice.primary.rooms.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />

                    {/* The curtain that will be animated */}
                    <div
                      ref={(el) => (curtainsRef.current[index] = el)}
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{
                        backgroundColor: curtainColors[index] || "transparent",
                      }}
                    />
                  </div>

                  <div className="mt-6 flex flex-col justify-start text-left min-h-[120px]">
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
                    <Button className="bg-white px-2 py-1 text-sm font-barlowNormal">
                      <PrismicNextLink field={item.room_link}>
                        {item.button_text}
                      </PrismicNextLink>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Bounded>

          {/* ====== Mobile Swiper (Untouched) ====== */}
          <div className="md:hidden pl-4">
            <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
              {slice.primary.rooms.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <PrismicNextImage
                        field={item.image}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex flex-col justify-between min-h-[110px]">
                      <div className="font-barlow font-medium text-sm">
                        {item.serial_no}
                      </div>
                      <h3 className="text-lg font-serif font-medium leading-snug">
                        {item.card_title}
                      </h3>
                      <p className="text-sm font-barlow leading-relaxed mt-2">
                        {item.card_description}
                      </p>
                      <div className="mt-4">
                        <Button className="px-1.5 py-1">
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
