/**
 * MagneticButton — wraps any clickable element so it subtly pulls toward the
 * cursor when the cursor is within a proximity radius.
 *
 * Used sparingly on primary CTAs only — overusing this reads gimmicky fast.
 * Respects prefers-reduced-motion and touch devices (no-op on touch).
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  /** Pixel radius around the button that activates the magnetic pull. */
  proximity?: number;
  /** Maximum pull distance in px. */
  maxPull?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  proximity = 80,
  maxPull = 8,
  className = "",
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch or reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (mq.matches || isTouch) {
      setDisabled(true);
      return;
    }

    const handle = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < proximity) {
        // Scale pull by inverse distance (farther = weaker)
        const pullScale = (1 - dist / proximity) * maxPull;
        const angle = Math.atan2(dy, dx);
        setOffset({
          x: Math.cos(angle) * pullScale,
          y: Math.sin(angle) * pullScale,
        });
      } else if (offset.x !== 0 || offset.y !== 0) {
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
    // offset.x/y in deps would cause infinite loops — we read current values via closure intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proximity, maxPull]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 280ms var(--ease-reveal)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
