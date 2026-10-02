/**
 * API Route — /api/availability
 *
 * Proxies availability data through the GitHub Contents API.
 * The GitHub PAT (GITHUB_TOKEN) stays server-side and is never
 * exposed to the client.
 *
 * GET  → Fetch availability.json from the repo
 * PUT  → Update availability.json (SHA-locked)
 */

import { NextRequest, NextResponse } from "next/server";

/* ── Config ──────────────────────────────────────────────── */

function getConfig() {
  const token = (process.env.GITHUB_TOKEN ?? "").trim().replace(/^["']|["']$/g, "");
  const owner = (process.env.NEXT_PUBLIC_GITHUB_OWNER ?? "").trim().replace(/^["']|["']$/g, "");
  const repo = (process.env.NEXT_PUBLIC_GITHUB_REPO ?? "").trim().replace(/^["']|["']$/g, "");
  const filePath = (process.env.NEXT_PUBLIC_GITHUB_FILE_PATH ?? "data/availability.json").trim().replace(/^["']|["']$/g, "");
  const branch = (process.env.NEXT_PUBLIC_GITHUB_BRANCH ?? "master").trim().replace(/^["']|["']$/g, "");

  return { token, owner, repo, filePath, branch };
}

function getApiUrl(owner: string, repo: string, filePath: string): string {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
}

function getHeaders(token: string): HeadersInit {
  return {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "Symphony-Auditorium-App",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/* ── GET ─────────────────────────────────────────────────── */

export async function GET() {
  const { token, owner, repo, filePath, branch } = getConfig();

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { ok: false, message: "GitHub integration not configured. Please set GITHUB_TOKEN, NEXT_PUBLIC_GITHUB_OWNER, and NEXT_PUBLIC_GITHUB_REPO in .env.local" },
      { status: 503 }
    );
  }

  try {
    const url = `${getApiUrl(owner, repo, filePath)}?ref=${encodeURIComponent(branch)}`;
    const res = await fetch(url, {
      headers: getHeaders(token),
      cache: "no-store",
    });

    if (res.status === 404) {
      const errJson = await res.json().catch(() => ({}));
      if (errJson.message && errJson.message.toLowerCase().includes("no commit found")) {
        return NextResponse.json(
          { ok: false, message: `Branch "${branch}" not found on repository ${owner}/${repo}. Please check NEXT_PUBLIC_GITHUB_BRANCH (e.g. "master" vs "main").` },
          { status: 404 }
        );
      }
      // File doesn't exist yet on valid branch — return empty data with no SHA
      return NextResponse.json({
        data: { available: [], blocked: [] },
        sha: null,
      });
    }

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const msg = errJson.message || `HTTP ${res.status}`;
      console.error("GitHub GET error:", res.status, msg);
      return NextResponse.json(
        { ok: false, message: `GitHub API (${res.status}): ${msg}` },
        { status: res.status === 401 || res.status === 403 ? 401 : 502 }
      );
    }

    const json = await res.json();
    const content = Buffer.from(json.content, "base64").toString("utf-8");
    const data = JSON.parse(content);

    return NextResponse.json({
      data,
      sha: json.sha,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch availability data";
    console.error("GitHub GET exception:", err);
    return NextResponse.json(
      { ok: false, message: `GitHub fetch error: ${message}` },
      { status: 500 }
    );
  }
}

/* ── PUT ─────────────────────────────────────────────────── */

export async function PUT(request: NextRequest) {
  const { token, owner, repo, filePath, branch } = getConfig();

  if (!token || !owner || !repo) {
    return NextResponse.json(
      { ok: false, message: "GitHub integration not configured. Please set GITHUB_TOKEN, NEXT_PUBLIC_GITHUB_OWNER, and NEXT_PUBLIC_GITHUB_REPO in .env.local" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { data, sha } = body;

    if (!data || (!Array.isArray(data.available) && !Array.isArray(data.blocked))) {
      return NextResponse.json(
        { ok: false, message: "Invalid payload: expected { data: { available: [], blocked: [] }, sha }" },
        { status: 400 }
      );
    }

    const contentStr = JSON.stringify(data, null, 2) + "\n";
    const contentBase64 = Buffer.from(contentStr).toString("base64");

    const payload: Record<string, unknown> = {
      message: `Update availability — ${new Date().toISOString()}`,
      content: contentBase64,
      branch: branch,
    };

    // Include SHA for update (omit for create)
    if (sha) {
      payload.sha = sha;
    }

    const res = await fetch(getApiUrl(owner, repo, filePath), {
      method: "PUT",
      headers: {
        ...getHeaders(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      return NextResponse.json(
        { ok: false, message: "Conflict: The file was modified by someone else. Please reload and try again." },
        { status: 409 }
      );
    }

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const msg = errJson.message || `HTTP ${res.status}`;
      console.error("GitHub PUT error:", res.status, msg);
      return NextResponse.json(
        { ok: false, message: `GitHub API (${res.status}): ${msg}` },
        { status: res.status }
      );
    }

    const result = await res.json();

    return NextResponse.json({
      ok: true,
      message: "Availability saved to GitHub",
      sha: result.content?.sha ?? null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save availability data";
    console.error("GitHub PUT exception:", err);
    return NextResponse.json(
      { ok: false, message: `GitHub save error: ${message}` },
      { status: 500 }
    );
  }
}
