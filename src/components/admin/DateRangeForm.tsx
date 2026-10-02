"use client";

import { useState } from "react";
import { todayISO } from "@/lib/dateUtils";

type DateRangeFormProps = {
  onAdd: (from: string, to: string, status: "available" | "blocked") => void;
};

export function DateRangeForm({ onAdd }: DateRangeFormProps) {
  const today = todayISO();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState<"available" | "blocked">("available");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from) return;
    const effectiveTo = to || from;
    onAdd(from, effectiveTo, status);
    setFrom("");
    setTo("");
  }

  return (
    <section className="admin-card" aria-labelledby="range-form-heading">
      <div className="admin-card-header">
        <h2 id="range-form-heading" className="admin-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Date Range
        </h2>
        <p className="admin-card-desc">
          Select a date range and status to add multiple dates at once.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-range-form">
        <div className="admin-range-fields">
          <div className="admin-field">
            <label htmlFor="range-from" className="admin-label">From Date</label>
            <input
              id="range-from"
              type="date"
              className="admin-input"
              value={from}
              min={today}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="range-to" className="admin-label">
              To Date <span className="admin-optional">(optional)</span>
            </label>
            <input
              id="range-to"
              type="date"
              className="admin-input"
              value={to}
              min={from || today}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="range-status" className="admin-label">Status</label>
            <select
              id="range-status"
              className="admin-input admin-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as "available" | "blocked")}
            >
              <option value="available">✓ Available</option>
              <option value="blocked">✕ Blocked</option>
            </select>
          </div>
        </div>

        <button type="submit" className="admin-btn admin-btn--accent" disabled={!from}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add {to && from !== to ? "Range" : "Date"}
        </button>
      </form>
    </section>
  );
}
