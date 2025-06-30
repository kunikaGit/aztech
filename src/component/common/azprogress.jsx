import React from "react";

const AZTextFill = ({ progress = 0 }) => {
  const clamped = Math.max(0, Math.min(progress, 100));
  const viewBoxHeight = 150;

  const fillHeight = (clamped / 100) * viewBoxHeight;
  const fillY = viewBoxHeight - fillHeight;

  return (
    <svg
      viewBox="0 0 300 150"
      width="300"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        {/* Blue fill area from bottom to progress level */}
        <clipPath id="blue-fill">
          <rect x="0" y={fillY} width="100%" height={fillHeight} />
        </clipPath>
      </defs>

      {/* Blue AZ: only bottom clipped area will show */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="100"
        fontWeight="bold"
        fill="#007bff"
        fontFamily="Arial, sans-serif"
        clipPath="url(#blue-fill)"
      >
        AZ
      </text>

      {/* White AZ on top always (full shape) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="100"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        AZ
      </text>
    </svg>
  );
};

export default AZTextFill;
