import React from 'react';

const RobotLogo = ({ size = 32, color = '#00ff88' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot Head */}
      <rect
        x="8"
        y="12"
        width="24"
        height="20"
        rx="3"
        fill={color}
      />
      {/* Antenna */}
      <line
        x1="20"
        y1="12"
        x2="20"
        y2="8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="6"
        r="2"
        fill={color}
      />
      {/* Eyes */}
      <circle
        cx="16"
        cy="20"
        r="3"
        fill="#1a1a1a"
      />
      <circle
        cx="24"
        cy="20"
        r="3"
        fill="#1a1a1a"
      />
      {/* Mouth */}
      <rect
        x="15"
        y="26"
        width="10"
        height="2"
        rx="1"
        fill="#1a1a1a"
      />
      <rect
        x="17"
        y="29"
        width="6"
        height="2"
        rx="1"
        fill="#1a1a1a"
      />
    </svg>
  );
};

export default RobotLogo;
