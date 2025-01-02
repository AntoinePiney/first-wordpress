import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/Coming.module.css";

// Correctly configure dynamic import
const Scene = dynamic(() => import("./Scene").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading 3D Scene...</div>,
});

const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.canva}>
      <Scene />
    </div>
  </div>
);

const Hero = ({ dateTime }) => (
  <div className={styles.hero}>
    <div className={styles.heroTitle}>
      <h1>Portfolio is coming</h1>
      <h1>/2025</h1>
    </div>
    <div className={styles.heroContent}>
      <div className={styles.heroItem}>
        <p className={styles.heroSubtitle}>About</p>
        <p className={styles.heroInfos}>
          Art Director & Immersive Designer currently at Adveris, focusing on
          Motion Design, 3D Conception, and Creative Development.
        </p>
      </div>
      <div className={styles.heroItem}>
        <p className={styles.heroSubtitle}>Contact</p>
        <p className={styles.contactEmail}>bonjour@antoinepiney.fr</p>
      </div>
    </div>
    <Footer dateTime={dateTime} />
  </div>
);

const Footer = ({ dateTime }) => (
  <div className={styles.footer}>
    <div className={styles.socials}>
      <a
        href="https://www.awwwards.com/antoinepiney/"
        rel="noopener noreferrer"
        target="_blank">
        Awwwards
      </a>
      <a
        href="https://www.instagram.com/lejeunepiney/"
        rel="noopener noreferrer"
        target="_blank">
        Instagram
      </a>
      <a
        href="https://x.com/lejeunepiney"
        rel="noopener noreferrer"
        target="_blank">
        Twitter
      </a>
      <a
        href="https://www.are.na/antoine-piney/channels"
        rel="noopener noreferrer"
        target="_blank">
        Are.na
      </a>
    </div>
    <div className={styles.date}>{dateTime}</div>
  </div>
);

const Coming = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        .trim();
      setDateTime(`PARIS, FR ${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Hero dateTime={dateTime} />
    </div>
  );
};

export default Coming;
