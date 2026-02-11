import React from "react";
import FlipPhoto from "./FlipPhoto.jsx";

// Example: import memoryPhoto1 from "../assets/images/memory-1.jpg";
// Replace null below with your actual image imports when you add them.

const DiaryPages = ({ onFinalPage }) => {
  return (
    <section className="screen screen-pages" aria-label="Diary pages">
      <div className="pages-shell">
        <div className="pages-book">
          <div className="page page--left">
            <div className="page-header">
              <span className="page-date">12 Feb 2026</span>
              <span className="page-tag">A small note</span>
            </div>
            <p className="page-text">
              Kabhi kabhi zindagi bohot fast ho jaati hai, aur hum log simple
              cheezein bolna bhool jaate hain. Yeh diary bas itna hi kehti hai
              ki tum waise hi perfect ho jaise ho.
            </p>

            <FlipPhoto
              frontLabel="A tiny memory"
              backMessage="Chahe jitna bhi time beet jaaye, yeh yaad hamesha soft si smile le aati hai."
              imageSrc={null}
              date="Somewhere in between"
            />
          </div>

          <div className="page page--right">
            <div className="page-header">
              <span className="page-date">13 Feb 2026</span>
              <span className="page-tag">A quiet confession</span>
            </div>
            <p className="page-text">
              Main perfect shabd nahi dhund paaya, isliye yeh chhote chhote
              sentences. Bas itna ki, tumhari har chhoti baat important lagti
              hai… even the random ones.
            </p>

            <FlipPhoto
              frontLabel="The way you laugh"
              backMessage="Tumhari hasi ka ek second bhi, kisi bhi din ko thoda sa better bana deta hai."
              imageSrc={null}
              date="Every random day"
            />
          </div>
        </div>

        <button className="page-next-button" onClick={onFinalPage}>
          Turn to the last page
        </button>
      </div>
    </section>
  );
};

export default DiaryPages;

