/**
 * GradientOrbs — Animated gradient orb background effects
 * Renders large blurred orb elements with floating animations
 * and scroll-based parallax for interactive depth.
 */

import { useEffect, useRef } from "react";

export interface OrbConfig {
  /** Orb diameter in px */
  size: number;
  /** CSS color (hex) */
  color: string;
  /** CSS left position (e.g. "10%", "-50px") */
  x: string;
  /** CSS top position */
  y: string;
  /** Opacity 0–1 (default 0.5) */
  opacity?: number;
  /** Animation duration in seconds (default 12) */
  duration?: number;
  /** Animation delay in seconds (default 0) */
  delay?: number;
  /** Scroll parallax intensity in px (default 40). Negative = opposite direction */
  parallaxFactor?: number;
}

interface GradientOrbsProps {
  orbs: OrbConfig[];
}

export default function GradientOrbs({ orbs }: GradientOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // progress: 0 = section entering bottom of viewport, 1 = leaving top
        const progress =
          1 - rect.bottom / (viewportHeight + rect.height);
        const centered = progress - 0.5; // range: -0.5 to 0.5

        orbRefs.current.forEach((el, i) => {
          if (!el) return;
          const config = orbs[i];
          const factor = config?.parallaxFactor ?? 40;
          const yOffset = centered * factor;
          // Alternate horizontal drift direction per orb
          const xOffset = centered * factor * 0.25 * (i % 2 === 0 ? 1 : -1);
          el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [orbs]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{
        zIndex: 0,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {orbs.map((orb, i) => {
        const floatClass = `gradient-orb-float-${(i % 3) + 1}`;
        return (
          <div
            key={i}
            ref={(el) => {
              orbRefs.current[i] = el;
            }}
            className="gradient-orb-parallax"
            style={{ left: orb.x, top: orb.y }}
          >
            <div
              className={`gradient-orb ${floatClass}`}
              style={{
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle at 30% 30%, ${orb.color}, ${orb.color}66, transparent 70%)`,
                opacity: orb.opacity ?? 0.5,
                animationDuration: `${orb.duration ?? 12}s`,
                animationDelay: `${orb.delay ?? 0}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
