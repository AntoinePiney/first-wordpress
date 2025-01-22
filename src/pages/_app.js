// _app.js
import "@/styles/globals.css";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [siteMetadata, setSiteMetadata] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // Récupérer les métadonnées générales du site
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setSiteMetadata({
          title: data.name,
          description: data.description,
        });
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des métadonnées:", error)
      );
  }, []);

  return (
    <>
      <Head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
