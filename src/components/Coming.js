import styles from "@/styles/Coming.module.css";

export default function Coming() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src="/profile.jpg"
            alt="Profile"
            className={styles.profileImage}
          />{" "}
        </div>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>ANTOINE PINEY</h2>
          <p className={styles.descriptionContent}>
            ART DIRECTOR & IMMERSIVE DESIGNER CURRENTLY AT ADVERTIS, FOCUSING ON
            MOTION DESIGN, 3D CONCEPTION AND CREATIVE DEVELOPMENT.
          </p>
        </div>

        <div className={styles.skill}>
          <div className={styles.clients}>
            <h2 className={styles.hSmall}>CLIENT</h2>
            <div className={styles.skillWrapper}>
              <span className={styles.clientsSubtitle}>MOST RECENT</span>
              <ul className={styles.listItem}>
                <li>STADE DE FRANCE</li>
                <li>CITYZ MEDIA</li>
                <li>SALOMON FRANCE</li>
                <li>TRISTAN LOHNER</li>
                <li>MOURATOGLOU</li>
                <li>MARIE CERISY</li>
                <li>OFLYN</li>
                <li>ARKAMYS</li>
              </ul>
            </div>
          </div>

          <div className={styles.fields}>
            <h2 className={styles.hSmall}>FIELDS</h2>
            <div className={styles.skillWrapperParent}>
              <div className={styles.skillWrapper}>
                <span className={styles.fieldsSubtitle}>HARD SKILL</span>
                <ul className={styles.listItem}>
                  <li>ART DIRECTION</li>
                  <li>FRONT-END</li>
                  <li>MOTION DESIGN</li>
                  <li>3D GENERALIST</li>
                </ul>
              </div>
              <div>
                <div className={styles.skillWrapper}>
                  <span className={styles.fieldsSubtitle}>
                    EXPRERIENCE SKILL
                  </span>
                  <ul className={styles.listItem}>
                    <li>FREELANCE</li>
                    <li>AGENCY VIBE</li>
                    <li>COLLABORATION</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stack}>
            <h2 className={styles.hSmall}>STACK</h2>
            <div className={styles.skillWrapperParent}>
              <div className={styles.skillWrapper}>
                <span className={styles.stackSubtitle}>TOOLS</span>
                <ul className={styles.listItem}>
                  <li>ADOBE GLOBALS</li>
                  <li>AFTER EFFECTS</li>
                  <li>FIGMA</li>
                  <li>BLENDER</li>
                </ul>
              </div>
              <div>
                <div className={styles.skillWrapper}>
                  <span className={styles.stackSubtitle}>LANGUAGE</span>
                  <ul className={styles.listItem}>
                    <li>HTML</li>
                    <li>CSS / SCSS</li>
                    <li>JS / TS</li>
                    <li>GIT / LAB</li>
                    <li>STRAPI / WORDPRESS</li>
                    <li>REACT / NEXTJS</li>
                    <li>VUE / VITE</li>
                    <li>THREE.JS / WEBGL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.contact}>
          <p>(+33) 781617893</p>
          <p>BONJOUR@ANTOINEPINEY.FR</p>
          <p>75010 PARIS — CANAL SAINT-MARTIN</p>
        </div>
        <div className={styles.year}>
          <p>2025</p>
        </div>
      </footer>
    </div>
  );
}
