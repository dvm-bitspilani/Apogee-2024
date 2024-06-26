import * as styles from "@styles/Instructions.module.scss";

// State Management
import state from "../state";
import { useSnapshot } from "valtio";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Instructions({ text }) {
  const snap = useSnapshot(state);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!state.isMobile) {
      gsap.fromTo(
        wrapperRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1,
          delay: 2,
        }
      );
    }
  }, []);

  function handleButton() {
    const tl = gsap.timeline({
      onComplete: () => {
        wrapperRef.current.style.display = "none";
      },
    });
    tl.to(wrapperRef.current, {
      autoAlpha: 0,
      duration: 1,
    });
  }

  return (
    <>
      {snap.isMobile ? (
        <h1 className={styles.mobileSwipe}>{"<< Swipe >>"}</h1>
      ) : (
        <main className={styles.desktopWrapper} ref={wrapperRef}>
          <div className={styles.boxContainer}>
            <div>
              <h2>WELCOME ABOARD!</h2>
              <p>{text}</p>
          </div>
            <button onClick={handleButton}>OK THANKS</button>
          </div>
        </main>
      )}
    </>
  );
}
