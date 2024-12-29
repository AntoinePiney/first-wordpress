import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import styles from "@/styles/Test.module.css";

export default function Test() {
  const [heroData, setHeroData] = useState({
    title: "",
    imageUrl: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Première requête pour obtenir les données de la page
        const pageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=test`
        );
        const pageData = await pageResponse.json();

        if (pageData[0]?.acf) {
          // Si on a un ID d'image, on fait une seconde requête pour obtenir l'URL
          let imageUrl = "";
          if (pageData[0].acf.image) {
            const imageResponse = await fetch(
              `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/media/${pageData[0].acf.image}`
            );
            const imageData = await imageResponse.json();
            imageUrl = imageData.source_url;
          }

          setHeroData({
            title: pageData[0].acf.title || "",
            imageUrl: imageUrl,
            content: pageData[0].acf.content || "",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className={styles.Test}>
      <Hero
        title={heroData.title}
        image={heroData.imageUrl}
        content={heroData.content}
      />
    </div>
  );
}
