import { useState, useEffect, useRef } from "react";
import styles from "../styles/Media_Partners.module.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Media_Partners() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const ContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const mobileContent = ContentRef.current;
      if (mobileContent) {
        const scrollPercentage =
          (mobileContent.scrollTop /
            (mobileContent.scrollHeight - mobileContent.clientHeight)) *
          68;
        setScrollPosition(scrollPercentage);
      }
    };

    const mobileContent = ContentRef.current;
    if (mobileContent) {
      mobileContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mobileContent) {
        mobileContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://bits-oasis.org/2023/main/registrations/media_partners/"
      );
      const json = await res.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setData(json);
    };
    fetchData();
  }, []);

  // map the data to the influencer cards where category is "influencer"
  const influencerCards = data.map((item) => {
    if (item.publication === false) {
      return (
        <PartnerCard
          key={item.name}
          name={item.name}
          link={item.link}
          icon={item.icon}
        />
      );
    }
  });

  const publicationCards = data.map((item) => {
    if (item.publication === true) {
      return (
        <PartnerCard
          key={item.name}
          name={item.name}
          link={item.link}
          icon={item.icon}
          publication={item.publication}
        />
      );
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0 }}
      className={styles.pageContainer}
      ref={ContentRef}
    >
      <div className={styles.scrollBar}>
        <img
          draggable={false}
          src="/images/outScroll.svg"
          alt=""
          className={styles.outScroll}
        />
        <img
          src="/images/insideScroll.svg"
          alt=""
          className={styles.inScroll}
          style={{ top: `${scrollPosition}%` }}
        />
      </div>
      <img
        draggable={false}
        src="/images/Left helm.png"
        alt=""
        className={styles.leftHelm}
      />
      <img
        draggable={false}
        src="/images/Right helm.png"
        alt=""
        className={styles.rightHelm}
      />
      <div className={styles.topContainer}>
        <img src="/images/Top HUD-v1.png" alt="" className={styles.middleTop} />
        <img
          src="/images/media partners heading.png"
          alt=""
          className={styles.headingmiddelTop}
        />
        <div className={styles.homeBtn} onClick={handleHomeClick}>
          <span>HOME</span>
        </div>
      </div>
      <div className={styles.pageWrapper}>
        <img src="/images/Top HUD-v1.png" alt="" className={styles.hud} />
        <img
          src="/images/media partners heading.png"
          alt=""
          className={styles.headinghud}
        />
        <div className={styles.content}>
          <div className={styles.homeBtn} onClick={handleHomeClick}>
            <span>HOME</span>
          </div>
          <div className={styles.scrollBar}>
            <img
              draggable={false}
              src="/images/outScroll.svg"
              alt=""
              className={styles.outScroll}
            />
            <img
              src="/images/insideScroll.svg"
              alt=""
              className={styles.inScroll}
              style={{ top: `${scrollPosition}%` }}
            />
          </div>
          <div className={styles.sponsorsContentContainer}>
            <div className={styles.cardsContainer}>
              <h1>Publications</h1>
              {publicationCards}
              <h1>Influencers</h1>
              {influencerCards}
            </div>
          </div>
        </div>
        <div className={styles.mobileContent}>
          <div className={styles.cardsContainer}>
            <h1>Publications</h1>
            {publicationCards}
            <h1>Influencers</h1>
            {influencerCards}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PartnerCard(props) {
  return (
    <a className={styles.card} href={props.link}>
      {props.icon && (
        <div
          className={styles.imgContainer}
          style={{
            backgroundImage: `url(${props.icon})`,
            backgroundSize: props.publication ? "contain" : "cover",
          }}
        ></div>
      )}
      <h2>{props.name}</h2>
    </a>
  );
}