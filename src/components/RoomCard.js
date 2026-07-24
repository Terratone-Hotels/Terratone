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
  const imageCurtainRef = useRef(null);
  const titleCurtainRef = useRef(null);
  const buttonCurtainRef = useRef(null);
  const lineCurtainRef = useRef(null);
  const descCurtainRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const curtains = [
        imageCurtainRef.current,
        titleCurtainRef.current,
        buttonCurtainRef.current,
        lineCurtainRef.current,
        descCurtainRef.current,
      ].filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(curtains, { scaleX: 0 });
        return;
      }

      const DURATION = 1.6;

      gsap.set(curtains, { scaleX: 1, transformOrigin: "right center" });

      const revealTo = {
        scaleX: 0,
        duration: DURATION,
        ease: "power3.inOut",
      };

      const content = [
        imageRef.current,
        titleRef.current,
        buttonRef.current,
        descRef.current,
      ].filter(Boolean);
      gsap.set(content, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      const textReveal = { ...revealTo, duration: 1.3 };
      const fadeTo = { opacity: 1, duration: DURATION, ease: "power3.inOut" };
      const textFadeTo = { opacity: 1, duration: 1.3, ease: "power3.inOut" };

      // Curtain slides away right-to-left, uncovering content — while the
      // content itself fades in underneath, matching the original clipPath
      // + opacity combo. Both properties are transform/opacity only
      // (compositor thread, unaffected by CPU throttling / Low Power Mode).
      tl.to(imageCurtainRef.current, revealTo, 0)
        .to(imageRef.current, fadeTo, 0)
        .to(titleCurtainRef.current, textReveal, 0)
        .to(titleRef.current, textFadeTo, 0)
        .to(lineCurtainRef.current, textReveal, ">")
        .to(descCurtainRef.current, textReveal, "<")
        .to(descRef.current, textFadeTo, "<")
        .to(buttonCurtainRef.current, textReveal, "<")
        .to(buttonRef.current, textFadeTo, "<");
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group w-full md:w-90 flex flex-col relative overflow-hidden"
    >
      {/* IMAGE */}
      <div ref={imageRef} className="relative overflow-hidden">
        <CurtainRevealImage
          field={image}
          className="w-full h-90 md:h-100 object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
          imgixParams={{ w: 800, q: 80 }}
        />
        <div ref={imageCurtainRef} className="absolute inset-0 bg-[#f4f1ed]" />
      </div>

      {/* Title + Button */}
      <div className="flex flex-row w-full items-baseline justify-between mt-4">
        <div
          ref={titleRef}
          className={`${titleClassName} relative overflow-hidden`}
        >
          <PrismicRichText field={title} />
          <div
            ref={titleCurtainRef}
            className="absolute inset-0 bg-[#f4f1ed]"
          />
        </div>

        <div ref={buttonRef} className="relative overflow-hidden">
          <Button className="py-1 px-2" field={bookingLink}>
            {linkText}
          </Button>
          <div
            ref={buttonCurtainRef}
            className="absolute inset-0 bg-[#f4f1ed]"
          />
        </div>
      </div>

      {/* Animated Line */}
      <div className="relative mt-2 h-[1px] w-full overflow-hidden">
        <div ref={lineRef} className="h-full w-full bg-black" />
        <div ref={lineCurtainRef} className="absolute inset-0 bg-[#f4f1ed]" />
      </div>

      {/* Description */}
      <div className="flex mt-3 flex-row items-end justify-between relative">
        {description && (
          <div
            ref={descRef}
            className={`font-barlow ${descriptionClassName} relative overflow-hidden`}
          >
            <PrismicRichText
              field={description}
              className="m-0 font-barlow text-[12px] lg:text-[14px]"
            />
            <div
              ref={descCurtainRef}
              className="absolute inset-0 bg-[#f4f1ed]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
