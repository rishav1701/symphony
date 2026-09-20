import { contactInfo } from "@/data/contact";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/shared/Button";

export function Map() {
  return (
    <div className="space-y-6">
      {/* Map Embed Card */}
      <div className="card overflow-hidden border border-line rounded bg-white">
        <div className="relative w-full h-[280px] md:h-[320px] bg-navy/5">
          <iframe
            src={contactInfo.mapEmbedUrl}
            title="Symphony Auditorium location map"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="p-4 bg-ivory/60 border-t border-line flex items-center justify-between">
          <span className="text-xs text-muted">
            Locate Symphony Auditorium on Google Maps
          </span>
          <Button
            variant="ghost"
            href={contactInfo.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-royal hover:text-navy font-semibold flex items-center gap-1.5 p-0"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Venue Details Card */}
      <div className="card p-6 bg-white border border-line rounded space-y-5">
        <h3 className="font-serif text-xl text-navy font-medium border-b border-line pb-3">
          Venue Information
        </h3>

        <div className="space-y-4 text-sm">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-15 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-ink text-xs uppercase tracking-wider mb-0.5">
                Address
              </p>
              <p className="text-muted leading-relaxed">{contactInfo.address}</p>
              <PlaceholderNote field="Address" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-15 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-ink text-xs uppercase tracking-wider mb-0.5">
                Phone
              </p>
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                className="text-muted hover:text-royal transition-colors"
              >
                {contactInfo.phone}
              </a>
              <PlaceholderNote field="Phone" />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-15 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-ink text-xs uppercase tracking-wider mb-0.5">
                Email
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-muted hover:text-royal transition-colors"
              >
                {contactInfo.email}
              </a>
              <PlaceholderNote field="Email" />
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-15 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-ink text-xs uppercase tracking-wider mb-0.5">
                Visiting Hours
              </p>
              <p className="text-muted">{contactInfo.hours}</p>
              <PlaceholderNote field="Hours" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
