import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconMountain = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M2 23 L9 11 L14 17 L19 9 L26 23 Z" />
    <path d="M9 11 L11.5 14.5" opacity="0.5" />
    <path d="M19 9 L22 13" opacity="0.5" />
    <circle cx="21" cy="5" r="1.5" />
  </svg>
);

export const IconCompass = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <circle cx="14" cy="14" r="11" />
    <path d="M14 3 L14 5 M14 23 L14 25 M3 14 L5 14 M23 14 L25 14" />
    <path d="M18.5 9.5 L14 14 L9.5 18.5 L14 14 L18.5 9.5 Z" fill="currentColor" />
  </svg>
);

export const IconShield = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M14 3 L24 7 L24 14 C24 20 19 24 14 26 C9 24 4 20 4 14 L4 7 Z" />
    <path d="M10 14 L13 17 L18 11" />
  </svg>
);

export const IconUsers = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <circle cx="10" cy="10" r="3.5" />
    <circle cx="19" cy="11" r="2.8" />
    <path d="M3 23 C3 18.5 6 16 10 16 C14 16 17 18.5 17 23" />
    <path d="M17 23 C17 20 19 17.5 22 17.5 C24 17.5 25 19 25 20" />
  </svg>
);

export const IconLock = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <rect x="5" y="13" width="18" height="12" rx="2" />
    <path d="M9 13 L9 9 C9 6 11 4 14 4 C17 4 19 6 19 9 L19 13" />
    <circle cx="14" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

export const IconChat = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M4 7 C4 5.5 5 4 7 4 L21 4 C23 4 24 5.5 24 7 L24 17 C24 18.5 23 20 21 20 L10 20 L5 24 L5 20 C4.5 20 4 19 4 17 Z" />
    <circle cx="10" cy="12" r="1" fill="currentColor" />
    <circle cx="14" cy="12" r="1" fill="currentColor" />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const IconPin = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M14 25 C14 25 6 16 6 11 C6 6.5 9.5 3 14 3 C18.5 3 22 6.5 22 11 C22 16 14 25 14 25 Z" />
    <circle cx="14" cy="11" r="3" />
  </svg>
);

export const IconWhatsapp = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M4 24 L6 18.5 C4.5 16 4 13.5 5 11 C6.5 6 11.5 3 16.5 4.5 C21.5 6 24.5 11 23 16 C21.5 21 16.5 24 11.5 22.5 L9.5 22 Z" />
    <path d="M11 11 Q11 14 13 16 Q15 18 17 17" opacity="0.7" />
  </svg>
);

export const IconMoney = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <rect x="3" y="8" width="22" height="14" rx="1.5" />
    <circle cx="14" cy="15" r="3" />
    <path d="M3 12 L25 12 M3 18 L25 18" opacity="0.4" />
  </svg>
);

export const IconGhost = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M5 24 L5 12 C5 7 9 3 14 3 C19 3 23 7 23 12 L23 24 L20 22 L17 24 L14 22 L11 24 L8 22 Z" />
    <circle cx="11" cy="12" r="1" fill="currentColor" />
    <circle cx="17" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const IconHeartShield = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M14 3 L24 7 L24 14 C24 20 19 24 14 26 C9 24 4 20 4 14 L4 7 Z" />
    <path d="M14 19 C14 19 9 16 9 12.5 C9 11 10 10 11.5 10 C12.5 10 13.5 10.8 14 12 C14.5 10.8 15.5 10 16.5 10 C18 10 19 11 19 12.5 C19 16 14 19 14 19 Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const IconQuestion = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <circle cx="14" cy="14" r="11" />
    <path d="M10.5 10.5 C10.5 8 12 7 14 7 C16 7 17.5 8 17.5 10 C17.5 12 14 12.5 14 15.5" />
    <circle cx="14" cy="20" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconShieldHeart = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M14 3 L24 7 L24 14 C24 20 19 24 14 26 C9 24 4 20 4 14 L4 7 Z" />
    <path d="M14 18 C14 18 9.5 15.5 9.5 12.5 C9.5 10.8 10.8 9.8 12 9.8 C13 9.8 13.7 10.3 14 11 C14.3 10.3 15 9.8 16 9.8 C17.2 9.8 18.5 10.8 18.5 12.5 C18.5 15.5 14 18 14 18 Z" />
  </svg>
);

export const IconStethoscope = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M7 3 L7 11 C7 14 9 16 12 16 C15 16 17 14 17 11 L17 3" />
    <path d="M5 3 L9 3 M15 3 L19 3" />
    <path d="M12 16 L12 20 C12 22.5 14 24 16.5 24 C19 24 21 22.5 21 20 L21 17" />
    <circle cx="21" cy="15" r="2" />
  </svg>
);

export const IconHelicopter = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M3 8 L25 8" />
    <path d="M14 8 L14 12" />
    <rect x="8" y="12" width="12" height="6" rx="2" />
    <path d="M20 14 L25 13 L25 17 L20 16" />
    <path d="M10 18 L10 21 M18 18 L18 21" />
    <path d="M7 21 L21 21" />
  </svg>
);

export const IconBackpack = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M10 6 L10 4 C10 2.8 11 2 12 2 L16 2 C17 2 18 2.8 18 4 L18 6" />
    <rect x="6" y="6" width="16" height="19" rx="3" />
    <rect x="9" y="12" width="10" height="6" rx="1" />
    <path d="M9 15 L19 15" opacity="0.5" />
  </svg>
);

export const IconTrophy = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M8 4 L20 4 L20 11 C20 14 17.5 16.5 14 16.5 C10.5 16.5 8 14 8 11 Z" />
    <path d="M8 6 L4 6 L4 9 C4 10.5 5.5 12 7 12" />
    <path d="M20 6 L24 6 L24 9 C24 10.5 22.5 12 21 12" />
    <path d="M14 16.5 L14 21" />
    <path d="M10 24 L18 24 L17 21 L11 21 Z" />
  </svg>
);

export const IconFlag = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    <path d="M5 25 L5 3" />
    <path d="M5 4 L20 4 L17 9 L20 14 L5 14" />
  </svg>
);

/**
 * Dos siluetas caminando juntas — representa "Ellas caminan".
 * Estilo editorial: figuras estilizadas, sin estereotipos de género obvios,
 * solo dos personas en movimiento hacia adelante.
 */
export const IconWomenWalking = ({ className, size = 28 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className} {...base}>
    {/* Figura izquierda */}
    <circle cx="9" cy="5.5" r="2" />
    <path d="M9 7.5 L9 15" />
    <path d="M9 10 L6 13" />
    <path d="M9 10 L12 12.5" />
    <path d="M9 15 L7 22" />
    <path d="M9 15 L11 21" />
    {/* Figura derecha */}
    <circle cx="19" cy="5.5" r="2" />
    <path d="M19 7.5 L19 15" />
    <path d="M19 10 L16 12.5" />
    <path d="M19 10 L22 13" />
    <path d="M19 15 L17 21" />
    <path d="M19 15 L21 22" />
  </svg>
);
