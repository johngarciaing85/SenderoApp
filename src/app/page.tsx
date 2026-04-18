"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WaitlistForm from "./components/WaitlistForm";
import MountainHero from "./components/MountainHero";
import Marquee from "./components/Marquee";
import RouteCard, { Route } from "./components/RouteCard";
import AnimatedStat from "./components/AnimatedStat";
import {
  IconMountain,
  IconCompass,
  IconShield,
  IconUsers,
  IconLock,
  IconWhatsapp,
  IconMoney,
  IconGhost,
  IconQuestion,
  IconShieldHeart,
  IconStethoscope,
  IconHelicopter,
  IconBackpack,
  IconTrophy,
  IconFlag,
  IconWomenWalking,
} from "./components/Icons";
import { useReveal } from "./hooks/useReveal";

const SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTkxkDyAxlKd6_X7Gsq-ZUICC2-rZYaFNpTCy7TiRByI3pjA/viewform?usp=header";

// ============================================
// DATA
// ============================================

const problems = [
  {
    Icon: IconWhatsapp,
    title: "WhatsApp re-enredado",
    desc: "Grupos de 200 personas, mensajes perdidos, nadie sabe si hay cupo o no.",
  },
  {
    Icon: IconMoney,
    title: "Pagos sin respaldo",
    desc: "Nequi a una cuenta personal, sin factura. Si se cancela la salida, adiós a la plata.",
  },
  {
    Icon: IconQuestion,
    title: "Sin verificación",
    desc: "¿El guía tiene RNT? ¿Primeros auxilios? ¿Seguro? Toca creerle sin saber.",
  },
  {
    Icon: IconGhost,
    title: "Cero transparencia",
    desc: "No sabes quién más va, qué incluye, ni qué tan pesada es la ruta.",
  },
];

const features = [
  {
    Icon: IconCompass,
    title: "Explora rutas",
    desc: "Filtra por región, dificultad, precio y fecha. Encuentras tu próximo plan de montaña en segundos.",
  },
  {
    Icon: IconShield,
    title: "Guías verificados",
    desc: "RNT activo, certificación de primeros auxilios, reseñas reales de otros caminantes.",
  },
  {
    Icon: IconUsers,
    title: "Sabes quién va",
    desc: "Mira los perfiles de los parceros que van al mismo plan. Hacés amigos, no solo turismo.",
  },
  {
    Icon: IconLock,
    title: "Pago seguro",
    desc: "Tarjeta, PSE o Nequi. Con factura, política de cancelación y reembolso de verdad.",
  },
  {
    Icon: IconShieldHeart,
    title: "Seguro incluido",
    desc: "Cobertura médica y de evacuación en cada reserva. Sin costo extra, sin letra menuda.",
  },
  {
    Icon: IconWomenWalking,
    title: "Ellas caminan",
    desc: "Salidas solo para mujeres, lideradas por guías mujeres. Porque caminar acompañada también es un derecho.",
  },
];

const guideSteps = [
  {
    num: "01",
    title: "Crea tu perfil",
    desc: "Sube tus certificaciones, fotos y experiencia. Nosotros verificamos tu RNT.",
  },
  {
    num: "02",
    title: "Publica tus salidas",
    desc: "Fecha, ruta, precio, cupos, qué incluye. En 3 minutos está montado.",
  },
  {
    num: "03",
    title: "Los caminantes reservan",
    desc: "Llegan solos. Pagan en la plataforma. Vos ves tu panel en tiempo real.",
  },
  {
    num: "04",
    title: "Recibe tu plata",
    desc: "Liquidación semanal a tu cuenta bancaria. Con factura, todo legal.",
  },
];

