"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navLinks } from "@/data/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isSolid = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-250",
          isSolid
            ? "bg-white border-b border-line shadow-sm"
            : "bg-transparent",
          isSolid ? "h-[72px]" : "h-[88px]"
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <div className="container-sym h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            {/* Score-line glyph */}
            <div className="flex flex-col gap-[2px] w-4" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={clsx(
                    "block h-px transition-colors duration-250",
                    isSolid ? "bg-gold" : "bg-gold/70"
                  )}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span
                className={clsx(
                  "font-serif text-xl md:text-2xl font-semibold tracking-[0.18em] leading-none transition-colors duration-250",
                  isSolid ? "text-navy" : "text-white"
                )}
              >
                SYMPHONY
              </span>
              <span
                className={clsx(
                  "font-sans text-[9px] font-medium tracking-[0.25em] uppercase leading-none mt-1 transition-colors duration-250",
                  isSolid ? "text-muted" : "text-white/70"
                )}
              >
                AUDITORIUM
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.isCta) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="btn btn-primary ml-4 text-xs py-3 px-6"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative px-4 py-2 font-sans text-xs font-semibold tracking-[0.1em] uppercase no-underline transition-colors duration-250",
                    isSolid
                      ? isActive
                        ? "text-navy"
                        : "text-ink/70 hover:text-navy"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            className={clsx(
              "lg:hidden flex flex-col gap-[5px] p-2 -mr-2",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              isSolid ? "focus-visible:outline-royal" : "focus-visible:outline-gold"
            )}
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={clsx(
                  "block w-6 h-0.5 transition-colors duration-250",
                  isSolid ? "bg-navy" : "bg-white"
                )}
              />
            ))}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
