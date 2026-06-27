type IsometricIconName =
  | "export"
  | "analyze"
  | "report"
  | "verified"
  | "email"
  | "video"
  | "magic"
  | "calendar";

interface IsometricIconProps {
  name: IsometricIconName;
  className?: string;
  alt?: string;
}

export function IsometricIcon({ name, className, alt }: IsometricIconProps) {
  return (
    <img
      src={`/icons/isometric/${name}.webp`}
      alt={alt ?? ""}
      role={alt ? "img" : "presentation"}
      aria-hidden={alt ? undefined : "true"}
      className={className}
      draggable={false}
    />
  );
}
