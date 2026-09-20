import type { PolicyStatus } from "@/data/types";
import { clsx } from "clsx";

type BadgeProps = {
  status: PolicyStatus;
};

const statusConfig: Record<
  PolicyStatus,
  { label: string; className: string }
> = {
  allowed: { label: "Allowed", className: "badge--allowed" },
  "not-allowed": { label: "Not allowed", className: "badge--not-allowed" },
  "on-request": { label: "On request", className: "badge--on-request" },
};

export function Badge({ status }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={clsx("badge", config.className)}>
      {config.label}
    </span>
  );
}
