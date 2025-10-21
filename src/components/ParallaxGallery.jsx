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

    // Create a timeline for more control over the two phases (in and out)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: 1,
        start: "top bottom",
        end: "bottom top", // Keep the same trigger window
        markers: true,
    
      },
    });

    tl.from(
      image,
      {
        yPercent: 20,
        opacity: 1,
        ease: "none",
  
      },
      0
    )

      .to(
        image,
        {
          yPercent: -10,
          opacity: 0,
          ease: "none",
         
        },
        1
      );
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
