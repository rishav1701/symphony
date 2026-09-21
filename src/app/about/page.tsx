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
    "Learn about Symphony Convention Centre in Chemmanthoor, Punalur, Kollam: 8+ years in business, 250+ weddings, banquet halls, and comprehensive amenities.",
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
                Our Story · Est. 2018 · 8+ Years · 250+ Weddings
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-navy font-normal leading-tight">
                A stunning banquet & convention venue designed for unforgettable memories.
              </h1>
            </div>

            {/* Serif Pull-Quote */}
            <blockquote className="border-l-2 border-gold pl-6 py-2 my-8">
              <p className="font-serif text-xl md:text-2xl text-royal italic leading-snug">
                “Known for warm hospitality and modern amenities, Symphony Convention Centre effortlessly blends style, space, and comfort to give your event the ideal setting it deserves.”
              </p>
            </blockquote>

            <div className="space-y-5 text-muted leading-relaxed text-base font-sans">
              <p>
                Step into the world of celebrations at Symphony Convention Centre, a premier banquet hall in Chemmanthoor, Punalur, Kollam. Established in 2018, our venue has proudly hosted over 250 weddings, heartfelt family milestones, and refined corporate gatherings across more than 8 years in business.
              </p>
              <p>
                The property features versatile spaces to suit celebrations of any scale: our grand Symphony Convention Centre Main Hall accommodating 2,000 seated and 3,000 floating guests, alongside the elegant Symphony Mini Hall designed for intimate gatherings of 150 seated and 200 floating guests. With dedicated parking for 500 vehicles, every guest arrives, celebrates, and departs without hassle.
              </p>
              <p>
                For hosts and families, the venue offers 3 air-conditioned and Non-AC guest rooms maintained for a comfortable stay experience, plus a private bridal suite perfect for those pre-ceremony moments of calm and final touch-ups. Elegant indoor spaces and beautifully curated outdoor areas can be tailored to fit your exact celebration theme.
              </p>
              <p>
                Guests particularly praise the dining experience, with in-house catering blending local and global flavors with justified, transparent pricing per plate, alongside full freedom for outside catering and decorators. Complete electricity backup, professional stage lighting, top-notch sound systems, and professional DJ setups ensure your event stays high-energy and uninterrupted till the very end.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Arch-Masked Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="max-w-md mx-auto lg:max-w-none">
                <ArchImage
                  src="/images/about-auditorium-arch.jpg"
                  alt="Symphony Convention Centre main hall and stage"
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
