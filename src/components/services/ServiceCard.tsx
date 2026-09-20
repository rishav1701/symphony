import { clsx } from "clsx";
import type { Service } from "@/data/types";
import { ArchImage } from "@/components/shared/ArchImage";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const isReversed = index % 2 === 1;
  const displayNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center py-12 md:py-16 border-b border-line last:border-b-0",
        isReversed ? "lg:grid-flow-dense" : ""
      )}
    >
      {/* Image Column */}
      <div
        className={clsx(
          "lg:col-span-6",
          isReversed ? "lg:col-start-7" : "lg:col-start-1"
        )}
      >
        <Reveal>
          <div className="relative max-w-lg mx-auto lg:max-w-none">
            <ArchImage
              src={service.image}
              alt={service.imageAlt}
              width={700}
              height={500}
              framed={index % 2 === 0}
              className="w-full aspect-[4/3] object-cover shadow-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>

      {/* Text Column */}
      <div
        className={clsx(
          "lg:col-span-6 flex flex-col justify-center",
          isReversed ? "lg:col-start-1" : "lg:col-start-7"
        )}
      >
        <Reveal delay={100}>
          <div className="space-y-4 max-w-lg">
            {/* Number in serif */}
            <span className="font-serif text-3xl md:text-4xl text-gold font-light tracking-wide block">
              {displayNumber}
            </span>

            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy font-normal leading-tight">
              {service.title}
            </h3>

            <p className="text-muted text-base leading-relaxed">
              {service.description}
            </p>

            {service.cta && (
              <div className="pt-2">
                <Button
                  variant="secondary"
                  href={service.cta.href}
                  className="inline-flex"
                >
                  {service.cta.label}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
