import React from "react";

const Page = ({
  pageIndex,
  currentPage,
  flipOutPageIndex,
  unflipPageIndex,
  zIndex,
  children,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
}) => {
  const isFlipped = pageIndex < currentPage;
  const isUnflipping = unflipPageIndex === pageIndex;
  const isFlippingOut = flipOutPageIndex === pageIndex;

  const getRotateY = () => {
    if (isUnflipping) return 0;
    if (isFlippingOut) return -180;
    return isFlipped ? -180 : 0;
  };

  const rotateY = getRotateY();
  const isAnimating = isFlippingOut || isUnflipping;
  const isCurrent = pageIndex === currentPage;

  return (
    <div
      className={`flip-book-page diary-page ${isAnimating ? "flip-book-page--animating" : ""}`}
      style={{
        zIndex,
        transform: `rotateY(${rotateY}deg)`,
      }}
    >
      <div className="flip-book-page__face flip-book-page__face--front">
        {children}
      </div>
      <div className="flip-book-page__face flip-book-page__face--back" />

      {isCurrent && !isAnimating && (
        <>
          {canGoNext && (
            <button
              type="button"
              className="flip-book-page__corner flip-book-page__corner--right"
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              aria-label="Next page"
            />
          )}
          {canGoPrev && (
            <button
              type="button"
              className="flip-book-page__corner flip-book-page__corner--left"
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              aria-label="Previous page"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
