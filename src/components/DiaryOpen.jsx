import React, { useState, useEffect } from "react";

const DiaryOpen = ({ onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  // After the open animation starts, move to the next screen
  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      onOpened?.();
    }, 1400);
    return () => clearTimeout(timeout);
  }, [isOpen, onOpened]);

  return (
    <section className="screen screen-diary" aria-label="Diary introduction">
      <div className="diary-stage">
        <div className="diary-perspective">
          <div
            className={`diary-book ${isOpen ? "diary-book--open" : ""}`}
            onClick={handleClick}
          >
            <div className="diary-cover diary-cover--front">
              <div className="diary-title">For You</div>
              <div className="diary-subtitle">A tiny, honest diary</div>
            </div>
            <div className="diary-cover diary-cover--back" />
          </div>
        </div>

        <p className="headline diary-headline fade-in-soft">
          This diary is for you 💖
        </p>
        <p className="hint-text">Tap the diary to open it</p>
      </div>
    </section>
  );
};

export default DiaryOpen;

