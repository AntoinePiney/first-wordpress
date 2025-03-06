"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Hero from "@/components/layouts/Hero/Hero";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <Loader onLoadingComplete={handleLoadingComplete} />
      <div className={`${styles.content} ${!isLoading ? styles.visible : ""}`}>
        <Hero />
      </div>
    </div>
  );
}
