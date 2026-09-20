"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clsx } from "clsx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms for staggered reveals */
  delay?: number;
};

/**
 * Scroll-triggered reveal animation wrapper.
 * Uses IntersectionObserver. Respects prefers-reduced-motion
 * via CSS (see globals.css).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={clsx("reveal", className)}>
      {children}
    </div>
  );
}
