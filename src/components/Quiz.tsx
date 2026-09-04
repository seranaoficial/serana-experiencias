"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { captureLead } from "@/lib/supabase";
import Reveal from "./Reveal";

const preguntas = [
  {
    q: "¿Qué necesitas sentir al terminar la experiencia?",
    options: [
      { l: "Energía y vitalidad", tag: "energia" },
      { l: "Calma y claridad", tag: "calma" },
      { l: "Conexión profunda con otros", tag: "conexion" },
      { l: "Una transformación que me mueva", tag: "impacto" },
    ],
  },
  {
    q: "¿Cuántas personas van a participar?",
    options: [
      { l: "Solo yo", tag: "individual" },
      { l: "Pareja o grupo pequeño (2–6)", tag: "pequeno" },
      { l: "Equipo de trabajo (7+)", tag: "equipo" },
      { l: "Grupo grande / hotel / evento", tag: "masivo" },
    ],
  },
  {
    q: "¿Cuánto tiempo quieren dedicarle?",
    options: [
      { l: "Una tarde (1–2h)", tag: "express" },
      { l: "Medio día", tag: "medio" },
      { l: "Un día completo", tag: "dia" },
      { l: "Un retiro (2+ días)", tag: "retiro" },
    ],
  },
  {
    q: "¿Qué te llama más?",
    options: [
      { l: "Yoga, breathwork, meditación", tag: "suave" },
      { l: "Ice bath, fuego, alta intensidad", tag: "intenso" },
      { l: "Sonoterapia y naturaleza", tag: "sonido" },
      { l: "Coaching y gastronomía", tag: "consciente" },
    ],
  },
];

const resultMap: Record<string, { t: string; d: string; servicio: string }> = {
  energia: {
    t: "Reset Energético",
    d: "Una sesión de movimiento consciente, alimentación vital y un cierre que te deja enchufado. Day retreat ideal para ti o tu equipo.",
    servicio: "Personalizada",
  },
  calma: {
    t: "Ritual de Calma",
    d: "Sonoterapia, breathwork suave, caminata y una cena consciente. Lo que necesitas para resetear.",
    servicio: "Umbral",
  },
  conexion: {
    t: "Vínculos que importan",
    d: "Experiencia privada o grupo pequeño con prácticas que abren conversación, cuerpo y corazón.",
    servicio: "Personalizada",
  },
  impacto: {
    t: "Alto Impacto",
    d: "Ice bath + fire walking + breathwork. El cuerpo despierta, la mente cede. Para ir en serio.",
    servicio: "Reset en Frío",
  },
  masivo: {
    t: "Programa a medida",
    d: "Diseñamos un programa completo para tu hotel, evento o grupo corporativo. Hablemos de escala.",
    servicio: "Personalizada",
  },
};

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ t: string; d: string; servicio: string } | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const choose = (tag: string) => {
    const next = { ...scores, [tag]: (scores[tag] || 0) + 1 };
    setScores(next);
    setTimeout(() => {
      if (step < preguntas.length - 1) {
        setStep(step + 1);
      } else {
        // Calcular resultado
        let chosen = "energia";
        let best = -1;
        if (next.masivo) chosen = "masivo";
        else {
          for (const k of Object.keys(next)) {
            if (next[k] > best) {
              best = next[k];
              chosen = k;
            }
          }
        }
        const map: Record<string, string> = {
          energia: "energia",
          calma: "calma",
          conexion: "conexion",
          impacto: "impacto",
          individual: "energia",
          pequeno: "conexion",
          equipo: "conexion",
          masivo: "masivo",
          express: "energia",
          medio: "calma",
          dia: "conexion",
          retiro: "impacto",
          suave: "calma",
          intenso: "impacto",
          sonido: "calma",
          consciente: "conexion",
        };
        setResult(resultMap[map[chosen] || "energia"]);
      }
    }, 300);
  };

  const restart = () => {
    setStep(0);
    setScores({});
    setResult(null);
    setEmail("");
    setSent(false);
  };

  const submitLead = async () => {
    if (!email.trim()) return;
    setSending(true);
    await captureLead({
      channel: "experiencias_quiz",
      email: email.trim(),
      message: `Quiz: ${result?.t} (${result?.servicio})`,
      metadata: { quiz_result: result?.t, servicio: result?.servicio },
    });
    setSending(false);
    setSent(true);
  };

  return (
    <section id="quiz" className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Descubre tu experiencia
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
            60 segundos.
            <br />
            <span className="italic text-ochre">Una experiencia para ti.</span>
          </h2>
          <p className="mt-4 text-ink/70">
            4 preguntas para recomendarte la combinación que mejor resuena con
            lo que necesitas ahora.
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Progreso */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-2 bg-sand rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-ochre"
                  animate={{
                    width: `${((step + (result ? 1 : 0)) / preguntas.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-sm text-ink/50 font-medium">
                {result ? "Listo" : `${step + 1} / ${preguntas.length}`}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-2xl font-bold text-forest mb-6">
                    {preguntas[step].q}
                  </h3>
                  <div className="space-y-3">
                    {preguntas[step].options.map((o, i) => (
                      <button
                        key={o.tag}
                        onClick={() => choose(o.tag)}
                        className="w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 border-sand hover:border-ochre hover:bg-ochre/5 transition-colors group"
                      >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-forest text-cream text-sm font-bold group-hover:bg-ochre group-hover:text-ink transition-colors">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="font-medium text-ink/80">{o.l}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-ochre uppercase tracking-widest text-xs font-bold mb-2">
                    Tu experiencia ideal
                  </p>
                  <h3 className="font-serif text-3xl font-bold text-forest mb-3">
                    {result.t}
                  </h3>
                  <p className="text-ink/70 mb-6">{result.d}</p>

                  {!sent ? (
                    <div>
                      <p className="text-sm text-ink/60 mb-3">
                        Déjanos tu email y te enviamos la propuesta con precio
                        y disponibilidad:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="flex-1 px-4 py-3 rounded-full border-2 border-sand focus:border-ochre outline-none"
                        />
                        <button
                          onClick={submitLead}
                          disabled={sending || !email.trim()}
                          className="bg-forest text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest-light transition-colors disabled:opacity-50"
                        >
                          {sending ? "Enviando…" : "Recibir propuesta →"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-ochre/10 border border-ochre/30 rounded-2xl p-4 text-center">
                      <p className="font-semibold text-forest">
                        ¡Listo! Te escribimos en menos de 24h. ✨
                      </p>
                    </div>
                  )}

                  <button
                    onClick={restart}
                    className="mt-6 text-sm text-ink/50 hover:text-ochre transition-colors"
                  >
                    ↺ Repetir quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
