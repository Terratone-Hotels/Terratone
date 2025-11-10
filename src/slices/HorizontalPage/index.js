"use client";

import { useLayoutEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalPage = ({ slice }) => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const bgRef = useRef(null);
  const imgTopRef = useRef(null);
  const imgBottomRef = useRef(null);
  const img4Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray(".panel");
      const stops = [];

      sections.forEach((section, index) => {
        if (section.dataset.pin) stops.push(index);
      });

      // ✨ Master timeline
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth * 2, // slower scroll distance
          // markers: true,
        },
      });

      tl.timeScale(0.8); // slows everything slightly for cinematic flow

      stops.forEach((stop, index) => {
        const isSecondSection = stop === 1;
        tl.to(sections, { xPercent: -(100 * stop), duration: 1 });

        if (isSecondSection) {
          const text1 = text1Ref.current;
          const text2 = text2Ref.current;
          const text3 = text3Ref.current;
          const text4 = text4Ref.current;
          const text5 = text5Ref.current;
          const bg = bgRef.current;
          const imgTop = imgTopRef.current;
          const imgBottom = imgBottomRef.current;
          const img4 = img4Ref.current;

          // Initial states
          gsap.set([text1, text2, text3, text4, text5], { opacity: 0 });
          gsap.set([imgTop, imgBottom, img4], { opacity: 0, scale: 1 });
          gsap.set(bg, { scale: 1, transformOrigin: "center center" });

          // 🎞️ Section 2 animation sequence
          tl.to(text1, { opacity: 1, duration: 1 })
            .to(bg, { scale: 0.5, duration: 2, ease: "power2.out" })
            .to(text1, { opacity: 0, duration: 0.5 }, "<")
            .to(text2, { opacity: 1, duration: 1 })
            .to({}, { duration: 1 })
            .to([text2, bg], { opacity: 0, duration: 1.2, ease: "power1.out" })
            // 🖼️ image 2 + 3 fade in
            .to([imgTop, imgBottom], {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
            })
            // ✨ text 3 fade in
            .to(
              text3,
              { opacity: 1, duration: 1.5, ease: "power2.out" },
              ">-0.5"
            )
            .to({}, { duration: 1 })
            // 🌓 text 3 fade out and image 2 + 3 scale down + fade out simultaneously
            .to(text3, { opacity: 0, duration: 1 })
            .to(
              [imgTop, imgBottom],
              {
                opacity: 0,
                scale: 0.8,
                duration: 2,
                ease: "power2.inOut",
              },
              "<"
            )
            // 🌅 image 4 scales up (center rectangle)
            .fromTo(
              img4,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 0.6,
                duration: 2,
                ease: "power2.out",
              }
            )
            // 🪄 text 4 fade in
            .to(
              text4,
              { opacity: 1, duration: 1.2, ease: "power2.out" },
              ">+0.4"
            )
            // 🌙 fade out text 4 and bring in text 5
            .to(text4, { opacity: 0, duration: 1.2, ease: "power1.inOut" })
            .fromTo(
              text5,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
              ">-0.3"
            );
        }

        tl.to(sections, { xPercent: -(100 * stop), duration: 1 });

        if (index === stops.length - 1) {
          tl.to(sections, {
            xPercent: -(100 * (sections.length - 1)),
            duration: 1,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-container overflow-hidden relative"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="panels flex flex-nowrap h-screen">
        {/* SECTION 1 */}
        <section className="panel w-screen h-screen flex items-center justify-start px-24 font-barlow">
          <div className="text-left max-w-[600px] text-[340px] leading-tight">
            <PrismicRichText field={slice.primary.our_story} />
          </div>
        </section>

        {/* 🟧 SECTION 2 */}
        <section
          className="panel relative flex flex-col items-center justify-center text-white text-4xl w-screen h-screen overflow-hidden"
          data-pin="true"
        >
          {/* Background */}
          <div ref={bgRef} className="absolute inset-0 -z-10">
            <PrismicNextImage
              field={slice.primary.image_1}
              fill
              className="object-cover object-center"
              alt={slice.primary.image_1?.alt || "Background image 1"}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Foreground Image 2 */}
          <div
            ref={imgTopRef}
            className="absolute top-0 left-[75%] -translate-x-1/2 w-[30%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_2}
              fill
              className="object-cover object-center shadow-lg"
              alt={slice.primary.image_2?.alt || "Top image"}
            />
          </div>

          {/* Foreground Image 3 */}
          <div
            ref={imgBottomRef}
            className="absolute bottom-0 left-[25%] -translate-x-1/2 w-[30%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_3}
              fill
              className="object-cover object-center shadow-lg"
              alt={slice.primary.image_3?.alt || "Bottom image"}
            />
          </div>

          {/* Image 4 — Centered Rectangle */}
          <div
            ref={img4Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[135vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_4}
              fill
              className="object-cover object-center shadow-lg"
              alt={slice.primary.image_4?.alt || "Image 4"}
            />
          </div>

          {/* Centered Texts */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center text-center max-w-[700px] w-full px-6 translate-y-[-5%]">
              {/* Text 1 */}
              <div ref={text1Ref}>
                <PrismicRichText field={slice.primary.text_1} />
              </div>

              {/* Text 2 */}
              <div
                ref={text2Ref}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PrismicRichText field={slice.primary.text_2} />
              </div>

              {/* Text 3 */}
              <div
                ref={text3Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-black opacity-0"
              >
                <PrismicRichText field={slice.primary.text_3} />
              </div>

              {/* Text 4 */}
              <div
                ref={text4Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_4} />
              </div>

              {/* Text 5 */}
              <div
                ref={text5Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_5} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section
          className="panel bg-purple-600 flex flex-col items-center justify-center text-white text-4xl w-screen h-screen"
          data-pin="true"
        >
          <h1 className="title-fade-in-right">Section 3</h1>
          <p className="text-fade-out-right mt-4 text-xl">
            This section transitions after all cinematic sequences.
          </p>
          <div className="mt-8 w-20 h-20 bg-white" />
        </section>

        {/* SECTION 4 */}
        <section
          className="panel bg-green-700 flex flex-col items-center justify-center text-white text-4xl w-screen h-screen"
          data-pin="true"
        >
          <h1 className="title-fade-in-top">Section 4</h1>
          <p className="mt-4 text-xl">Another pinned section for visuals.</p>
          <div className="mt-8 w-20 h-20 bg-white" />
        </section>

        {/* SECTION 5 */}
        <section
          className="panel bg-gray-900 flex items-center justify-center text-white text-5xl w-screen h-screen"
          data-pin="true"
        >
          <div>Section 5 — End of Scroll</div>
        </section>
      </div>
    </section>
  );
};

export default HorizontalPage;
