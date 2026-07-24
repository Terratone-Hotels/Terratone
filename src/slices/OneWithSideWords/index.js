"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/Button";
import VideoComponent from "@/components/VideoComponent";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

export default function OneWithSideWords({ slice }) {
  const sectionRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const topSentenceRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;
    if (!section || !leftCurtain || !rightCurtain) return;

    // Prefer shorter timelines on mobile — long 2s dual curtains cost main-thread.
    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;
    const curtainDur = narrow ? 1.1 : 1.6;
    const textDur = narrow ? 0.5 : 0.8;

    const ctx = gsap.context(() => {
      if (topSentenceRef.current) {
        gsap.set(topSentenceRef.current, { opacity: 0, y: 20 });
      }
      gsap.set([leftCurtain, rightCurtain], { scaleX: 1 });

      const sideTexts = [leftTextRef.current, rightTextRef.current].filter(
        Boolean,
      );
      if (sideTexts.length) {
        gsap.set(sideTexts, { opacity: 0, y: 30 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(
        leftCurtain,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: curtainDur,
          ease: "power3.inOut",
        },
        0,
      );

      if (topSentenceRef.current) {
        tl.to(
          topSentenceRef.current,
          {
            opacity: 1,
            y: 0,
            duration: curtainDur,
            ease: "power3.inOut",
          },
          0,
        );
      }

      tl.to(
        rightCurtain,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: curtainDur,
          ease: "power3.inOut",
        },
        0,
      );

      if (leftTextRef.current) {
        tl.to(
          leftTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: textDur,
            ease: "power3.out",
          },
          narrow ? 0.35 : 0.5,
        );
      }

      if (rightTextRef.current) {
        tl.to(
          rightTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: textDur,
            ease: "power3.out",
          },
          ">",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center text-center overflow-hidden mt-15 lg:mt-26 mb-30 lg:mb-0"
    >
      <div
        ref={topSentenceRef}
        className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium"
      >
        <RichTextRenderer field={slice.primary.top_sentence} />
      </div>

      <div className="flex justify-evenly w-full h-auto mt-3 lg:mt-4 relative">
        <div className="flex-1 w-[20%] lg:w-auto flex items-center justify-center">
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium -rotate-90 lg:rotate-0 lg:text-right tracking-tight">
            <div ref={leftTextRef}>
              <PrismicRichText field={slice.primary.left_word} />
            </div>
          </div>
        </div>

        <div className="relative flex-4 w-full md:w-[60%] xl:h-170 aspect-video overflow-hidden">
          <VideoComponent
            srcMp4={slice.primary.video}
            className="w-full h-full object-cover"
            muted
            playsInline
          />

          <div
            ref={leftCurtainRef}
            className="absolute left-0 top-0 w-1/2 h-full bg-(--color-stone) z-[5]"
          />
          <div
            ref={rightCurtainRef}
            className="absolute right-0 top-0 w-1/2 h-full bg-(--color-stone) z-[5]"
          />
        </div>

        <div className="flex-1 w-[20%] lg:w-auto flex items-center justify-center">
          <div className="text-[1.75rem] lg:text-[2.625rem] font-serif font-medium rotate-90 lg:rotate-0">
            <div ref={rightTextRef}>
              <PrismicRichText field={slice.primary.right_word} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 lg:mt-8 leading-tight font-barlow text-sm md:text-[18px] text-black text-center">
        <PrismicRichText field={slice.primary.description} />
      </div>

      <div className="mt-4 lg:mt-4 flex justify-center items-center gap-2">
        <Button className="font-barlow px-2.5 py-1 tracking-wide">
          <PrismicNextLink field={slice.primary.cta_button} />
        </Button>
      </div>
    </section>
  );
}
