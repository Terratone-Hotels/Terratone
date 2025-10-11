"use client";
import { PrismicNextImage } from "@prismicio/next";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ParallaxGallery({ field, className = "" }) {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    gsap.to(image, {
      yPercent: -50,

      scrollTrigger: {
        trigger: image,
        scrub:true,
        start: "top 80%",
        end: "bottom 50%",
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className={` ${className}`}>
      <PrismicNextImage
        field={field}
        ref={imageRef}
        className="  w-full h-full object-cover"
      />
    </div>
  );
}

export default ParallaxGallery;
