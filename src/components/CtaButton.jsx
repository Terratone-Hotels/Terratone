"use client";

export default function CtaButton({
  children,
  className,
  arrowClassName,
  arrowSpan,
  noArrow,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex font-barlowNormal uppercase items-end relative cursor-pointer ${className || ""}`}
    >
      <div className="flex flex-row font-medium gap-1">
        <span
          className="
            relative
            after:absolute
            after:left-0
            after:bottom-[-1px]
            after:w-0
            after:h-[1px]
            after:bg-current
            after:transition-all
            after:duration-300
            group-hover:after:w-full
          "
        >
          {children}
        </span>

        {!noArrow && (
          <span className={`${arrowSpan || ""}`}>
            <ArrowIcon
              className={`w-[.6em] h-[.96em] opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${arrowClassName || ""}`}
            />
          </span>
        )}
      </div>
    </button>
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