"use client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 10"
    className={className}
    fill="currentColor"
  >
    <path d="M6.62604 10L5.66394 9.04609L9.00456 5.69668H0.612915V4.30332H9.00456L5.66394 0.959272L6.62604 0L11.6129 5L6.62604 10Z" />
  </svg>
);

export default function SimpleButton({
  children,
  field = null, // Prismic link field
  className = "",
  bgColor = "bg-white",
  textColor = "text-black",
  hoverColor = "hover:bg-[#e4a3a2]",
  showArrow = true,
  type = "button",
}) {
  const content = (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2 font-medium rounded transition-colors duration-300",
        bgColor,
        textColor,
        hoverColor,
        className
      )}
    >
      <span>{children}</span>
      {showArrow && <ArrowIcon className="w-3 h-3" />}
    </button>
  );

  // Wrap in PrismicNextLink if a link field is provided
  return field ? <PrismicNextLink field={field}>{content}</PrismicNextLink> : content;
}
