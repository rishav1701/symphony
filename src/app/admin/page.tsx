"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { LogOut, ExternalLink, ShieldCheck, Database, GitBranch } from "lucide-react";
import { fetchAvailability, saveAvailability, isGitHubConfigured } from "@/lib/github";
import type { AvailabilityData } from "@/lib/github";
import { dedupeSort, expandRange, todayISO } from "@/lib/dateUtils";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { DateRangeForm } from "@/components/admin/DateRangeForm";
import { AvailabilityList } from "@/components/admin/AvailabilityList";
import { CalendarPreview } from "@/components/admin/CalendarPreview";
import { AdminModal } from "@/components/admin/AdminModal";
import "@/styles/admin.css";

type StatusBanner = {
  message: string;
  type: "info" | "success" | "error" | "loading";
};

export default function AdminPage() {
  /* ── Auth State ────────────────────────────────────────── */
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("symphony_admin_auth") === "true";
      setIsAuthenticated(isAuth);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("symphony_admin_auth");
    }
    setIsAuthenticated(false);
  };

  /* ── Data State ────────────────────────────────────────── */
  const [data, setData] = useState<AvailabilityData>({ available: [], blocked: [] });
  const [hasChanges, setHasChanges] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [banner, setBanner] = useState<StatusBanner | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(true);

  /* ── Stats ────────────────────────────────────────────── */
  const totalDates = data.available.length + data.blocked.length;
  const futureDates = [...data.available, ...data.blocked].filter((d) => d >= todayISO()).length;

  /* ── Load Data ────────────────────────────────────────── */
  const loadData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setBanner({ message: "Loading availability data…", type: "loading" });
    try {
      const result = await fetchAvailability();
      setData({
        available: dedupeSort(result.available),
        blocked: dedupeSort(result.blocked),
      });
      setHasChanges(false);
      setBanner({ message: "Data loaded successfully", type: "success" });
      setTimeout(() => setBanner(null), 3000);
    } catch {
      setBanner({ message: "Failed to load availability data", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  /* ── Add Date Range ───────────────────────────────────── */
  const handleAddRange = (from: string, to: string, status: "available" | "blocked") => {
    const dates = expandRange(from, to);
    const opposite: "available" | "blocked" = status === "available" ? "blocked" : "available";

    setData((prev) => ({
      ...prev,
      // Remove conflicts from opposite list
      [opposite]: prev[opposite].filter((d) => !dates.includes(d)),
      // Add to target list
      [status]: dedupeSort([...prev[status], ...dates]),
    }));

    setHasChanges(true);
    setBanner({ message: `Added ${dates.length} date(s) as ${status}`, type: "success" });
    setTimeout(() => setBanner(null), 3000);
  };

  /* ── Row Operations ───────────────────────────────────── */
  const handleChangeStatus = (dateStr: string, oldStatus: "available" | "blocked", newStatus: "available" | "blocked") => {
    if (oldStatus === newStatus) return;
    setData((prev) => ({
      ...prev,
      [oldStatus]: prev[oldStatus].filter((d) => d !== dateStr),
      [newStatus]: dedupeSort([...prev[newStatus], dateStr]),
    }));
    setHasChanges(true);
  };

  const handleChangeDate = (oldDate: string, newDate: string, status: "available" | "blocked") => {
    if (oldDate === newDate) return;
    setData((prev) => ({
      ...prev,
      [status]: dedupeSort(prev[status].map((d) => (d === oldDate ? newDate : d))),
    }));
    setHasChanges(true);
  };

  const handleRemoveDate = (dateStr: string, status: "available" | "blocked") => {
    setData((prev) => ({
      ...prev,
      [status]: prev[status].filter((d) => d !== dateStr),
    }));
    setHasChanges(true);
  };

  /* ── Save Changes ─────────────────────────────────────── */
  const handleSave = async () => {
    setBanner({ message: "Saving changes to GitHub…", type: "loading" });
    try {
      const result = await saveAvailability(data);
      if (result.ok) {
        setHasChanges(false);
        setModal({ title: "Changes Saved", message: result.message, type: "success" });
      } else {
        setModal({ title: "Save Failed", message: result.message, type: "error" });
      }
      setBanner(null);
    } catch {
      setModal({ title: "Error", message: "An unexpected error occurred while saving.", type: "error" });
      setBanner(null);
    }
  };

  /* ── Reload ───────────────────────────────────────────── */
  const handleReload = async () => {
    if (hasChanges) {
      const confirmed = window.confirm("You have unsaved changes. Discard them and reload?");
      if (!confirmed) return;
    }
    await loadData();
  };

  /* ── Auth Loading Screen ──────────────────────────────── */
  if (isAuthenticated === null) {
    return (
      <div className="admin-login-screen">
        <div className="admin-btn-spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  /* ── Login Gate ────────────────────────────────────────── */
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  /* ── Authenticated Admin Workspace ─────────────────────── */
  return (
    <>
      {/* Dedicated Standalone Admin Topbar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="admin-brand">
              <span className="admin-brand-icon">♪</span>
              <span className="admin-brand-text">Symphony Admin Console</span>
            </Link>
            {isGitHubConfigured() ? (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GitHub Synced
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/80 text-amber-400 border border-amber-800/60">
                <Database size={12} />
                Local Storage Mode
              </span>
            )}
          </div>

          <div className="admin-topbar-right">
            <div className="admin-user-badge">
              <span className="admin-user-avatar">A</span>
              <span>admin</span>
            </div>

            <Link href="/" target="_blank" className="admin-nav-link flex items-center gap-1.5">
              <span>Public Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              title="Sign out of Admin Console"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="admin-content">
        {/* Page Header & Summary Metrics */}
        <div className="admin-page-header">
          <div className="admin-page-header-text">
            <h1 className="admin-title">Availability Manager</h1>
            <p className="admin-subtitle">
              Configure dates, status blocks, and event availability.
              {isGitHubConfigured() ? (
                <span className="text-emerald-400 ml-2 font-mono text-xs">
                  (repo: {process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "rishav1701"}/{process.env.NEXT_PUBLIC_GITHUB_REPO ?? "symphony"})
                </span>
              ) : null}
            </p>
          </div>
          <div className="admin-stats">
            <div className="admin-stat">
              <span className="admin-stat-value">{data.available.length}</span>
              <span className="admin-stat-label">Available</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-value">{data.blocked.length}</span>
              <span className="admin-stat-label">Blocked</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-value">{futureDates}</span>
              <span className="admin-stat-label">Upcoming</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-value">{totalDates}</span>
              <span className="admin-stat-label">Total</span>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {banner && (
          <div
            className={`admin-banner admin-banner--${banner.type}`}
            role="status"
            aria-live="polite"
          >
            {banner.type === "loading" && (
              <span className="admin-spinner" aria-hidden="true" />
            )}
            {banner.message}
          </div>
        )}

        {/* Action Toolbar */}
        <div className="admin-actions">
          <button
            className="admin-btn admin-btn--primary"
            onClick={handleSave}
            disabled={!hasChanges || loading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Save to GitHub
            {hasChanges && <span className="admin-changes-dot" />}
          </button>
          <button
            className="admin-btn admin-btn--secondary"
            onClick={handleReload}
            disabled={loading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            Reload
          </button>
          <button
            className="admin-btn admin-btn--ghost"
            onClick={() => setShowCalendar((prev) => !prev)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {showCalendar ? "Hide Calendar" : "Show Calendar Preview"}
          </button>
        </div>

        {/* Main Grid Workspace */}
        <div className="admin-grid">
          {/* Left Column — Form + List */}
          <div className="admin-grid-left">
            <DateRangeForm onAdd={handleAddRange} />
            <AvailabilityList
              data={data}
              onChangeStatus={handleChangeStatus}
              onChangeDate={handleChangeDate}
              onRemoveDate={handleRemoveDate}
            />
          </div>

          {/* Right Column — Interactive Calendar Preview */}
          {showCalendar && (
            <div className="admin-grid-right">
              <CalendarPreview data={data} />
            </div>
          )}
        </div>
      </div>

      {/* Dialog Modal */}
      {modal && (
        <AdminModal
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
