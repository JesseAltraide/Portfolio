import { memo, useEffect, useRef } from "react";

interface Ribbon {
  baseY: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  drift: number;
}

const RIBBONS: Ribbon[] = [
  { baseY: 0.22, amplitude: 0.1, wavelength: 0.0021, speed: 0.00022, phase: 0, drift: 0.04 },
  { baseY: 0.52, amplitude: 0.14, wavelength: 0.0015, speed: -0.00017, phase: 2.1, drift: 0.06 },
  { baseY: 0.82, amplitude: 0.09, wavelength: 0.0026, speed: 0.00028, phase: 4.2, drift: 0.05 },
];

const PASSES = [
  { width: 46, alpha: 0.035 },
  { width: 22, alpha: 0.06 },
  { width: 9, alpha: 0.11 },
  { width: 2.5, alpha: 0.32 },
];

const COLOR = "63, 212, 154";
const STEP = 28;
const FRAME_MS = 1000 / 30;

interface Pointer {
  x: number;
  y: number;
  strength: number;
}

const LEAN = 0.45;
const REACH_PX = 240;
const FOLLOW = 0.12;

function draw(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: Pointer,
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (const r of RIBBONS) {
    const path = new Path2D();
    for (let x = -STEP; x <= width + STEP; x += STEP) {
      const wave = Math.sin(x * r.wavelength + time * r.speed + r.phase);
      const sway = Math.sin(x * r.wavelength * 0.45 - time * r.speed * 0.7 + r.phase * 1.7);
      let y = height * (r.baseY + r.drift * sway) + height * r.amplitude * wave;
      if (pointer.strength > 0.001) {
        const dx = x - pointer.x;
        const falloff = Math.exp(-(dx * dx) / (2 * REACH_PX * REACH_PX));
        y += (pointer.y - y) * LEAN * pointer.strength * falloff;
      }
      if (x === -STEP) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    for (const pass of PASSES) {
      ctx.lineWidth = pass.width;
      ctx.strokeStyle = `rgba(${COLOR}, ${pass.alpha})`;
      ctx.stroke(path);
    }
  }
}

export const GlowBackground = memo(function GlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let lastFrame = 0;
    let hasPointer = false;
    const pointer: Pointer = { x: 0, y: 0, strength: 0 };
    const target: Pointer = { x: 0, y: 0, strength: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      target.strength = 1;
      if (!hasPointer) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        hasPointer = true;
      }
    };
    const onPointerLeave = () => {
      target.strength = 0;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, performance.now(), pointer);
    };

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      pointer.x += (target.x - pointer.x) * FOLLOW;
      pointer.y += (target.y - pointer.y) * FOLLOW;
      pointer.strength += (target.strength - pointer.strength) * FOLLOW;
      draw(ctx, canvas.width, canvas.height, now, pointer);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      if (reduceMotion.matches || document.hidden) return;
      frameId = requestAnimationFrame(tick);
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", start);
    reduceMotion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", start);
      reduceMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-90"
      style={{
        WebkitMaskImage: "radial-gradient(ellipse 70% 75% at 50% 45%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.22) 30%, black 100%)",
        maskImage: "radial-gradient(ellipse 70% 75% at 50% 45%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.22) 30%, black 100%)",
      }}
    />
  );
});
