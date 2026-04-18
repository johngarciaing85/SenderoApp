"use client";

import { useCountUp } from "../hooks/useCountUp";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  format?: boolean; // if true, format with thousands separator (es-CO)
}

export default function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  label,
  format = false,
}: AnimatedStatProps) {
  const { ref, value: current } = useCountUp(value);
  const displayed = format ? current.toLocaleString("es-CO") : current;

  return (
    <div className="flex flex-col">
      <span
        ref={ref}
        className="numeral text-[clamp(2rem,4.5vw,3.2rem)] font-medium text-[var(--color-accent)] leading-none tabular-nums"
      >
        {prefix}
        {displayed}
        {suffix}
      </span>
      <span className="text-[0.72rem] font-mono uppercase tracking-widest opacity-50 mt-3 max-w-[180px] leading-relaxed">
        {label}
      </span>
    </div>
  );
}
