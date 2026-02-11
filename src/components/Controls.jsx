import React from "react";

const Controls = ({ currentPage, totalPages, onNext, onPrev, isFlipping }) => {
  const canGoNext = currentPage < totalPages - 1 && !isFlipping;
  const canGoPrev = currentPage > 0 && !isFlipping;

  return (
    <div className="flip-book-controls">
      <button
        type="button"
        className="flip-book-controls__btn flip-book-controls__btn--prev"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <span className="flip-book-controls__counter">
        {currentPage + 1} / {totalPages}
      </span>
      <button
        type="button"
        className="flip-book-controls__btn flip-book-controls__btn--next"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
};

export default Controls;
