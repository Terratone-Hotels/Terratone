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
    const ctx = gsap.context(() => {
      const DURATION = 1.3;

      const revealSettings = {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)", // hidden from right
      };

      const revealTo = {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: DURATION,
        ease: "circ.out",
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // IMAGE → TITLE → BUTTON → LINE (grouped animations)
      tl.fromTo(imageRef.current, revealSettings, revealTo)
        .fromTo(titleRef.current, revealSettings, revealTo, "-=1.1")
        .fromTo(buttonRef.current, revealSettings, revealTo, "-=1.0")
        .fromTo(lineRef.current, revealSettings, revealTo, "-=0.9")

        // DESCRIPTION LAST (no overlap)
        .fromTo(descRef.current, revealSettings, {
          ...revealTo,
          duration: 0.5,
        });
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
        />
      </div>

      {/* Title + Button */}
      <div className="flex flex-row w-full items-baseline justify-between mt-4">
        <div ref={titleRef} className={`${titleClassName} overflow-hidden`}>
          <RichTextRenderer field={title} />
        </div>

        <div ref={buttonRef} className="overflow-hidden">
          <Button className={`px-2 py-1 ${buttonClassNames}`}>
            <PrismicNextLink field={bookingLink}>{linkText}</PrismicNextLink>
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