import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Appeler l'API REST de WordPress
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages`)
      .then((response) => response.json())
      .then((data) => {
        // Trouver la page avec le slug "test"
        const testPage = data.find((page) => page.slug === "test");
        if (testPage) {
          setTitle(testPage.title.rendered); // Titre de la page
          setContent(testPage.content.rendered); // Contenu de la page
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
