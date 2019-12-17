import React from "react";

export const SvgIcon = ({
  d,
  width = 200,
  height = 200,
  stroke = "#000",
  strokeWidth = 0,
  fill = "#000",
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      width={width}
      height={height}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        fillRule="nonzero"
      />
    </svg>
  );
};
