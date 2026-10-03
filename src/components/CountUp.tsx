import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const DURATION_S = 1.6;
const START_DELAY_S = 0.5;

function format(template: string[], numbers: number[], progress: number): string {
  return template.reduce((out, part, i) => {
    if (i % 2 === 0) return out + part;
    return out + Math.round(numbers[(i - 1) / 2] * progress);
  }, "");
}

export function CountUp({ value }: { value: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(rootRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const live = liveRef.current;
    if (!isInView || !live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const template = value.split(/(\d+)/);
    const numbers = template.filter((_, i) => i % 2 === 1).map(Number);
    if (numbers.length === 0) return;

    live.textContent = format(template, numbers, 0);
    const controls = animate(0, 1, {
      duration: DURATION_S,
      delay: START_DELAY_S,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (p) => {
        live.textContent = format(template, numbers, p);
      },
      onComplete: () => {
        live.textContent = value;
      },
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={rootRef} className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {value}
      </span>
      <span ref={liveRef} aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
