import { clsx } from "clsx";

type EyebrowProps = {
  children: string;
  /** Use on-dark variant when placed on navy backgrounds */
  onDark?: boolean;
  className?: string;
};

export function Eyebrow({ children, onDark = false, className }: EyebrowProps) {
  return (
    <span className={clsx("eyebrow", onDark && "eyebrow--on-dark", className)}>
      {children}
    </span>
  );
}
