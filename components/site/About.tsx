import { SKILLS } from "@/lib/constants";
import Reveal from "./Reveal";
import styles from "./site.module.css";

export default function About() {
  return (
    <section id="about" className={`${styles.section} ${styles.sectionAbout}`}>
      <Reveal>
        <span className={styles.sectionLabel}>01 — Hakkımda</span>
        <h2 className={styles.sectionTitle}>
          Dijital ürünleri özenle inşa ediyorum.
        </h2>
        <p className={styles.sectionBody}>
          İzmir merkezli Full Stack Developer&apos;ım. E-ticaret platformlarından
          AI destekli araçlara kadar uçtan uca web uygulamaları geliştiriyorum.
          SRNoto gibi canlı müşteri projelerinde tasarımdan deployment&apos;a
          kadar sürecin tamamını yönettim.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className={styles.education}>
          <h3 className={styles.educationTitle}>Eğitim</h3>
          <ul className={styles.educationList}>
            <li>
              <strong>Bilgisayar Mühendisliği</strong> — Süleyman Demirel
              Üniversitesi · 2025
            </li>
            <li>
              Konya Teknik Üniversitesi&apos;nde 2 yıl; ardından SDÜ&apos;ye
              yatay geçiş
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <ul className={styles.skills}>
          {SKILLS.map((skill) => (
            <li key={skill.name} className={styles.skill}>
              {skill.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
