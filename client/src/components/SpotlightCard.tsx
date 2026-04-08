/**
 * SpotlightCard — wraps content with a cursor-aware radial gradient overlay.
 *
 * Uses CSS variables + pointermove (no per-frame React state), so it's
 * effectively free at runtime. The spotlight brightens on hover and
 * follows the cursor across the card surface.
 */

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** RGB string (no "rgb(" wrapper), e.g. "0, 212, 170" */
  color?: string;
  /** Intensity 0-1 */
  intensity?: number;
  /** Radius of the spotlight in px */
  radius?: number;
  style?: CSSProperties;
}

export default function SpotlightCard({
  children,
  className = "",
  color = "0, 212, 170",
  intensity = 0.14,
  radius = 380,
  style,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--spotlight-x", `${x}px`);
    el.style.setProperty("--spotlight-y", `${y}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          ...style,
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(${radius}px circle at var(--spotlight-x) var(--spotlight-y), rgba(${color}, ${intensity}), transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
