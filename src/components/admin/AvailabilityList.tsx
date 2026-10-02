"use client";

import { useMemo, useState } from "react";
import type { AvailabilityData } from "@/lib/github";
import { formatDisplay, isPast, todayISO } from "@/lib/dateUtils";

type AvailabilityListProps = {
  data: AvailabilityData;
  onChangeStatus: (dateStr: string, oldStatus: "available" | "blocked", newStatus: "available" | "blocked") => void;
  onChangeDate: (oldDate: string, newDate: string, status: "available" | "blocked") => void;
  onRemoveDate: (dateStr: string, status: "available" | "blocked") => void;
};

type ListEntry = {
  date: string;
  status: "available" | "blocked";
};

type FilterMode = "all" | "available" | "blocked" | "upcoming" | "past";

export function AvailabilityList({
  data,
  onChangeStatus,
  onChangeDate,
  onRemoveDate,
}: AvailabilityListProps) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [search, setSearch] = useState("");

  /* ── Build sorted list ────────────────────────────────── */
  const allEntries: ListEntry[] = useMemo(() => {
    const entries: ListEntry[] = [
      ...data.available.map((d) => ({ date: d, status: "available" as const })),
      ...data.blocked.map((d) => ({ date: d, status: "blocked" as const })),
    ];
    entries.sort((a, b) => a.date.localeCompare(b.date));
    return entries;
  }, [data]);

  /* ── Filter ───────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const today = todayISO();
    return allEntries.filter((e) => {
      if (filter === "available" && e.status !== "available") return false;
      if (filter === "blocked" && e.status !== "blocked") return false;
      if (filter === "upcoming" && e.date < today) return false;
      if (filter === "past" && e.date >= today) return false;
      if (search && !e.date.includes(search) && !formatDisplay(e.date).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allEntries, filter, search]);

  return (
    <section className="admin-card" aria-labelledby="list-heading">
      <div className="admin-card-header">
        <h2 id="list-heading" className="admin-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Date Entries
          <span className="admin-count">{filtered.length}</span>
        </h2>
      </div>

      {/* Toolbar */}
      <div className="admin-list-toolbar">
        <div className="admin-filter-tabs">
          {(["all", "available", "blocked", "upcoming", "past"] as FilterMode[]).map((f) => (
            <button
              key={f}
              className={`admin-filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="admin-search-wrap">
          <svg className="admin-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            className="admin-search"
            placeholder="Search dates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search dates"
          />
        </div>
      </div>

      {/* List */}
      <div className="admin-list" role="list">
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <p>No dates match the current filter.</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={`${entry.date}-${entry.status}`}
              className={`admin-list-row ${isPast(entry.date) ? "admin-list-row--past" : ""}`}
              role="listitem"
            >
              <div className="admin-list-row-date">
                <input
                  type="date"
                  className="admin-input admin-input--compact"
                  value={entry.date}
                  onChange={(e) => onChangeDate(entry.date, e.target.value, entry.status)}
                  aria-label={`Date for ${formatDisplay(entry.date)}`}
                />
                <span className="admin-list-row-display">{formatDisplay(entry.date)}</span>
              </div>

              <div className="admin-list-row-controls">
                <select
                  className={`admin-status-select admin-status-select--${entry.status}`}
                  value={entry.status}
                  onChange={(e) =>
                    onChangeStatus(
                      entry.date,
                      entry.status,
                      e.target.value as "available" | "blocked"
                    )
                  }
                  aria-label={`Status for ${formatDisplay(entry.date)}`}
                >
                  <option value="available">Available</option>
                  <option value="blocked">Blocked</option>
                </select>

                <button
                  className="admin-btn-icon admin-btn-icon--danger"
                  onClick={() => onRemoveDate(entry.date, entry.status)}
                  aria-label={`Remove ${formatDisplay(entry.date)}`}
                  title="Remove date"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
