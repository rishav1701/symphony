import { specifications } from "@/data/venue";
import { SectionHeading } from "./SectionHeading";
import { SpecItem } from "./SpecItem";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type SpecificationsProps = {
  onDark?: boolean;
};

/** Shared specifications grid — used on Home and About pages. */
export function Specifications({ onDark = false }: SpecificationsProps) {
  return (
    <section
      className={`section-py ${onDark ? "bg-navy fluting-texture" : "bg-ivory"}`}
      aria-labelledby="specifications-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Specifications"
            title="Built for events of every scale"
            id="specifications-heading"
            onDark={onDark}
            centered
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {specifications.map((spec, i) => (
            <Reveal key={spec.id} delay={i * 60}>
              <SpecItem spec={spec} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
