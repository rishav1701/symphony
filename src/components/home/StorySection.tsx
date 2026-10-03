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
                Step into the world of celebrations at Symphony Convention Centre, a convention venue at Pineapple Junction, Punalur, designed to turn every occasion into a beautiful memory.
              </p>
              <p>
                Established in 2019 with 7 years in business and over 250+ weddings celebrated, we effortlessly blend style, space, and comfort. The Main Opera Hall seats 2,100+ and accommodates up to 4,000 floating guests; the separate Mini Opera Hall offers 250+ seating. A separate dining facility and approximately 500 parking capacity serve the venue.
              </p>
              <p>
                From delicious in-house catering to outside catering and decorator freedom, our full power backup and dedicated team take care of every detail.
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
              src="/images/second-image-new.jpeg"
              alt="Interior view of Symphony Convention Centre"
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
