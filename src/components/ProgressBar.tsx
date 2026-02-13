import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  level: number;
  levelTitle: string;
  currentExp: number;
  maxExp: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ level, levelTitle, currentExp, maxExp }) => {
  // Calculate percentage for the bar width, clamped between 0 and 100
  const percentage = Math.min(100, Math.max(0, (currentExp / maxExp) * 100));

  const isMaxLevel = level === 5;

  return (
    <div className="progress-card">

      {/* Level Title */}
      <div className="level-text-container">
        <span className="level-title">
          {isMaxLevel
            ? `МАКСИМАЛЬНЫЙ УРОВЕНЬ: ${levelTitle}`
            : `УРОВЕНЬ ${level}: ${levelTitle}`
          }
        </span>
      </div>

      {/* Bar Container */}
      <div className="progress-track">

        {/* Pink Gradient Fill (matching hearts) */}
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect on the bar */}
          <div className="progress-shine"></div>
        </div>

        {/* Text Overlay (Centered) */}
        <div className="progress-label-overlay">
          <span className="progress-label-text">
            {isMaxLevel
              ? "СИЛА ЛЮБВИ: МАКС."
              : `СИЛА ЛЮБВИ: ${currentExp}/${maxExp}`
            }
          </span>
        </div>
      </div>

    </div>
  );
};