import { PlaceholderNote } from "./PlaceholderNote";
import type { Specification } from "@/data/types";

type SpecItemProps = {
  spec: Specification;
};

export function SpecItem({ spec }: SpecItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 md:p-6 border-l-2 border-gold bg-white rounded-r">
      {/* Large serif value */}
      <div className="font-serif text-3xl md:text-4xl font-semibold text-navy leading-none shrink-0 min-w-[56px]">
        {spec.value}
      </div>

      <div className="min-w-0">
        {/* Uppercase label */}
        <div className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
          {spec.label}
        </div>
        {/* Detail line */}
        <p className="mt-1 text-sm text-muted leading-snug">
          {spec.detail}
        </p>
        {spec.placeholder && <PlaceholderNote field={spec.id} />}
      </div>
    </div>
  );
}
