// index.js
import Head from "next/head";
import Architecture from "@/components/Architecture";

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
      <Architecture />
    </>
  );
}
