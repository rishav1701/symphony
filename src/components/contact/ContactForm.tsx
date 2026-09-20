"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { eventTypes } from "@/data/events";
import { buildMailto } from "@/lib/email";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/shared/Button";
import { MessageCircle, Mail, AlertCircle, CheckCircle } from "lucide-react";

type ContactFormProps = {
  initialType?: string;
};

export function ContactForm({ initialType }: ContactFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "prepared" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(
    null
  );

  // Match initialType to eventTypes queryValue
  const matchedEvent = eventTypes.find((et) => et.queryValue === initialType);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      eventType: matchedEvent ? matchedEvent.label : "",
      guestCount: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    if (matchedEvent) {
      setValue("eventType", matchedEvent.label);
    }
  }, [matchedEvent, setValue]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          guestCount: data.guestCount ? Number(data.guestCount) : undefined,
        }),
      });

      const json = await res.json();
      setSubmittedData(data);

      if (res.status === 501 || json.error === "not_configured") {
        // Truthful: backend email server is not configured yet
        setSubmissionStatus("prepared");
        setStatusMessage(
          "Enquiry prepared! Since our automated email server is being configured, please send your enquiry directly via WhatsApp or your email client below to guarantee immediate delivery."
        );
      } else if (res.ok) {
        setSubmissionStatus("success");
        setStatusMessage(
          "Thank you! Your enquiry has been received. Our team will contact you shortly."
        );
      } else {
        setSubmissionStatus("error");
        setStatusMessage(json.message || "Something went wrong. Please reach out via WhatsApp or phone.");
      }
    } catch {
      setSubmittedData(data);
      setSubmissionStatus("prepared");
      setStatusMessage(
        "Enquiry prepared! Please send your details via WhatsApp or email below."
      );
    }
  };

  return (
    <div className="card p-6 md:p-8 bg-white border border-line rounded">
      {submissionStatus === "success" ? (
        <div className="text-center py-8 space-y-4" role="status" aria-live="polite">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-navy">Enquiry Submitted</h3>
          <p className="text-muted text-sm max-w-md mx-auto">{statusMessage}</p>
          <Button
            variant="secondary"
            onClick={() => {
              setSubmissionStatus("idle");
              setSubmittedData(null);
            }}
          >
            Submit Another Enquiry
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
            >
              Full Name <span className="text-crimson">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
              placeholder="e.g. Rahul Menon"
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-crimson text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Grid: Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
              >
                Email Address <span className="text-crimson">*</span>
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
                placeholder="rahul@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-crimson text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
              >
                Phone Number <span className="text-crimson">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
                placeholder="+91 98470 12345"
                {...register("phone")}
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="text-crimson text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Grid: Event Date & Event Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="eventDate"
                className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
              >
                Preferred Event Date
              </label>
              <input
                id="eventDate"
                type="date"
                aria-invalid={errors.eventDate ? "true" : "false"}
                aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
                {...register("eventDate")}
              />
              {errors.eventDate && (
                <p id="eventDate-error" role="alert" className="text-crimson text-xs mt-1">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="eventType"
                className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
              >
                Event Type
              </label>
              <select
                id="eventType"
                className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
                {...register("eventType")}
              >
                <option value="">Select an event type</option>
                {eventTypes.map((et) => (
                  <option key={et.id} value={et.label}>
                    {et.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest Count */}
          <div>
            <label
              htmlFor="guestCount"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
            >
              Estimated Guest Count
            </label>
            <input
              id="guestCount"
              type="number"
              inputMode="numeric"
              min="1"
              max="10000"
              aria-invalid={errors.guestCount ? "true" : "false"}
              aria-describedby={errors.guestCount ? "guestCount-error" : undefined}
              className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors"
              placeholder="e.g. 800"
              {...register("guestCount")}
            />
            {errors.guestCount && (
              <p id="guestCount-error" role="alert" className="text-crimson text-xs mt-1">
                {errors.guestCount.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink mb-1.5"
            >
              Message / Specific Requirements
            </label>
            <textarea
              id="message"
              rows={4}
              maxLength={1000}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full px-4 py-3 rounded border border-line bg-ivory/50 text-ink text-base focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-colors resize-y"
              placeholder="Tell us about your schedule, catering needs, stage setup or any special requests..."
              {...register("message")}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-crimson text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Status Banner when Prepared / Not Configured */}
          {submissionStatus === "prepared" && submittedData && (
            <div className="p-4 bg-gold-15 border border-gold/40 rounded space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-xs text-ink/80 leading-relaxed">
                  {statusMessage}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Symphony Auditorium, I would like to enquire about hosting an event.\n\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nEmail: ${submittedData.email}\nEvent Date: ${submittedData.eventDate || "—"}\nEvent Type: ${submittedData.eventType || "—"}\nGuest Count: ${submittedData.guestCount || "—"}\nMessage: ${submittedData.message || "—"}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-xs py-2 px-4 justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Send via WhatsApp
                </a>

                <a
                  href={buildMailto({
                    name: submittedData.name,
                    phone: submittedData.phone,
                    email: submittedData.email,
                    eventDate: submittedData.eventDate,
                    eventType: submittedData.eventType,
                    guestCount: submittedData.guestCount
                      ? Number(submittedData.guestCount)
                      : undefined,
                    message: submittedData.message,
                  })}
                  className="btn btn-secondary text-xs py-2 px-4 justify-center"
                >
                  <Mail className="w-4 h-4 mr-1.5" />
                  Send via Email App
                </a>
              </div>
            </div>
          )}

          {submissionStatus === "error" && (
            <div className="p-3 bg-red-50 border border-crimson/30 rounded text-crimson text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={submissionStatus === "submitting"}
            className="w-full justify-center text-sm tracking-wider uppercase font-semibold py-3.5"
          >
            {submissionStatus === "submitting" ? "Processing..." : "Submit Enquiry"}
          </Button>
        </form>
      )}
    </div>
  );
}
