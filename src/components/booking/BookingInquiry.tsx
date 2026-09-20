"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, MessageCircle, Mail } from "lucide-react";
import { clsx } from "clsx";
import { bookingFormSchema, type BookingFormData } from "@/lib/validation";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { buildBookingMailto } from "@/lib/email";
import { formatDateDisplay } from "@/lib/booking";
import { eventTypes } from "@/data/events";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { BookingStatus } from "@/data/types";

type BookingInquiryProps = {
  selectedDate: string | null;
  dateStatus: BookingStatus | null;
};

export function BookingInquiry({
  selectedDate,
  dateStatus,
}: BookingInquiryProps) {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    mode: "onBlur",
  });

  const isDateSelected = !!selectedDate;
  const canSubmit = isDateSelected && isValid;

  function handleWhatsApp() {
    if (!selectedDate) return;
    const data = getValues();
    const url = buildBookingWhatsAppUrl({
      date: formatDateDisplay(selectedDate),
      name: data.name,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      guestCount: data.guestCount,
    });
    window.open(url, "_blank", "noopener");
  }

  function handleEmail() {
    if (!selectedDate) return;
    const data = getValues();
    const mailto = buildBookingMailto({
      date: formatDateDisplay(selectedDate),
      name: data.name,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      guestCount: data.guestCount,
    });
    window.location.assign(mailto);
    setEmailSent(true);
  }

  return (
    <div className="card p-6 md:p-8 lg:sticky lg:top-24">
      <Eyebrow>Booking Inquiry</Eyebrow>

      {/* Date display */}
      {isDateSelected ? (
        <div className="mt-4">
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-navy">
            {formatDateDisplay(selectedDate)}
          </h3>
          {dateStatus && (
            <span
              className={clsx(
                "badge mt-2",
                dateStatus === "available" && "badge--allowed",
                dateStatus === "confirm" && "badge--on-request"
              )}
            >
              {dateStatus === "available" ? "Available" : "Call to confirm"}
            </span>
          )}
          {dateStatus === "confirm" && (
            <p className="mt-2 text-xs text-muted italic">
              This date needs to be confirmed. Send your enquiry and we&apos;ll
              get back to you.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-6 text-center py-12">
          <CalendarDays size={48} className="mx-auto text-line mb-4" />
          <h3 className="font-serif text-xl text-navy">Select a date</h3>
          <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
            Available dates open a quick inquiry form. Send your details through
            WhatsApp or email to confirm the booking.
          </p>
        </div>
      )}

      {/* Form */}
      {isDateSelected && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 space-y-4"
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="bk-name" className="block text-sm font-semibold text-ink mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="bk-name"
              type="text"
              autoComplete="name"
              className="input"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "bk-name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="bk-name-error" className="input-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="bk-phone" className="block text-sm font-semibold text-ink mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="bk-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="input"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "bk-phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <p id="bk-phone-error" className="input-error" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="bk-email" className="block text-sm font-semibold text-ink mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="bk-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className="input"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "bk-email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="bk-email-error" className="input-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Event Type (optional) */}
          <div>
            <label htmlFor="bk-event-type" className="block text-sm font-semibold text-ink mb-1">
              Event Type
            </label>
            <select id="bk-event-type" className="input" {...register("eventType")}>
              <option value="">Select type (optional)</option>
              {eventTypes.map((et) => (
                <option key={et.id} value={et.label}>
                  {et.label}
                </option>
              ))}
            </select>
          </div>

          {/* Guest Count (optional) */}
          <div>
            <label htmlFor="bk-guests" className="block text-sm font-semibold text-ink mb-1">
              Guest Count
            </label>
            <input
              id="bk-guests"
              type="number"
              inputMode="numeric"
              min="1"
              max="10000"
              className="input"
              placeholder="Approximate number"
              aria-invalid={!!errors.guestCount}
              aria-describedby={errors.guestCount ? "bk-guests-error" : undefined}
              {...register("guestCount")}
            />
            {errors.guestCount && (
              <p id="bk-guests-error" className="input-error" role="alert">
                {errors.guestCount.message}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={handleSubmit(handleWhatsApp)}
              disabled={!canSubmit}
              className="btn btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle size={16} />
              Send WhatsApp
            </button>

            <button
              type="button"
              onClick={handleSubmit(handleEmail)}
              disabled={!canSubmit}
              className="btn btn-secondary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Mail size={16} />
              Send Email
            </button>

            {!canSubmit && isDateSelected && (
              <p className="text-xs text-muted text-center">
                Fill in the required fields to send your enquiry.
              </p>
            )}

            {emailSent && (
              <p className="text-xs text-muted text-center italic">
                Your email app should have opened with your enquiry.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
