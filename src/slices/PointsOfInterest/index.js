"use client";

import React, { useState, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import MobilePlacesToVisit from "@/components/PlaceToVisitMobile";

// GSAP Imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * @typedef {import("@prismicio/client").Content.PointsOfInterestSlice} PointsOfInterestSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PointsOfInterestSlice>} PointsOfInterestProps
 * @type {import("react").FC<PointsOfInterestProps>}
 */
const PointsOfInterest = ({ slice }) => {
  const items = slice.primary.contents;
  const [activeIndex, setActiveIndex] = useState(0);

  // The main container ref used for GSAP scoping
  const container = useRef(null);

  const currentItem = items[activeIndex];

  useGSAP(
    () => {
      if (!items || items.length === 0) {
        gsap.killTweensOf(container.current);
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

     
      gsap.fromTo(
        ".gsap-fade-element",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "none" }
      );

    

      tl.fromTo(
        [".gsap-dot", ".gsap-active-text"],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      
      tl.fromTo(
        ".gsap-title",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
        .fromTo(
          ".gsap-description",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          "-=0.25" 
        )
        .fromTo(
          ".gsap-stamp",
          {
            opacity: 0,
            scale: 0.8, 
            rotation: 0,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 12,
            duration: 0.8,
            ease: "back.out(1.2)", 
            
          }
        );

      
    },
    { dependencies: [activeIndex], scope: container, revertOnUpdate: true }
  );

  return (
    <section
      ref={container}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="hidden lg:block px-5">
        <section className="relative overflow-hidden h-screen flex items-center justify-center">
          {/* 1. Background Image */}
          <div className="absolute inset-0 z-0 ">
            <div className="absolute inset-0">
              <PrismicNextImage
                field={currentItem.image}
                fill
                className="object-cover scale-110 blur-sm"
                alt=""
              />
            </div>
          </div>

          <div className="relative z-10 w-[85%]">
            {/* 2. Tab Navigation */}
            <div className="flex flex-nowrap items-end w-full overflow-hidden">
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      marginLeft: index === 0 ? 0 : "-10px",
                      zIndex: isActive ? 60 : items.length - index,
                      boxShadow: isActive
                        ? "0px 13px 20px -2px rgba(0, 0, 0, 0.3)"
                        : "none",
                    }}
                    className={`relative rounded-t-2xl py-4  ${
                      isActive
                        ? "flex-initial bg-[#F2EFE9] text-black pb-5 text-[12px] xl:text-[16px] px-4 -mb-px py-5 "
                        : "flex px-4 min-w-0 bg-[#EAE6DD] text-[10px] xl:text-[13px] text-gray-500 hover:bg-[#E2DDD2]"
                    }`}
                  >
                    <div className="relative flex items-center justify-center h-4">
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-black rounded-full shrink-0 gsap-dot" />
                      )}
                      <div
                        className={`truncate whitespace-nowrap pl-2 font-barlow font-medium uppercase tracking-widest ${isActive ? "gsap-active-text" : ""}`}
                      >
                        <PrismicText field={item.tab_title} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3. Main Card */}
            <div className="bg-[#F2EFE9] rounded-b-3xl pl-3 pb-5 pt-8 flex justify-around md:flex-row md:gap-5 relative overflow-hidden min-h-[500px] z-60">
              {/* Left Section: Image */}
              <div className="w-[45%] flex">
                <div className="relative w-full aspect-[4/3] overflow-hidden shadow-lg rounded-[8px] gsap-fade-element">
                  <div className="h-full w-full">
                    <PrismicNextImage
                      field={currentItem.image}
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right Section: Content */}
              <div className="w-1/2 flex justify-around">
                <div className="relative flex flex-col gap-4 h-full ">
                  <div className="w-[95%]">
                    <h2 className="italic lg:text-5xl xl:text-[80px] font-serif xl:leading-20 text-black gsap-title">
                      <PrismicText field={currentItem.title} />
                    </h2>
                  </div>
                  <div className="text-black w-[80%] lg:text-sm xl:text-[16px] xl:leading-6 font-barlow mt-4 gsap-description">
                    <PrismicRichText field={currentItem.description} />
                  </div>
                </div>

                {/* Arrow Controls */}
                <div className="flex self-end-safe gap-6 pb-4 pr-4">
                  <button
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + items.length) % items.length
                      )
                    }
                    className="p-2 hover:-translate-x-1 transition-transform"
                    aria-label="Previous item"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M19 12H5M5 12L12 19M5 12L12 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % items.length)
                    }
                    className="p-2 hover:translate-x-1 transition-transform"
                    aria-label="Next item"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 4. The Stamp */}
              <div className="gsap-stamp absolute bottom-[18%] right-9 -translate-y-1/2 w-24 xl:w-30 pointer-events-none drop-shadow-xl">
                <PrismicNextImage
                  field={currentItem.stamp}
                  className="w-full h-34 stamp-edge"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Component */}
      <div className="lg:hidden">
        <MobilePlacesToVisit slice={slice} />
      </div>
    </section>
  );
};

export default PointsOfInterest;
