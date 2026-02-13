import React from "react";



// First photo screen – anime night-sky + existing tap-to-continue flow
const PhotoScreen = ({ onNext }) => {
  return (
    <section
      className="screen screen-photo"
      onClick={onNext}
      aria-label="First memory screen"
    >
      {/* Anime-style night sky background */}
      <div className="anime-bg anime-bg--photo" aria-hidden="true">
        <div className="anime-bg__moon" />
        <div className="anime-bg__stars">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={`anime-star anime-star--${(i % 5) + 1}`} />
          ))}
        </div>
      </div>

      <div className="photo-inner">
        <div className="photo-frame">
        <h1> Add your photo </h1>

        </div>

        <p className="headline headline--subtle">
        
        </p>
        <p className="hint-text">Tap anywhere to continue</p>
      </div>
    </section>
  );
};

export default PhotoScreen;


