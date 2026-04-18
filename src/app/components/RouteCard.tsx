"use client";

import Image from "next/image";
import { useState } from "react";

export interface Route {
  name: string;
  region: string;
  difficulty: "Baja" | "Media" | "Alta";
  elevation: string;
  distance: string;
  duration: string;
  date?: string;
  /** Tipo de grupo. "mujeres" muestra el chip de Ellas caminan. */
  groupType?: "mixta" | "mujeres";
  image: string;
  description: string;
}

interface RouteCardProps {
  route: Route;
  index: number;
}

const difficultyStyles: Record<Route["difficulty"], string> = {
  Baja: "bg-[var(--color-accent-green)]/15 text-[var(--color-accent-green)] border-[var(--color-accent-green)]/30",
  Media: "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-[var(--color-accent)]/30",
  Alta: "bg-[var(--color-accent-clay)]/15 text-[var(--color-accent-clay)] border-[var(--color-accent-clay)]/30",
};

// Elegant fallback gradient shown if an image URL fails to load.
// This way the card never breaks: even if Unsplash removes a photo, the
// page keeps looking intentional.
function ImageFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#2d2218] via-[#1a1410] to-[#0a0705] flex items-center justify-center">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        className="opacity-20"
        aria-hidden="true"
      >
        <path
          d="M5 65 L22 40 L32 52 L48 30 L60 48 L75 65 Z"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <circle
          cx="58"
          cy="18"
          r="4"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function RouteCard({ route, index }: RouteCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] transition-all duration-500 hover:border-[var(--color-border-hover)] hover:-translate-y-2">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {imageFailed ? (
          <ImageFallback />
        ) : (
          <Image
            src={route.image}
            alt={route.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover img-dim transition-transform duration-[1800ms] ease-out group-hover:scale-110"
            priority={index < 3}
            onError={() => setImageFailed(true)}
          />
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Index number (big, top-left) */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2 items-start">
          <span className="numeral text-xs tracking-[0.2em] text-[var(--color-accent)] opacity-80">
            N°{String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[0.58rem] font-mono uppercase tracking-widest px-2 py-1 rounded-full border bg-[var(--color-accent-green)]/15 text-[var(--color-accent-green)] border-[var(--color-accent-green)]/30 backdrop-blur-sm"
            title="Seguro médico y evacuación incluido en la reserva"
          >
            <svg width="10" height="10" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3 L24 7 L24 14 C24 20 19 24 14 26 C9 24 4 20 4 14 L4 7 Z" />
              <path d="M10 14 L13 17 L18 11" />
            </svg>
            Seguro
          </span>
          {route.groupType === "mujeres" && (
            <span
              className="inline-flex items-center gap-1.5 text-[0.58rem] font-mono uppercase tracking-widest px-2 py-1 rounded-full border bg-[var(--color-accent-clay)]/15 text-[var(--color-accent-clay)] border-[var(--color-accent-clay)]/35 backdrop-blur-sm"
              title="Salida solo para mujeres — lideradas por guías mujeres"
            >
              <svg width="10" height="10" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="5.5" r="2" />
                <path d="M9 7.5 L9 15 M9 15 L7 22 M9 15 L11 21 M9 10 L6 13 M9 10 L12 12.5" />
                <circle cx="19" cy="5.5" r="2" />
                <path d="M19 7.5 L19 15 M19 15 L17 21 M19 15 L21 22 M19 10 L16 12.5 M19 10 L22 13" />
              </svg>
              Ellas caminan
            </span>
          )}
        </div>

        {/* Difficulty badge (top-right) */}
        <div className="absolute top-5 right-5 z-10">
          <span
            className={`text-[0.62rem] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${difficultyStyles[route.difficulty]}`}
          >
            {route.difficulty}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="eyebrow opacity-80">{route.region}</p>
            {route.date && (
              <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-[var(--color-text)] border border-white/15 backdrop-blur-sm">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10 L21 10 M8 3 L8 7 M16 3 L16 7" />
                </svg>
                {route.date}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl font-medium leading-tight mb-3 text-[var(--color-text)]">
            {route.name}
          </h3>

          <p className="text-[0.8rem] opacity-70 leading-relaxed mb-4 line-clamp-2">
            {route.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 pt-3 border-t border-white/10">
            <Stat label="Alt." value={route.elevation} />
            <div className="w-px h-7 bg-white/15" />
            <Stat label="Dist." value={route.distance} />
            <div className="w-px h-7 bg-white/15" />
            <Stat label="Tiempo" value={route.duration} />
          </div>
        </div>
      </div>

      {/* Hover arrow indicator */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-20">
        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="#0d0f0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.58rem] font-mono uppercase tracking-widest opacity-50 mb-0.5">
        {label}
      </p>
      <p className="text-[0.78rem] font-medium">{value}</p>
    </div>
  );
}
