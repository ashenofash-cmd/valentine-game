import React from 'react';
import { NightSky } from './NightSky';
import { FlowerPot } from './FlowerPot';
import './GameWindow.css';

interface GameWindowProps {
  level: number;
  onClick: () => void;
}

export const GameWindow: React.FC<GameWindowProps> = ({ level, onClick }) => {
  return (
    <div className="game-window-frame" onClick={onClick}>

      {/* Main Game Scene (Background) */}
      <div className="game-scene-layer">
        <NightSky />
      </div>

      {/* Flower Component */}
      <FlowerPot level={level} />

      {/* UI Overlay */}
      <div className="game-ui-layer pointer-events-none">
        {/* Hint text only visible on level 1 or if idle logic added later */}
        {level < 5 && (
          <div className="start-hint-text">
            [ Нажимай чтобы растить ]
          </div>
        )}
      </div>
    </div>
  );
};