// Real mountain/hiking photos from Unsplash
// ============================================
// RUTAS — paisajes y cerros de Antioquia.
// Las imágenes son referencias de Unsplash de paisajes andinos/cafeteros
// similares. TODO: reemplazar con fotos propias de cada cerro cuando
// estén disponibles (buscar en @cerrotusa, guías locales, fotógrafos paisas).
// ============================================
const routes: Route[] = [
  {
    name: "Cerro Tusa",
    region: "Venecia · Suroeste",
    difficulty: "Alta",
    elevation: "1,850",
    distance: "6.5 km",
    duration: "4 a 6 horas",
    date: "Próximamente",
    description:
      "La pirámide natural más grande del mundo. Un clásico paisa con vistas al cañón del Cauca y a los cafetales del Suroeste.",
    // TODO: reemplazar con foto real del Cerro Tusa (pirámide triangular característica)
    image:
      "/images/rutas/CerroTusa.jpg",
  },
  {
    name: "Cuevas del Esplendor",
    region: "Jardín · Suroeste",
    difficulty: "Media",
    elevation: "2,200 m",
    distance: "10 km",
    duration: "4 a 5 horas",
    date: "Próximamente",
    description:
      "Una cascada que cae adentro de una cueva. Sí, así como lo leyó. De los lugares más mágicos de todo Antioquia, toca madrugar.",
    // TODO: reemplazar con foto real de la Cueva del Esplendor
    image:
      "/images/rutas/CuevaDelEsplandor.jpg",
  },
  {
    name: "Páramo de Sonsón",
    region: "Sonsón · Oriente",
    difficulty: "Alta",
    elevation: "3.340 m",
    distance: "9 a 11 km",
    duration: "6 a 8 horas",
    date: "Próximamente",
    groupType: "mujeres",
    description:
      "Frailejones, niebla y páramo puro a más de 3.000 metros. Altitud brava pero la recompensa es grandísima. Para caminantes con experiencia.",
    // TODO: reemplazar con foto real del páramo con frailejones
    image:
      "/images/rutas/ParamoSonson.png",
  },
  {
    name: "Salto del Buey",
    region: "La Ceja · Oriente",
    difficulty: "Baja",
    elevation: "2,100 m",
    distance: "6 a 8 km",
    duration: "3h a 5h",
    date: "Próximamente",
    description:
      "Cascada de más de 80 metros metida en el bosque de niebla del Oriente. Plan de medio día con el charco al final. Ideal para empezar.",
    // TODO: reemplazar con foto del Salto del Buey o cascadas del Oriente antioqueño
    image:
      "/images/rutas/SaltoDelBuey.jpg",
  },
  {
    name: "Alto de San Miguel",
    region: "Alto de San Miguel - El Retiro",
    difficulty: "Alta",
    elevation: "2.800 m",
    distance: "20 km",
    duration: "4 h",
    date: "Próximamente",
    groupType: "mujeres",
    description:
      "Nacimiento del río Medellín entre bosque de niebla. A 45 minutos del Poblado pero parece que estuviera en otro planeta. Plan de domingo.",
    // TODO: reemplazar con foto del bosque de niebla del Alto de San Miguel
    image:
      "/images/rutas/AltoSanMiguel.jpeg",
  },
  {
    name: "Ruta El Peñol - El Santuario",
    region: "Ruta El Peñol - El Santuario",
    difficulty: "Media",
    elevation: "2,390 m",
    distance: "28.5 km",
    duration: "4h a 6h",
    date: "Próximamente",
    description:
      "Una caminata ecológica por carreteras veredales que pasa por monasterios benedictinos.",
    // TODO: reemplazar con foto real de La Piedra del Peñol (Unsplash tiene varias)
    image:
      "/images/rutas/PiedraPeñol.jpg",
  },
];

const marqueeItems = [
  "Camina más",
  "Respira hondo",
  "La montaña llama",
  "Guías de verdad",
  "Pagos seguros",
  "Antioquia",
  "Colombia",
  "Vamos pues",
];

// Testimonial-style quotes (realistic scenarios — pre-launch, so framed as aspiration)
const quotes = [
  {
    text: "Quiero saber con quién estoy caminando antes de empezar la caminata.",
    who: "Caminante solo · Medellín",
  },
  {
    text: "Necesito cobrar con factura, pues. Mis clientes corporativos me lo piden y termino perdiendo esas salidas.",
    who: "Guía RNT · Suroeste",
  },
  {
    text: "La última vez pagué por Nequi y el guía canceló. Nunca me devolvieron la plata, qué pesar.",
    who: "Caminante · Envigado",
  },
];

// ============================================
// PAGE
// ============================================

