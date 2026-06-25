"use client";

import Image from "next/image";
import { DEMO_PROJECTS, CLIENT_PROJECTS, type Project } from "@/lib/constants";
import Reveal from "./Reveal";
import styles from "./site.module.css";

function ProjectThumb({
  title,
  thumbnail,
  color,
}: {
  title: string;
  thumbnail?: string;
  color: string;
}) {
  if (thumbnail) {
    return (
      <div className={styles.projectThumb}>
        <Image
          src={thumbnail}
          alt={`${title} önizleme`}
          width={560}
          height={350}
          className={styles.projectThumbImg}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          className={styles.projectThumbFallback}
          style={{ background: `linear-gradient(135deg, ${color}44, #1a1a28)` }}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.projectThumb}
      style={{ background: `linear-gradient(135deg, ${color}33, #1a1a28)` }}
    />
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { title, description, url, color, thumbnail, comingSoon } = project;
  const disabled = comingSoon || url === "#";

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const content = (
    <>
      <ProjectThumb title={title} thumbnail={thumbnail} color={color} />
      <span className={styles.projectIndex}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className={styles.projectTitle}>{title}</h3>
      <p className={styles.projectDesc}>{description}</p>
      {comingSoon ? (
        <span className={styles.projectSoon}>Yakında</span>
      ) : (
        <span className={styles.projectLink}>Ziyaret Et →</span>
      )}
    </>
  );

  if (disabled) {
    return (
      <div
        className={styles.projectCard}
        data-disabled="true"
        data-coming-soon={comingSoon}
        onMouseMove={onMove}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.projectCard}
      onMouseMove={onMove}
    >
      {content}
    </a>
  );
}

function ProjectGroup({
  title,
  subtitle,
  projects,
  startIndex,
}: {
  title: string;
  subtitle: string;
  projects: Project[];
  startIndex: number;
}) {
  return (
    <div className={styles.projectGroup}>
      <Reveal>
        <h3 className={styles.projectGroupTitle}>{title}</h3>
        <p className={styles.projectGroupSubtitle}>{subtitle}</p>
      </Reveal>
      <div className={styles.projectGrid}>
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <ProjectCard project={project} index={startIndex + i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className={styles.section}>
      <Reveal>
        <span className={styles.sectionLabel}>02 — Projeler</span>
        <h2 className={styles.sectionTitle}>Seçilmiş işler.</h2>
        <p className={styles.sectionBody}>
          Canlı müşteri işleri ve kişisel demo projeler. Ön çalışmalar gerçek
          marka isimleri kullanılmadan sunulmuştur.
        </p>
      </Reveal>

      <ProjectGroup
        title="Yapılmış İşler"
        subtitle="Anlaşma sağlanmış ve canlıya alınmış müşteri projesi."
        projects={CLIENT_PROJECTS}
        startIndex={0}
      />

      <ProjectGroup
        title="Demo Siteler"
        subtitle="Kişisel projeler ve sektörel ön çalışma konseptleri."
        projects={DEMO_PROJECTS}
        startIndex={CLIENT_PROJECTS.length}
      />
    </section>
  );
}
