import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

export default function RoomCard({
  image,
  title,
  description,
  bookingLink,
  linkText = "Book Now",
  titleClassName = "text-xl font-semibold",
  descriptionClassName = "text-xs text-gray-700",
  buttonTextProp = {},
}) {
  return (
    <div className="group flex flex-col py-4 relative">
      {/* Room Image */}
      {image && (
        <PrismicNextImage
          field={image}
          className="w-full h-[29.688rem] object-cover"
        />
      )}

      {/* Title */}
      {title && (
        <div className={`mt-4 ${titleClassName}`}>
          <PrismicRichText field={title} />
        </div>
      )}

      <div className="w-auto border-b-1 pt-[1.125rem]"></div>

      <div className="flex mt-4 flex-row items-end justify-between relative">
        {/* Description */}
        {description && (
          <div className={`pr-2 w-[60%] md:w-[70%] ${descriptionClassName}`}>
            <PrismicRichText
              field={description}
              components={{
                paragraph: ({ children }) => <p className="m-0">{children}</p>,
              }}
            />
          </div>
        )}

        {/* Hover Button */}
        {bookingLink && (
          <div className="transition-opacity duration-300
                          opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
            <PrismicNextLink field={bookingLink} className="block">
              <Button variant="outline" showArrow {...buttonTextProp}>
                {linkText}
              </Button>
            </PrismicNextLink>
          </div>
        )}
      </div>
    </div>
  );
}
