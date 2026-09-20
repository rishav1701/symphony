import { PlaceholderNote } from "./PlaceholderNote";
import type { SiteStat } from "@/data/types";

type StatCardProps = {
  stat: SiteStat;
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="card p-6 md:p-8 text-center">
      {/* Gold accent line */}
      <div className="w-8 h-0.5 bg-gold mx-auto mb-4" aria-hidden="true" />

      {/* Large serif value */}
      <div className="font-serif text-3xl md:text-4xl font-semibold text-navy leading-none">
        {stat.value}
      </div>

      {/* Label */}
      <div className="mt-2 font-sans text-sm font-semibold tracking-wide uppercase text-ink">
        {stat.label}
      </div>

      {/* Description */}
      <p className="mt-1 text-sm text-muted leading-snug">
        {stat.description}
      </p>

      {stat.placeholder && <PlaceholderNote field={stat.id} />}
    </div>
  );
}
