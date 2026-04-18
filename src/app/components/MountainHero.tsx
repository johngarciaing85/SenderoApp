"use client";

import { useEffect, useRef } from "react";

/**
 * Multi-layer parallax mountain scene rendered in SVG.
 * Layers move at different speeds on scroll, creating depth.
 * Includes animated clouds/mist and a sun.
 */
export default function MountainHero() {
  const skyRef = useRef<SVGGElement>(null);
  const sunRef = useRef<SVGGElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);
  const mistRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (sunRef.current)
          sunRef.current.setAttribute("transform", `translate(0 ${y * 0.15})`);
        if (farRef.current)
          farRef.current.setAttribute("transform", `translate(0 ${y * 0.08})`);
        if (midRef.current)
          midRef.current.setAttribute("transform", `translate(0 ${y * 0.22})`);
        if (nearRef.current)
          nearRef.current.setAttribute("transform", `translate(0 ${y * 0.38})`);
        if (mistRef.current)
          mistRef.current.setAttribute("transform", `translate(0 ${y * 0.1})`);
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dusk sky */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1208" />
            <stop offset="35%" stopColor="#3a2418" />
            <stop offset="65%" stopColor="#6b3820" />
            <stop offset="85%" stopColor="#c4823a" />
            <stop offset="100%" stopColor="#d4a94a" />
          </linearGradient>

          {/* Sun glow */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde7a8" stopOpacity="1" />
            <stop offset="40%" stopColor="#d4a94a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4a94a" stopOpacity="0" />
          </radialGradient>

          {/* Mountain gradients (farther = more washed out by atmospheric haze) */}
          <linearGradient id="farMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4530" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3a2a1f" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="midMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2d2218" />
            <stop offset="100%" stopColor="#1a1410" />
          </linearGradient>
          <linearGradient id="nearMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#140f0a" />
            <stop offset="100%" stopColor="#0a0705" />
          </linearGradient>

          {/* Mist gradient */}
          <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4a94a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ede6d6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ede6d6" stopOpacity="0" />
          </linearGradient>

          {/* Star field (tiny) */}
          <pattern id="stars" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="18" r="0.7" fill="#ede6d6" opacity="0.7" />
            <circle cx="80" cy="45" r="0.5" fill="#ede6d6" opacity="0.5" />
            <circle cx="140" cy="22" r="0.6" fill="#ede6d6" opacity="0.6" />
            <circle cx="175" cy="80" r="0.4" fill="#ede6d6" opacity="0.4" />
            <circle cx="45" cy="90" r="0.5" fill="#ede6d6" opacity="0.5" />
            <circle cx="110" cy="110" r="0.7" fill="#ede6d6" opacity="0.7" />
            <circle cx="30" cy="150" r="0.4" fill="#ede6d6" opacity="0.4" />
            <circle cx="165" cy="170" r="0.6" fill="#ede6d6" opacity="0.5" />
          </pattern>
        </defs>

        {/* ===== SKY ===== */}
        <g ref={skyRef}>
          <rect width="1600" height="900" fill="url(#skyGrad)" />
          {/* Stars only in upper portion */}
          <rect width="1600" height="380" fill="url(#stars)" opacity="0.6" />
        </g>

        {/* ===== SUN + GLOW ===== */}
        <g ref={sunRef}>
          <circle cx="1050" cy="520" r="260" fill="url(#sunGlow)" />
          <circle cx="1050" cy="520" r="55" fill="#fde7a8" opacity="0.95" />
          <circle cx="1050" cy="520" r="35" fill="#fff6e0" />
        </g>

        {/* ===== BIRDS (tiny, animated via CSS) ===== */}
        <g opacity="0.5" className="animate-float" style={{ animationDuration: "6s" }}>
          <path
            d="M 380 260 q 8 -6 16 0 q 8 -6 16 0"
            stroke="#ede6d6"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 420 280 q 6 -4 12 0 q 6 -4 12 0"
            stroke="#ede6d6"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 350 300 q 5 -3 10 0 q 5 -3 10 0"
            stroke="#ede6d6"
            strokeWidth="0.9"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ===== FARTHEST MOUNTAINS (slowest) ===== */}
        <g ref={farRef}>
          <path
            d="M 0 620
               L 120 520 L 230 580 L 340 470 L 460 560 L 580 490 L 700 570
               L 820 460 L 960 550 L 1080 480 L 1220 560 L 1360 500 L 1480 580 L 1600 520
               L 1600 900 L 0 900 Z"
            fill="url(#farMtn)"
          />
        </g>

        {/* ===== MID MOUNTAINS ===== */}
        <g ref={midRef}>
          <path
            d="M 0 720
               L 90 620 L 180 700 L 280 560 L 400 680 L 520 590 L 640 700
               L 760 580 L 900 690 L 1040 600 L 1180 700 L 1320 610 L 1460 690 L 1600 630
               L 1600 900 L 0 900 Z"
            fill="url(#midMtn)"
          />
          {/* Snow caps on mid peaks */}
          <path
            d="M 280 560 l 18 24 l -12 6 l -20 -10 Z
               M 760 580 l 22 28 l -14 8 l -22 -12 Z
               M 1320 610 l 18 22 l -12 6 l -20 -8 Z"
            fill="#ede6d6"
            opacity="0.18"
          />
        </g>

        {/* ===== MIST LAYER ===== */}
        <g ref={mistRef}>
          <rect y="640" width="1600" height="160" fill="url(#mistGrad)" />
        </g>

        {/* ===== NEAR MOUNTAINS (fastest, darkest) ===== */}
        <g ref={nearRef}>
          <path
            d="M 0 820
               L 70 760 L 150 810 L 230 730 L 330 800 L 430 740 L 540 810
               L 650 720 L 780 800 L 900 740 L 1020 810 L 1150 730 L 1280 800 L 1420 750 L 1600 810
               L 1600 900 L 0 900 Z"
            fill="url(#nearMtn)"
          />
        </g>

        {/* ===== TINY HIKER SILHOUETTE ===== */}
        <g transform="translate(640 795)" opacity="0.85">
          {/* Backpack + body */}
          <path
            d="M 0 0 l -2 -6 l 1 -5 l 3 -2 l 3 2 l 1 5 l -2 6 Z"
            fill="#0a0705"
          />
          {/* Head */}
          <circle cx="1" cy="-13" r="2" fill="#0a0705" />
          {/* Trekking pole */}
          <line
            x1="5"
            y1="-2"
            x2="9"
            y2="6"
            stroke="#0a0705"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
