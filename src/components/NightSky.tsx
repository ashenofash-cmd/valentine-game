import React, { useMemo } from 'react';
import type {Star, Heart} from '../types';
import './NightSky.css';

const PixelMoon: React.FC = () => {
  return (
    <div className="pixel-moon-container moon-float">
      <img
        src="/pixel-moon.png"
        alt="Pixel moon"
        className="pixel-moon-svg moon-pixel-art"
      />
    </div>
  );
};


const PixelHeart: React.FC<{ x: number; y: number; size: number; delay?: number }> = ({ x, y, size, delay = 0 }) => {
  return (
    <div
      className="pixel-heart animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg viewBox="0 0 10 9" className="pixel-heart-svg">
        <path
          d="M2 0h2v1h-2v-1z M6 0h2v1h-2v-1z M1 1h1v1h-1v-1z M4 1h2v1h-2v-1z M8 1h1v1h-1v-1z M0 2h1v3h-1v-3z M9 2h1v3h-1v-3z M1 5h1v1h-1v-1z M8 5h1v1h-1v-1z M2 6h1v1h-1v-1z M7 6h1v1h-1v-1z M3 7h1v1h-1v-1z M6 7h1v1h-1v-1z M4 8h2v1h-2v-1z"
          fill="#EC4899"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
};

export const NightSky: React.FC = () => {
  const stars: Star[] = useMemo(() => {
    const tempStars: Star[] = [];
    for (let i = 0; i < 60; i++) {
      tempStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80,
        size: Math.random() > 0.8 ? 4 : 2,
        opacity: Math.random() * 0.5 + 0.3,
        animationDelay: `${Math.random() * 3}s`,
      });
    }
    return tempStars;
  }, []);

  const hearts: Heart[] = useMemo(() => {
    return [
      { id: 1, x: 15, y: 35, size: 24, rotation: 0, color: 'pink' },
      { id: 2, x: 80, y: 15, size: 32, rotation: 0, color: 'pink' },
      { id: 3, x: 45, y: 50, size: 28, rotation: 0, color: 'pink' },
      { id: 4, x: 65, y: 60, size: 20, rotation: 0, color: 'pink' },
      { id: 5, x: 25, y: 70, size: 16, rotation: 0, color: 'pink' },
      { id: 6, x: 85, y: 40, size: 12, rotation: 0, color: 'pink' },
      { id: 7, x: 10, y: 85, size: 24, rotation: 0, color: 'pink' },
    ];
  }, []);

  return (
    <div className="night-sky-container">
      {/* Background Glow */}
      <div className="sky-glow" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="pixel-star animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            clipPath: star.size > 3
              ? 'polygon(33% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%)'
              : 'none'
          }}
        />
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart, idx) => (
        <PixelHeart key={heart.id} x={heart.x} y={heart.y} size={heart.size} delay={idx * 0.5} />
      ))}

      {/* The Moon */}
      <PixelMoon />

      {/* Grid Overlay for texture */}
      <div className="crt-overlay" />
    </div>
  );
};