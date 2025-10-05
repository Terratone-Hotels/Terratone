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
          <div className={`pr-2 font-barlow w-[60%] md:w-[70%] ${descriptionClassName}`}>
            <PrismicRichText
              field={description}
              components={{
                paragraph: ({ children }) => <p className="m-0 font-barlow ">{children}</p>,
              }}
            />
          </div>
        )}

        {/* Hover Button */}
        {bookingLink && (
<div className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
  <PrismicNextLink field={bookingLink} className="block">
    <Button 
      {...buttonTextProp}
      className="hover:border-transparent transition-colors duration-300"
    >
      {linkText}
    </Button>
  </PrismicNextLink>
</div>
        )}
      </div>
    </div>
  );
}
