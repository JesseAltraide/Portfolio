import { memo, useRef, type ComponentType } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Buildings,
  DeviceMobile,
  FilePdf,
  Robot,
  type IconProps,
} from "@phosphor-icons/react";
import { CV_URL, experience, type ExperienceEntry, type ExperienceIcon } from "../data";
import { Reveal } from "./Reveal";

const icons: Record<ExperienceIcon, ComponentType<IconProps>> = {
  phone: DeviceMobile,
  briefcase: Briefcase,
  buildings: Buildings,
  robot: Robot,
};

const HEADING_WORDS = Array.from({ length: 8 }, () => "Work History");

const OutlineMarquee = memo(function OutlineMarquee() {
  return (
    <div className="marquee overflow-hidden" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {HEADING_WORDS.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-outline text-6xl font-semibold tracking-tighter md:text-8xl">{word}</span>
            <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
});

function Highlights({ items, align }: { items: string[]; align: "left" | "right" }) {
  return (
    <ul className={`space-y-3 ${align === "right" ? "md:text-right" : ""}`}>
      {items.map((item) => (
        <li key={item} className="font-mono text-sm leading-relaxed text-zinc-300">
          <span className="mr-3 text-accent">/</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function StoreLinks({ links, align }: { links: NonNullable<ExperienceEntry["links"]>; align: "left" | "right" }) {
  return (
    <ul className={`mt-6 flex flex-wrap gap-3 ${align === "right" ? "md:justify-end" : ""}`}>
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent active:-translate-y-px active:scale-[0.98]"
          >
            {l.label} <ArrowUpRight size={14} strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const Icon = icons[entry.icon];
  const detailsOnLeft = index % 2 === 0;
  const detailsSide = detailsOnLeft ? "md:col-start-1 md:text-right" : "md:col-start-3";
  const sideSide = detailsOnLeft ? "md:col-start-3" : "md:col-start-1 md:text-right";
  const sideAlign = detailsOnLeft ? "left" : "right";
  const detailsAlign = detailsOnLeft ? "right" : "left";

  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6 pb-20 last:pb-0 md:grid-cols-[1fr_auto_1fr] md:gap-x-14">
      <span className="relative row-span-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:col-start-2 md:row-span-1 md:row-start-1">
        <Icon size={22} strokeWidth={1.5} />
      </span>

      <Reveal className={`col-start-2 row-start-1 md:row-start-1 ${detailsSide}`}>
        <p className="font-mono text-xs text-zinc-500">{entry.period}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{entry.role}</h3>
        <p className="mt-1 text-lg text-accent">{entry.org}</p>
        <p className={`mt-4 max-w-[48ch] leading-relaxed text-zinc-400 ${detailsAlign === "right" ? "md:ml-auto" : ""}`}>
          {entry.summary}
        </p>
      </Reveal>

      <Reveal delay={0.1} className={`col-start-2 row-start-2 md:row-start-1 md:self-center ${sideSide}`}>
        <Highlights items={entry.highlights} align={sideAlign} />
        {entry.links && <StoreLinks links={entry.links} align={sideAlign} />}
      </Reveal>
    </li>
  );
}

function ViewCvButton() {
  const base =
    "inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition active:-translate-y-px active:scale-[0.98]";

  if (!CV_URL) {
    return (
      <button type="button" disabled className={`${base} cursor-not-allowed border border-white/10 text-zinc-600`}>
        <FilePdf size={20} strokeWidth={1.5} /> View CV
      </button>
    );
  }

  return (
    <a
      href={CV_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-accent text-ink hover:brightness-110`}
    >
      <FilePdf size={20} strokeWidth={1.5} /> View CV
    </a>
  );
}

export function Experience() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  return (
    <section id="experience" className="py-28">
      <h2 className="sr-only">Experience</h2>
      <OutlineMarquee />

      <div className="mx-auto mt-20 max-w-7xl px-5 md:px-10">
        <ol ref={trackRef} className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-6 top-0 w-px origin-top -translate-x-1/2 bg-accent md:left-1/2"
          />
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.org} entry={entry} index={i} />
          ))}
        </ol>

        <div className="mt-20 flex justify-center">
          <ViewCvButton />
        </div>
      </div>
    </section>
  );
}
