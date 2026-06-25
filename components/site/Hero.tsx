"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { HERO_SLIDES } from "@/lib/heroSlides";
import styles from "./site.module.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroSlideBgStack}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={styles.heroSlideBg}
            style={{
              background: s.gradient,
              opacity: i === activeIndex ? 1 : 0,
            }}
            aria-hidden={i !== activeIndex}
          />
        ))}
      </div>

      <div className={styles.heroCanvasWrap}>
        {mounted && <HeroCanvas activeIndex={activeIndex} />}
      </div>

      <div className={styles.heroOverlay} />

      <motion.div
        className={styles.heroContent}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span className={styles.heroEyebrow} variants={item}>
          Full Stack Developer — İzmir
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p className={styles.heroSlideLabel}>{slide.title}</p>
          </motion.div>
        </AnimatePresence>

        <motion.h1 className={styles.heroTitle} variants={item}>
          Fatih Emre Barutçu
        </motion.h1>

        <motion.p className={styles.heroSubtitle} variants={item}>
          {slide.tagline}
          <br />
          <span className={styles.heroSubtitleDim}>
            Next.js, React ve Flutter ile ölçeklenebilir uygulamalar.
          </span>
        </motion.p>

        <motion.div className={styles.heroActions} variants={item}>
          <a href="#work" className={styles.btnPrimary}>
            Projelerim
          </a>
          <a href="#contact" className={styles.btnGhost}>
            İletişim
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.heroControls}>
        <button
          type="button"
          className={styles.heroArrow}
          onClick={() =>
            setActiveIndex(
              (i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
            )
          }
          aria-label="Önceki"
        >
          ←
        </button>
        <div className={styles.heroDots}>
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={styles.heroDot}
              data-active={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.heroArrow}
          onClick={next}
          aria-label="Sonraki"
        >
          →
        </button>
      </div>

      <span className={styles.scrollHint}>KAYDIR</span>

      <div className={styles.heroFade} aria-hidden />
    </section>
  );
}
