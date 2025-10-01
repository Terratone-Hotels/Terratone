import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

export default function RoomCard({
  image,
  title,
  description,
  bookingLink,
  linkText,
  titleClassName = "text-xl font-semibold",     
  descriptionClassName = "text-xs text-gray-700",
  buttonTextProp={}
}) {
  return (
    <div className="group flex flex-col py-4">
      {/* Room Image */}
      {image && (
        <PrismicNextImage
          field={image}
          className="w-full h-[475px] object-cover" 
        />
      )}

      {/* Title */}
      {title && (
        <div className={`mt-4 ${titleClassName}`}>
          <PrismicRichText field={title} />
        </div>
      )}

      <div className="w-auto border-b-1 pt-[1.125rem]"></div>

      <div className="flex mt-4 flex-row items-end justify-between">

        {/* Description */}
        
        {description && (
<div className={`pr-2 w-[60%] md:w-[70%] ${descriptionClassName}`}>
  <PrismicRichText
    field={description}
    components={{
      paragraph: ({ children }) => <p className="m-0">{children}</p>, // 👈 removes margin
    }}
  />
</div>

        )}

        {/* Button */}
        {bookingLink && (
          <div className="flex justify-center">
            <PrismicNextLink field={bookingLink} className="pb-0"{...buttonTextProp}>
              <Button
                variant="outline"
                showArrow
                className=" md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"{...buttonTextProp}
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
