"use client";

import { useState } from "react";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

type AdminAuthProps = {
  onAuthenticated: () => void;
};

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (username.trim() === "admin" && password === "symphony") {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("symphony_admin_auth", "true");
        }
        onAuthenticated();
      } else {
        setError("Invalid username or password");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login-screen">
      <div className={`admin-login-card ${shake ? "admin-shake" : ""}`}>
        {/* Brand Header */}
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <span className="admin-login-icon">♪</span>
          </div>
          <h1 className="admin-login-title">Symphony Admin</h1>
          <p className="admin-login-subtitle">
            Sign in to manage auditorium availability & calendar
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="admin-login-error" role="alert">
            <span className="admin-login-error-dot" />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-username" className="admin-login-label">
              Username
            </label>
            <div className="admin-login-input-wrap">
              <User className="admin-login-field-icon" size={18} />
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoFocus
                autoComplete="username"
                className="admin-login-input"
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password" className="admin-login-label">
              Password
            </label>
            <div className="admin-login-input-wrap">
              <Lock className="admin-login-field-icon" size={18} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="admin-login-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admin-login-toggle-pw"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-login-btn"
          >
            {loading ? (
              <span className="admin-btn-spinner" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security footer */}
        <div className="admin-login-footer">
          <ShieldCheck size={14} className="text-gold" />
          <span>Restricted administrative access</span>
        </div>
      </div>
    </div>
  );
}
