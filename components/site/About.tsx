import { SKILL_GROUPS } from "@/lib/constants";
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
          İzmir merkezli Full Stack Developer&apos;ım. Next.js ve React ile
          arayüz; Node.js, Express ve MongoDB/PostgreSQL ile API ve veri
          katmanı geliştiriyorum. E-ticaret, gerçek zamanlı uygulamalar ve AI
          entegrasyonlarında üretim ortamına hazır projeler teslim ettim.
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

      <div className={styles.skillGroups}>
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={0.1 + i * 0.06}>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillGroupTitle}>{group.title}</h3>
              <ul className={styles.skills}>
                {group.skills.map((skill) => (
                  <li key={skill} className={styles.skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
