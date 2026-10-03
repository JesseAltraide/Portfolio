import { useState, type ComponentType, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bug,
  CaretLeft,
  CaretRight,
  Cloud,
  Database,
  Fire,
  Phone,
  Queue,
  Sparkle,
  type IconProps,
} from "@phosphor-icons/react";
import { skillCategories, type FallbackIcon, type Skill } from "../data";
import { getBrandIcon } from "./techIcons";
import { Reveal } from "./Reveal";

const SLIDE_DISTANCE = 72;
const spring = { type: "spring", stiffness: 100, damping: 20 } as const;

const fallbackIcons: Record<FallbackIcon, ComponentType<IconProps>> = {
  database: Database,
  queue: Queue,
  cloud: Cloud,
  spider: Bug,
  flame: Fire,
  phone: Phone,
  sparkle: Sparkle,
  tree: Sparkle,
  key: Sparkle,
  gear: Sparkle,
};

function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const brand = skill.slug ? getBrandIcon(skill.slug) : null;
  const Fallback = skill.fallback ? fallbackIcons[skill.fallback] : Sparkle;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.12 + index * 0.05 }}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-white/25 md:h-20 md:w-20">
        {brand ? (
          <svg viewBox="0 0 24 24" role="img" aria-label={skill.name} className="h-7 w-7 md:h-9 md:w-9" fill={brand.color}>
            <path d={brand.path} />
          </svg>
        ) : (
          <Fallback size={30} strokeWidth={1.5} className="text-zinc-300" aria-label={skill.name} />
        )}
      </span>
      <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
    </motion.li>
  );
}

interface ArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

function ArrowButton({ direction, onClick, className = "" }: ArrowProps) {
  const Icon = direction === "left" ? CaretLeft : CaretRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous section" : "Next section"}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-paper transition duration-300 hover:border-accent hover:text-accent active:scale-95 md:h-14 md:w-14 ${className}`}
    >
      <Icon size={24} strokeWidth={1.5} />
    </button>
  );
}

export function SkillsStack() {
  const [state, setState] = useState({ index: 0, direction: 1 });
  const { index, direction } = state;
  const category = skillCategories[index];

  const step = (delta: 1 | -1) => {
    setState((s) => ({ index: (s.index + delta + skillCategories.length) % skillCategories.length, direction: delta }));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section id="stack" onKeyDown={onKeyDown} className="mx-auto max-w-7xl px-5 py-28 md:px-10">
      <Reveal>
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Skills and technologies</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 md:grid-cols-[auto_1fr_auto] md:gap-x-10">
        <ArrowButton
          direction="left"
          onClick={() => step(-1)}
          className="order-2 justify-self-start md:order-1"
        />

        <div className="order-1 col-span-2 min-h-[34rem] overflow-hidden md:order-2 md:col-span-1" aria-live="polite">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={category.label}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * SLIDE_DISTANCE }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -SLIDE_DISTANCE }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={spring}
              className="py-4"
            >
              <h3 className="text-3xl font-semibold tracking-tighter md:text-5xl">{category.label}</h3>
              <p className="mt-3 max-w-[50ch] text-zinc-400">{category.blurb}</p>
              <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {category.items.map((s, j) => (
                  <SkillBadge key={s.name} skill={s} index={j} />
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>
        </div>

        <ArrowButton
          direction="right"
          onClick={() => step(1)}
          className="order-3 justify-self-end"
        />
      </div>
    </section>
  );
}
