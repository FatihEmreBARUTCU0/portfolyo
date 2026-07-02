"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export default function HorizontalScrollShowcase({
  items,
}: {
  items: ShowcaseItem[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || items.length < 2) return;

    const ctx = gsap.context(() => {
      const totalShift = track.scrollWidth - window.innerWidth;
      if (totalShift <= 0) return;

      gsap.to(track, {
        x: -totalShift,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalShift}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile, items.length]);

  if (isMobile) {
    return (
      <section className="grid grid-cols-1 gap-5">
        {items.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              {project.id}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {project.description}
            </p>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              Ziyaret Et
              <ArrowUpRight className="size-4" />
            </a>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[85vh] overflow-hidden">
      <div ref={trackRef} className="flex h-full w-max items-stretch gap-6 px-2">
        {items.map((project) => (
          <article
            key={project.title}
            className="flex h-full w-[82vw] max-w-[440px] flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.05] p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {project.id}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                {project.description}
              </p>
            </div>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
            >
              Ziyaret Et
              <ArrowUpRight className="size-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
