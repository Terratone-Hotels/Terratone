"use client";
import { useRef, useEffect } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";
import CurtainRevealImage from "./CurtainRevealImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RichTextRenderer from "./RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);

export default function RoomCard({
  image,
  title,
  description,
  bookingLink,
  linkText,
  titleClassName = "text-xl font-semibold",
  descriptionClassName = " text-gray-700",
  buttonClassNames = "text-xs",
}) {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            imageRef.current,
            titleRef.current,
            buttonRef.current,
            lineRef.current,
            descRef.current,
          ],
          { opacity: 1, clipPath: "inset(0 0% 0 0)" },
        );
        return;
      }

      const DURATION = 1.6;

      const revealSettings = {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)",
        ease: "power3.inOut",
      };

      const revealTo = {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: DURATION,
        ease: "power3.inOut",
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // IMAGE → TITLE → BUTTON → LINE (grouped animations)
      const textReveal = { ...revealTo, duration: 1.3, ease: "power3.inOut" };

      tl.fromTo(imageRef.current, revealSettings, revealTo, 0)
        .fromTo(titleRef.current, revealSettings, textReveal, 0)
        .fromTo(lineRef.current, revealSettings, textReveal, ">")
        .fromTo(descRef.current, revealSettings, textReveal, "<")
        .fromTo(buttonRef.current, revealSettings, textReveal, "<");
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group w-full md:w-90 flex flex-col relative overflow-hidden"
    >
      {/* IMAGE */}
      <div ref={imageRef} className="overflow-hidden">
        <CurtainRevealImage
          field={image}
          className="w-full h-90 md:h-100 object-cover"
          // Card ~full width mobile / ~360px desktop — not full hero resolution
          sizes="(max-width: 768px) 100vw, 360px"
          imgixParams={{ w: 800, q: 80 }}
        />
      </div>

      {/* Title + Button */}
      <div className="flex flex-row w-full items-baseline justify-between mt-4">
        <div ref={titleRef} className={`${titleClassName} overflow-hidden`}>
          <PrismicRichText field={title} />
        </div>

        <div ref={buttonRef} className="overflow-hidden">
          <Button className="py-1 px-2" field={bookingLink}>
            {linkText}
          </Button>
        </div>
      </div>

      {/* Animated Line */}
      <div
        ref={lineRef}
        className="mt-2 h-[1px] bg-black w-full overflow-hidden"
      />

      {/* Description */}
      <div className="flex mt-3 flex-row items-end justify-between relative">
        {description && (
          <div
            ref={descRef}
            className={`font-barlow ${descriptionClassName} overflow-hidden`}
          >
            <PrismicRichText
              field={description}
              className="m-0 font-barlow text-[12px] lg:text-[14px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
