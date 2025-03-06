"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  onLoadingComplete?: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setProgress((prev) => {
        // Gradually slow down as we approach 100
        const increment = Math.max(1, 10 * (1 - prev / 100));
        const nextProgress = Math.min(100, prev + increment);

        // If we reached 100, clear the interval
        if (nextProgress >= 100) {
          clearInterval(interval);

          // Small delay before triggering completion
          setTimeout(() => {
            setIsComplete(true);
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
        }

        return nextProgress;
      });
    }, 100);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`${styles.loaderContainer} ${
        isComplete ? styles.fadeOut : ""
      }`}>
      <div className={styles.loaderContent}>
        <div className={styles.loaderCounter}>{Math.floor(progress)}%</div>
      </div>
    </div>
  );
};

export default Loader;
