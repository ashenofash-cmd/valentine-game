import React, { useState } from 'react';
import './VisualNovelPopup.css';
import kuromiSecond from '../assets/kuromi2.png';

interface VisualNovelPopupProps {
  onClose: () => void;
}

export const VisualNovelPopup: React.FC<VisualNovelPopupProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const DIALOGS = [
    "Хи-хи. Приветик! Поздравляю с днём Святого Валентина!",
    "Наверное тот, кто отправил тебе это, очень дорожит тобой... Надеюсь, ты им тоже! 💖"
  ];

  const handleNext = () => {
    if (step < DIALOGS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="vn-overlay" onClick={handleNext}>
      <div className="vn-container" onClick={(e) => e.stopPropagation()}>

        {/* Kuromi Sprite */}
        <div className="vn-character-sprite">
          <img
            src={kuromiSecond}
            alt="Kuromi"
            className="vn-character-img"
          />
        </div>


        {/* Text Box */}
        <div className="vn-text-box" onClick={handleNext}>
          <div className="vn-name-tag">KUROMI</div>
          <div className="vn-text-content">
            {DIALOGS[step]}
          </div>
          <div className="vn-next-indicator">▶</div>
        </div>

      </div>
    </div>
  );
};