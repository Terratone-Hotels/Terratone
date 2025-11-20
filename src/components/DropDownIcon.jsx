import * as React from "react";

export default function DropdownArrow({
  width = 9,
  height = 5,
  stroke = "black",
  className = "",
  ...props
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0.37207 0.333984L3.66496 4.00726C4.05549 4.44289 4.68865 4.44289 5.07918 4.00726L8.37207 0.333984"
        stroke={stroke}
      />
    </svg>
  );
}
