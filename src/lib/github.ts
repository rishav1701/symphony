/**
 * GitHub Contents API — Availability Data Service
 *
 * Reads and writes `availability.json` to a GitHub repository.
 * Uses the GitHub Contents API with SHA-based optimistic locking
 * to prevent concurrent-write conflicts.
 *
 * When GITHUB_TOKEN is not configured, falls back to localStorage
 * for local development / demo.
 */

/* ── Types ──────────────────────────────────────────────── */

export type AvailabilityData = {
  available: string[]; // YYYY-MM-DD
  blocked: string[];   // YYYY-MM-DD
};

export type GitHubFileResponse = {
  sha: string;
  content: string; // base64 encoded
};

/* ── Config ──────────────────────────────────────────────── */

const GITHUB_CONFIG = {
  /** Owner/repo — set via env */
  OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "",
  REPO: process.env.NEXT_PUBLIC_GITHUB_REPO ?? "",
  /** File path inside the repo */
  FILE_PATH: process.env.NEXT_PUBLIC_GITHUB_FILE_PATH ?? "data/availability.json",
  /** Branch to read/write */
  BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH ?? "main",
};

/** Check if GitHub integration is configured */
export function isGitHubConfigured(): boolean {
  return !!(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO);
}

/* ── Mock / localStorage fallback ────────────────────────── */

const STORAGE_KEY = "symphony-availability";

const MOCK_DATA: AvailabilityData = {
  available: [
    "2026-10-03", "2026-10-04", "2026-10-11",
    "2026-10-17", "2026-10-24", "2026-10-25",
    "2026-11-07", "2026-11-08", "2026-11-14",
    "2026-11-15", "2026-11-21", "2026-11-22",
  ],
  blocked: [
    "2026-10-10", "2026-10-31",
    "2026-11-01", "2026-11-25", "2026-11-26",
  ],
};

function getLocalData(): AvailabilityData {
  if (typeof window === "undefined") return MOCK_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AvailabilityData;
  } catch {
    /* ignore */
  }
  return MOCK_DATA;
}

function setLocalData(data: AvailabilityData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ── Public API ──────────────────────────────────────────── */

/** Cached SHA for optimistic locking */
let cachedSha: string | null = null;

/**
 * Fetch current availability data.
 * Uses the Next.js API route proxy when GitHub is configured,
 * otherwise falls back to localStorage.
 */
export async function fetchAvailability(): Promise<AvailabilityData> {
  if (!isGitHubConfigured()) {
    return getLocalData();
  }

  try {
    const res = await fetch("/api/availability", { cache: "no-store" });
    const json = await res.json().catch(() => null);

    if (!res.ok || !json) {
      const errMsg = json?.message || `HTTP ${res.status}`;
      console.warn("GitHub fetch failed:", errMsg, "— falling back to local data");
      return getLocalData();
    }

    if (json.data) {
      cachedSha = json.sha ?? null;
      return json.data;
    }

    return getLocalData();
  } catch (err) {
    console.warn("GitHub fetch exception:", err, "— falling back to local data");
    return getLocalData();
  }
}

/**
 * Save availability data.
 * Uses the Next.js API route proxy when GitHub is configured,
 * otherwise persists to localStorage.
 */
export async function saveAvailability(
  data: AvailabilityData
): Promise<{ ok: boolean; message: string }> {
  // Deduplicate and sort
  const clean: AvailabilityData = {
    available: [...new Set(data.available)].sort(),
    blocked: [...new Set(data.blocked)].sort(),
  };

  if (!isGitHubConfigured()) {
    setLocalData(clean);
    return { ok: true, message: "Saved to local storage (GitHub integration not configured in environment)." };
  }

  try {
    const res = await fetch("/api/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: clean, sha: cachedSha }),
    });

    const body = await res.json().catch(() => null) as { ok?: boolean; message?: string; sha?: string } | null;

    if (!res.ok || !body?.ok) {
      const msg = body?.message || `GitHub error (HTTP ${res.status})`;
      return { ok: false, message: msg };
    }

    if (body.sha) {
      cachedSha = body.sha;
    }

    return { ok: true, message: body.message || "Availability successfully committed to GitHub." };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error";
    return { ok: false, message: `Failed to connect to /api/availability: ${msg}` };
  }
}
