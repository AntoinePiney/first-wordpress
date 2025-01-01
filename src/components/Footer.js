import React, { useState, useEffect } from "react";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch("https://admin.antoinepiney.fr/wp-json/wp/v2/pages?slug=home") // Modifier pour utiliser un paramètre de requête
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setFooterData(data[0].acf); // Assurez-vous que les données sont chargées correctement
        } else {
          throw new Error("No data found");
        }
      })
      .catch((error) => console.error("Error fetching footer data:", error));
  }, []);

  if (!footerData) {
    return <footer className={styles.footer}>Loading...</footer>;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>{footerData.time}</span>
        <span className={styles.email}>
          Email: <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
        </span>
        <div className={styles.links}>
          <a
            href={footerData.socialLink.url}
            target={footerData.socialLink.target}
            rel="noopener noreferrer">
            {footerData.socialLink.title}
          </a>
          <a
            href={footerData.instagramlink.url}
            target={footerData.instagramlink.target}
            rel="noopener noreferrer">
            {footerData.instagramlink.title}
          </a>
          <a
            href={footerData.awwwardsLink.url}
            target={footerData.awwwardsLink.target}
            rel="noopener noreferrer">
            {footerData.awwwardsLink.title}
          </a>
        </div>
        <span className={styles.copyright}>{footerData.copyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
