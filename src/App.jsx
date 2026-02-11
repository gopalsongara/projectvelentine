import React, { useState, useEffect } from "react";
import PhotoScreen from "./components/PhotoScreen.jsx";
import SorryScreen from "./components/SorryScreen.jsx";
import DiaryCover from "./components/DiaryCover.jsx";
import Book from "./components/Book.jsx";

/** Flow: 1 Photo → 2 Sorry (auto 3s) → 3 Cover (click) → 4 Book (4 photo + 1 final proposal page) */
const SCREENS = {
  PHOTO: 1,
  SORRY: 2,
  COVER: 3,
  BOOK: 4,
};

const App = () => {
  const [screen, setScreen] = useState(SCREENS.PHOTO);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToScreen = (nextScreen) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setScreen(nextScreen);
      setIsTransitioning(false);
    }, 320);
  };

  const goNext = () => {
    switch (screen) {
      case SCREENS.PHOTO:
        goToScreen(SCREENS.SORRY);
        break;
      case SCREENS.SORRY:
        goToScreen(SCREENS.COVER);
        break;
      case SCREENS.COVER:
        goToScreen(SCREENS.BOOK);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.PHOTO:
        return <PhotoScreen onNext={goNext} />;
      case SCREENS.SORRY:
        return <SorryScreen onNext={goNext} />;
      case SCREENS.COVER:
        return <DiaryCover onOpen={goNext} />;
      case SCREENS.BOOK:
        return <Book />;
      default:
        return <PhotoScreen onNext={goNext} />;
    }
  };

  return (
    <div className="app-shell">
      <div className={`screen-root ${isTransitioning ? "screen-fade" : ""}`}>
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
