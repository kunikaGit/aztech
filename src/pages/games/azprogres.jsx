import React, { useMemo } from 'react';
import './AZProgress.scss';

const AZProgress = ({ progress }) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Total path length (measured from actual path length)
  const totalLength = 1200; // approx based on actual path

  // Calculate stroke offset
  const dashOffset = totalLength - (clampedProgress / 100) * totalLength;

  // AZ Path (converted via font to path, simplified)
  const azPath = "M50 250 L100 50 L150 250 L130 250 L115 200 L85 200 L70 250 Z M200 50 L250 50 L200 150 L250 150 L200 250 L250 250";

  return (
    <div className="az-container">
      <svg viewBox="0 0 300 300" className="az-svg">
        <path
          d={azPath}
          className="az-path"
          style={{
            strokeDasharray: totalLength,
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>
    </div>
  );
};

export default AZProgress;
