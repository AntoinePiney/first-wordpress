"use client";

import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>&copy;{currentYear}</div>
        <div className={styles.location}>Paris, France</div>
      </div>
    </footer>
  );
};

export default Footer;
