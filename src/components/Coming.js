import { useEffect, useState } from "react";
import styles from "@/styles/Coming.module.css";

const Coming = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format personnalisé pour afficher "PARIS, FR" suivi de l'heure sans UTC
      const timeString = now
        .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        .replace("UTC", "")
        .trim();
      setDateTime(`PARIS, FR ${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Mise à jour chaque seconde

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <div className={styles.menuItem}>[01] Welcome Kit</div>
        </div>
      </div>
      <div className={styles.hero}>
        <div className={styles.heroTitle}>
          <h1>Portfolio is coming</h1>
          <h1>/2025</h1>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroItem}>
            <p className={styles.heroSubtitle}>About</p>
            <p className={styles.heroInfos}>
              Art Director & Immersive Designer currently at Adveris, focusing
              on Motion Design, 3D Conception and Creative Development.
            </p>
          </div>
          <div className={styles.heroItem}>
            <p className={styles.heroSubtitle}>Contact</p>
            <p className={styles.contactEmail}>bonjour@antoinepiney.fr</p>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.socials}>
            <a href="#">Awwwards</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Are.na</a>
          </div>
          <div className={styles.date}>{dateTime}</div>
        </div>
      </div>
    </div>
  );
};

export default Coming;
