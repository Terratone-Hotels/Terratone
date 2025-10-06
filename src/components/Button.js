"use client";
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

export default function Button({
  children,
  className,
  variant = "default",
  showArrow = true,
}) {
  const isNormal = variant === "normal";
  const isTransparent = variant === "transparent";

  // Single-span button for mobile / transparent
  if (isNormal || isTransparent) {
    return (
      <button
        className={clsx(
          "inline-flex items-center font-medium font-barlowNormal text-xs md:text-sm overflow-hidden transition-colors duration-300",
          className
        )}
      >
        <span
          className={clsx(
            "flex items-center justify-center px-4 py-2 gap-2 transition-colors duration-300",
            isTransparent
              ? "bg-transparent hover:bg-[#E4A3A2] text-black border border-transparent"
              : "bg-white text-black border border-black hover:border-transparent hover:bg-[#E4A3A2]"
          )}
        >
          {children}
          {showArrow && <ArrowIcon className="w-[0.688rem] h-[0.625rem]" />}
        </span>
      </button>
    );
  }

  // Default hover-split style
  return (
    <button
      className={clsx(
        "group inline-flex items-center border border-black font-medium font-barlowNormal text-xs md:text-sm transition-colors duration-300",
        className
      )}
    >
      {/* Text */}
      <span
        className={clsx(
          "px-3 h-8 flex items-center justify-center text-black transition-transform duration-300",
          "bg-white group-hover:bg-white", // Default appearance: white bg, black text
          "group-hover:translate-x-0.5" //changed from 0
        )}
      >
        {children}
      </span>

      {/* Arrow */}
      <span
        className={clsx(
          "px-2 h-8 flex items-center justify-center text-black transition-transform duration-300",
          "bg-white group-hover:bg-white",
          "group-hover:translate-x-0.6"
        )}
      >
        {showArrow && <ArrowIcon className="w-[0.688rem] h-[0.625rem]" />}
      </span>

      {/* Inner div to trigger split + color/border on button hover */}
      <style jsx>{`
        button.group:hover span:first-child {
          transform: translateX(-0.25rem);
          background-color: #e4a3a2;
        }
        button.group:hover span:last-child {
          transform: translateX(0.25rem);
          background-color: #e4a3a2;
        }
        button.group:hover {
          border-color: transparent;
        }
      `}</style>
    </button>
  );
}
