import React from 'react';
import './ItemPopup.css';

interface ItemPopupProps {
  onRestart: () => void;
  onClose: () => void;
}

export const ItemPopup: React.FC<ItemPopupProps> = ({ onRestart, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Yellow Corners */}
        <div className="corner-deco top-left"></div>
        <div className="corner-deco top-right"></div>
        <div className="corner-deco bottom-left"></div>
        <div className="corner-deco bottom-right"></div>

        {/* Header */}
        <div className="popup-header">
          <div className="header-left">
            <span className="header-stars">✨</span>
            <span className="header-title">ПРЕДМЕТ ПОЛУЧЕН</span>
          </div>
          <button className="close-icon-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Content */}
        <div className="popup-content">
          <div className="item-icon-box">
            {/* Simple SVG Heart Icon */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#D53F8C"/>
            </svg>
            <div className="sparkle-icon">✦</div>
          </div>

          <div className="item-text">
            Получен <span className="highlight-text">**Цветок Любви**</span>! Крошечный бутон, излучающий чистую нежность. На душе становится тепло и уютно!
          </div>
        </div>

        {/* Footer Actions */}
        <div className="popup-actions">
          <button className="action-btn restart-btn" onClick={onRestart}>
            [ЗАНОВО]
          </button>
          <button className="action-btn close-btn" onClick={onClose}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};