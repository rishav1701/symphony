import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CateringSection } from "@/components/catering/CateringSection";
import { ArchImage } from "@/components/shared/ArchImage";
import { Button } from "@/components/shared/Button";
import { getCateringSections } from "@/data/catering";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/shared/Reveal";
import { UtensilsCrossed, Sparkles } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Catering & Dining",
  description:
    "Explore dining arrangements, traditional Kerala Sadya, in-house catering, and multi-cuisine banquets at Symphony Convention Centre.",
  path: "/catering",
});

export default async function CateringPage() {
  const sections = await getCateringSections();

  return (
    <div className="pt-24 md:pt-28">
      {/* Photography-Led Hero Banner */}
      <section className="relative bg-navy fluting-texture text-white py-16 md:py-24 overflow-hidden">
        {/* Stage-light radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200, 169, 110, 0.15), transparent 70%)",
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Catering & Banqueting</span>
              </span>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                Flavours that elevate your grand celebration
              </h1>

              <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
                From traditional banana-leaf Kerala sadyas to contemporary multi-course banquets, Symphony’s dedicated dining halls are designed for seamless hospitality.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  href="/contact?type=catering"
                  className="font-semibold text-sm uppercase tracking-wider"
                >
                  Request a Catering Quote
                </Button>
                <Button
                  variant="ghost"
                  href="/book-now"
                  className="border border-white/20 text-white hover:bg-white/10 text-sm tracking-wider"
                >
                  Check Venue Dates
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <div className="max-w-sm mx-auto lg:max-w-none">
                  <ArchImage
                    src="/images/catering-hero.jpg"
                    alt="Symphony Convention Centre catering and banquet dining arrangement"
                    width={500}
                    height={600}
                    framed
                    className="w-full aspect-[4/5] object-cover shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Catering Options Grid */}
      <section className="section-py bg-ivory/40" aria-labelledby="catering-options-heading">
        <Container>
          <SectionHeading
            eyebrow="Dining Experiences"
            title="Tailored Catering Services"
            description="Every celebration has its unique culinary rhythm. We coordinate with premier Kerala caterers to serve authentic delicacies with impeccable grace."
            id="catering-options-heading"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {sections.map((sec, idx) => (
              <CateringSection key={sec.id} section={sec} index={idx} />
            ))}
          </div>

          {/* Dedicated Quote Card */}
          <div className="mt-16 card p-8 md:p-12 bg-navy text-white text-center rounded border border-gold/30 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 169, 110, 0.12), transparent 70%)",
              }}
            />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-15 text-gold flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light">
                Have specific culinary preferences?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Whether you envision a vegetarian feast, specialized regional delicacies, or a customized buffet format, our team will coordinate a comprehensive quote.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  href="/contact?type=catering"
                  className="px-8 py-3 font-semibold uppercase tracking-wider text-xs"
                >
                  Request a Catering Quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
