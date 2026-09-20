import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";

export function ClosingCTA() {
  return (
    <section className="relative bg-navy fluting-texture overflow-hidden" data-dark>
      {/* Stage-light glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,164,92,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 py-20 md:py-28 text-center">
        <Reveal>
          <Eyebrow onDark>Ready to Begin?</Eyebrow>
          <h2 className="text-white mt-4">
            Let&apos;s plan your event
          </h2>
          <p className="mt-4 text-white/60 text-lg mx-auto max-w-lg">
            Choose a date, share your requirements, and our team will
            take it from there.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book-now">Book Now</Button>
            <Button variant="ghost" href="/contact">
              Send Enquiry
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
