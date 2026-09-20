import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArchImage } from "@/components/shared/ArchImage";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";

export function StorySection() {
  return (
    <section className="section-py bg-white" aria-labelledby="story-heading">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="A venue designed around the moments that matter"
              id="story-heading"
            />

            <div className="space-y-4 text-ink/80 leading-relaxed">
              <p>
                Symphony Auditorium was conceived as a space where architecture
                serves celebration. Every proportion — from ceiling height to
                stage depth — is calibrated for the events that take place here.
              </p>
              <p>
                The name reflects an intent: to bring together light, sound, and
                space in a way that supports the occasion without overshadowing
                it. This is not a repurposed hall. It was built from the ground
                up as an event venue.
              </p>
              <p>
                Located in Kerala, the auditorium accommodates gatherings of
                many scales — from seated conferences to full wedding
                celebrations — with the infrastructure, accessibility, and
                service standards each format requires.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="secondary" href="/about">
                Read our story
              </Button>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={150}>
            <ArchImage
              src="/images/about.jpg"
              alt="Interior view of Symphony Auditorium"
              width={600}
              height={750}
              withFrame
              className="mx-auto max-w-md"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
