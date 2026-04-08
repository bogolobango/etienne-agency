/**
 * CountUp — smoothly animates a number from 0 → target on viewport entry.
 *
 * Respects prefers-reduced-motion (jumps straight to the final value).
 * Uses requestAnimationFrame with an ease-out cubic for a natural feel.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

interface CountUpProps {
  value: number;
  /** Formatter for the displayed string (e.g. `(n) => `$${n.toLocaleString()}``) */
  format?: (value: number) => string;
  /** Duration in ms (default 1400) */
  durationMs?: number;
  /** Start the animation immediately instead of waiting for intersection */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "p" | "div";
}

const DEFAULT_DURATION = 1400;

export default function CountUp({
  value,
  format = (n) => n.toLocaleString(),
  durationMs = DEFAULT_DURATION,
  eager = false,
  className,
  style,
  as = "span",
}: CountUpProps) {
  const [display, setDisplay] = useState(eager ? 0 : value);
  const [hasTriggered, setHasTriggered] = useState(eager);
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const fromRef = useRef<number>(0);

  // Respect reduced motion — if the user asked for less, just snap.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplay(value);
      setHasTriggered(true);
    }
  }, [value]);

  // Trigger on viewport entry unless eager
  useEffect(() => {
    if (hasTriggered) return;
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasTriggered]);

  // Animate whenever value changes AND we've been triggered
  useEffect(() => {
    if (!hasTriggered) return;

    const from = display;
    fromRef.current = from;
    startTimeRef.current = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      const current = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // We intentionally exclude `display` from deps — it's the animation target, not a trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, hasTriggered, durationMs]);

  const Tag = as;
  return (
    <Tag ref={nodeRef as never} className={className} style={style}>
      {format(Math.round(display))}
    </Tag>
  );
}
