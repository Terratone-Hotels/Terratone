"use client";

import React, { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import MobilePlacesToVisit from "@/components/PlaceToVisitMobile";

const PlacestoVisit = ({ slice }) => {
  const items = slice.primary.contents;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const currentItem = items[activeIndex];

  const transitionConfig = {
    type: "tween",
    duration: 0.7,
    ease: [0.25, 0.1, 0.25, 1.0],
  };

  return (
    <MotionConfig transition={transitionConfig}>
      <div className="hidden lg:block px-5">
        <section className="relative overflow-hidden h-screen flex items-center justify-center">
          {/* 1. Background Image */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`bg-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {/* Ensure parent is relative/absolute and has fill */}
                <PrismicNextImage
                  field={currentItem.image}
                  fill
                  className="object-cover scale-110 blur-sm"
                  alt=""
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 w-[85%]">
            {/* Tab Navigation */}
            <div className="flex flex-nowrap items-end w-full overflow-hidden">
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      marginLeft: index === 0 ? 0 : "-10px", // Maintains overlap
                      zIndex: isActive ? 50 : items.length - index,
                    }}
                    className={`relative transition-all duration-700 ease-[0.25,0.1,0.25,1.0] rounded-t-2xl py-4  ${
                      isActive
                        ? "flex-[2_2_0%] bg-[#F2EFE9] text-black pb-5 text-[12px] xl:text-[16px] -mb-px"
                        : /* flex-[2] allows the active tab to grow larger than the others during the transition */
                          "flex-1 min-w-0 bg-[#EAE6DD] text-[10px] xl:text-[13px] text-gray-500 hover:bg-[#E2DDD2]"
                    }`}
                  >
                    <div className="relative flex items-center justify-center h-4">
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.span
                            key={`dot-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className=" w-1.5 h-1.5 bg-black rounded-full shrink-0"
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        key={`text-${index}-${isActive}`}
                        initial={{
                          opacity: isActive ? 0 : 1,
                          y: isActive ? 10 : 0,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        /* Added fixed pl-5 to both states so the text NEVER jumps horizontally */
                        className="truncate whitespace-nowrap pl-5 font-barlow font-medium uppercase tracking-widest "
                      >
                        <PrismicText field={item.tab_title} />
                      </motion.div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3. Main Card */}
            <div className="bg-[#F2EFE9] rounded-b-3xl pl-3 pb-5 pt-8 flex justify-around md:flex-row md:gap-5 relative overflow-hidden min-h-[500px]">
              {/* Left Section: Image - Forced to fill space */}
              <div className="w-[45%] flex">
                <div className="relative w-full aspect-[4/3] overflow-hidden shadow-lg rounded-[8px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`img-${activeIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <PrismicNextImage
                        field={currentItem.image}
                        fill
                        className="object-cover w-full h-full"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-1/2 flex justify-around">
                <div className="relative flex flex-col gap-4 h-full">
                  <div className="w-[95%]">
                    <h2 className="italic lg:text-5xl xl:text-[80px] font-serif xl:leading-20 text-black">
                      <PrismicText field={currentItem.title} />
                    </h2>
                  </div>
                  <div className="text-black w-[80%] lg:text-sm xl:text-[16px] xl:leading-6 font-barlow mt-4">
                    <PrismicRichText field={currentItem.description} />
                  </div>
                </div>

                <div className="flex self-end-safe gap-6 pb-4 pr-4">
                  <button
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + items.length) % items.length
                      )
                    }
                    className="p-2 hover:-translate-x-1 transition-transform"
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stamp-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 12 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute bottom-[18%] right-9 -translate-y-1/2 w-24 xl:w-30 pointer-events-none drop-shadow-xl"
                >
                  <PrismicNextImage
                    field={currentItem.stamp}
                    className="w-full h-34 stamp-edge"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
      <div className="lg:hidden">
        <MobilePlacesToVisit slice={slice} />
      </div>
    </MotionConfig>
  );
};

export default PlacestoVisit;
