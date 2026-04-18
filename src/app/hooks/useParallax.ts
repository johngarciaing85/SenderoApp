"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a parallax translate to a ref'd element based on window scroll.
 * @param speed - multiplier; 0.3 moves slower than scroll, 1 moves with scroll
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.35
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let latestY = window.scrollY;

    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView =
        rect.bottom > -200 && rect.top < window.innerHeight + 200;
      if (inView) {
        const offset = (latestY - (el.offsetTop || 0)) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}
