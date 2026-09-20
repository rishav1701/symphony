"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/shared/Button";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal headline lines
    const timer = setTimeout(() => {
      headlineRef.current?.querySelectorAll(".hero-line-inner").forEach((el, i) => {
        setTimeout(() => el.classList.add("revealed"), i * 80);
      });
      // Fade in supporting content
      setTimeout(() => {
        contentRef.current?.classList.add("revealed");
      }, 400);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-navy">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Placeholder hero image (gradient) — replace with real image */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-royal/50 to-navy" />
        {/* Navy overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,42,67,0.88) 0%, rgba(16,42,67,0.55) 50%, rgba(16,42,67,0.4) 100%)",
          }}
        />
        {/* Fluting texture */}
        <div className="absolute inset-0 fluting-texture" />
      </div>

      {/* Stage-light glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,164,92,0.3) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <Container className="relative z-10 py-32 md:py-40">
        <div className="max-w-3xl" data-dark>
          <Eyebrow onDark>Your Moment. Our Stage.</Eyebrow>

          <div ref={headlineRef} className="mt-6">
            <h1 className="text-white">
              <span className="hero-line">
                <span className="hero-line-inner">Where Every</span>
              </span>
              <span className="hero-line">
                <span className="hero-line-inner">Moment Takes</span>
              </span>
              <span className="hero-line">
                <span className="hero-line-inner">
                  Center{" "}
                  <span className="text-gold">Stage</span>
                </span>
              </span>
            </h1>
          </div>

          <div ref={contentRef} className="reveal">
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
              Premier banquet halls and convention centre in Chemmanthoor, Punalur, Kollam.
              Established in 2018 with 250+ weddings hosted, offering up to 3,000 capacity,
              3 AC guest rooms, and dedicated 500 car parking.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/book-now">Book Now</Button>
              <Button variant="ghost" href="#venue-highlights">
                Explore the Venue
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
