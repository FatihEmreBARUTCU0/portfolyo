"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Waitlist from "@/components/ui/background-shader";

type Project = {
  id: string;
  title: string;
  description: string;
  href: string;
  status?: string;
  image?: string;
};

const liveWork: Project[] = [
  {
    id: "01",
    title: "SRNoto",
    description: "Kurumsal web sitesi · Canlı müşteri projesi",
    href: "https://www.srnoto.com/",
    status: "Canli",
    image: "/projects/srnoto.png",
  },
];

const demos: Project[] = [
  {
    id: "02",
    title: "Nexora",
    description: "Full-stack e-ticaret · MongoDB, Stripe, NextAuth, Groq",
    href: "https://nexora-six-wheat.vercel.app/",
    image: "/projects/nexora.png",
  },
  {
    id: "03",
    title: "Atelier",
    description: "Full-stack moda magazasi · Supabase, Stripe, JWT",
    href: "https://giyim-store.vercel.app/",
    image: "/projects/atelier.png",
  },
  {
    id: "04",
    title: "CV Analyzer",
    description: "AI CV analizi · Next.js, Groq API, TypeScript",
    href: "http://cv-analyzer-kohl.vercel.app/",
    image: "/projects/cv-analyzer.png",
  },
  {
    id: "05",
    title: "ShopBot",
    description: "E-ticaret AI chatbot · Groq API",
    href: "https://chatbot-demo-seven-lovat.vercel.app/",
    image: "/projects/shopbot.png",
  },
  {
    id: "06",
    title: "Saglik Demo",
    description: "Evde saglik hizmetleri landing page konsepti",
    href: "https://avil-saglik.vercel.app/",
    image: "/projects/saglik-demo.png",
  },
  {
    id: "07",
    title: "Sanatci Portfolio",
    description: "Kisisel portfolio konsepti",
    href: "https://mustafa-bardakcioglu-portfolio.vercel.app/",
    image: "/projects/sanatci-portfolio.png",
  },
  {
    id: "08",
    title: "Lezzet House",
    description: "Restoran landing page konsepti",
    href: "https://restoran-sitesi.vercel.app/",
    image: "/projects/lezzet-house.png",
  },
];

const expertise = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST API",
  "Socket.IO",
  "JWT",
  "Flutter",
  "React Native",
  "Stripe",
  "Supabase",
  "Groq AI",
  "Three.js",
  "Vercel",
];

const expertiseLoop = [...expertise, ...expertise];

const sectionMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl transition duration-400 hover:border-[#d4af37]/70 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_24px_55px_-28px_rgba(212,175,55,0.45)]"
    >
      <div className="border-b border-white/10 bg-[#171717] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-3 h-6 flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-1 text-[10px] text-zinc-400">
            {project.href.replace("https://", "").replace("http://", "")}
          </div>
        </div>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-sky-500/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {project.id}
            </p>
            <div>
              <p className="text-sm text-white/75">Screenshot burada olacak</p>
              <p className="mt-1 text-xs text-white/55">
                Sen screenshot aldiktan sonra bu karta ekleyelim.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          {project.status ? (
            <span className="rounded-full border border-emerald-300/35 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-200">
              {project.status}
            </span>
          ) : null}
        </div>
        <p className="min-h-14 text-base text-white/75">
          {project.description}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#d4af37] transition duration-300 hover:text-[#e7c76a]"
        >
          Ziyaret Et
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);
  const buttonPrimary =
    "rounded-full bg-[#d4af37] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-[#e0be55]";
  const buttonSecondary =
    "rounded-full border border-white/25 bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-white/10";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8 md:pb-24">
        <section className="relative left-1/2 right-1/2 mb-12 min-h-[86vh] w-screen -translate-x-1/2 overflow-hidden pb-4">
          <Waitlist />
          <div className="hero-fallback-motion absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_30%,rgba(212,175,55,0.3),transparent_34%),linear-gradient(135deg,#181818_0%,#0f0f0f_55%,#0a0a0a_100%)]" />
          <video
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            poster="/projects/srnoto.png"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-black/60" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_40%,rgba(212,175,55,0.2),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.2),rgba(10,10,10,0.72))]" />

          <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-3 md:px-8">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-black/30 text-xl font-bold">
              F
            </div>
            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#hakkimda" className="hover:text-white">
                Hakkimda
              </a>
              <a href="#yapilmis-isler" className="hover:text-white">
                Projeler
              </a>
              <a href="#iletisim" className="hover:text-white">
                Iletisim
              </a>
            </nav>
            <a
              href="#iletisim"
              className={buttonSecondary}
            >
              Iletisime Gec
            </a>
          </header>

          <div className="relative z-20 mx-auto flex min-h-[66vh] w-full max-w-6xl flex-col items-start justify-end px-4 pb-4 text-left md:px-8 md:pb-10">
            <p className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85">
              Full Stack Developer - Izmir
            </p>
            <h1 className="mt-6 max-w-4xl font-[var(--font-cormorant)] text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-8xl">
              Fatih Emre Barutcu
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
              Uretime hazir, modern web deneyimleri gelistiriyorum. Next.js ile
              full-stack e-ticaret, AI entegrasyonlari ve temiz frontend
              sistemleri insa ediyorum.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#yapilmis-isler"
                className={buttonPrimary}
              >
                Projeler
              </a>
              <a
                href="#iletisim"
                className={buttonSecondary}
              >
                Iletisim
              </a>
            </div>
          </div>
        </section>

        <motion.section
          {...(prefersReducedMotion
            ? { initial: false }
            : sectionMotion)}
          id="hakkimda"
          className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-14 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.8)] md:px-8 md:py-16"
        >
          <div className="mb-4 h-px w-20 bg-gradient-to-r from-[#d4af37] to-transparent" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            01 - HAKKIMDA
          </p>
          <h1 className="mt-5 max-w-3xl font-[var(--font-cormorant)] text-4xl font-bold tracking-tight text-white md:text-6xl">
            Dijital urunleri ozenle insa ediyorum.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-zinc-300/80 md:text-base md:leading-8">
            Izmir merkezli Full Stack Developer&apos;im. Next.js ve React ile
            arayuz; Node.js, Express ve MongoDB/PostgreSQL ile API ve veri
            katmani gelistiriyorum. E-ticaret, gercek zamanli uygulamalar ve AI
            entegrasyonlarinda uretim ortamina hazir projeler teslim ettim.
          </p>

          <div className="mt-7 max-w-3xl border-l border-white/20 pl-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200/80">
              Egitim
            </p>
            <p className="mt-2 text-sm text-zinc-200">
              Bilgisayar Muhendisligi — Suleyman Demirel Universitesi · 2025
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Konya Teknik Universitesi&apos;nde 2 yil; ardindan SDU&apos;ye
              yatay gecis
            </p>
          </div>

          <div className="mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-200/80">
              Teknolojiler
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {expertiseLoop.slice(0, expertise.length).map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="whitespace-nowrap rounded-md border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs text-zinc-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...(prefersReducedMotion || isMobile
            ? { initial: false }
            : sectionMotion)}
          className="mt-24 rounded-2xl border border-white/10 bg-[#111111] px-6 py-14 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.8)] md:px-8 md:py-16"
        >
          <div className="mb-4 h-px w-20 bg-gradient-to-r from-[#d4af37] to-transparent" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            02 - PROJELER
          </p>
          <h2 className="mt-4 font-[var(--font-cormorant)] text-4xl font-bold tracking-tight md:text-5xl">
            Secilmis Isler.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300/80 md:leading-8">
            Canli musteri isleri ve kisisel demo projeler. On calismalar gercek
            marka isimleri kullanilmadan sunulmustur.
          </p>

          <h3 className="mt-8 text-2xl font-semibold text-white">Yapilmis Isler</h3>
          <p className="mt-2 text-xs text-zinc-400">
            Anlasma saglanmis ve canliya alinmis musteri projesi.
          </p>
          <motion.div
            id="yapilmis-isler"
            className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3"
            initial={prefersReducedMotion || isMobile ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {liveWork.map((project) => (
              <motion.div
                key={project.title}
                variants={
                  prefersReducedMotion || isMobile
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 22 },
                        visible: { opacity: 1, y: 0 },
                      }
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          <h3 className="mt-10 text-2xl font-semibold text-white">Demo Siteler</h3>
          <p className="mt-2 text-xs text-zinc-400">
            Kisisel projeler ve sektorel on calisma konseptleri.
          </p>
          <motion.div
            className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3"
            initial={prefersReducedMotion || isMobile ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {demos.map((project) => (
              <motion.div
                key={project.title}
                variants={
                  prefersReducedMotion || isMobile
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          {...(prefersReducedMotion
            ? { initial: false }
            : sectionMotion)}
          id="iletisim"
          className="mt-24 rounded-2xl border border-white/10 bg-[#111111] px-6 py-14 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.8)] md:px-8 md:py-16"
        >
          <div className="mb-4 h-px w-20 bg-gradient-to-r from-[#d4af37] to-transparent" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
            03 - ILETISIM
          </p>
          <h2 className="mt-4 font-[var(--font-cormorant)] text-4xl font-bold tracking-tight md:text-5xl">
            Birlikte uretelim.
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300/80 md:leading-8">
            Freelance projeler ve tam zamanli firsatlara acigim.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="mailto:emrecompbarutcu@gmail.com"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition duration-300 hover:bg-white/10"
            >
              <Mail className="size-4" />
              emrecompbarutcu@gmail.com
            </a>
            <a
              href="tel:+905331490251"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition duration-300 hover:bg-white/10"
            >
              <Phone className="size-4" />
              0533 149 02 51
            </a>
          </div>
        </motion.section>

        <footer className="mt-8 border-t border-white/15 pt-4 text-center text-[11px] text-zinc-500">
          © 2026 Fatih Emre Barutcu - Tum haklari saklidir.
        </footer>
      </main>
    </div>
  );
}
