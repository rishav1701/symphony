import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArchImage } from "@/components/shared/ArchImage";
import { Specifications } from "@/components/shared/Specifications";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { facilities } from "@/data/venue";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/shared/Reveal";
import { Check } from "lucide-react";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Symphony Auditorium: our architectural vision, acoustics, comprehensive event specifications, and premier amenities in Kerala.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Editorial Story Section */}
      <Container className="pt-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-2">
                Our Story
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-navy font-normal leading-tight">
                A space created for celebrations, gatherings and unforgettable occasions.
              </h1>
            </div>

            {/* Serif Pull-Quote */}
            <blockquote className="border-l-2 border-gold pl-6 py-2 my-8">
              <p className="font-serif text-xl md:text-2xl text-royal italic leading-snug">
                “We conceived Symphony as a concert hall for life&apos;s milestones — where architecture, acoustics, and hospitality unite in resonant harmony.”
              </p>
            </blockquote>

            <div className="space-y-5 text-muted leading-relaxed text-base font-sans">
              <p>
                Rooted in Kerala&apos;s rich tradition of community celebration and cultural gatherings, Symphony Auditorium was envisioned as a modern sanctuary of hospitality. Every architectural contour — from the coffered acoustic ceilings to the gracious proscenium arch — was sculpted to honor the magnitude of life&apos;s defining ceremonies.
              </p>
              <p>
                Whether welcoming over fifteen hundred guests for an opulent wedding or hosting a nuanced classical musical concert, the auditorium balances vast, pillar-free sightlines with a welcoming atmosphere. High-efficiency climate control maintains seamless comfort through every season, while intelligent stage illumination highlights the joy on every face.
              </p>
              <p>
                Our philosophy centers on quiet operational excellence. Dedicated green rooms, private bridal suites, expansive multi-tier dining halls, and extensive on-site parking ensure hosts and families can immerse themselves wholly in their milestone day without distraction.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Arch-Masked Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="max-w-md mx-auto lg:max-w-none">
                <ArchImage
                  src="/images/about-auditorium.jpg"
                  alt="Symphony Auditorium proscenium stage and hall"
                  width={600}
                  height={800}
                  framed
                  className="w-full aspect-[3/4] object-cover shadow-lg"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Specifications Grid (Shared Component) */}
      <Specifications onDark />

      {/* Facilities Checklist Section */}
      <section className="section-py bg-white border-b border-line" aria-labelledby="facilities-heading">
        <Container>
          <SectionHeading
            eyebrow="Amenities & Infrastructure"
            title="Comprehensive Venue Facilities"
            description="Purpose-built infrastructure designed to provide complete comfort for hosts, guests, and event production teams."
            id="facilities-heading"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mt-8">
            {facilities.map((facility, i) => (
              <Reveal key={facility.id} delay={i * 40}>
                <div className="flex items-center gap-3.5 p-4 rounded card bg-ivory/50 border border-line/70 hover:border-gold/50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-sm font-medium text-ink">
                    {facility.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-6">
            <PlaceholderNote field="Facilities checklist" />
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <ClosingCTA />
    </div>
  );
}
