import * as React from "react";

const QuoteIcon = React.forwardRef(function QuoteIcon(
  { className = "w-6 h-6", size, color, style, ...props },
  ref
) {
  // if `size` prop is provided, we set width/height attributes (still overridable by className)
  const width = size ?? 94;
  const height = size ?? 68;

  // Allow explicit color prop, otherwise inherit from currentColor (Tailwind text-*)
  const fillValue = color ?? "currentColor";

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox="0 0 94 68"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      {...props}
    >
      {/* set fill on the path so there's no confusion about inheritance */}
      <path
        d="M20.2793 67.7598H0L32.1436 0H52.4229L20.2793 67.7598ZM61.2783 67.7598H41L73.1426 0H93.4219L61.2783 67.7598Z"
        fill={fillValue}
      />
    </svg>
  );
});

export default QuoteIcon;
