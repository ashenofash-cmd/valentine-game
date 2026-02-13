import  { useState, useEffect } from 'react';
import { GameWindow } from './components/GameWindow';
import { ProgressBar } from './components/ProgressBar';
import { ItemPopup } from './components/ItemPopup';
import {KuromiPopup} from "./components/KuromiPopup.tsx";
import {VisualNovelPopup} from "./components/VisualNovelPopup.tsx";
import kuromiMain from './assets/kuromi1.png';
import kuromiIcon from './assets/kuromi-icon.png';
import './App.css';

export default function App() {
  const [level, setLevel] = useState(1);
  const [currentExp, setCurrentExp] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Envelope popup

  // New State for Notification and Minimized Icon
  const [showNotification, setShowNotification] = useState(false);
  const [showKuromiModal, setShowKuromiModal] = useState(false); // The big central modal (first time)
  const [showKuromiIcon, setShowKuromiIcon] = useState(false); // Minimized bottom-left icon button

  // Interaction States
  const [isHoveringIcon, setIsHoveringIcon] = useState(false); // For the "Cosmic" bubble
  const [showVisualNovel, setShowVisualNovel] = useState(false); // For the dialogue sequence

  // Game Configuration based on prompt
  const LEVEL_CONFIG: Record<number, { max: number; gain: number }> = {
    1: { max: 20, gain: 5 },
    2: { max: 40, gain: 10 },
    3: { max: 60, gain: 15 },
    4: { max: 80, gain: 20 },
    5: { max: 100, gain: 0 },
  };

  const LEVEL_TITLES = [
    "Семечко",
    "Росток",
    "Бутон",
    "Цветение",
    "Любовь"
  ];

  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG[5];

  // Effect to trigger notification after game finish
  useEffect(() => {
    if (isGameFinished) {
      // Wait 2.5 seconds after flower blooms/game finishes to show notification
      const timer = setTimeout(() => {
        // Only show notification if we haven't seen Kuromi yet
        if (!showKuromiIcon && !showVisualNovel) {
          setShowNotification(true);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isGameFinished, showKuromiIcon, showVisualNovel]);

  const handleGameClick = () => {
    if (isGameFinished) return;

    const newExp = currentExp + config.gain;

    if (newExp >= config.max) {
      if (level < 4) {
        setLevel(prev => prev + 1);
        setCurrentExp(0);
      } else {
        setLevel(5);
        setCurrentExp(LEVEL_CONFIG[5].max);
        setIsGameFinished(true);
        setShowPopup(true);
      }
    } else {
      setCurrentExp(newExp);
    }
  };

  const handleRestart = () => {
    setLevel(1);
    setCurrentExp(0);
    setIsGameFinished(false);
    setShowPopup(false);
    setShowNotification(false);
    setShowKuromiModal(false);
    setShowKuromiIcon(false);
    setIsHoveringIcon(false);
    setShowVisualNovel(false);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowKuromiModal(true); // Open big modal first time
  };

  const handleCloseKuromiModal = () => {
    setShowKuromiModal(false);
    setShowKuromiIcon(true); // Show minimized icon
  };

  const handleIconClick = () => {
    // Hide hover bubble immediately to avoid clash
    setIsHoveringIcon(false);
    // Open Visual Novel
    setShowVisualNovel(true);
  };

  return (
    <div className="app-container">

      <div className="bg-glow-effect">
        <div className="bg-glow-blob"></div>
      </div>

      {/* Notification Icon (Top Left) - Disappears once clicked */}
      {showNotification && !showKuromiModal && !showKuromiIcon && !showVisualNovel && (
        <div className="notification-wrapper" onClick={handleNotificationClick}>
          <div className="notification-bubble">
            <span className="notification-text">У вас новое сообщение!</span>
          </div>
          <div className="notification-avatar">
            <img
              src={kuromiIcon}
              alt="Kuromi"
              className="kuromi-sprite-img"
            />
          </div>
        </div>
      )}

      <div className="app-content">

        <ProgressBar
          level={level}
          levelTitle={LEVEL_TITLES[level - 1] || "..."}
          currentExp={currentExp}
          maxExp={config.max}
        />

        <GameWindow level={level} onClick={handleGameClick} />
      </div>

      {/* Envelope Button (Bottom Right) */}
      {isGameFinished && !showPopup && !showKuromiModal && (
        <button
          className="envelope-btn"
          onClick={() => setShowPopup(true)}
          title="Открыть письмо"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Box Bottom */}
            <rect x="5" y="11" width="14" height="10" fill="#BE185D" stroke="#831843" strokeWidth="2"/>
            {/* Box Lid */}
            <rect x="3" y="7" width="18" height="4" fill="#EC4899" stroke="#831843" strokeWidth="2"/>
            {/* Vertical Ribbon */}
            <rect x="10" y="7" width="4" height="14" fill="#FEF08A" stroke="#831843" strokeWidth="2"/>
            {/* Bow Left */}
            <path d="M12 7C12 7 9 2 6 5C4 7 8 8 12 7Z" fill="#FEF08A" stroke="#831843" strokeWidth="1.5"/>
            {/* Bow Right */}
            <path d="M12 7C12 7 15 2 18 5C20 7 16 8 12 7Z" fill="#FEF08A" stroke="#831843" strokeWidth="1.5"/>
            {/* Center Knot */}
            <circle cx="12" cy="7" r="1.5" fill="#FBBF24" />
          </svg>
        </button>
      )}

      {/* Minimized Kuromi Button (Bottom Left) */}
      {showKuromiIcon && !showVisualNovel && (
        <div className="kuromi-bottom-left-wrapper">

          {/* Hover Bubble "Crawls out" */}
          {isHoveringIcon && (
            <div className="kuromi-hover-bubble">
              <p>Ты просто космос!</p>
              <p className="sub-text">(И не забывай улыбаться!)</p>
            </div>
          )}

          <button
            className="kuromi-minimized-btn"
            onClick={handleIconClick}
            onMouseEnter={() => setIsHoveringIcon(true)}
            onMouseLeave={() => setIsHoveringIcon(false)}
            title="Сообщение Куроми"
          >
            <img
              src={kuromiMain}
              alt="Kuromi"
              className="kuromi-minimized-img"
            />
          </button>

        </div>
      )}

      {/* Visual Novel Dialog Overlay */}
      {showVisualNovel && (
        <VisualNovelPopup onClose={() => setShowVisualNovel(false)} />
      )}

      {/* Main Item Popup */}
      {showPopup && (
        <ItemPopup
          onRestart={handleRestart}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Kuromi Special Modal (First Time View) */}
      {showKuromiModal && (
        <KuromiPopup onClose={handleCloseKuromiModal} />
      )}

    </div>
  );
}
