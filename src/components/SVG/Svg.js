import React from "react";

export default function Svg({ reverse, length, arrowWidth }) {
  return (
    <svg
      height="20px"
      width={arrowWidth}
      overflow="auto"
      stroke="#d0d0d0"
      fill="#d0d0d0"
      stroke-width="2"
      id="0_0_a_0_0_a_1"
      style={reverse ? { transform: "scale(-1,1)" } : null}
    >
      <circle cx="10" cy="10" r="4"></circle>
      <path d={`M 10 10 l ${length - 24} 0`} fill="none"></path>
      <polygon
        points="0,-4 8,0, 0,4"
        transform={`translate(${length - 20},10) rotate(0)`}
      ></polygon>
    </svg>
  );
}
