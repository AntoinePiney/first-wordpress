"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Antoine Piney</Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu">
          Menu
        </button>

        {isMenuOpen && (
          <nav className={styles.mobileMenu}>
            <ul>
              <li>
                <Link href="/projects">Projects</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
