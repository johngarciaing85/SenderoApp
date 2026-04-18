"use client";

import { useEffect } from "react";

/**
 * Hook that adds 'is-visible' class to elements with class 'reveal',
 * 'reveal-scale', or 'reveal-stagger' when they enter the viewport.
 * Uses IntersectionObserver for performance.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-scale, .reveal-stagger"
    );

    if (!("IntersectionObserver" in window)) {
      // Fallback: show everything
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
