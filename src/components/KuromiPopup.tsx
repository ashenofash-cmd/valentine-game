import React from 'react';
import './KuromiPopup.css';

interface KuromiPopupProps {
  onClose: () => void;
}

export const KuromiPopup: React.FC<KuromiPopupProps> = ({ onClose }) => {
  return (
    <div className="kuromi-overlay" onClick={onClose}>
      <div className="kuromi-container" onClick={(e) => e.stopPropagation()}>

        {/* Pixel Art Kuromi SVG */}
        <div className="kuromi-character-box">
          <img
            src="/kuromi-icon.png"
            alt="Kuromi"
            className="kuromi-sprite-img"
          />
        </div>


        {/* Message Content */}
        <div className="kuromi-message-box">
          <p className="kuromi-line">
            Хей! Ты просто космос!
            <span className="kuromi-hearts">
      <img
        src="/pixel-heart.png"
        alt="Pixel-heart"
        className="pixel-heart"
      />
    </span>
          </p>

          <p className="kuromi-subtext">
            Спасибо, что делаешь этот мир ярче своей улыбкой.
          </p>
        </div>



        <button className="close-kuromi-btn" onClick={onClose}>
          [ МИЛО! ]
        </button>

      </div>
    </div>
  );
};