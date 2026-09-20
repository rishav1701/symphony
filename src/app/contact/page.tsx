import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { Map } from "@/components/contact/Map";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Symphony Auditorium for wedding bookings, cultural events, corporate conferences, and hall tours.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialType = resolvedSearchParams.type;

  return (
    <div className="pt-24 md:pt-28">
      <Container className="section-py">
        <SectionHeading
          eyebrow="Contact & Location"
          title="Plan your celebration with our dedicated team"
          description="Have questions about dates, seating layouts, audio-visual capabilities, or catering? Send us an enquiry or visit the venue."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-10">
          {/* Left Column: Enquiry Form */}
          <div className="lg:col-span-7 order-1">
            <div className="mb-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold block mb-1">
                Enquiry Form
              </span>
              <h2 className="font-serif text-2xl text-navy">
                Tell us about your event
              </h2>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-muted">Loading form...</div>}>
              <ContactForm initialType={initialType} />
            </Suspense>
          </div>

          {/* Right Column: Map & Venue Details */}
          <div className="lg:col-span-5 order-2">
            <Map />
          </div>
        </div>
      </Container>
    </div>
  );
}
