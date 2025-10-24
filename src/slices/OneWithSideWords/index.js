"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import VideoComponent from "@/components/VideoComponent";
import RichTextRenderer from "@/components/RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);

export default function OneWithSideWords({ slice }) {
  const sectionRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);

  useEffect(() => {
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;
    if (!leftCurtain || !rightCurtain) return;

    // Initial state: both curtains fully closed
    gsap.set([leftCurtain, rightCurtain], { scaleX: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    // Animate curtains opening horizontally
    tl.to(leftCurtain, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.3,
      ease: "power3.inOut",
    });
    tl.to(
      rightCurtain,
      {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.3,
        ease: "power3.inOut",
      },
      "<"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* =================== Top Heading =================== */}
      <div className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium">
        <RichTextRenderer field={slice.primary.top_sentence} />
      </div>

      {/* =================== Video + Side Words =================== */}
      <div className="flex items-center justify-center w-full mt-4 relative">
        {/* Left Word */}
        <div className="relative w-[20%] lg:w-auto flex items-center justify-center">
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium -rotate-90 lg:rotate-0 lg:text-right lg:pr-10">
            <RichTextRenderer field={slice.primary.left_word} />
          </div>
        </div>

        {/* === Video with Horizontal Reveal === */}
        <div className="relative w-full md:w-[60%] aspect-[21/9] overflow-hidden">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
            muted
            playsInline
          />

          {/* White Curtains (Left + Right) */}
          <div
            ref={leftCurtainRef}
            className="absolute left-0 top-0 w-1/2 h-full bg-(--color-stone) z-[5] origin-center"
          ></div>
          <div
            ref={rightCurtainRef}
            className="absolute right-0 top-0 w-1/2 h-full bg-(--color-stone) z-[5] origin-center"
          ></div>
        </div>

        {/* Right Word */}
        <div className="relative w-[20%] lg:w-auto flex items-center justify-center">
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium rotate-90 lg:rotate-0 lg:pl-10">
            <RichTextRenderer field={slice.primary.right_word} />
          </div>
        </div>
      </div>

      {/* =================== Description =================== */}
      <div className="mt-9 leading-tight font-barlow text-sm md:text-[18px] text-black text-center">
        <RichTextRenderer field={slice.primary.description} />
      </div>

      {/* =================== Buttons =================== */}
      <div className="mt-6 lg:mt-9 flex justify-center items-center gap-2">
        <Button  className="font-barlow px-2.5 py-1 tracking-tighter">
          ABOUT US
        </Button>
      </div>
    </Bounded>
  );
}
