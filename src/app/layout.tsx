import "../styles/globals.css";
import "../styles/variables.css";
import LenisProvider from "./LenisProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antoine Piney - Portfolio",
  description:
    "Art Director & Immersive Designer, focusing on Creative Development, Motion Design and 3D Conception.",
  // Métadonnées plus détaillées pour le SEO
  openGraph: {
    title: "Antoine Piney - Portfolio",
    description:
      "Art Director & Immersive Designer, focusing on Creative Development, Motion Design and 3D Conception.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>{/* Ne pas ajouter de balises link preload ici */}</head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
