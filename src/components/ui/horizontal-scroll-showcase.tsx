"use client";

import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
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
  }, [items.length]);

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
