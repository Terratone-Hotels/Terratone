"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";
import CurtainRevealImage from "./CurtainRevealImage";
import RichTextRenderer from "./RichTextRenderer";

export default function RoomCard({
  image,
  title,
  description,
  bookingLink,
  linkText,
  titleClassName = "text-xl font-semibold",
  descriptionClassName = " text-gray-700",
  buttonClassNames = "",
}) {
  return (
    <div className="group  w-full md:w-90 xl:w-110 flex flex-col  relative ">
      <div>
        <CurtainRevealImage
          field={image}
          className="w-full h-90 md:h-110 object-cover"
        />
      </div>

      {/* Title */}
      {title && (
        <div className={`mt-4 ${titleClassName}`}>
          <RichTextRenderer field={title} />
        </div>
      )}

      <div className="w-auto border-b-1"></div>

      {/* Description + Button */}
      <div className="flex mt-3 flex-row items-end justify-between relative">
        {description && (
          <div
            className={`font-barlow w-[60%] md:w-[70%] ${descriptionClassName}`}
          >
            <RichTextRenderer
              field={description}
              className="m-0 font-barlow text-[15px]"
            />
          </div>
        )}

        <Button className={`p-1.5 ${buttonClassNames}`}>
          <PrismicNextLink field={bookingLink}>{linkText}</PrismicNextLink>
        </Button>
      </div>
    </div>
  );
}
