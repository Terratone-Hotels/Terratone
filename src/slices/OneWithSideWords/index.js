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
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const topRef = useRef(null);
  const videoRef = useRef(null);
  const videoComponentRef = useRef(null); // Add a ref for the VideoComponent

  useEffect(() => {
    const ctx = gsap.context(() => {
      /** ========== Initial States ========== */
      gsap.set(
        [leftRef.current, rightRef.current, topRef.current, videoRef.current],
        { opacity: 0 }
      );
      gsap.set(leftRef.current, { x: -40 });
      gsap.set(rightRef.current, { x: 40 });
      gsap.set(topRef.current, { y: -30 });
      gsap.set(videoRef.current, { scaleX: 0, transformOrigin: "center" });

      /** ========== Content Reveal Timeline ========== */
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none", // Play ONCE
          },
        })
        .to([leftRef.current, rightRef.current], {
          opacity: 1,
          x: 0,
          duration: 1.8,
        })
        .to(topRef.current, { opacity: 1, y: 0, duration: 1.8 }, "-=1.2")
        .to(
          videoRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 2.2,
            ease: "power4.out",
          },
          "-=0.8"
        );

      /** ========== Video Playback ScrollTrigger ========== */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "top 25%",
        once: true, // Only trigger once
        onEnter: () => {
          if (videoComponentRef.current) {
            videoComponentRef.current.play();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center mt-13 md:mt-44 overflow-hidden"
    >
      {/* Top Heading */}
      <div
        ref={topRef}
        className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium opacity-0"
      >
        <PrismicRichText field={slice.primary.top_sentence} />
      </div>

      {/* Video + Side Words */}
      <div className="flex items-center justify-center w-full mt-4 relative">
        {/* Left Word */}
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
            ref={videoComponentRef} // Attach the ref
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
            muted // Add muted attribute to autoplay
            playsInline // Add playsInline attribute to autoplay on iOS
          />
        </div>

        {/* Right Word */}
        <div
          ref={rightRef}
          className="relative w-[20%] lg:w-auto flex items-center justify-center opacity-0"
        >
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium -rotate-90 lg:rotate-0 lg:text-right lg:pr-10">
            <PrismicRichText field={slice.primary.left_word} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-9 leading-tight font-barlow text-sm md:text-[18px] text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>

      {/* Buttons */}
      <div className="mt-6 lg:mt-9 flex justify-center items-center gap-2">
        <Button variant="secondary" className="font-barlow">
          ABOUT US
        </Button>
      </div>
    </Bounded>
  );
};

export default OneWithSideWords;
