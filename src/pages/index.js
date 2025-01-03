import Head from "next/head";
import Coming from "@/components/Coming"; // Assurez-vous que le chemin est correct, "@/components/Coming" pointe vers le dossier components à la racine du projet.

export default function Home({ seo }) {
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {/* Vous pouvez ajouter d'autres balises meta ici selon les données récupérées */}
      </Head>
      <div>
        <Coming />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Remplacez 'your-wordpress-site.com' par l'URL de votre site WordPress
  const res = await fetch(
    "https://admin.antonepiney.fr/wp-json/yoast/v1/indexables?type=homepage&url=/"
  );
  const data = await res.json();
  const seo = {
    title: data.title,
    description: data.description,
    // Ajoutez d'autres éléments SEO selon vos besoins et la structure de votre réponse API
  };

  return {
    props: {
      seo,
    },
  };
}
