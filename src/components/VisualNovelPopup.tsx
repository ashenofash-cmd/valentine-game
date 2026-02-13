import React, { useState } from 'react';
import './VisualNovelPopup.css';

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
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Hood / Ears */}
            <path
              d="M20 30 Q10 10 30 20 L40 30 L60 30 L70 20 Q90 10 80 30 L75 40 L80 60 Q80 85 50 85 Q20 85 20 60 L25 40 Z"
              fill="#111827"
            />
            {/* White Face */}
            <ellipse cx="50" cy="55" rx="25" ry="20" fill="white" />
            {/* Eyes (Winking variation for VN) */}
            <path d="M40 52 Q42 50 44 52" stroke="black" strokeWidth="2" fill="none" />
            {/* Right eye wink */}
            <path d="M56 55 l4 -2" stroke="black" strokeWidth="2" />
            <path d="M56 55 l4 2" stroke="black" strokeWidth="2" />

            <circle cx="42" cy="55" r="2" fill="black" />
            {/* Nose */}
            <circle cx="50" cy="58" r="1.5" fill="#EC4899" />
            {/* Mouth (Smile) */}
            <path d="M48 62 Q50 64 52 62" stroke="black" strokeWidth="1.5" fill="none" />
            {/* Pink Skull on Hood */}
            <path d="M45 25 h10 v8 h-10 z" fill="#F9A8D4" />
            <circle cx="46" cy="27" r="1" fill="#831843" />
            <circle cx="54" cy="27" r="1" fill="#831843" />
            <path d="M48 31 h4" stroke="#831843" strokeWidth="1" />
            {/* Jester Balls */}
            <circle cx="15" cy="15" r="5" fill="#111827" />
            <circle cx="85" cy="15" r="5" fill="#111827" />
          </svg>
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