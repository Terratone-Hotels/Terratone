"use client";

import React from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function StoryBlockALayout({ slice }) {
  const img1 = slice?.primary?.block_a_image_1;
  const img2 = slice?.primary?.block_a_image_2;
  const img3 = slice?.primary?.block_a_image_3;
  const img4 = slice?.primary?.block_a_image_4;

  const txt1 = slice?.primary?.block_a_text_1;
  const txt2 = slice?.primary?.block_a_text_2;
  const txt3 = slice?.primary?.block_a_text_3;
  const txt4 = slice?.primary?.block_a_text_4;

  return (
    // ⚠️ Flex container = horizontal layout
    <div className="flex w-fit h-screen">
      {/* Panel 1 */}
      <section className=" w-screen h-screen flex items-center justify-center shrink-0">
        <div className=" relative flex justify-center items-center">
          <div className="absolute  w-[513px] h-[376px]">
            {img1 && (
              <PrismicNextImage field={img1} fill className="object-cover w-full h-full" />
            )}
          </div>
          <div className="relative z-10 max-w-[60ch] text-center text-white font-medium text-4xl px-6">
            <PrismicRichText field={txt1} />
          </div>
        </div>
      </section>

      {/* Panel 2 */}
      <section className="relative w-screen h-screen flex items-center justify-center shrink-0">
        <div className="absolute inset-0 flex items-center justify-between px-[5vw]">
          <div className="relative w-[20vw] h-[60vh]">
            {img2 && (
              <PrismicNextImage field={img2} fill className="object-cover" />
            )}
          </div>
          <div className="relative w-[20vw] h-[60vh]">
            {img3 && (
              <PrismicNextImage field={img3} fill className="object-cover" />
            )}
          </div>
        </div>
        <div className="relative z-10 max-w-[60ch] text-center px-6">
          <PrismicRichText field={txt2} />
        </div>
      </section>

      {/* Panel 3 */}
      <section className="relative w-screen h-screen flex items-center justify-center shrink-0">
        <div className="absolute inset-0">
          {img4 && (
            <PrismicNextImage field={img4} fill className="object-cover" />
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-[5vw] pointer-events-none">
          <div className="relative w-[20vw] h-[40vh]">
            {img2 && (
              <PrismicNextImage field={img2} fill className="object-cover" />
            )}
          </div>
          <div className="relative w-[20vw] h-[40vh]">
            {img3 && (
              <PrismicNextImage field={img3} fill className="object-cover" />
            )}
          </div>
        </div>
        <div className="relative z-20 max-w-[60ch] text-center px-6">
          <PrismicRichText field={txt3} />
        </div>
      </section>

      {/* Panel 4 */}
      <section className="relative w-screen h-screen flex items-center justify-center shrink-0">
        <div className="absolute inset-0">
          {img4 && (
            <PrismicNextImage field={img4} fill className="object-cover" />
          )}
        </div>
        <div className="relative z-10 max-w-[60ch] text-center px-6">
          <PrismicRichText field={txt4} />
        </div>
      </section>
    </div>
  );
}
