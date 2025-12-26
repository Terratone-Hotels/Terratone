"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

const MobilePlacesToVisit = ({ slice }) => {
  const items = slice.primary.contents;
  
  // 1. State to track which background image to show
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Initialize Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  // 2. Logic to update the selectedIndex when the slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Set initial state
    emblaApi.on("select", onSelect); // Update on swipe or button click
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Navigation Logic
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!items || items.length === 0) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center  py-10 overflow-hidden">
      
      {/* 3. Updated Dynamic Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700">
        <PrismicNextImage 
          field={items[selectedIndex].image} 
          fill 
          className="object-cover scale-150 blur-xs  transition-all duration-700"
          alt=""
        />
      </div>

      {/* Slider Container */}
      <div className="relative z-10 w-full max-w-[350px] " ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div className="flex-[0_0_100%] min-w-0 px-2" key={index}>
              
              {/* Main Card */}
              <div className="bg-[#F2EFE9] rounded-2xl relative flex flex-col min-h-[500px]">
                
                {/* Overlapping Stamp */}
                <div className="absolute -top-13 left-0 w-28 h-32 z-30 rotate-10 ">
                  <PrismicNextImage field={item.stamp} className="w-full object-cover h-auto stamp-edge" />
                </div>

                {/* Image Section */}
                <div className="w-full p-3">
                  <div className="aspect-square relative rounded-xl overflow-hidden  shadow-sm">
                    <PrismicNextImage 
                      field={item.image} 
                      fill 
                      className="object-cover" 
                      priority={index === 0} 
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between text-center px-5 pb-2">
                  <div>
                    <h2 className="text-4xl font-serif font-medium italic mb-3 text-black leading-tight">
                      <PrismicText field={item.title} />
                    </h2>
                    <div className="text-black text-[13px] leading-relaxed font-barlow line-clamp-4">
                      <PrismicRichText field={item.description} />
                    </div>
                  </div>

                  {/* Navigation Arrows below description */}
                  <div className="flex items-center justify-center gap-10 border-black/5 pt-4">
                    <button 
                      onClick={scrollPrev}
                      className="p-2 active:scale-90 transition-transform"
                      aria-label="Previous slide"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={scrollNext}
                      className="p-2 active:scale-90 transition-transform"
                      aria-label="Next slide"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobilePlacesToVisit;