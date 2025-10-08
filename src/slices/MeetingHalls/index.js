"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Bounded from "@/components/Bounded";
import DotWave from "@/components/DotWave";
import RichTextRenderer from "@/components/RichTextRenderer";
import CurtainRevealImage from "@/components/CurtainRevealImage";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.MeetingHallsSlice} MeetingHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MeetingHallsSlice>} MeetingHallsProps
 * @type {import("react").FC<MeetingHallsProps>}
 */
const MeetingHalls = ({ slice }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (window.innerWidth < 1024) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 550,
        },
        {
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.55,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 70% ",

            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-20 md:mt-44">
      <DotWave />

      {/* Heading + description */}
      <Bounded
        ref={sectionRef}
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="max-w-[90rem] mx-auto full "
      >
        <div className="max-w-3xl mx-auto text-center mb-12 px-4 mt-8 md:mt-12">
          <RichTextRenderer
            field={slice.primary.heading}
            className="text-[1.75rem] md:text-5xl font-serif font-medium mb-2 lg:mb-8"
          />
          <RichTextRenderer
            field={slice.primary.description}
            className="leading-tight font-barlow text-[0.875rem] md:text-[1.125rem]"
          />
        </div>

        {/* Desktop Grid (animated) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-20 max-w-[85%] mx-auto items-start">
          {slice.primary.rooms.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <CurtainRevealImage
                  field={item.image}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <Button showArrow>VIEW ROOM</Button>
                </div>
              </div>

              {/* Text */}
              <div className="mt-6 flex flex-col justify-start text-left min-h-[120px]">
                <h3 className="text-[1.375rem] font-medium font-serif">
                  {item.card_title}
                </h3>
                <p className="text-[14px] font-barlow mt-2 leading-relaxed">
                  {item.card_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Bounded>

      {/* Mobile Swiper untouched */}
      <div className="lg:hidden pl-4">
        <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
          {slice.primary.rooms.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <CurtainRevealImage
                    field={item.image}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
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
                    <Button variant="normal">VIEW ROOM</Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MeetingHalls;
