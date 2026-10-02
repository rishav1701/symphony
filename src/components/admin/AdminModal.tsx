"use client";

import { useEffect, useRef, useCallback } from "react";

type AdminModalProps = {
  title: string;
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export function AdminModal({ title, message, type, onClose }: AdminModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    closeRef.current?.focus();

    // Scroll-lock
    document.body.classList.add("scroll-locked");
    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, []);

  const handleClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog) dialog.close();
    onClose();
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  return (
    <dialog
      ref={dialogRef}
      className="admin-modal-dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <div className="admin-modal">
        <div className={`admin-modal-icon admin-modal-icon--${type}`}>
          {type === "success" ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          )}
        </div>
        <h3 id="modal-title" className="admin-modal-title">{title}</h3>
        <p id="modal-message" className="admin-modal-message">{message}</p>
        <button
          ref={closeRef}
          className="admin-btn admin-btn--primary admin-modal-close"
          onClick={handleClose}
        >
          OK
        </button>
      </div>
    </dialog>
  );
}
