"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingInquiry } from "@/components/booking/BookingInquiry";
import type { BookingStatus } from "@/data/types";

function BookNowContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlDate = searchParams.get("date");
  const validUrlDate =
    urlDate && /^\d{4}-\d{2}-\d{2}$/.test(urlDate) ? urlDate : null;

  const [selectedDate, setSelectedDate] = useState<string | null>(validUrlDate);
  const [dateStatus, setDateStatus] = useState<BookingStatus | null>(null);

  const effectiveDate = selectedDate ?? validUrlDate;

  function handleSelectDate(date: string, status: BookingStatus) {
    setSelectedDate(date);
    setDateStatus(status);
    // Sync to URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", date);
    router.replace(`/book-now?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
      {/* Calendar — wider */}
      <div className="lg:col-span-3">
        <BookingCalendar
          selectedDate={effectiveDate}
          onSelectDate={handleSelectDate}
        />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-2">
        <BookingInquiry
          selectedDate={effectiveDate}
          dateStatus={dateStatus}
        />
      </div>
    </div>
  );
}

export default function BookNowPage() {
  return (
    <div className="pt-24 md:pt-28">
      <Container className="section-py">
        <SectionHeading
          eyebrow="Book Now"
          title="Check availability and send your enquiry"
          description="Select a date to see its status. Available dates open a quick inquiry form."
          centered
        />

        <Suspense
          fallback={
            <div className="py-20 text-center text-muted">
              Loading booking calendar...
            </div>
          }
        >
          <BookNowContent />
        </Suspense>
      </Container>
    </div>
  );
}
