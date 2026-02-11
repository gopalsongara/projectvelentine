import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import "../assets/styles/global.css";
import "../index.css";

/**
 * Screen 5 – Final Yes/No page with EmailJS.
 */
const FinalYesNoScreen = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | no | error
  const [message, setMessage] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const hasEmailJs = serviceId && templateId && publicKey;

  /* =========================
     INIT EMAILJS
  ========================= */

  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS initialized");
    }
  }, [publicKey]);

  /* =========================
     SEND FUNCTION
  ========================= */

  const sendAnswer = async (answer) => {
    if (!hasEmailJs) {
      const msg = "Email not configured. Check .env file.";
      console.error(msg, { serviceId, templateId, publicKey });
      setMessage(msg);
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(serviceId, templateId, {
        answer: answer,
        time: new Date().toLocaleString(),
      });

      if (answer === "NO") {
        setStatus("no");
      } else {
        setStatus("sent");
      }

    } catch (err) {
      console.error("EmailJS error:", err);
      setMessage(err?.text || "Email sending failed.");
      setStatus("error");
    }
  };

  const handleYes = () => sendAnswer("YES 💖");
  const handleNo = () => sendAnswer("NO 🙂");

  /* =========================
     UI
  ========================= */

  return (
    <section className="screen screen-final-yn" aria-label="Final question">
      <div className="final-yn__card">

        {status === "idle" && (
          <>
            <h2 className="final-yn__title">We can make a friend? 🙂</h2>
            <p className="final-yn__sub">Please Answer give On insta </p>

            <div className="final-yn__actions">
              <button
                type="button"
                className="final-yn__btn final-yn__btn--yes"
                onClick={handleYes}
              >
                Yes
              </button>

              <button
                type="button"
                className="final-yn__btn final-yn__btn--no"
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </>
        )}

        {status === "sending" && (
          <p className="final-yn__status">Sending…</p>
        )}

        {status === "sent" && (
          <p className="final-yn__thank">
            Thank you for your answer 💖✨
          </p>
        )}

        {status === "no" && (
          <p className="final-yn__thank">
            That’s okay. Take care 💖
          </p>
        )}

        {status === "error" && (
          <p className="final-yn__error">{message}</p>
        )}

      </div>
    </section>
  );
};

export default FinalYesNoScreen;
