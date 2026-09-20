"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { navLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap + body scroll lock
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.classList.add("scroll-locked");
      // Focus close button after animation
      setTimeout(() => closeRef.current?.focus(), 100);
    } else {
      document.body.classList.remove("scroll-locked");
      previousFocusRef.current?.focus();
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [open]);

  // Esc key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={clsx(
        "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
        open ? "visible" : "invisible pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className={clsx(
          "absolute inset-0 bg-navy/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={clsx(
          "absolute top-0 right-0 bottom-0 w-full max-w-sm bg-navy fluting-texture",
          "flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        data-dark
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-gold"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-2" aria-label="Mobile navigation">
          {navLinks
            .filter((l) => !l.isCta)
            .map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-serif text-3xl font-medium text-white/80 hover:text-white py-2 no-underline transition-all duration-300",
                    isActive && "text-gold hover:text-gold"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateX(0)" : "translateX(24px)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
        </nav>

        {/* Bottom section */}
        <div className="p-8 space-y-4 border-t border-white/10">
          <Link
            href="/book-now"
            className="btn btn-primary w-full justify-center"
          >
            Book Now
          </Link>

          <div className="flex gap-4 justify-center">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-sans transition-colors"
              aria-label="Call Symphony Convention Centre"
            >
              <Phone size={16} />
              <span>Call</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-sans transition-colors"
              aria-label="WhatsApp Symphony Convention Centre"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
