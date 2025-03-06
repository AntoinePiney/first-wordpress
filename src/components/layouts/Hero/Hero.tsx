"use client";

import styles from "./Hero.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Hero = () => {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Art Director & Immersive Designer, focusing on Creative Development,
            Motion Design and 3D Conception. I view design as a continuous
            exchange between form and function, an essential interaction that
            guides my approach. For me, design is not just about aesthetics;
            it&apos;s a multidisciplinary practice where every detail matters.
            This vision allows me to create solutions that are not only visually
            beautiful but also perfectly meet functional needs. Each element is
            thoughtfully designed to contribute to an overall harmony, ensuring
            that the final product is not only effective but also inspiring.
          </h1>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hero;
