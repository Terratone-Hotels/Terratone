"use client";

import { PrismicNextLink } from "@prismicio/next";

export default function WhatsappButton({
  field,
  children,
  className,
  arrowClassName,
  arrowSpan,
  noArrow,
}) {
  const label = children ?? field?.text;

  return (
    <PrismicNextLink
      field={field}
      className={`group inline-flex font-barlowNormal  items-end relative cursor-pointer ${className || ""}`}
    >
      <div className="flex flex-row font-medium gap-1.5 items-center">
        <span
          aria-hidden="true"
          className="w-[1.1em] h-[1.1em] shrink-0 bg-[#25D366] lg:bg-black transition-colors duration-200 group-hover:bg-[#25D366]"
          style={{
            WebkitMask: "url(/whatsapp-128-svgrepo-com.svg) center / contain no-repeat",
            mask: "url(/whatsapp-128-svgrepo-com.svg) center / contain no-repeat",
          }}
        />

        <span
          className="
            relative
            after:absolute
            after:left-0
            after:bottom-[-1px]
            after:w-full
            lg:after:w-0
            after:h-[1px]
            after:bg-current
            after:transition-all
            after:duration-300
            lg:group-hover:after:w-full
          "
        >
          {label}
        </span>

        {!noArrow && (
          <span className={`${arrowSpan || ""}`}>
            <ArrowIcon
              className={`w-[.6em] h-[.96em] lg:opacity-0 lg:translate-x-[-4px] transition-all duration-300 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 ${arrowClassName || ""}`}
            />
          </span>
        )}
      </div>
    </PrismicNextLink>
  );
}

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
