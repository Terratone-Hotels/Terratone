"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import VideoComponent from "@/components/VideoComponent";
import { PrismicRichText } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

const OneWithSideWords = ({ slice }) => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null); // pause
  const rightRef = useRef(null); // between
  const topRef = useRef(null); // thoughtfulness
  const videoRef = useRef(null); // video

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === Initial States ===
      gsap.set(leftRef.current, { opacity: 0, x: -40 });
      gsap.set(rightRef.current, { opacity: 0, x: 40 });
      gsap.set(topRef.current, { opacity: 0, y: -30 });
      gsap.set(videoRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "center",
      });

      // === Timeline ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none", // plays once
        },
        defaults: { ease: "power3.out" },
      });

      // Left and Right together (2s)
      tl.to([leftRef.current, rightRef.current], {
        opacity: 1,
        x: 0,
        duration: 2,
        stagger: 0, // both together
      })
        // Top heading after both (2s)
        .to(topRef.current, { opacity: 1, y: 0, duration: 2 }, "-=1.5")
        // Video reveal last (3s)
        .to(
          videoRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 3,
            ease: "power4.out",
          },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center py-12 mt-8 md:mt-44 overflow-hidden"
    >
      {/* Top Heading - "Thoughtfulness" */}
      <div
        ref={topRef}
        className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium opacity-0"
      >
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      {/* Video + Side Words */}
      <div className="flex items-center justify-center w-full mt-4 relative">
        {/* Left Word - "Pause" */}
        <div
          ref={leftRef}
          className="relative w-[20%] lg:w-auto flex items-center justify-center opacity-0"
        >
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium -rotate-90 lg:rotate-0 lg:text-right lg:pr-10">
            <PrismicRichText field={slice.primary.left_word} />
          </div>
        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className="w-full md:w-[60%] aspect-[21/9] overflow-hidden opacity-0"
        >
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Word - "Between" */}
        <div
          ref={rightRef}
          className="relative w-[20%] lg:w-auto flex items-center justify-center opacity-0"
        >
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium rotate-90 lg:rotate-0 lg:pl-10">
            <PrismicRichText field={slice.primary.right_word} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 leading-tight font-barlow text-sm md:text-[18px] text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center items-center gap-2">
        <Button variant="secondary" className="font-barlow">
          ABOUT US
        </Button>
        
      </div>
    </Bounded>
  );
};

export default OneWithSideWords;
