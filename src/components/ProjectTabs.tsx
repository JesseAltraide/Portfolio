import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, LockSimple } from "@phosphor-icons/react";
import { frameworks, projects, type Project } from "../data";
import { DemoVideo } from "./DemoVideo";
import { GitHubLink } from "./GitHubLink";
import { Reveal } from "./Reveal";

type Framework = (typeof frameworks)[number];

function countFor(framework: Framework): number {
  return projects.filter((p) => p.framework === framework).length;
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="grid grid-cols-1 gap-6 py-8 first:pt-0 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2 font-mono text-xs text-zinc-500">{project.context}</p>
        <div className="mt-5 flex flex-col items-start gap-3">
          {project.github ? (
            <GitHubLink href={project.github} />
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500">
              <LockSimple size={16} strokeWidth={1.5} /> {project.privateNote ?? "Private repository"}
            </span>
          )}
          {project.live && (
            <div className="flex flex-col items-start gap-1">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-300 transition hover:text-accent active:-translate-y-px active:scale-[0.98]"
              >
                <Globe size={16} strokeWidth={1.5} />
                Try the live agent
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <p className="max-w-[28ch] text-xs leading-relaxed text-zinc-500">
                Note: it may take up to a minute to wake up on first load.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-7">
        <p className="max-w-[65ch] leading-relaxed text-zinc-400">{project.summary}</p>
        <p className="mt-4 text-sm text-paper">{project.proof}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-400">
              {s}
            </li>
          ))}
        </ul>
        {project.demo && <DemoVideo title={project.name} shareUrl={project.demo} />}
      </div>
    </li>
  );
}

export function ProjectTabs() {
  const [active, setActive] = useState<Framework>(frameworks[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = frameworks.indexOf(active);
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % frameworks.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + frameworks.length) % frameworks.length;
    else return;
    e.preventDefault();
    setActive(frameworks[next]);
    tabRefs.current[frameworks[next]]?.focus();
  };

  const visible = projects.filter((p) => p.framework === active);

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 md:px-10">
      <Reveal>
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">Projects by framework</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Project frameworks"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-1 overflow-x-auto px-5 md:col-span-3 md:mx-0 md:flex-col md:overflow-visible md:px-0"
        >
          {frameworks.map((fw) => {
            const selected = fw === active;
            return (
              <button
                key={fw}
                ref={(el) => {
                  tabRefs.current[fw] = el;
                }}
                role="tab"
                id={`tab-${fw}`}
                aria-selected={selected}
                aria-controls="project-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(fw)}
                className={`relative flex shrink-0 items-baseline justify-between gap-6 rounded-lg px-4 py-3 text-left transition active:scale-[0.98] md:py-4 ${
                  selected ? "text-paper" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="tab-indicator"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-0 rounded-lg border border-white/10 bg-white/[0.04]"
                  />
                )}
                <span className="relative text-base font-medium tracking-tight md:text-lg">{fw}</span>
                <span className="relative font-mono text-xs text-zinc-500">{String(countFor(fw)).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="project-panel"
          aria-labelledby={`tab-${active}`}
          className="md:col-span-9 md:border-l md:border-white/10 md:pl-10"
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="divide-y divide-white/10"
            >
              {visible.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
