import React from "react";

/**
 * Screen 3 – Dynamic gradient diary cover.
 * Animated gradient (cover theme) with galaxy + sakura anime overlays.
 * Click → open diary (Book screen).
 */
const DiaryCover = ({ onOpen }) => {
  return (
    <section
      className="screen screen-cover"
      aria-label="Diary cover – tap to open"
    >
      <div className="cover-wrap"> 
        {/* Anime-style starry galaxy background layer */}
        <div
          className="anime-stars-layer anime-stars-layer--cover"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className={`anime-star anime-star--cover-${(index % 5) + 1}`}
            />
          ))}
        </div>

        {/* Anime-style sakura petals floating over the cover */}
        <div className="anime-petals-layer" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              key={index}
              className={`anime-petal anime-petal--${(index % 4) + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="diary-cover-3d"
          onClick={onOpen}
          aria-label="Open diary"
        >
          {/* Animated gradient base + leather/shines are defined in CSS */}
          <div className="diary-cover-3d__content">
            <h2 className="diary-cover-3d__title">For You 💖</h2>
            <p className="diary-cover-3d__sub">Tap to open</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default DiaryCover;

