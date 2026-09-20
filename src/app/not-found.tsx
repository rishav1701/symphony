import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { ScoreLines } from "@/components/shared/ScoreLines";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy fluting-texture text-white relative overflow-hidden py-24">
      {/* Radial champagne glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200, 169, 110, 0.15), transparent 70%)",
        }}
      />

      <Container className="relative z-10 text-center max-w-xl mx-auto space-y-6">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold block">
          404 — Not Found
        </span>

        <h1 className="font-serif text-4xl md:text-6xl text-white font-normal">
          Page Not Found
        </h1>

        <div className="flex justify-center my-4">
          <ScoreLines count={3} className="w-24 text-gold/60" />
        </div>

        <p className="text-white/70 text-base leading-relaxed">
          The page you are looking for does not exist or may have moved. Explore our venue or contact our team directly.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button variant="primary" href="/">
            Return to Home
          </Button>
          <Button
            variant="ghost"
            href="/book-now"
            className="border border-white/20 text-white hover:bg-white/10"
          >
            Check Availability
          </Button>
        </div>
      </Container>
    </div>
  );
}
