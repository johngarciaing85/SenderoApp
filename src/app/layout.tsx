import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SenderoApp — Senderismo en Colombia con guías verificados",
  description:
    "Reservá caminatas con guías verificados en Antioquia y toda Colombia. Pagos seguros, seguro de vida incluido, cupos garantizados. La montaña te está esperando.",
  keywords: [
    "senderismo",
    "Colombia",
    "Antioquia",
    "caminatas",
    "trekking",
    "montaña",
    "guías",
    "aventura",
    "Medellín",
    "Cerro Tusa",
    "Páramo",
    "Guatapé",
  ],
  openGraph: {
    title: "SenderoApp — Senderismo en Colombia",
    description:
      "Reservá caminatas con guías verificados. Pagos seguros. Seguro de vida incluido.",
    type: "website",
    locale: "es_CO",
    siteName: "SenderoApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenderoApp — Senderismo en Colombia",
    description:
      "Reservá caminatas con guías verificados. Pagos seguros. Seguro de vida incluido.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
