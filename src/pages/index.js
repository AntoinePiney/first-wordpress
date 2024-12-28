import { useEffect, useState } from "react";
import styles from "Home.module.css";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Appeler l'API REST de WordPress
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages`)
      .then((response) => response.json())
      .then((data) => {
        // Trouver la page avec le slug "home"
        const homepage = data.find((page) => page.slug === "home");
        if (homepage) {
          setTitle(homepage.title.rendered); // Titre de la page
          setContent(homepage.content.rendered); // Contenu de la page
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <div>
      <h1 className={styles.Home}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