export default function Home() {
  const [activeTab, setActiveTab] = useState<"traveler" | "guide">("traveler");
  useReveal();

  // Read scroll position for the header state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      {/* ============================================
          FIXED HEADER
          ============================================ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center">
              <IconMountain size={18} className="text-[var(--color-accent)]" />
            </div>
            <span className="font-display text-lg font-medium tracking-tight">
              <span className="text-[var(--color-text)]">Sendero</span>
              <span className="text-[var(--color-accent)]">.</span>
              <span className="text-[var(--color-text-muted)]">app</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase opacity-70">
            <a href="#rutas" className="hover:text-[var(--color-accent)] transition-colors">
              Rutas
            </a>
            <a href="#seguro" className="hover:text-[var(--color-accent)] transition-colors">
              Seguro
            </a>
            <a href="#ellas-caminan" className="hover:text-[var(--color-accent)] transition-colors">
              Ellas caminan
            </a>
            <a href="#guias" className="hover:text-[var(--color-accent)] transition-colors">
              Para guías
            </a>
            <a href="#como-funciona" className="hover:text-[var(--color-accent)] transition-colors">
              Cómo funciona
            </a>
          </nav>

          <a
            href="#cta"
            className="text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
          >
            Únete
          </a>
        </div>
      </header>

      {/* ============================================
          HERO — cinematic mountain scene
          ============================================ */}
      <section
        id="top"
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <MountainHero />
        <div className="grain-overlay" />
        <div className="hero-vignette" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pt-28 pb-20">
          <div className="max-w-[780px]">
            {/* Eyebrow */}
            <p className="eyebrow animate-fade-up-d1 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--color-accent)]" />
              La montaña te está esperando
            </p>

            {/* Headline */}
            <h1 className="font-display hero-headline mt-6 mb-8 animate-fade-up-d2 text-[var(--color-text)]">
              Reserva tu próxima{" "}
              <em className="text-[var(--color-accent)] not-italic font-light">
                <span className="italic font-display">caminada</span>
              </em>{" "}
              <br className="hidden md:block" />
              por las montañas paisas.
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-muted)] max-w-[560px] mb-10 animate-fade-up-d3">
              Guías verificados · Pagos seguros · <span className="text-[var(--color-accent-green)] font-medium">Seguro incluido</span>
              <br />
              <span className="text-[var(--color-text-subtle)]">
                La primera plataforma de senderismo con respaldo real en Antioquia.
              </span>
            </p>

            {/* Waitlist */}
            <div className="max-w-[460px] animate-fade-up-d4">
              <div className="flex mb-4 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-sm">
                {(["traveler", "guide"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-[0.7rem] font-mono tracking-widest uppercase transition-all duration-300 ${activeTab === tab
                      ? "bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                      : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)]"
                      }`}
                  >
                    {tab === "traveler" ? "Soy caminante" : "Soy guía"}
                  </button>
                ))}
              </div>
              <WaitlistForm role={activeTab} />
            </div>
          </div>

        </div>
      </section>

      {/* ============================================
          STATS BAR
          ============================================ */}
      <section className="relative px-6 py-16 border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 reveal-stagger reveal">
          <AnimatedStat
            value={20685}
            format
            suffix="+"
            label="Guías RNT en Antioquia"
          />
          <AnimatedStat value={15} suffix="+" label="Rutas en preparación" />
          <AnimatedStat value={6} suffix=" regiones" label="Cubrimiento inicial" />
          <AnimatedStat value={2026} label="Año de lanzamiento" />
        </div>
      </section>

      {/* ============================================
          MARQUEE
          ============================================ */}
      <Marquee items={marqueeItems} speed={38} />

      {/* ============================================
          PROBLEM SECTION
          ============================================ */}
      <section className="relative px-6 py-28" id="problema">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5 reveal">
              <p className="eyebrow mb-5">El problema</p>
              <h2 className="font-display section-headline text-[var(--color-text)]">
                Hoy reservar una caminata es un{" "}
                <em className="text-[var(--color-accent-clay)] font-light italic">
                  acto de fe
                </em>
                .
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end reveal">
              <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
                En Antioquia hay <strong className="text-[var(--color-text)]">más de 20 mil guías con RNT</strong>, cientos de rutas increíbles y miles de personas que quieren salir a caminar cada fin de semana. Pero conectarlos es un caos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal-stagger reveal">
            {problems.map((p, i) => (
              <div
                key={i}
                className="group p-8 bg-white/[0.015] border border-[var(--color-border)] rounded-2xl transition-all duration-500 hover:border-[var(--color-accent-clay)]/40 hover:bg-white/[0.03]"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--color-accent-clay)]/10 border border-[var(--color-accent-clay)]/20 flex items-center justify-center text-[var(--color-accent-clay)] transition-transform duration-500 group-hover:scale-110">
                    <p.Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-medium mb-2">{p.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote strip */}
          <div className="mt-20 reveal">
            <p className="eyebrow mb-8">Lo que escuchamos</p>
            <div className="grid md:grid-cols-3 gap-8">
              {quotes.map((q, i) => (
                <figure key={i} className="relative">
                  <span className="absolute -top-6 -left-2 text-[6rem] leading-none font-display text-[var(--color-accent)]/20 select-none">
                    &ldquo;
                  </span>
                  <blockquote className="relative font-display italic text-lg leading-snug text-[var(--color-text)] mb-4">
                    {q.text}
                  </blockquote>
                  <figcaption className="text-[0.7rem] font-mono tracking-widest uppercase text-[var(--color-accent)]/70">
                    — {q.who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED IMAGE STRIP (3-up mosaic)
          TODO: reemplazar con fotos propias en public/images/strip/
          Orden sugerido por asesor: (1) gente caminando de espaldas,
          (2) paisaje amplio paisa, (3) detalle íntimo (café en cima, botas, charco).
          ============================================ */}
      <section className="relative px-0 md:px-6 py-0">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-1 md:gap-2 reveal-scale reveal">
          {[
            "/images/rutas/Cascada.jpeg",
            "/images/rutas/DonMatias.jpeg",
            "/images/rutas/SantaElena.jpeg",
          ].map((src, i) => (
            <MosaicImage key={i} src={src} />
          ))}
        </div>
      </section>

      {/* ============================================
          SOLUTION / FEATURES
          ============================================ */}
      <section className="relative px-6 py-28" id="como-funciona">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-20 reveal">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">La solución</p>
              <h2 className="font-display section-headline text-[var(--color-text)]">
                Un marketplace para salir a la montaña{" "}
                <em className="text-[var(--color-accent-green)] font-light italic">
                  sin sorpresas
                </em>
                .
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                Guías verificados publican sus salidas. Reservas y pagas seguro. Sabes exactamente con quién estás caminando.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 reveal-stagger reveal">
            {features.map((f, i) => (
              <div key={i} className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="numeral text-xs tracking-[0.2em] text-[var(--color-accent)]/60">
                    0{i + 1}
                  </span>
                  <div className="flex-1 h-px bg-[var(--color-border)]" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-5 transition-all duration-500 group-hover:border-[var(--color-accent)]/40 group-hover:bg-[var(--color-accent)]/10 group-hover:-translate-y-1">
                  <f.Icon size={26} />
                </div>
                <h3 className="font-display text-xl font-medium mb-2 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[0.88rem] text-[var(--color-text-muted)] leading-relaxed max-w-[340px]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ROUTES GALLERY
          ============================================ */}
      <section
        id="rutas"
        className="relative px-6 py-28 border-t border-[var(--color-border)]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-elevated)]/30 to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16 reveal">
            <div>
              <p className="eyebrow mb-5">Próximas rutas</p>
              <h2 className="font-display section-headline text-[var(--color-text)] max-w-[620px]">
                Rutas que ya estamos{" "}
                <em className="text-[var(--color-accent)] font-light italic">
                  preparando
                </em>
                .
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-[300px] font-mono tracking-wide leading-relaxed">
              Seis rutas en Antioquia para arrancar. Más cada mes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger reveal">
            {routes.map((r, i) => (
              <RouteCard key={i} route={r} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <p className="text-sm text-[var(--color-text-subtle)] font-mono tracking-wide">
              <span className="inline-block w-6 h-px bg-[var(--color-text-subtle)] align-middle mr-3" />
              Y muchas más llegando pronto
              <span className="inline-block w-6 h-px bg-[var(--color-text-subtle)] align-middle ml-3" />
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          INSURANCE — hero section
          ============================================ */}
      <section
        id="seguro"
        className="relative overflow-hidden py-28 border-t border-[var(--color-border)]"
      >
        {/* Background image — aerial mountain rescue vibe */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover img-dim-strong"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/90 to-[var(--color-bg)]/30" />
          <div className="grain-overlay" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 reveal">
              {/* Eyebrow con badge especial */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-green)]/12 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)]">
                  <IconShieldHeart size={14} />
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest font-semibold">
                    Seguro incluido
                  </span>
                </span>
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-[var(--color-text-subtle)]">
                  Sin costo extra
                </span>
              </div>

              <h2 className="font-display section-headline text-[var(--color-text)] mb-6">
                Caminás tranquilo.{" "}
                <em className="text-[var(--color-accent-green)] font-light italic">
                  Nosotros te cuidamos
                </em>
                .
              </h2>

              <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-[560px] mb-10">
                Cada reserva en SenderoApp incluye seguro de accidentes personales y evacuación de montaña. Porque la montaña es bella, pero los imprevistos existen — y no deberían arruinarte la aventura ni tu cuenta bancaria.
              </p>

              {/* 3 pillars */}
              <div className="grid sm:grid-cols-3 gap-5 mb-10 reveal-stagger reveal">
                <CoverageCard
                  Icon={IconStethoscope}
                  title="Atención médica"
                  desc="Gastos médicos por accidente en ruta."
                  amount="Hasta $20M"
                />
                <CoverageCard
                  Icon={IconHelicopter}
                  title="Evacuación"
                  desc="Rescate terrestre y traslado a centro hospitalario."
                  amount="Cobertura total"
                />
                <CoverageCard
                  Icon={IconBackpack}
                  title="Equipo y equipaje"
                  desc="Protección frente a pérdida o daño durante la salida."
                  amount="Opcional +"
                />
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-[var(--color-border)]">
                <span className="text-[0.68rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)]">
                  Respaldo
                </span>
                <span className="text-sm text-[var(--color-text-muted)]">
                  Aseguradora aliada —{" "}
                  <span className="text-[var(--color-accent)] italic">
                    anuncio próximamente
                  </span>
                </span>
                <span className="hidden md:inline-block w-px h-4 bg-[var(--color-border)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  Activación automática al confirmar la reserva
                </span>
              </div>
            </div>

            {/* Card destacada a la derecha */}
            <div className="lg:col-span-4 lg:col-start-9 reveal">
              <div className="relative p-8 bg-[var(--color-bg-elevated)]/90 backdrop-blur-md border border-[var(--color-accent-green)]/30 rounded-2xl overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-[var(--color-accent-green)]/20 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] mb-6">
                    <IconShieldHeart size={26} />
                  </div>

                  <p className="font-display text-2xl font-medium leading-tight mb-4">
                    La primera plataforma de senderismo con seguro{" "}
                    <span className="text-[var(--color-accent-green)]">por defecto</span>{" "}
                    en Colombia.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Incluido gratis en toda reserva",
                      "Sin papeleo ni activación manual",
                      "Cobertura durante la ruta completa",
                      "Proceso de reclamo 100% digital",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 28 28"
                          fill="none"
                          className="shrink-0 mt-0.5 text-[var(--color-accent-green)]"
                        >
                          <path
                            d="M6 14 L12 20 L22 8"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[0.7rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)] pt-5 border-t border-[var(--color-border)]">
                    Próximamente: SenderoApp+ con cobertura ampliada para rutas técnicas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          ELLAS CAMINAN — mini-sección (compact)
          ============================================ */}
      <section
        id="ellas-caminan"
        className="relative px-6 py-24 border-t border-[var(--color-border)] overflow-hidden"
      >
        {/* Subtle accent line on the side */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-transparent via-[var(--color-accent-clay)] to-transparent opacity-50" />

        <div className="max-w-[1100px] mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Visual: composición editorial de dos figuras + montañas */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-gradient-to-br from-[#2d2218] via-[#1a1410] to-[#0a0705]">
                {/*
                  ============================================
                  CÓMO CAMBIAR ESTAS IMÁGENES POR FOTOS REALES
                  ============================================
                  1. Poné tus fotos en:
                     public/images/ellas-caminan-1.webp
                     public/images/ellas-caminan-2.webp
                     Tamaño recomendado: 1600×2000 px (proporción 4:5)
                     Sugerencia: 2-3 mujeres de espaldas caminando en trocha paisa.
                  2. Cambiá la prop "images" abajo por las rutas reales, ejemplo:
                     images={["/images/ellas-caminan-1.webp", "/images/ellas-caminan-2.webp"]}
                  3. Las dos imágenes alternarán automáticamente cada 3.5 segundos
                     con un fade suave. Si alguna falla, cae al SVG ilustrado.
                */}
                <EllasVisual images={[
                  "/images/rutas/Ellas1.jpeg",
                  "/images/rutas/Ellas2.jpeg",
                  "/images/rutas/Ellas3.png",
                ]} />

                {/* Overlay gradient + label (se mantiene encima tanto si es foto como SVG) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-[0.6rem] font-mono uppercase tracking-[0.25em] text-[var(--color-accent-clay)] mb-1.5">
                    Ellas caminan
                  </p>
                  <p className="font-display text-lg font-medium italic text-[var(--color-text)] leading-tight">
                    Cumbres, quebradas, parche real.
                  </p>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-clay)]/12 border border-[var(--color-accent-clay)]/30 text-[var(--color-accent-clay)]">
                  <IconWomenWalking size={14} />
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest font-semibold">
                    Ellas caminan
                  </span>
                </span>
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-[var(--color-text-subtle)]">
                  Programa
                </span>
              </div>

              <h2 className="font-display text-[clamp(1.8rem,4.2vw,2.8rem)] leading-[1.05] font-light mb-5 text-[var(--color-text)]">
                Caminar acompañada también es un{" "}
                <em className="italic text-[var(--color-accent-clay)] font-light">
                  derecho
                </em>
                .
              </h2>

              <p className="text-base text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-[500px]">
                Salidas solo para mujeres, lideradas por guías mujeres con RNT. Sin ritmos impuestos, con pausas reales, en un espacio seguro para conectar con la montaña y con otras caminantes.
              </p>

              <ul className="space-y-3 mb-8 max-w-[500px]">
                {[
                  "Grupos de 6 a 12 mujeres máximo",
                  "Guía mujer certificada en primeros auxilios",
                  "Pausas, ritmo y logística pensados para el grupo",
                  "Comunidad privada después de cada salida",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]"
                  >
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-clay)]" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[0.72rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)]">
                <span className="text-[var(--color-accent-clay)]">●</span>{" "}
                Buscá el chip <em className="not-italic text-[var(--color-accent-clay)]">Ellas caminan</em> en la lista de rutas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CONQUISTAS TEASER — gamification hint
          ============================================ */}
      <section className="relative px-6 py-24 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25 text-[var(--color-accent)]">
                  <IconTrophy size={14} />
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest font-semibold">
                    Próximamente
                  </span>
                </span>
                <span className="text-[0.65rem] font-mono uppercase tracking-widest text-[var(--color-text-subtle)]">
                  Senderistas fundadores
                </span>
              </div>

              <h2 className="font-display section-headline text-[var(--color-text)] mb-6">
                Coleccioná{" "}
                <em className="text-[var(--color-accent)] font-light italic">
                  cumbres
                </em>
                , no solo fotos.
              </h2>

              <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-[560px] mb-8">
                Sumá puntos por cada cima que conquistes. Desbloqueá medallas digitales, descuentos en futuras salidas y acceso anticipado a rutas exclusivas. El Club de los Cerros llega en 2026.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: IconFlag, label: "10 cumbres de Antioquia" },
                  { icon: IconMountain, label: "Ruta de los 3.000" },
                  { icon: IconTrophy, label: "Medallas y recompensas" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)]"
                    >
                      <Icon size={16} className="text-[var(--color-accent)]" />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Visual — medallas flotantes */}
            <div className="lg:col-span-4 lg:col-start-9 relative h-[280px] hidden lg:block">
              <FloatingMedal
                Icon={IconMountain}
                label="Cerro Tusa"
                className="top-2 left-8"
                delay="0s"
              />
              <FloatingMedal
                Icon={IconFlag}
                label="Padre Amaya"
                className="top-16 right-4"
                delay="0.8s"
              />
              <FloatingMedal
                Icon={IconTrophy}
                label="Top 10"
                className="bottom-10 left-20"
                delay="1.6s"
                primary
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOR GUIDES
          ============================================ */}
      <section
        id="guias"
        className="relative overflow-hidden py-28 border-t border-[var(--color-border)]"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552083375-1447ce886485?w=1800&q=85&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover img-dim-strong"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-[var(--color-bg)]/40" />
          <div className="grain-overlay" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 reveal">
              <p className="eyebrow mb-5">¿Eres guía?</p>
              <h2 className="font-display section-headline text-[var(--color-text)] mb-6">
                Deja de perseguir pagos{" "}
                <em className="text-[var(--color-accent)] font-light italic">
                  por WhatsApp
                </em>
                .
              </h2>
              <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-[520px] mb-12">
                Publica tus salidas, llenas cupos automáticamente, recibes el pago en tu cuenta. Sin Excel, sin cobrar uno por uno, con factura legal.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 reveal-stagger reveal">
                {guideSteps.map((s, i) => (
                  <div key={i} className="relative">
                    <p className="numeral text-5xl font-light text-[var(--color-accent)]/25 leading-none mb-3">
                      {s.num}
                    </p>
                    <h3 className="font-display text-base font-medium mb-2">{s.title}</h3>
                    <p className="text-[0.78rem] text-[var(--color-text-muted)] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 reveal">
              <div className="relative p-8 bg-[var(--color-bg-elevated)]/80 backdrop-blur-md border border-[var(--color-accent)]/20 rounded-2xl">
                {/* Ribbon */}
                <div className="absolute -top-3 left-8 px-3 py-1 bg-[var(--color-accent)] text-[var(--color-bg)] text-[0.6rem] font-mono tracking-widest uppercase rounded-full">
                  Fundadores
                </div>

                <p className="font-display text-2xl font-medium leading-tight mb-3 mt-2">
                  Primeros 20 guías:<br />
                  <span className="text-[var(--color-accent)]">0% comisión</span>{" "}
                  por 3 meses.
                </p>
                <p className="text-[0.88rem] text-[var(--color-text-muted)] leading-relaxed mb-6">
                  Regístrate ahora y sé de los primeros en la plataforma. Sin costo de entrada.
                </p>
                <WaitlistForm role="guide" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MID-PAGE CINEMATIC IMAGE
          ============================================ */}
      <section className="relative h-[70svh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000&q=85&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/30 via-[var(--color-bg)]/10 to-[var(--color-bg)]" />
        <div className="grain-overlay" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-[760px] reveal">
            <p className="eyebrow mb-6">Proverbio de montaña</p>
            <p className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.1] italic font-light text-[var(--color-text)]">
              &ldquo;La montaña no se conquista.<br />
              <span className="text-[var(--color-accent)]">Se camina con respeto.</span>
              &rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SURVEY CTA
          ============================================ */}
      <section className="relative px-6 py-24 border-t border-[var(--color-border)]">
        <div className="max-w-[680px] mx-auto text-center reveal">
          <p className="eyebrow mb-6">Tu opinión importa</p>
          <h2 className="font-display section-headline text-[var(--color-text)] mb-6">
            Ayúdanos a construir{" "}
            <em className="text-[var(--color-accent-green)] font-light italic">
              SenderoApp
            </em>
            .
          </h2>
          <p className="text-base text-[var(--color-text-muted)] mb-10 leading-relaxed max-w-[520px] mx-auto">
            Llena esta encuesta de 3 minutos y ayúdanos a crear la plataforma que de verdad necesitas.
          </p>
          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent-green)] text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-[var(--color-accent-green)]/90 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(123,160,91,0.45)]"
          >
            Llenar encuesta
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section
        id="cta"
        className="relative px-6 py-32 overflow-hidden"
      >
        {/* subtle gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-warm)] to-[var(--color-bg)]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-green)]/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[620px] mx-auto text-center reveal">
          <p className="eyebrow mb-6">Únete ahora</p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-light leading-[1.05] mb-6 text-[var(--color-text)]">
            La montaña no espera.
            <br />
            <em className="italic text-[var(--color-accent)] font-light">
              Tú tampoco.
            </em>
          </h2>
          <p className="text-base text-[var(--color-text-muted)] mb-10 leading-relaxed max-w-[480px] mx-auto">
            Sé de los primeros en conocer SenderoApp. Acceso anticipado y beneficios exclusivos para caminantes y guías que se registren ahora.
          </p>
          <div className="max-w-[420px] mx-auto">
            <WaitlistForm role="traveler" />
          </div>
        </div>
      </section>

      {/* ============================================
          PLATFORMS — próximamente en stores
          ============================================ */}
      <section
        id="plataformas"
        className="relative px-6 py-20 border-t border-[var(--color-border)] bg-gradient-to-b from-transparent to-[var(--color-bg-elevated)]/30"
      >
        <div className="max-w-[1100px] mx-auto reveal">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-5">Próximamente</p>
              <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.05] font-light mb-5 text-[var(--color-text)]">
                Disponible en tu{" "}
                <em className="italic text-[var(--color-accent)] font-light">
                  celular
                </em>{" "}
                y en la web.
              </h2>
              <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[420px]">
                Estamos construyendo SenderoApp para iOS, Android y navegador. Cuando lancemos, podés reservar desde donde estés: en el bus, en el café o en la plaza del pueblo antes de arrancar la caminada.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid sm:grid-cols-3 gap-3 reveal-stagger reveal">
                <PlatformCard
                  label="App Store"
                  caption="iOS"
                  status="Próximamente"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  }
                />
                <PlatformCard
                  label="Google Play"
                  caption="Android"
                  status="Próximamente"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 01-.609-1.2V3.014c0-.467.224-.881.609-1.2zm10.89 10.896l2.612 2.612-12.09 6.855c-.27.154-.6.154-.845.023l10.323-9.49zM20.16 10.81c.69.388.69 1.39 0 1.778l-2.886 1.637-2.92-2.92 2.92-2.92 2.886 1.425zM4.176 1.33c.245-.131.575-.131.845.023l12.09 6.855-2.613 2.613L4.176 1.33z" />
                    </svg>
                  }
                />
                <PlatformCard
                  label="sendero.app"
                  caption="Navegador"
                  status="Disponible 2026"
                  icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  }
                  highlighted
                />
              </div>

              <p className="text-[0.72rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)] mt-6 text-center sm:text-left">
                Déjanos tu correo arriba y te avisamos apenas salga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="relative px-6 py-12 border-t border-[var(--color-border)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 flex items-center justify-center">
                  <IconMountain size={18} className="text-[var(--color-accent)]" />
                </div>
                <span className="font-display text-lg font-medium tracking-tight">
                  <span>Sendero</span>
                  <span className="text-[var(--color-accent)]">.</span>
                  <span className="text-[var(--color-text-muted)]">app</span>
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[280px]">
                Marketplace de senderismo con guías verificados en Antioquia y Colombia.
              </p>
            </div>

            <div>
              <p className="eyebrow mb-4">Navegación</p>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li><a href="#rutas" className="hover:text-[var(--color-accent)] transition-colors">Rutas</a></li>
                <li><a href="#seguro" className="hover:text-[var(--color-accent)] transition-colors">Seguro incluido</a></li>
                <li><a href="#ellas-caminan" className="hover:text-[var(--color-accent)] transition-colors">Ellas caminan</a></li>
                <li><a href="#guias" className="hover:text-[var(--color-accent)] transition-colors">Para guías</a></li>
                <li><a href="#como-funciona" className="hover:text-[var(--color-accent)] transition-colors">Cómo funciona</a></li>
                <li><a href={SURVEY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">Encuesta</a></li>
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Contacto</p>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Medellín, Colombia<br />
                Lanzamiento 2026
              </p>
              <a
                href="https://wa.me/573246611671"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--color-accent-green)] hover:text-[var(--color-accent)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)] flex flex-wrap justify-between items-center gap-4">
            <p className="text-[0.7rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)]">
              © 2026 SenderoApp · Hecho con amor en Antioquia
            </p>
            <p className="text-[0.7rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)]">
              06°14′N · 75°34′W
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ============================================
// SMALL COMPONENTS
// ============================================

type CoverageIcon = React.ComponentType<{ size?: number; className?: string }>;

function CoverageCard({
  Icon,
  title,
  desc,
  amount,
}: {
  Icon: CoverageIcon;
  title: string;
  desc: string;
  amount: string;
}) {
  return (
    <div className="group p-5 rounded-xl bg-[var(--color-bg-elevated)]/60 backdrop-blur-sm border border-[var(--color-border)] transition-all duration-500 hover:border-[var(--color-accent-green)]/40 hover:bg-[var(--color-bg-elevated)]/80">
      <div className="w-11 h-11 rounded-lg bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/25 flex items-center justify-center text-[var(--color-accent-green)] mb-4 transition-transform duration-500 group-hover:scale-110">
        <Icon size={22} />
      </div>
      <h4 className="font-display text-base font-medium mb-1.5 leading-tight">
        {title}
      </h4>
      <p className="text-[0.78rem] text-[var(--color-text-muted)] leading-relaxed mb-3">
        {desc}
      </p>
      <p className="text-[0.68rem] font-mono uppercase tracking-widest text-[var(--color-accent-green)] font-semibold">
        {amount}
      </p>
    </div>
  );
}

function FloatingMedal({
  Icon,
  label,
  className = "",
  delay = "0s",
  primary = false,
}: {
  Icon: CoverageIcon;
  label: string;
  className?: string;
  delay?: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`absolute ${className} animate-float`}
      style={{ animationDelay: delay, animationDuration: "5s" }}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md border shadow-2xl ${primary
          ? "bg-[var(--color-accent)]/15 border-[var(--color-accent)]/40"
          : "bg-[var(--color-bg-elevated)]/90 border-[var(--color-border)]"
          }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${primary
            ? "bg-[var(--color-accent)]/25 text-[var(--color-accent)]"
            : "bg-[var(--color-bg)]/60 text-[var(--color-text-muted)]"
            }`}
        >
          <Icon size={18} />
        </div>
        <div>
          <p className="text-[0.55rem] font-mono uppercase tracking-widest opacity-60 mb-0.5">
            Medalla
          </p>
          <p className="text-sm font-display font-medium leading-none">{label}</p>
        </div>
      </div>
    </div>
  );
}

