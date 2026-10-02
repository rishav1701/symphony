"use client";

import { useState, useRef, useEffect } from "react";
import type { AvailabilityData } from "@/lib/github";
import { buildMonthMatrix, DAY_LABELS, MONTH_NAMES, isDateToday } from "@/lib/dateUtils";

type CalendarPreviewProps = {
  data: AvailabilityData;
};

type DateStatus = "available" | "blocked" | "unlisted";

export function CalendarPreview({ data }: CalendarPreviewProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function getStatus(dateStr: string): DateStatus {
    if (data.available.includes(dateStr)) return "available";
    if (data.blocked.includes(dateStr)) return "blocked";
    return "unlisted";
  }

  function handlePrev() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function handleNext() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }

  const matrix = buildMonthMatrix(year, month);

  // Count statuses for this month
  const monthDates = matrix.flat().filter((c) => c.date !== null);
  const availableCount = monthDates.filter((c) => c.date && getStatus(c.date) === "available").length;
  const blockedCount = monthDates.filter((c) => c.date && getStatus(c.date) === "blocked").length;

  return (
    <section
      ref={containerRef}
      className="admin-card admin-calendar-card"
      aria-labelledby="calendar-heading"
    >
      {/* Header */}
      <div className="admin-calendar-header">
        <button
          className="admin-btn-icon"
          onClick={handlePrev}
          aria-label="Previous month"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="admin-calendar-title-wrap">
          <h2 id="calendar-heading" className="admin-calendar-title">
            {MONTH_NAMES[month]} {year}
          </h2>
          <div className="admin-calendar-counts">
            <span className="admin-cal-count admin-cal-count--available">{availableCount} available</span>
            <span className="admin-cal-count admin-cal-count--blocked">{blockedCount} blocked</span>
          </div>
        </div>
        <button
          className="admin-btn-icon"
          onClick={handleNext}
          aria-label="Next month"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="admin-cal-day-labels">
        {DAY_LABELS.map((label) => (
          <div key={label} className="admin-cal-day-label">{label}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="admin-cal-grid" role="grid" aria-label={`${MONTH_NAMES[month]} ${year} calendar`}>
        {matrix.map((row, ri) => (
          <div key={ri} className="admin-cal-row" role="row">
            {row.map((cell, ci) => {
              if (cell.day === null || cell.date === null) {
                return <div key={`empty-${ri}-${ci}`} className="admin-cal-cell admin-cal-cell--empty" role="gridcell" />;
              }

              const status = getStatus(cell.date);
              const today = isDateToday(cell.date);

              return (
                <div
                  key={cell.date}
                  className={`admin-cal-cell admin-cal-cell--${status} ${today ? "admin-cal-cell--today" : ""}`}
                  role="gridcell"
                  aria-label={`${cell.day} ${MONTH_NAMES[month]}, ${status}`}
                >
                  <span className="admin-cal-day">{cell.day}</span>
                  <span className={`admin-cal-badge admin-cal-badge--${status}`}>
                    {status === "available" ? "Avail" : status === "blocked" ? "Block" : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="admin-cal-legend">
        <div className="admin-cal-legend-item">
          <span className="admin-cal-legend-dot admin-cal-legend-dot--available" />
          Available
        </div>
        <div className="admin-cal-legend-item">
          <span className="admin-cal-legend-dot admin-cal-legend-dot--blocked" />
          Blocked
        </div>
        <div className="admin-cal-legend-item">
          <span className="admin-cal-legend-dot admin-cal-legend-dot--unlisted" />
          Unlisted
        </div>
      </div>
    </section>
  );
}
