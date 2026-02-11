import React from "react";

const NextScreen = ({ onNext }) => {
  return (
    <section className="screen screen-next" aria-label="Next step">
      <div className="next-inner fade-in-soft">
        <p className="next-caption">
          Bas ek chhota sa surprise aur...
        </p>
        <button className="next-cta" onClick={onNext}>
          Next →
        </button>
      </div>
    </section>
  );
};

export default NextScreen;

