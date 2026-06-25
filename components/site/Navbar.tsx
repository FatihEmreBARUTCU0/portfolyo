"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./site.module.css";

const links = [
  { href: "#about", label: "Hakkımda" },
  { href: "#work", label: "Projeler" },
  { href: "#contact", label: "İletişim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a href="#" className={styles.navLogo} onClick={close}>
        FEB
      </a>

      <button
        type="button"
        className={styles.navToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
      >
        <span className={styles.navToggleBar} data-open={open} />
        <span className={styles.navToggleBar} data-open={open} />
        <span className={styles.navToggleBar} data-open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <button
            type="button"
            className={styles.navBackdrop}
            onClick={close}
            aria-label="Menüyü kapat"
          />
        )}
      </AnimatePresence>

      <ul className={styles.navLinks} data-open={open}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.navLink} onClick={close}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
