// index.js
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Head from "next/head";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pageMetadata, setPageMetadata] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages`)
      .then((response) => response.json())
      .then((data) => {
        const homePage = data.find((page) => page.slug === "home");
        if (homePage) {
          setTitle(homePage.title.rendered);
          setContent(homePage.content.rendered);
          // Supposons que vous ayez des champs personnalisés pour le SEO
          setPageMetadata({
            title: homePage.yoast_head_json?.title || homePage.title.rendered,
            description: homePage.yoast_head_json?.description || "",
          });
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  return (
    <div className={styles.Home}>
      <Head>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
      </Head>
      <Header />
      <h1 className={styles.h1}>{title}</h1>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
