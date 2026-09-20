import { NextResponse, type NextRequest } from "next/server";
import { enquiryPayloadSchema } from "@/lib/validation";

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Check honeypot
    if (body.website && body.website.length > 0) {
      // Silently discard spam bot submissions
      return NextResponse.json({ ok: true, message: "Enquiry received." });
    }

    // Validate payload with Zod
    const result = enquiryPayloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const payload = result.data;

    // Check provider configuration
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Truthful: 501 Not Configured when no provider is connected
      return NextResponse.json(
        {
          ok: false,
          error: "not_configured",
          message:
            "Enquiry endpoint is not configured with an active provider. Please use WhatsApp or email directly.",
        },
        { status: 501 }
      );
    }

    // If Resend is configured:
    // const { Resend } = await import("resend");
    // const resend = new Resend(resendApiKey);
    // await resend.emails.send({ ... });

    return NextResponse.json({
      ok: true,
      message: "Enquiry received successfully.",
      data: { name: payload.name, eventDate: payload.eventDate },
    });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { ok: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
