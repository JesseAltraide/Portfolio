import { motion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { metrics } from "../data";
import { ContactForm } from "./ContactForm";
import { CountUp } from "./CountUp";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
} as const;

export function Hero() {
  return (
    <header id="top" className="mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 content-center gap-16 px-5 py-24 md:grid-cols-12 md:px-10">
      <motion.div variants={container} initial="hidden" animate="show" className="md:col-span-7">
        <motion.h1 variants={item} className="text-4xl font-semibold leading-none tracking-tighter md:text-6xl">
          Jesse Altraide
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 text-2xl font-light leading-tight tracking-tight text-zinc-300 md:text-4xl"
        >
          I build backends that hold up in production, and AI agents that{" "}
          <span className="text-accent">can be trusted</span> with real data.
        </motion.p>
        <motion.p variants={item} className="mt-8 max-w-[60ch] text-base leading-relaxed text-zinc-400">
          AI Automation Engineer and Backend Engineer. Spring Boot and Express services, Claude Agent SDK systems, MCP
          servers, and the tests and security reviews that keep them honest.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <ContactForm />
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm text-zinc-400 transition hover:text-paper"
          >
            See my experience <ArrowDown size={16} strokeWidth={1.5} />
          </a>
        </motion.div>
      </motion.div>

      <motion.dl
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
        className="divide-y divide-white/10 border-y border-white/10 md:col-span-4 md:col-start-9 md:self-end"
      >
        {metrics.map((m) => (
          <div key={m.label} className="py-4">
            <dt className="font-mono text-2xl font-medium tracking-tight text-paper md:text-3xl"><CountUp value={m.value} /></dt>
            <dd className="mt-1 text-sm text-zinc-500">{m.label}</dd>
          </div>
        ))}
      </motion.dl>
    </header>
  );
}
