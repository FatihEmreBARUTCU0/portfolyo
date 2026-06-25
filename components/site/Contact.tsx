import Reveal from "./Reveal";
import styles from "./site.module.css";

export default function Contact() {
  return (
    <section id="contact" className={`${styles.section} ${styles.sectionAlt}`}>
      <Reveal>
        <span className={styles.sectionLabel}>03 — İletişim</span>
        <h2 className={styles.sectionTitle}>Birlikte üretelim.</h2>
        <p className={styles.sectionBody}>
          Freelance projeler ve tam zamanlı fırsatlara açığım.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className={styles.contactLinks}>
          <a href="mailto:emrecompbarutcu@gmail.com" className={styles.contactLink}>
            ✉ emrecompbarutcu@gmail.com
          </a>
          <a href="tel:+905331490251" className={styles.contactLink}>
            ☎ 0533 149 02 51
          </a>
        </div>
      </Reveal>
    </section>
  );
}
