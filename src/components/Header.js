import styles from "@/styles/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.Header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/test">Test</Link>
        </li>
      </ul>
    </header>
  );
}
