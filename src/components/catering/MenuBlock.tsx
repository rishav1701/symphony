import type { CateringSection } from "@/data/types";
import { VenueImage } from "@/components/shared/VenueImage";
import { Utensils, Info } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

type MenuBlockProps = {
  section: CateringSection;
  index: number;
};

export function MenuBlock({ section, index }: MenuBlockProps) {
  const hasItems = section.items && section.items.length > 0;

  return (
    <Reveal delay={index * 60}>
      <div className="card h-full flex flex-col bg-white border border-line rounded overflow-hidden group hover:border-gold/50 transition-colors">
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-navy/10">
          <VenueImage
            src={section.image}
            alt={section.imageAlt}
            width={600}
            height={375}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-navy font-medium">
              {section.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              {section.description}
            </p>
          </div>

          {/* Menu items list or truthful empty state */}
          <div className="pt-3 border-t border-line">
            {hasItems ? (
              <ul className="space-y-1.5 text-xs text-ink/80">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Utensils className="w-3 h-3 text-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted/80 bg-ivory/80 px-3 py-2 rounded">
                <Info className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="italic">
                  Curated seasonal menu shared on request
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
