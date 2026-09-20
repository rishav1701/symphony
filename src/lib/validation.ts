import { z } from "zod";

/** Indian phone number pattern: allows +91, spaces, dashes */
const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  eventDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: "Event date cannot be in the past" }
    ),
  eventType: z.string().optional(),
  guestCount: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val, 10);
        return !isNaN(num) && num > 0 && num <= 10000;
      },
      { message: "Guest count must be between 1 and 10,000" }
    ),
  message: z
    .string()
    .max(1000, "Message must be under 1,000 characters")
    .optional(),
  /** Honeypot field for basic spam protection */
  website: z.string().max(0, "This field should be empty").optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  email: z.string().email("Please enter a valid email address"),
  eventType: z.string().optional(),
  guestCount: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = parseInt(val, 10);
        return !isNaN(num) && num > 0 && num <= 10000;
      },
      { message: "Guest count must be between 1 and 10,000" }
    ),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

/** Server-side enquiry validation (used by API route) */
export const enquiryPayloadSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  guestCount: z.number().int().positive().max(10000).optional(),
  message: z.string().max(1000).optional(),
});
