import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.subtitle}>404</h1>
        <h2 className={styles.title}>Page Non Trouvée</h2>
      </div>
    </div>
  );
}
