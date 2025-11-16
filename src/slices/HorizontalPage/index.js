"use client";

import { useLayoutEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotWave from "@/components/DotWave";
import AnimatedBrandIcon from "@/components/AnimatedBrandIcon";
import AnimatedBrandIconOL from "@/components/AnimatedBrandIconOL"

gsap.registerPlugin(ScrollTrigger);

const HorizontalPage = ({ slice }) => {
  const containerRef = useRef(null);

  // 🟣 SECTION 2 REFS
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const bgRef = useRef(null);
  const imgTopRef = useRef(null);
  const imgBottomRef = useRef(null);
  const img4Ref = useRef(null);

  // 🟡 SECTION 3 REFS
  const section3TextRef = useRef(null);
  const dotWaveRef = useRef(null);
  const section3Text2Ref = useRef(null);
  const section3Text3Ref = useRef(null);
  const brandIconRef = useRef(null);

  // 🟠 SECTION 5 REFS
  const section5TextRef = useRef(null);
  const section5Image1Ref = useRef(null);
  const section5Image2Ref = useRef(null);
  const section5Image3Ref = useRef(null);

  // 🟢 SECTION 6 REFS
  const section6ImgRef = useRef(null);
  const section6TextRef = useRef(null);

  // 🟤 MARQUEE REFS

  const marqueeWrapperRef = useRef(null);
  const marqueeImagesRef = useRef([[], [], []]); // 3 columns

  const galleryImagesRef = useRef([]);

  const section6Text2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray(".panel");
      const stops = [];
      sections.forEach((section, i) => {
        if (section.dataset.pin) stops.push(i);
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth * 3,
          // markers: true,
        },
      });

      tl.timeScale(0.8);

      stops.forEach((stop, index) => {
        const isSecond = stop === 1;
        const isThird = stop === 2;
        const isFourth = stop === 3;
        const isFifth = stop === 4;
        const isSixth = stop === 5; // 👈 added for section 6

        // 👇 UPDATED LINE (only this logic changed)
        tl.to(sections, {
          xPercent: -(isFourth ? 100 * stop : 100 * stop),
          duration: isFourth ? 1 : 1,
        });

        // === 🟣 SECTION 2 ===
        if (isSecond) {
          const text1 = text1Ref.current;
          const text2 = text2Ref.current;
          const text3 = text3Ref.current;
          const text4 = text4Ref.current;
          const text5 = text5Ref.current;
          const bg = bgRef.current;
          const imgTop = imgTopRef.current;
          const imgBottom = imgBottomRef.current;
          const img4 = img4Ref.current;

          gsap.set(
            [text1, text2, text3, text4, text5, imgTop, imgBottom, img4],
            { opacity: 0 }
          );
          gsap.set(bg, { scale: 1 });

          tl.to(text1, { opacity: 1, duration: 1 })
            .to(bg, { scale: 0.5, duration: 2, ease: "power2.out" })
            .to(text1, { opacity: 0, duration: 0.5 }, "<")
            .to(text2, { opacity: 1, duration: 1 })
            .to({}, { duration: 1 })
            .to([text2, bg], { opacity: 0, duration: 1.2 })

            .set(imgTop, { y: "-100vh" })
            .set(imgBottom, { y: "100vh" })
            .to([imgTop, imgBottom], {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
            })
            .to(text3, { opacity: 1, duration: 1.5 }, ">-0.5")
            .to({}, { duration: 1 })
            .to(text3, { opacity: 0, duration: 1 })
            .to(
              [imgTop, imgBottom],
              { opacity: 0, scale: 0.8, duration: 2, ease: "power2.inOut" },
              "<"
            )
            .fromTo(
              img4,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 0.6, duration: 2, ease: "power2.out" }
            )
            .to(text4, { opacity: 1, duration: 1.2 }, ">+0.4")
            .to(text4, { opacity: 0, duration: 1.2 })
            .fromTo(
              text5,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
              ">-0.3"
            );
        }

        // === 🟡 SECTION 3 ===
        // === 🟡 SECTION 3 ===
        if (isThird) {
          const text1 = section3TextRef.current;
          const wave = dotWaveRef.current;
          const text2 = section3Text2Ref.current;
          const text3 = section3Text3Ref.current;
          const icon = brandIconRef.current;

          // INITIAL STATES
          gsap.set([text1, wave], { opacity: 1 });
          gsap.set(text2, { opacity: 0, y: -40 });
          gsap.set(text3, { opacity: 0, y: 20 });
          gsap.set(icon, { opacity: 0, scale: 0.9, y: -80 });
          gsap.set(".brand-line-1", {
            rotation: 0,
            transformOrigin: "center center",
          });
          gsap.set(".brand-line-2", {
            rotation: 0,
            transformOrigin: "center center",
          });

          tl
            // 1️⃣ Fade out text1 + wave
            .to([text1, wave], { opacity: 0, duration: 1.5 })

            // 2️⃣ Fade-in text2 + text3 (from slightly apart positions)
            .to(
              text2,
              {
                opacity: 1,
                y: -10,
                duration: 1.2,
                ease: "power2.out",
              },
              ">-0.3"
            )
            .to(
              text3,
              {
                opacity: 1,
                y: 10,
                duration: 1.2,
                ease: "power2.out",
              },
              "<+0.1"
            )

            // small pause before split
            .to({}, { duration: 0.8 })

            // 3️⃣ Move text2 up & text3 down (creating the gap)
            .to(
              text2,
              {
                y: -100,
                opacity: 1,
                duration: 1.2,
                ease: "power2.inOut",
              },
              "split"
            )
            .to(
              text3,
              {
                y: 80,
                opacity: 1,
                duration: 1.2,
                ease: "power2.inOut",
              },
              "split"
            )

            // 4️⃣ BrandIcon appears WHEN the gap is fully open
            .fromTo(
              icon,
              {
                opacity: 0,
                scale: 0.85,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
                onStart: () => {
                  gsap.to(".brand-line-1", {
                    rotation: 36,
                    duration: 0.9,
                    ease: "power2.out",
                  });
                  gsap.to(".brand-line-2", {
                    rotation: 36,
                    duration: 0.9,
                    ease: "power2.out",
                  });
                },
              },
              "split+=1.0"
            )

            // 5️⃣ Fade out text2 + text3 AFTER icon appears
            .to(text2, { opacity: 0, duration: 0.8 }, ">0.3")
            .to(text3, { opacity: 0, duration: 0.8 }, "<")

            // 6️⃣ Icon fades out after some time
            .to(
              icon,
              {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
              },
              ">0.3"
            );
        }

        // === 🟤 SECTION 4 — SCRUB PARALLAX FROM BELOW ===
        if (isFourth) {
          const col1 = marqueeImagesRef.current[0];
          const col2 = marqueeImagesRef.current[1];
          const col3 = marqueeImagesRef.current[2];

          // Only col1 and col3 start below screen

          // Column 1 (upward spin)
          tl.fromTo(
            col1,
            { yPercent: 310 }, // START outside screen
            { yPercent: -310, ease: "none", duration: 4 }
          );

          // Column 2 (custom fromTo)
          tl.fromTo(
            col2,
            { yPercent: -310 }, // START below screen (further out)
            {
              yPercent: 310, // END position
              ease: "none",
              duration: 4,
            },
            "<"
          );

          // Column 3 (upward)
          tl.fromTo(
            col3,
            { yPercent: 310 }, // START outside screen
            { yPercent: -310, ease: "none", duration: 4 },
            "<" // END same as before
          );
        }

        // === 🔵 SECTION 5 — TEXT + IMAGES ===
        if (isFifth) {
          const text = section5TextRef.current;
          const img1 = section5Image1Ref.current;
          const img2 = section5Image2Ref.current;
          const img3 = section5Image3Ref.current;

          gsap.set([img1, img2, img3], { opacity: 0, scale: 0.95 });
          gsap.set(text, { opacity: 0 });

          tl.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 1.2 })
            .to({}, { duration: 1 })
            .to(text, { opacity: 0, duration: 1.2 })
            .to(img1, {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            })
            .to(
              img2,
              { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
              ">0.3"
            )
            .to(
              img3,
              { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
              ">0.3"
            );
        }

        // SECTION 6

        if (isSixth) {
          const img = section6ImgRef.current;
          const text = section6TextRef.current;
          const galleryRefs = galleryImagesRef.current;

          // Start states
          gsap.set([img, text, ...galleryRefs], { opacity: 0 });
          gsap.set(img, { clipPath: "circle(0% at 50% 50%)", scale: 1 });
          gsap.set(galleryRefs, { scale: 0.8 });

          tl
            // 1️⃣ Circular reveal
            .to(img, {
              opacity: 1,
              clipPath: "circle(50% at 50% 50%)",
              duration: 1.5,
              ease: "power2.out",
            })
            // 2️⃣ Fade text in
            .to(text, { opacity: 1, duration: 1, ease: "power2.out" }, "<+0.3")
            // 3️⃣ Hold with text visible
            .to({}, { duration: 1.5 })
            // 4️⃣ Fade text out and morph circle → rectangle
            .to(
              text,
              { opacity: 0, duration: 1, ease: "power2.inOut" },
              ">-0.3"
            )
            .to(
              img,
              {
                clipPath: "circle(150% at 50% 50%)", // expands outward first
                duration: 1.5,
                ease: "power2.inOut",
              },
              "<"
            )
            .set(img, { clipPath: "inset(0%)" }) // becomes rectangle once fully expanded
            // 5️⃣ Slight scale down (to make space)
            .to(img, {
              scale: 0.9,
              duration: 1.2,
              ease: "power2.inOut",
            })
            // 6️⃣ Reveal gallery organically
            .to(
              galleryRefs,
              {
                opacity: 1,
                scale: 1,
                stagger: 0.25,
                duration: 0.2,
                ease: "power2.out",
              },
              ">-0.4"
            )
            .to(
              [img, ...galleryRefs],
              {
                opacity: 0,

                duration: 2,
                ease: "power2.inOut",
              },
              ">+0.5"
            )
            .to(
              section6Text2Ref.current,
              {
                opacity: 1,
                duration: 1.8,
                ease: "power2.out",
              },
              ">-0.3"
            );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-container overflow-hidden relative"
    >
      <div className="panels flex flex-nowrap h-screen">
        {/* 🟢 SECTION 1 */}
        <section className="panel w-screen h-screen flex items-center justify-start px-24 ">
          <div className="text-left max-w-[600px] text-[278px] font-medium leading-60 font-serif">
            <PrismicRichText field={slice.primary.our_story} />
            <div className="flex items-baseline flex-row ">
              <div className="px-20">
                <AnimatedBrandIconOL/>
              </div>
              <div>
                <PrismicRichText field={slice.primary.story} />
              </div>
            </div>
          </div>
        </section>

        {/* 🟣 SECTION 2 */}
        <section
          className="panel relative flex flex-col items-center justify-center text-white text-4xl w-screen h-screen overflow-hidden"
          data-pin="true"
        >
          <div ref={bgRef} className="absolute inset-0 -z-10">
            <PrismicNextImage
              field={slice.primary.image_1}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div
            ref={imgTopRef}
            className="absolute top-0 left-[80%] -translate-x-1/2 w-[23%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_2}
              fill
              className="object-cover shadow-lg"
            />
          </div>
          <div
            ref={imgBottomRef}
            className="absolute bottom-0 left-[20%] -translate-x-1/2 w-[23%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_3}
              fill
              className="object-cover shadow-lg"
            />
          </div>
          <div
            ref={img4Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[135vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_4}
              fill
              className="object-cover shadow-lg"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center font-barlow font-medium text-center max-w-[700px] w-full px-6 translate-y-[-5%]">
              <div ref={text1Ref}>
                <PrismicRichText field={slice.primary.text_1} />
              </div>
              <div
                ref={text2Ref}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PrismicRichText field={slice.primary.text_2} />
              </div>
              <div
                ref={text3Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[85%] -translate-y-1/2 text-black opacity-0"
              >
                <PrismicRichText field={slice.primary.text_3} />
              </div>
              <div
                ref={text4Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_4} />
              </div>
              <div
                ref={text5Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_5} />
              </div>
            </div>
          </div>
        </section>

        {/* 🟡 SECTION 3 */}
        <section
          className="panel flex flex-col items-center justify-center w-screen h-screen px-16 text-center relative"
          data-pin="true"
        >
          <div
            ref={section3TextRef}
            className=" relative top-10   text-3xl font-barlow text-black  z-10"
          >
            <PrismicRichText field={slice.primary.section3_text_1} />
          </div>
          <div ref={dotWaveRef} className=" relative top-18 z-10">
            <DotWave />
          </div>
          <div
            ref={section3Text2Ref}
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-barlow opacity-0 text-4xl text-black z-20"
          >
            <PrismicRichText field={slice.primary.section_3_text_2} />
          </div>
          <div ref={brandIconRef} className="opacity-0">
            <AnimatedBrandIcon />
          </div>
          <div
            ref={section3Text3Ref}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 font-barlow text-4xl text-black opacity-0 z-20"
          >
            <PrismicRichText field={slice.primary.section_3_text_3} />
          </div>
        </section>

        {/* 🟤 SECTION 4 — SLOT MACHINE STYLE */}
        <section
          className="panel flex items-center justify-center w-screen h-screen gap-20"
          data-pin="true"
        >
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-10">
            {[
              slice.primary.marque_1_image_1,
              slice.primary.marque_1_image_2,
              slice.primary.marque_1_image_3,
              slice.primary.marque_1_image_1,
            ].map((img, i) => (
              <div
                key={"col1-" + i}
                ref={(el) => (marqueeImagesRef.current[0][i] = el)}
                className="w-[28vw] h-[55vh] relative overflow-hidden shadow-lg"
              >
                <PrismicNextImage field={img} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-10">
            {[
              slice.primary.marque_2_image_1,
              slice.primary.marque_2_image_2,
              slice.primary.marque_2_image_3,
              slice.primary.marque_2_image_1,
            ].map((img, i) => (
              <div
                key={"col2-" + i}
                ref={(el) => (marqueeImagesRef.current[1][i] = el)}
                className="w-[28vw] h-[55vh] relative overflow-hidden shadow-lg"
              >
                <PrismicNextImage field={img} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-10">
            {[
              slice.primary.marque_3_image_1,
              slice.primary.marque_3_image_2,
              slice.primary.marque_3_image_3,
              slice.primary.marque_3_image_1,
            ].map((img, i) => (
              <div
                key={"col3-" + i}
                ref={(el) => (marqueeImagesRef.current[2][i] = el)}
                className="w-[28vw] h-[55vh] relative overflow-hidden shadow-lg"
              >
                <PrismicNextImage field={img} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* 🔵 SECTION 5 — TEXT + IMAGES */}
        {/* 🔵 SECTION 5 — TEXT + IMAGES WITH GAPS */}
        <section
          className="panel relative flex items-center justify-center w-screen h-screen overflow-hidden "
          data-pin="true"
        >
          {/* TEXT */}
          <div
            ref={section5TextRef}
            className="absolute inset-0 flex left-1/2 -translate-x-1/2 font-barlow text-center items-center justify-center text-5xl text-black z-20 "
          >
            <PrismicRichText field={slice.primary.section_4_text} />
          </div>

          {/* IMAGES WITH GAP */}
          <div className="absolute inset-0 flex gap-4 p-4">
            {/* LEFT */}
            <div className="w-1/2 h-full relative  overflow-hidden ">
              <div
                ref={section5Image1Ref}
                className="absolute inset-0 opacity-0"
              >
                <PrismicNextImage
                  field={slice.primary.section_4_image_1}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-1/2 h-full flex flex-col gap-4">
              <div className="h-1/2 relative overflow-hidden ">
                <div
                  ref={section5Image2Ref}
                  className="absolute inset-0 opacity-0"
                >
                  <PrismicNextImage
                    field={slice.primary.section_4_image_2}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="h-1/2 relative overflow-hidden s">
                <div
                  ref={section5Image3Ref}
                  className="absolute inset-0 opacity-0"
                >
                  <PrismicNextImage
                    field={slice.primary.section_4_image_3}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        {/* 🟢 SECTION 6 — IMAGE MORPH + ORGANIC COLLAGE */}
        <section
          className="panel  flex flex-col items-center justify-center text-black text-5xl w-screen h-screen gap-8 relative overflow-hidden"
          data-pin="true"
        >
          {/* Main image */}
          <div
            ref={section6ImgRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vh] h-[45vh] overflow-hidden shadow-2xl z-20"
          >
            <PrismicNextImage
              field={slice.primary.section_5_image1}
              fill
              className="object-cover"
            />
          </div>

          {/* Gallery images */}
          {[
            slice.primary.section_5_gallery_1,
            slice.primary.section_5_gallery_2,
            slice.primary.section_5_gallery_3,
            slice.primary.section_5_gallery_4,
            slice.primary.section_5_gallery_5,
            slice.primary.section_5_gallery_6,
          ].map((img, i) => (
            <div
              key={i}
              ref={(el) => (galleryImagesRef.current[i] = el)}
              className={`absolute w-[25vh] h-[25vh] overflow-hidden opacity-0 z-10`}
              style={{
                top: ["8%", "25%", "70%", "70%", "10%", "40%"][i],
                left: ["15%", "85%", "15%", "80%", "65%", "5%"][i],
              }}
            >
              <PrismicNextImage field={img} fill className="object-cover" />
            </div>
          ))}

          {/* Text */}
          <div
            ref={section6TextRef}
            className="absolute bottom-[15%]  text-center font-barlow text-3xl px-6 z-30"
          >
            <PrismicRichText field={slice.primary.section_5_text_1} />
          </div>
          {/* Final reveal text */}
          <div
            ref={section6Text2Ref}
            className="absolute inset-0 flex items-center justify-center font-barlow text-center text-4xl px-6 opacity-0 z-30"
          >
            <PrismicRichText field={slice.primary.section_5_text_2} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default HorizontalPage;
