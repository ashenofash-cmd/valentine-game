import  { useState, useEffect } from 'react';
import { GameWindow } from './components/GameWindow';
import { ProgressBar } from './components/ProgressBar';
import { ItemPopup } from './components/ItemPopup';
import {KuromiPopup} from "./components/KuromiPopup.tsx";
import {VisualNovelPopup} from "./components/VisualNovelPopup.tsx";
import kuromiMain from './assets/kuromi1.png';
import kuromiSecond from './assets/kuromi2.png';
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
              src={kuromiMain}
              alt="Kuromi"
              className="kuromi-sprite-img"
            />
          </div>
        </div>
      )}

      <div className="app-content">
        <h1 className="game-title">
          Цветок любви
        </h1>

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
            <path d="M2 6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" stroke="currentColor" strokeWidth="2" fill="#FEF08A"/>
            <path d="M2 6L12 13L22 6" stroke="#BE185D" strokeWidth="2"/>
            <path d="M2 18L8 12" stroke="#BE185D" strokeWidth="2"/>
            <path d="M22 18L16 12" stroke="#BE185D" strokeWidth="2"/>
            <rect x="11" y="11" width="2" height="2" fill="#BE185D" />
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
              src={kuromiSecond}
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
