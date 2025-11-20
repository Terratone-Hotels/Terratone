import * as React from "react";

const ArrowIcon = ({
  className = "",
  width = "12",
  height = "10",
  fill = "#121110",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 10"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M6.61566 10L5.65356 9.04609L8.99418 5.69668H0.602539V4.30332H8.99418L5.65356 0.959272L6.61566 0L11.6025 5L6.61566 10Z"
      fill={fill}
    />
  </svg>
);

export default ArrowIcon;
