"use client";

import { useState, useEffect, useCallback, useRef, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Check, Lock, Phone } from "lucide-react";
import { clsx } from "clsx";
import { getBookingAvailability } from "@/data/booking";
import type { BookingDay, BookingStatus } from "@/data/types";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateISO,
  isPastDate,
  isToday,
  canNavigateToMonth,
  MONTH_NAMES,
  DAY_NAMES_SHORT,
} from "@/lib/booking";

type BookingCalendarProps = {
  selectedDate: string | null;
  onSelectDate: (date: string, status: BookingStatus) => void;
};

export function BookingCalendar({
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [availability, setAvailability] = useState<BookingDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusedDay, setFocusedDay] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;
    getBookingAvailability(year, month).then((data) => {
      if (!ignore) {
        setAvailability(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, [year, month]);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    const data = await getBookingAvailability(year, month);
    setAvailability(data);
    setLoading(false);
  }, [year, month]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  function getStatus(day: number): BookingStatus {
    const dateStr = formatDateISO(year, month, day);
    const record = availability.find((d) => d.date === dateStr);
    // Dates without a record default to "confirm"
    return record?.status ?? "confirm";
  }

  function handlePrev() {
    if (!canNavigateToMonth(year, month, "prev")) return;
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function handleNext() {
    if (!canNavigateToMonth(year, month, "next")) return;
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function handleToday() {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  function handleDayClick(day: number) {
    const status = getStatus(day);
    if (isPastDate(year, month, day)) return;
    if (status === "booked" || status === "blocked") return;
    const dateStr = formatDateISO(year, month, day);
    onSelectDate(dateStr, status);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!focusedDay) {
      setFocusedDay(1);
      return;
    }

    let newDay = focusedDay;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        newDay = Math.max(1, focusedDay - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        newDay = Math.min(daysInMonth, focusedDay + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        newDay = Math.max(1, focusedDay - 7);
        break;
      case "ArrowDown":
        e.preventDefault();
        newDay = Math.min(daysInMonth, focusedDay + 7);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleDayClick(focusedDay);
        return;
      case "PageUp":
        e.preventDefault();
        handlePrev();
        return;
      case "PageDown":
        e.preventDefault();
        handleNext();
        return;
      default:
        return;
    }

    setFocusedDay(newDay);
  }

  return (
    <div className="card p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy">
          {MONTH_NAMES[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="text-xs font-sans font-semibold text-royal hover:text-navy px-3 py-1.5 border border-line rounded-sm transition-colors"
            aria-label="Go to today"
          >
            Today
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 text-muted hover:text-navy transition-colors"
            aria-label="Refresh availability"
          >
            <RotateCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handlePrev}
            disabled={!canNavigateToMonth(year, month, "prev")}
            className="p-2 text-muted hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canNavigateToMonth(year, month, "next")}
            className="p-2 text-muted hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES_SHORT.map((d, i) => (
          <div
            key={i}
            className="text-center text-xs font-sans font-semibold text-muted py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        ref={gridRef}
        role="grid"
        aria-label={`${MONTH_NAMES[month]} ${year} calendar`}
        className="grid grid-cols-7 gap-1"
        onKeyDown={handleKeyDown}
      >
        {/* Empty cells for offset */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = formatDateISO(year, month, day);
          const status = getStatus(day);
          const past = isPastDate(year, month, day);
          const today = isToday(year, month, day);
          const isSelected = selectedDate === dateStr;
          const isDisabled = past || status === "booked" || status === "blocked";
          const isFocused = focusedDay === day;

          let statusIcon = null;
          let bgClass = "bg-ivory hover:bg-gold-15";
          let textClass = "text-ink";

          if (past) {
            bgClass = "bg-transparent";
            textClass = "text-muted/40";
          } else if (isSelected) {
            bgClass = "bg-navy ring-2 ring-gold";
            textClass = "text-white";
          } else if (status === "available") {
            bgClass = "bg-gold-15 hover:bg-gold-25";
            statusIcon = <Check size={10} className="text-gold" />;
          } else if (status === "booked" || status === "blocked") {
            bgClass = "bg-navy/10";
            textClass = "text-muted";
            statusIcon = <Lock size={10} className="text-muted" />;
          } else if (status === "confirm") {
            bgClass = "border border-line hover:border-gold";
            statusIcon = <Phone size={10} className="text-muted" />;
          }

          return (
            <button
              key={day}
              type="button"
              role="gridcell"
              tabIndex={isFocused ? 0 : -1}
              disabled={isDisabled}
              onClick={() => handleDayClick(day)}
              onFocus={() => setFocusedDay(day)}
              aria-label={`${day} ${MONTH_NAMES[month]}, ${status === "available" ? "available" : status === "booked" || status === "blocked" ? "booked" : "call to confirm"}`}
              aria-selected={isSelected}
              className={clsx(
                "relative aspect-square min-w-[44px] min-h-[44px] rounded-sm flex flex-col items-center justify-center gap-0.5 text-sm font-sans font-medium transition-all duration-200",
                bgClass,
                textClass,
                isDisabled && !past && "cursor-not-allowed",
                past && "cursor-default",
                isFocused && "ring-2 ring-royal ring-offset-1"
              )}
            >
              {day}
              {!past && statusIcon && (
                <span className="absolute bottom-1">{statusIcon}</span>
              )}
              {today && !isSelected && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs font-sans text-muted">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-gold-15 flex items-center justify-center">
            <Check size={8} className="text-gold" />
          </span>
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-navy/10 flex items-center justify-center">
            <Lock size={8} className="text-muted" />
          </span>
          Booked / Blocked
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm border border-line flex items-center justify-center">
            <Phone size={8} className="text-muted" />
          </span>
          Call to confirm
        </div>
      </div>

      <p className="mt-4 text-xs text-muted italic">
        Availability shown is indicative until confirmed by our team.
      </p>
    </div>
  );
}
