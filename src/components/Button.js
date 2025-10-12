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
  className = "",
  showArrow = true,
  noBorder = false, // <-- new prop to remove border
}) {
  return (
    <button
      className={clsx(
        "group inline-flex font-medium uppercase ",
        !noBorder && "border border-black" // default: border present
      )}
    >
      {/* Text span */}
      <span
        className={clsx(
          "flex items-center justify-center font-barlowNormal text-xs lg:text-sm text-black transition-transform duration-300",
          className
        )}
      >
        {children}
      </span>

      {/* Arrow span */}
      <span
        className={clsx(
          "flex items-center justify-center text-black transition-transform duration-300 ",
          className
        )}
      >
        {showArrow && <ArrowIcon className="w-[0.688rem] h-[0.625rem]" />}
      </span>

      {/* Split hover animation */}
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
