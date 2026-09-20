import { venuePolicies } from "@/data/venue";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/shared/Badge";
import { Reveal } from "@/components/shared/Reveal";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";
import { BookingTerms } from "./BookingTerms";
import {
  Music, Sparkles, ChefHat, Wine, Flame, PawPrint,
} from "lucide-react";
import type { VenuePolicy } from "@/data/types";

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Music, Sparkles, ChefHat, Wine, Flame, PawPrint,
};

function PolicyRow({ policy }: { policy: VenuePolicy }) {
  const Icon = iconMap[policy.icon];

  return (
    <div className="flex items-center justify-between py-3 border-b border-line last:border-b-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={18} className="text-royal shrink-0" />}
        <span className="text-sm font-medium text-ink">
          {policy.rule}
          {policy.placeholder && <PlaceholderNote field={policy.id} />}
        </span>
      </div>
      <Badge status={policy.status} />
    </div>
  );
}

export function VenuePolicies() {
  return (
    <section className="section-py bg-ivory" aria-labelledby="policies-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Policies */}
          <Reveal>
            <SectionHeading
              eyebrow="Venue Policies"
              title="What is allowed"
              id="policies-heading"
            />
            <div className="card p-6 md:p-8">
              {venuePolicies.map((policy) => (
                <PolicyRow key={policy.id} policy={policy} />
              ))}
            </div>
          </Reveal>

          {/* Booking Terms */}
          <Reveal delay={100}>
            <BookingTerms />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
