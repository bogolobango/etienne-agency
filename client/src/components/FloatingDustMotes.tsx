/**
 * FloatingDustMotes — Canvas-based teal particle background
 * Organic drifting dust motes with flicker for lo-fi depth.
 */

import { useRef, useEffect, useCallback, useState } from "react";

interface FloatingDustMotesProps {
  /** Number of particles (default 50) */
  particleCount?: number;
  /** RGB string e.g. "0, 212, 170" (default: teal) */
  baseColor?: string;
  /** Max drift speed (default 0.5) */
  maxSpeed?: number;
  /** Max particle radius (default 1.8) */
  maxRadius?: number;
  /** Extra CSS class for the canvas element */
  className?: string;
}

export default function FloatingDustMotes({
  particleCount = 50,
  baseColor = "0, 212, 170",
  maxSpeed = 0.5,
  maxRadius = 1.8,
  className = "",
}: FloatingDustMotesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dprRef = useRef(1);
  const [isVisible, setIsVisible] = useState(false);

  // Store config in refs so the animation loop always reads the latest
  const configRef = useRef({ particleCount, baseColor, maxSpeed, maxRadius });
  configRef.current = { particleCount, baseColor, maxSpeed, maxRadius };

  // Pause animation when off-screen to save CPU/battery
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const initParticles = useCallback((w: number, h: number) => {
    const cfg = configRef.current;
    const arr: Particle[] = [];
    for (let i = 0; i < cfg.particleCount; i++) {
      arr.push(createParticle(w, h, cfg.maxRadius, cfg.maxSpeed));
    }
    particlesRef.current = arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler — sets canvas resolution to match CSS size * DPR
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles(w, h);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Animation loop — only runs when canvas is visible
    const render = (time: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const cfg = configRef.current;
      for (const p of particlesRef.current) {
        updateParticle(p, time, w, h, cfg.maxSpeed);
        drawParticle(ctx, p, cfg.baseColor);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (isVisible) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Particle helpers (plain functions, no class) ──────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  flickerSpeed: number;
  flickerOffset: number;
}

function createParticle(w: number, h: number, maxR: number, maxV: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * maxR + 0.2,
    vx: (Math.random() - 0.5) * maxV,
    vy: (Math.random() - 0.5) * maxV,
    baseOpacity: Math.random() * 0.5 + 0.1,
    opacity: 0.3,
    flickerSpeed: Math.random() * 0.05 + 0.01,
    flickerOffset: Math.random() * Math.PI * 2,
  };
}

function updateParticle(p: Particle, time: number, w: number, h: number, maxV: number) {
  // Organic velocity drift
  p.vx += (Math.random() - 0.5) * 0.02;
  p.vy += (Math.random() - 0.5) * 0.02;
  const cap = maxV * 1.5;
  p.vx = Math.max(-cap, Math.min(cap, p.vx));
  p.vy = Math.max(-cap, Math.min(cap, p.vy));

  p.x += p.vx;
  p.y += p.vy;

  // Edge wrap
  if (p.x < 0) p.x = w;
  if (p.x > w) p.x = 0;
  if (p.y < 0) p.y = h;
  if (p.y > h) p.y = 0;

  // Flicker
  p.opacity =
    p.baseOpacity +
    Math.sin(time * 0.001 * p.flickerSpeed + p.flickerOffset) * 0.1;
  p.opacity = Math.max(0.05, Math.min(0.7, p.opacity));
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, color: string) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
  ctx.fill();
}
