import Image from "next/image";
import styles from "@/styles/Hero.module.css";

export default function Hero({ title, image, content }) {
  return (
    <div className={styles.hero}>
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title || "Hero background"}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
        </div>
      )}
      <div className={styles.content}>
        {title && <h1 className={styles.heroTitle}>{title}</h1>}
        {content && (
          <div
            className={styles.heroContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
}
