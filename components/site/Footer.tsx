import styles from "./site.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Fatih Emre Barutçu — Tüm hakları saklıdır.
    </footer>
  );
}
