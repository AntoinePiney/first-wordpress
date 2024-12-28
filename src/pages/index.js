import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Vérifie si la réponse est un tableau avant d'utiliser `find`
        if (Array.isArray(data)) {
          const homepage = data.find((page) => page.slug === "home");
          if (homepage) {
            setTitle(homepage.title.rendered);
          } else {
            console.error("Page 'home' introuvable");
          }
        } else {
          console.error("Réponse inattendue de l'API :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.Home}>
      <h1 className={styles.h1}>{title}</h1>
    </div>
  );
}
