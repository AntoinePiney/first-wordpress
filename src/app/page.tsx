import styles from "./page.module.css";
import Hero from "@/components/layouts/Hero/Hero";

export default function Home() {
  return (
    <div className={styles.container}>
      <Hero />
    </div>
  );
}
