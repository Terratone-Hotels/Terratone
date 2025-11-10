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
              <PrismicNextImage
                field={img1}
                fill
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="relative z-10 max-w-[60ch] text-center text-white font-medium text-4xl px-6">
            <PrismicRichText field={txt1} />
          </div>
        </div>
      </section>
    </div>
  );
}
