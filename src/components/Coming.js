import styles from "@/styles/Coming.module.css";
import React, { useState, useEffect } from "react";

export default function Coming() {
  const contactInfo = [
    {
      text: "(+33) 781617893",
      href: "tel:+33781617893",
    },
    {
      text: "bonjour@antoinepiney.fr",
      href: "mailto:bonjour@antoinepiney.fr",
    },
    {
      text: "75010 Paris — Canal Saint-Martin",
      href: "https://maps.google.com/?q=Canal+Saint-Martin,+75010+Paris,+France",
    },
  ];

  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const options = {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(date.toLocaleTimeString("fr-FR", options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const skillSections = [
    {
      title: "Clients",
      sections: [
        {
          subtitle: "clients",
          items: [
            "Stade de France",
            "Cityz Media",
            "Salomon France",
            "Tristan Lohner",
            "Mouratoglou",
            "Marie Cerisy",
            "Oflyn",
            "Arkamys",
          ],
        },
      ],
    },
    {
      title: "Fields",
      sections: [
        {
          subtitle: "fields",
          items: [
            "Art Direction",
            "Front-End",
            "Motion Design",
            "3D Generalist",
          ],
        },
        {
          subtitle: "fields",
          items: ["Freelance", "Agency Vibe", "Collaboration"],
        },
      ],
    },
    {
      title: "Stack",
      sections: [
        {
          subtitle: "stack",
          items: [
            "Adobe Suite",
            "After Effects",
            "Figma",
            "Blender",
            "Webflow",
          ],
        },
        {
          subtitle: "stack",
          items: [
            "HTML",
            "CSS / SCSS",
            "JS / TS",
            "Git / Lab",
            "Strapi / WordPress",
            "React / NextJS",
            "Vue / Vite",
            "Three.js / WebGL",
          ],
        },
      ],
    },
  ];

  const SkillList = ({ subtitle, items }) => (
    <div className={styles.skillWrapper}>
      <span className={styles[`${subtitle}Subtitle`]}>
        {subtitle === "clients"
          ? "Most Recent"
          : subtitle === "fields"
          ? subtitle === items.length > 4
            ? "Hard Skill"
            : "Experience Skill"
          : subtitle === "stack"
          ? items.length > 4
            ? "Language"
            : "Tools"
          : ""}
      </span>
      <ul className={styles.listItem}>
        {items.map((item, index) => (
          <li key={`${subtitle}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src="/profile.jpg"
            alt="Profile"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Antoine Piney</h2>
          <p className={styles.descriptionContent}>
            Art Director & Immersive Designer currently at Adveris, focusing on
            motion design, 3D conception and creative development.
          </p>
        </div>

        <div className={styles.skill}>
          {skillSections.map(({ title, sections }) => (
            <div key={title} className={styles[title.toLowerCase()]}>
              <h2 className={styles.hSmall}>{title}</h2>
              <div className={styles.skillWrapperParent}>
                {sections.map((section, index) => (
                  <SkillList key={`${title}-${index}`} {...section} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.contact}>
          {contactInfo.map((info, index) => (
            <p key={`contact-${index}`}>
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}>
                {info.text}
              </a>
            </p>
          ))}
        </div>
        <div className={styles.year}>
          <p>
            {new Date().getFullYear()} — {time}
          </p>
        </div>
      </footer>
    </div>
  );
}
