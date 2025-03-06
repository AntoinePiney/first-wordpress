"use client";

import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");

  useEffect(() => {
    // Function to update time
    function updateTime() {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/Paris",
      };

      setTime(now.toLocaleTimeString("fr-FR", options));
    }

    // Update time immediately
    updateTime();

    // Set up an interval to update the time every second
    const interval = setInterval(updateTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          {" "}
          &copy;{currentYear}
          <a href="mailto:bonjour@antoinepiney.fr" className={styles.email}>
            bonjour@antoinepiney.fr
          </a>{" "}
        </div>
        <div className={styles.location}>
          Paris, France <span className={styles.time}>{time}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
