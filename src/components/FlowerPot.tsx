import React, { useEffect, useState } from 'react';
import './FlowerPot.css';

interface FlowerPotProps {
  level: number;
}

export const FlowerPot: React.FC<FlowerPotProps> = ({ level }) => {
  const [isEvolving, setIsEvolving] = useState(false);

  // Trigger animation when reaching level 5
  useEffect(() => {
    if (level === 5) {
      setIsEvolving(true);
      const timer = setTimeout(() => setIsEvolving(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [level]);

  // Color Palette
  const C = {
    POT_MAIN: "#A0522D", // Sienna
    POT_DARK: "#8B4513", // SaddleBrown
    SOIL: "#3E2723",     // Dark Brown
    STEM: "#4ADE80",     // Green
    STEM_DARK: "#22C55E",
    PETAL_LIGHT: "#F472B6",
    PETAL_MAIN: "#EC4899",
    PETAL_DARK: "#BE185D",
    CENTER: "#FEF08A",
  };

  // Render different SVG paths based on level
  const renderFlower = () => {
    switch (level) {
      case 1: // Level 1: Just Pot + Soil
        return (
          <g>
            {/* Soil */}
            <rect x="10" y="22" width="12" height="2" fill={C.SOIL} />
          </g>
        );

      case 2: // Level 2: Sprout (Stem + 1 Leaf)
        return (
          <g>
            {/* Soil */}
            <rect x="10" y="22" width="12" height="2" fill={C.SOIL} />
            {/* Stem */}
            <rect x="15" y="16" width="2" height="6" fill={C.STEM} />
            {/* Leaf Left */}
            <path d="M15 18 h-2 v-1 h-1 v-1 h1 v-1 h2 z" fill={C.STEM_DARK} />
          </g>
        );

      case 3: // Level 3: Bud (Taller Stem + Closed Bud)
        return (
          <g>
            {/* Soil */}
            <rect x="10" y="22" width="12" height="2" fill={C.SOIL} />
            {/* Stem */}
            <rect x="15" y="12" width="2" height="10" fill={C.STEM} />
            {/* Leaf Right */}
            <path d="M17 16 h2 v-1 h1 v-1 h-1 v-1 h-2 z" fill={C.STEM_DARK} />
            {/* Leaf Left */}
            <path d="M15 19 h-2 v-1 h-1 v-1 h1 v-1 h2 z" fill={C.STEM_DARK} />
            {/* Closed Bud */}
            <rect x="14" y="9" width="4" height="3" fill={C.PETAL_DARK} />
            <rect x="15" y="8" width="2" height="1" fill={C.PETAL_MAIN} />
          </g>
        );

      case 4: // Level 4: Half-opened
        return (
          <g>
            {/* Soil */}
            <rect x="10" y="22" width="12" height="2" fill={C.SOIL} />
            {/* Stem */}
            <rect x="15" y="10" width="2" height="12" fill={C.STEM} />
            {/* Leaf Right */}
            <path d="M17 18 h2 v-1 h1 v-1 h-1 v-1 h-2 z" fill={C.STEM_DARK} />
            {/* Leaf Left */}
            <path d="M15 20 h-2 v-1 h-1 v-1 h1 v-1 h2 z" fill={C.STEM_DARK} />

            {/* Half Open Flower */}
            <rect x="14" y="10" width="4" height="2" fill={C.STEM} />
            {/* Petals */}
            <rect x="13" y="6" width="6" height="4" fill={C.PETAL_DARK} />
            <rect x="14" y="5" width="4" height="1" fill={C.PETAL_MAIN} />
            <rect x="15" y="6" width="2" height="2" fill={C.PETAL_LIGHT} />
          </g>
        );

      case 5: // Level 5: Full Bloom
      default:
        return (
          <g >
            {/* Soil */}
            <rect x="10" y="22" width="12" height="2" fill={C.SOIL} />
            {/* Stem */}
            <rect x="15" y="10" width="2" height="12" fill={C.STEM} />
            {/* Leaf Right Big */}
            <path d="M17 18 h2 v-1 h1 v-2 h-1 v-1 h-2 z" fill={C.STEM_DARK} />
            {/* Leaf Left Big */}
            <path d="M15 20 h-2 v-1 h-1 v-2 h1 v-1 h2 z" fill={C.STEM_DARK} />

            {/* Full Flower Construction */}
            {/* Outer Petals */}
            <path d="M12 4 h8 v2 h2 v2 h2 v4 h-2 v2 h-2 v2 h-8 v-2 h-2 v-2 h-2 v-4 h2 v-2 h2 z" fill={C.PETAL_DARK} />
            {/* Inner Petals */}
            <path d="M13 5 h6 v2 h2 v4 h-2 v2 h-6 v-2 h-2 v-4 h2 z" fill={C.PETAL_MAIN} />
            {/* Center Highlights */}
            <path d="M14 6 h4 v1 h-4 z" fill={C.PETAL_LIGHT} />
            {/* Pollen Center */}
            <rect x="15" y="8" width="2" height="2" fill={C.CENTER} />
          </g>
        );
    }
  };

  return (
    <div className={`flower-container ${isEvolving ? 'flower-evolving' : ''}`}>

      {/* Evolution Particles (Simple CSS elements) */}
      {isEvolving && (
        <>
          <div className="evolution-particle particle-active" style={{ left: '20%', animationDelay: '0.1s' }} />
          <div className="evolution-particle particle-active" style={{ left: '80%', animationDelay: '0.3s' }} />
          <div className="evolution-particle particle-active" style={{ left: '50%', animationDelay: '0.5s' }} />
          <div className="evolution-particle particle-active" style={{ left: '30%', animationDelay: '0.7s' }} />
          <div className="evolution-particle particle-active" style={{ left: '70%', animationDelay: '0.2s' }} />
        </>
      )}

      <svg viewBox="0 0 32 32" className={`pixel-flower-svg ${
        level === 5 && !isEvolving ? 'flower-idle' : ''
      }`}>

        {/* The Pot (Always rendered) */}
        <g id="pot">
          {/* Rim */}
          <rect x="9" y="22" width="14" height="2" fill={C.POT_MAIN} />
          <rect x="9" y="24" width="14" height="1" fill={C.POT_DARK} opacity="0.3" />

          {/* Body */}
          <path
            d="M10 24 h12 v6 h-2 v1 h-8 v-1 h-2 z"
            fill={C.POT_MAIN}
          />
          {/* Shadow/Shading on pot */}
          <path d="M20 24 v6 h-1 v-6 z" fill={C.POT_DARK} opacity="0.5" />
        </g>

        {/* Dynamic Flower Content */}
        {renderFlower()}

      </svg>
    </div>
  );
};