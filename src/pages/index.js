// index.js
import Head from "next/head";
import Coming from "@/components/Coming";

export default function Home() {
  return (
    <>
      <Head>
        <title>Antoine Piney - Art Director & Immersive Designer</title>
        <meta
          name="description"
          content="Art Director & Immersive Designer focusing on motion design, 3D conception and creative development."
        />
      </Head>
      <Coming />
    </>
  );
}
