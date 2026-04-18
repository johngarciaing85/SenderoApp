"use client";

interface MarqueeProps {
  items: string[];
  speed?: number; // in seconds for full loop
  separator?: string;
}

/**
 * Infinite horizontal marquee. Duplicates content for seamless loop.
 * Uses CSS-only animation via `animate-marquee` keyframe.
 */
export default function Marquee({
  items,
  speed = 35,
  separator = "✦",
}: MarqueeProps) {
  // Render the list twice so translateX(-50%) creates a seamless loop
  const row = (
    <div className="flex items-center gap-10 px-5 shrink-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-10 shrink-0">
          <span className="font-display italic text-[clamp(2rem,5vw,4rem)] font-light text-[var(--color-text)] whitespace-nowrap">
            {item}
          </span>
          <span className="text-[var(--color-accent)] text-2xl opacity-60 select-none">
            {separator}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden py-8 border-y border-[var(--color-border)]"
      aria-hidden="true"
    >
      <div
        className="marquee-wrapper animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {row}
        {row}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />
    </div>
  );
}
