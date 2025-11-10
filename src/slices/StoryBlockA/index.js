"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

export default function BlockA({ slice }) {
    const elementRef = useRef(null); // Reference to the entire slice container
    const imageRef = useRef(null); // Reference to the image itself
    const textRef = useRef(null); // Reference to the text container

    useEffect(() => {
        if (typeof window === "undefined") return;

        const triggerElement = elementRef.current;
        const imageElement = imageRef.current;
        const textElement = textRef.current;

        if (!triggerElement || !imageElement || !textElement) return;

        const parentScrollTrigger = ScrollTrigger.getById("horizontalScroll");
        if (!parentScrollTrigger) return;

        // --- Create a timeline for the inner animations ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                containerAnimation: parentScrollTrigger.animation,
                start: "left center",
                end: "center center",
                scrub:true,
                markers: true,
            },
        });

        // Ensure the text is hidden and positioned low (y: 50) for a move-up effect.
        // Set initial clip-path for the image (circle(0% at 50% 50%)) for the reveal effect.
        gsap.set(textElement, { opacity: 0, y: 50 });
        gsap.set(imageElement, { clipPath: "circle(0% at 50% 50%)" });

        // 2. Image Clip Reveal Animation (Duration 1.0)
        tl.to(imageElement, {
            clipPath: "circle(100% at 50% 50%)",
            duration: 2.0, 
            ease: "power2.inOut",
        });

        // 3. Text Fade-in Animation (Starts at 0.9 seconds into the timeline, when image is 90% revealed)
        tl.to(textElement, {
            y: 0, // Animate up to final position
            opacity: 1, // Animate to full visibility
            duration: 0.5,
            ease: "power2.out",
        }, 2); // Absolute position marker for sequencing

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={elementRef}
            className="relative flex-none w-screen h-screen shrink-0 bg-stone overflow-hidden"
        >
            {/* The content of the animated slice */}
            <div className="relative w-full h-full flex items-center justify-center">
                <PrismicNextImage
                    field={slice.primary.block_a_image_1}
                    fill
                    className="object-cover"
                    ref={imageRef}
                    style={{ willChange: 'clip-path' }} // Optimization for clip-path animation
                />
                <div
                    ref={textRef}
                    // Text is positioned using CSS and its visibility/position controlled by GSAP
                    className="absolute flex items-center justify-center text-center text-2xl text-white z-20 px-4"
                >
                    <PrismicRichText field={slice.primary.block_a_text_1} />
                </div>
                <div>
                  <PrismicRichText field={slice.primary.block_a_text_2} />
                </div>
            </div>
        </section>
    );
}