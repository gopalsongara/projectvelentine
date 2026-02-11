import React, { useState, useCallback, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Page from "./Page.jsx";
import Controls from "./Controls.jsx";

import p1 from "../assets/img/p1.jpeg";
import p2 from "../assets/img/p2.jpg";
import p5 from "../assets/img/p5.jpeg";
import p4 from "../assets/img/p4.webp";

/* ============================
   PAGE DATA
============================ */

const PAGE_CONTENT = [
  { type: "photo", caption: "Memory", image: p2 },
  { type: "photo", caption: "Looking Nice", image: p1 },
  { type: "photo", caption: "Memory 3", image: p4 },
  { type: "photo", caption: "Nice Eyes",image: p5 },
  {
    type: "final",
    title: "We can make a friend? 🌸🙂",
    sub: "Give me your answer on instagram. Please",
  },
];

const TOTAL_PAGES = PAGE_CONTENT.length;
const FLIP_DURATION_MS = 650;

/* ============================
   Z-INDEX HELPER
============================ */

function getPageZIndex(pageIndex, currentPage, totalPages) {
  if (pageIndex === currentPage) return 200;
  if (pageIndex < currentPage) return 150 + (currentPage - 1 - pageIndex);
  return 50 + (totalPages - 1 - pageIndex);
}

/* ============================
   COMPONENT
============================ */

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipOutPageIndex, setFlipOutPageIndex] = useState(null);
  const [unflipPageIndex, setUnflipPageIndex] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [finalPageStatus, setFinalPageStatus] = useState("idle");
  const [finalPageMessage, setFinalPageMessage] = useState("");

  const flipTimeoutRef = useRef(null);

  /* ============================
     EMAIL CONFIG
  ============================ */

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [publicKey]);

  /* ============================
     PAGE NAVIGATION
  ============================ */

  const goNext = useCallback(() => {
    if (currentPage >= TOTAL_PAGES - 1 || isFlipping) return;
    setIsFlipping(true);
    setFlipOutPageIndex(currentPage);
    flipTimeoutRef.current = setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setFlipOutPageIndex(null);
      setIsFlipping(false);
    }, FLIP_DURATION_MS);
  }, [currentPage, isFlipping]);

  const goPrev = useCallback(() => {
    if (currentPage <= 0 || isFlipping) return;
    setIsFlipping(true);
    setUnflipPageIndex(currentPage - 1);
    flipTimeoutRef.current = setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setUnflipPageIndex(null);
      setIsFlipping(false);
    }, FLIP_DURATION_MS);
  }, [currentPage, isFlipping]);

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  /* ============================
     EMAIL SEND FUNCTION
  ============================ */

  const sendAnswer = async (answer) => {
    if (!serviceId || !templateId || !publicKey) {
      setFinalPageMessage("Email configuration missing in .env");
      setFinalPageStatus("error");
      console.error("EmailJS config missing", {
        serviceId,
        templateId,
        publicKey,
      });
      return;
    }

    setFinalPageStatus("sending");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          answer: answer,
          time: new Date().toLocaleString(),
        },
        publicKey
      );

      setFinalPageStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setFinalPageMessage(
        err?.text || "Something went wrong while sending email."
      );
      setFinalPageStatus("error");
    }
  };

  const handleFinalYes = () => sendAnswer("YES 💖");
  const handleFinalNo = () => sendAnswer("NO 🙂");

  /* ============================
     PAGE RENDER
  ============================ */

  const renderPageContent = (config) => {
    if (config.type === "photo") {
      return (
        <div className="flip-book-photo-page diary-page__content">
          <div className="flip-book-photo-page__image-wrap">
            <img
              src={config.image}
              alt={config.caption}
              className="flip-book-photo-page__img"
            />
          </div>
          <p className="flip-book-photo-page__caption">{config.caption}</p>
        </div>
      );
    }

    if (config.type === "final") {
      return (
        <div className="diary-page__final diary-page__content">
          {finalPageStatus === "idle" && (
            <>
              <h2 className="diary-page__final-title">{config.title}</h2>
              <p className="diary-page__final-sub">{config.sub}</p>

              <div className="diary-page__final-actions">
                <button
                  type="button"
                  className="diary-page__btn diary-page__btn--yes"
                  onClick={handleFinalYes}
                >
                  Yes
                </button>

                <button
                  type="button"
                  className="diary-page__btn diary-page__btn--no"
                  onClick={handleFinalNo}
                >
                  No
                </button>
              </div>
            </>
          )}

          {finalPageStatus === "sending" && (
            <p className="diary-page__final-status">Sending...</p>
          )}

          {finalPageStatus === "sent" && (
            <p className="diary-page__final-thank">
              Thank you for your answer 💖✨
            </p>
          )}

          {finalPageStatus === "error" && (
            <p className="diary-page__final-error">{finalPageMessage}</p>
          )}
        </div>
      );
    }

    return null;
  };

  /* ============================
     RETURN
  ============================ */

  return (
    <section className="flip-book-screen">
      <div className="flip-book">
        <div className="flip-book__perspective">
          <div className="flip-book__stack">
            {PAGE_CONTENT.map((config, pageIndex) => (
              <Page
                key={pageIndex}
                pageIndex={pageIndex}
                currentPage={currentPage}
                flipOutPageIndex={flipOutPageIndex}
                unflipPageIndex={unflipPageIndex}
                zIndex={getPageZIndex(
                  pageIndex,
                  currentPage,
                  TOTAL_PAGES
                )}
                onNext={goNext}
                onPrev={goPrev}
                canGoNext={currentPage < TOTAL_PAGES - 1}
                canGoPrev={currentPage > 0}
              >
                {renderPageContent(config)}
              </Page>
            ))}
          </div>
        </div>
      </div>

      <Controls
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onNext={goNext}
        onPrev={goPrev}
        isFlipping={isFlipping}
      />
    </section>
  );
};

export default Book;




