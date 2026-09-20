import { venueStats } from "@/data/venue";
import { StatCard } from "@/components/shared/StatCard";
import { Container } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";

export function VenueStats() {
  return (
    <section
      id="venue-highlights"
      className="relative -mt-16 z-10 pb-16"
      aria-labelledby="venue-highlights-heading"
    >
      <Container>
        <h2 id="venue-highlights-heading" className="sr-only">
          Venue Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {venueStats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 60}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
