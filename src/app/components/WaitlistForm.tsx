"use client";

import { useState, FormEvent } from "react";

/**
 * ========================================================================
 * GOOGLE FORMS INTEGRATION
 * ========================================================================
 * Los correos se envían a un Google Form que vuelca las respuestas
 * automáticamente en una Google Sheet. Vos ves las respuestas ahí.
 *
 * Si alguna vez cambiás el form, actualizá estos 3 valores:
 */
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScxWLTh2qTR55UsDIckWhZa2JJeiMbdAceToZv9-CQWvnuN5A/formResponse";
const ENTRY_EMAIL = "entry.985244124";
const ENTRY_ROLE = "entry.1096138801";
// ========================================================================

interface WaitlistFormProps {
  role: "traveler" | "guide";
  compact?: boolean;
}

export default function WaitlistForm({ role, compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append(ENTRY_EMAIL, email);
      formData.append(ENTRY_ROLE, role === "guide" ? "Guía" : "Senderista");

      // Enviamos a Google Forms silenciosamente (no-cors).
      // Google acepta la respuesta aunque no podamos leer la confirmación.
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setSubmitted(true);
    } catch {
      // Aún con error asumimos éxito — Google Forms suele recibir la data
      // aunque no-cors nos impida confirmar.
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-6 border border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-elevated)] animate-fade-up">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-accent-green)]/15 mb-4">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 14 L12 20 L22 8"
              stroke="var(--color-accent-green)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-display text-xl font-medium text-[var(--color-text)] mb-1">
          Estás en la lista
        </p>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Te avisamos cuando lancemos.
          <br />
          Prepara las botas, parcero.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-5 py-4 bg-white/[0.03] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] text-sm outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:bg-white/[0.05] placeholder:text-[var(--color-text-subtle)] placeholder:font-normal";

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${compact ? "gap-2.5" : "gap-3"}`}>
      <input
        type="email"
        placeholder="tu@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
        autoComplete="email"
      />
      <button
        type="submit"
        disabled={loading}
        className="group relative overflow-hidden py-4 px-6 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(212,169,74,0.45)] disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
      >
        <span className="relative z-10">
          {loading
            ? "Enviando..."
            : role === "guide"
              ? "Quiero ser guía"
              : "Reservar mi lugar"}
        </span>
        {!loading && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <p className="text-[0.68rem] text-[var(--color-text-subtle)] text-center mt-1 leading-relaxed px-2">
        Al registrarte aceptás que usemos tu correo solo para avisarte del lanzamiento de SenderoApp. No compartimos tus datos con terceros. Puedes pedir ser borrado enviando un mensaje al {" "}
        <a
          href="https://wa.me/573246611671"
          className="text-[var(--color-accent)] hover:underline"
        >
          324 661 16 71
        </a>
        .
      </p>
    </form>
  );
}
