import { getServices } from "@/data/services";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { VenueImage } from "@/components/shared/VenueImage";

export async function ServicesTeaser() {
  const services = await getServices();
  const featured = services.slice(0, 3);

  return (
    <section className="section-py bg-ivory" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Events we host"
            description="From weddings to conferences, Symphony is equipped for a wide range of event types."
            id="services-heading"
            centered
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <Reveal key={service.id} delay={i * 80}>
              <div className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <VenueImage
                    src={service.image}
                    alt={service.imageAlt}
                    width={400}
                    height={300}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Reveal>
            <Button variant="secondary" href="/services">
              View all services
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
