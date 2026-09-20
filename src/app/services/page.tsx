import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { getServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/shared/Reveal";
import { Calendar, Eye, CheckCircle2, PartyPopper } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Services & Events",
  description:
    "Discover the event possibilities at Symphony Convention Centre: weddings, receptions, cultural performances, seminars, and corporate events.",
  path: "/services",
});

const steps = [
  {
    step: "01",
    title: "Enquire",
    description: "Check availability online or contact our reservations team.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Visit",
    description: "Tour the auditorium, stage, and banquet halls in person.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Confirm",
    description: "Finalize event date, stage specifications, and booking deposit.",
    icon: CheckCircle2,
  },
  {
    step: "04",
    title: "Celebrate",
    description: "Experience your event supported by our experienced on-site team.",
    icon: PartyPopper,
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-24 md:pt-28">
      {/* Intro Header */}
      <Container className="pt-12 pb-8">
        <SectionHeading
          eyebrow="Services & Event Types"
          title="Staging celebrations and gatherings of every scale"
          description="From grand wedding ceremonies and reception feasts to acoustic cultural performances and corporate conclaves, explore our versatile spaces."
          centered
        />
      </Container>

      {/* Services Feature Alternating Sections */}
      <Container className="pb-16 md:pb-24">
        <div>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>

      {/* "How It Works" Strip */}
      <section className="bg-ivory border-y border-line py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-2">
              The Booking Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">
              How It Works
            </h2>
            <p className="text-muted text-sm mt-3">
              A clear, straightforward pathway from your first inquiry to your event day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <Reveal key={st.step} delay={i * 80}>
                  <div className="card p-6 bg-white border border-line rounded relative hover:border-gold/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl text-gold font-light">
                        {st.step}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gold-15 flex items-center justify-center text-gold">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-serif text-xl text-navy mb-2">
                      {st.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <ClosingCTA />
    </div>
  );
}
