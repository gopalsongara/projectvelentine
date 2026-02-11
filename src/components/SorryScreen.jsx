import React, { useEffect } from "react";

// Sorry screen – anime sunset + hearts, auto-advance after 3s
const SorryScreen = ({ onNext }) => {
  useEffect(() => {
    const t = setTimeout(() => {
      onNext?.();
    }, 3000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <section
      className="screen screen-sorry"
      onClick={onNext}
      onKeyDown={(e) => e.key === "Enter" && onNext?.()}
      role="button"
      tabIndex={0}
      aria-label="Sorry message – tap or wait to continue"
    >
      {/* Optional anime-style rays background is handled in CSS */}
      <div className="anime-bg anime-bg--sorry" aria-hidden="true" />

      {/* Floating hearts layer (styled in CSS) */}
      <div className="sorry-hearts" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`sorry-heart sorry-heart--${(i % 4) + 1}`}
            style={{ left: `${5 + (i * 8) % 90}%` }}
          />
        ))}
      </div>

      <div className="sorry-content">
        <p className="sorry-text">
          Sorry... Sorry <span className="sorry-emoji">😔❤️</span>
        </p>
        <p className="sorry-hint">Tap or wait 3s to continue</p>
      </div>
    </section>
  );
};

export default SorryScreen;