function PlatformCard({
  label,
  caption,
  status,
  icon,
  highlighted = false,
}: {
  label: string;
  caption: string;
  status: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col p-5 rounded-2xl border transition-all duration-500 cursor-default ${highlighted
        ? "bg-[var(--color-accent)]/8 border-[var(--color-accent)]/30 hover:border-[var(--color-accent)]/50"
        : "bg-[var(--color-bg-elevated)]/60 border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
        }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${highlighted
            ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
            : "bg-[var(--color-bg)]/60 text-[var(--color-text-muted)]"
            }`}
        >
          {icon}
        </div>
        <span
          className={`text-[0.55rem] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${highlighted
            ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30"
            : "bg-white/5 text-[var(--color-text-subtle)] border-[var(--color-border)]"
            }`}
        >
          {status}
        </span>
      </div>
      <p className="text-[0.65rem] font-mono tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">
        {caption}
      </p>
      <p className="font-display text-lg font-medium leading-tight">{label}</p>
    </div>
  );
}

/**
 * Imagen del mosaico decorativo, con fallback elegante si la URL falla.
 * Mismo patrón que RouteCard: si la imagen rompe, muestra un gradiente
 * con silueta de montañas en vez de un rectángulo negro.
 */
function MosaicImage({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group">
      {failed ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d2218] via-[#1a1410] to-[#0a0705] flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 80 80" fill="none" className="opacity-20" aria-hidden="true">
            <path d="M5 65 L22 40 L32 52 L48 30 L60 48 L75 65 Z" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="58" cy="18" r="4" stroke="var(--color-accent)" strokeWidth="1.5" />
          </svg>
        </div>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 33vw, 466px"
          className="object-cover img-dim transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          onError={() => setFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

/**
 * Visual del bloque "Ellas caminan" con carrusel automático.
 *
 * - Si le pasás un array `images` con 1+ URLs, las muestra con transición
 *   fade cada 3.5 segundos.
 * - Si el array está vacío o todas las imágenes fallan, cae al SVG ilustrado.
 *
 * Ejemplos de uso:
 *   <EllasVisual images={[]} />                          // solo SVG
    *   <EllasVisual images={["/images/ellas-1.webp"]} />    // una foto fija
    *   <EllasVisual images={["/img/1.webp", "/img/2.webp"]} /> // carrusel de 2
    */
function EllasVisual({ images = [] }: { images?: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());

  // Imágenes que todavía cargan bien
  const workingImages = images.filter((_, i) => !failedIndices.has(i));

  // Carrusel: rotar cada 3.5s solo si hay 2+ imágenes vivas
  useEffect(() => {
    if (workingImages.length < 2) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % workingImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, [workingImages.length]);

  const markFailed = (index: number) => {
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  // Si hay al menos una imagen viva, mostrar carrusel
  if (workingImages.length > 0) {
    return (
      <>
        {workingImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex % workingImages.length ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Mujeres caminando juntas"
              fill
              sizes="(max-width: 1024px) 100vw, 466px"
              className="object-cover img-dim"
              onError={() => markFailed(images.indexOf(src))}
              priority={i === 0}
            />
          </div>
        ))}
        {/* Dots indicator (solo si hay 2+) */}
        {workingImages.length > 1 && (
          <div className="absolute top-5 right-5 z-10 flex gap-1.5">
            {workingImages.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentIndex % workingImages.length
                  ? "bg-[var(--color-accent-clay)] w-4"
                  : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  // Fallback SVG: paisaje al amanecer con dos figuras sobre la cordillera.
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ec-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="60%" stopColor="#6b3820" />
          <stop offset="100%" stopColor="#c4823a" />
        </linearGradient>
        <radialGradient id="ec-sun" cx="75%" cy="40%" r="30%">
          <stop offset="0%" stopColor="#fde7a8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#d4a94a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d4a94a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill="url(#ec-sky)" />
      <rect width="400" height="500" fill="url(#ec-sun)" />
      <circle cx="300" cy="200" r="16" fill="#fde7a8" opacity="0.9" />

      <path
        d="M 0 340 L 60 290 L 130 320 L 200 270 L 280 310 L 340 280 L 400 320 L 400 500 L 0 500 Z"
        fill="#3a2a1f"
        opacity="0.85"
      />
      <path
        d="M 0 390 L 50 340 L 120 380 L 190 320 L 260 380 L 330 340 L 400 380 L 400 500 L 0 500 Z"
        fill="#1a1410"
      />
      <path
        d="M 0 430 L 70 400 L 150 425 L 230 395 L 300 425 L 370 400 L 400 420 L 400 500 L 0 500 Z"
        fill="#0a0705"
      />

      <g transform="translate(170 395)" opacity="0.95">
        <circle cx="0" cy="-22" r="4" fill="#ede6d6" />
        <path d="M 0 -18 L 0 -5" stroke="#ede6d6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 0 -14 L -5 -9 M 0 -14 L 5 -10" stroke="#ede6d6" strokeWidth="2" strokeLinecap="round" />
        <path d="M 0 -5 L -3 5 M 0 -5 L 3 5" stroke="#ede6d6" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="-22" r="4" fill="#ede6d6" />
        <path d="M 22 -18 L 22 -5" stroke="#ede6d6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 22 -14 L 17 -10 M 22 -14 L 28 -9" stroke="#ede6d6" strokeWidth="2" strokeLinecap="round" />
        <path d="M 22 -5 L 19 5 M 22 -5 L 25 5" stroke="#ede6d6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
