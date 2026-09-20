import { paymentStages } from "@/data/venue";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";

export function BookingTerms() {
  return (
    <div>
      <SectionHeading
        eyebrow="Payment"
        title="Booking terms"
        id="booking-terms-heading"
      />

      <div className="space-y-4">
        {paymentStages.map((stage, i) => (
          <div
            key={stage.id}
            className="card p-6 flex items-start gap-5"
          >
            <div className="font-serif text-3xl font-semibold text-gold leading-none shrink-0">
              {stage.percentage}
            </div>
            <div>
              <div className="font-sans text-sm font-bold text-ink">
                {stage.label}
              </div>
              <p className="text-sm text-muted mt-1">
                {stage.description}
              </p>
              {stage.placeholder && <PlaceholderNote field={stage.id} />}
            </div>
            {/* Step indicator */}
            <div className="ml-auto shrink-0 w-8 h-8 rounded-full border-2 border-gold/30 flex items-center justify-center">
              <span className="text-xs font-bold text-gold">{i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted italic">
        Final terms confirmed at booking.
      </p>
    </div>
  );
}
