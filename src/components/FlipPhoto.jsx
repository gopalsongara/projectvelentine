import React, { useState } from "react";

// Reusable 3D flip photo card
// Props:
// - frontLabel: optional small caption on the front
// - backMessage: text shown on the back
// - imageSrc: path to the front image
// - date: optional date string
const FlipPhoto = ({ frontLabel, backMessage, imageSrc, date }) => {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div className="flip-photo-wrapper">
      <div
        className={`flip-card ${flipped ? "flip-card--flipped" : ""}`}
        onClick={handleToggle}
      >
        <div className="flip-card-face flip-card-face--front">
          <div className="flip-card-photo">
            {imageSrc ? (
              <img src={imageSrc} alt={frontLabel || "Memory"} />
            ) : (
              <div className="photo-placeholder photo-placeholder--soft">
                <span className="photo-placeholder__label">
                  Add a photo here
                </span>
              </div>
            )}
          </div>
          <div className="flip-card-meta">
            {frontLabel && <span className="flip-card-label">{frontLabel}</span>}
            {date && <span className="flip-card-date">{date}</span>}
          </div>
        </div>

        <div className="flip-card-face flip-card-face--back">
          <p className="flip-card-message">{backMessage}</p>
        </div>
      </div>
      <span className="flip-photo-hint">Tap to flip</span>
    </div>
  );
};

export default FlipPhoto;

