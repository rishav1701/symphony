import { Hero } from "@/components/home/Hero";
import { VenueStats } from "@/components/home/VenueStats";
import { StorySection } from "@/components/home/StorySection";
import { Specifications } from "@/components/shared/Specifications";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VenueStats />
      <StorySection />
      <Specifications />
      <ServicesTeaser />
      <ClosingCTA />
    </>
  );
}
