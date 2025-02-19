"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Architecture.module.css";
import Scene from "@/components/Scene";

export default function Architecture() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options = {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(date.toLocaleTimeString("fr-FR", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* Grid overlay */}
      <div className={styles.gridOverlay}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.gridColumn} />
        ))}
      </div>
      <Scene />

      {/* Content */}
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Antoine Piney</h1>
          <button className={styles.headerMenu}>Menu</button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {/* Main content area déplacé dans le footer */}
          <div className={styles.main}>
            <span className={styles.label}>About</span>
            <p className={styles.description}>
              Art Director & Immersive Designer, focusing on Creative
              Development, Motion Design and 3D Conception.
            </p>
          </div>
          <div className={styles.timeLocation}>{time} PARIS 2025</div>
        </div>
      </div>
    </div>
  );
}
