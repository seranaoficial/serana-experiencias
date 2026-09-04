"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tours, formatCOP } from "@/data/servicios";
import { captureLead } from "@/lib/supabase";
import Reveal from "./Reveal";

type ServicioSel = {
  id: string;
  nombre: string;
  precio: number | null;
  precioLabel: string;
};

export default function SepararCupo() {
  const [servicio, setServicio] = useState<ServicioSel | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [personas, setPersonas] = useState(1);
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "exito" | "error">(
    "idle",
  );
  const [pagoUrl, setPagoUrl] = useState<string | null>(null);
  const [pagoEstado, setPagoEstado] = useState<"idle" | "cargando" | "proximo">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!servicio) return;
    setEstado("enviando");

    // 1. Capturar lead en Supabase (siempre)
    const leadId = await captureLead({
      channel: "experiencias_separar_cupo",
      full_name: nombre,
      email,
      phone: telefono,
      message: `${servicio.nombre} · ${personas} persona(s) · ${fecha || "fecha por definir"} · ${mensaje}`,
      metadata: {
        servicio: servicio.id,
        servicio_nombre: servicio.nombre,
        personas,
        fecha,
      },
    });

    // 2. Si hay precio, intentar crear preferencia de pago
    if (servicio.precio && leadId) {
      try {
        const res = await fetch("/api/mp/preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `Cupo ${servicio.nombre} · Serana Experiencias`,
            unit_price: servicio.precio,
            quantity: personas,
            email,
            name: nombre,
          }),
        });
        const data = await res.json();
        if (data.init_point) {
          setPagoUrl(data.init_point);
        }
      } catch {
        // Si falla el pago, igual se capturó el lead
      }
    }

    setEstado("exito");
  };

  const handlePagar = () => {
    if (pagoUrl) {
      window.open(pagoUrl, "_blank", "noopener,noreferrer");
    } else {
      setPagoEstado("proximo");
    }
  };

  return (
    <section id="separar" className="py-24 bg-forest text-cream">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Separa tu cupo
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            Tu experiencia
            <br />
            <span className="italic text-ochre">te está esperando</span>
          </h2>
          <p className="mt-4 text-cream/70 max-w-2xl mx-auto">
            Elige tu experiencia, cuéntanos cuándo y cuántos son. Te
            contactamos en menos de 24h para confirmar disponibilidad y
            reservar tu cupo.
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-white text-ink rounded-3xl shadow-2xl overflow-hidden">
            {/* Selector de servicio */}
            <div className="p-8 border-b border-sand">
              <p className="text-sm font-semibold text-forest mb-4">
                1. Elige tu experiencia
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {tours.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setServicio({
                        id: t.id,
                        nombre: t.nombre,
                        precio: t.precio,
                        precioLabel: t.precioLabel,
                      });
                      setPagoUrl(null);
                      setPagoEstado("idle");
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      servicio?.id === t.id
                        ? "border-ochre bg-ochre/10"
                        : "border-sand hover:border-ochre/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{t.emoji}</div>
                    <p className="font-semibold text-sm text-forest">
                      {t.nombre}
                    </p>
                    <p className="text-xs text-ink/50 mt-1">{t.precioLabel}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <p className="text-sm font-semibold text-forest">
                2. Tus datos
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre completo"
                  className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none"
                />
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="WhatsApp"
                  className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none"
                />
                <input
                  type="number"
                  min={1}
                  value={personas}
                  onChange={(e) => setPersonas(Number(e.target.value))}
                  placeholder="Nº de personas"
                  className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none w-full"
                />
              </div>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
                placeholder="Cuéntanos un poco más (opcional)"
                className="px-4 py-3 rounded-xl border-2 border-sand focus:border-ochre outline-none w-full"
              />

              <AnimatePresence>
                {estado === "exito" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-ochre/10 border border-ochre/30 rounded-2xl p-5"
                  >
                    <p className="font-semibold text-forest">
                      ¡Solicitud recibida! ✨
                    </p>
                    <p className="text-sm text-ink/70 mt-1">
                      Tu cupo quedó reservado. Te contactamos en menos de 24h
                      para confirmar.
                    </p>

                    {/* Botón de pago — siempre interactivo */}
                    {servicio?.precio && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handlePagar}
                          disabled={pagoEstado === "cargando"}
                          className="w-full bg-forest text-cream py-3.5 rounded-full font-semibold hover:bg-forest-light transition-colors disabled:opacity-50"
                        >
                          {pagoEstado === "cargando"
                            ? "Preparando pago…"
                            : `Pagar seña · ${formatCOP(servicio.precio * personas)}`}
                        </button>
                        <p className="text-xs text-ink/50 mt-2 text-center">
                          Seña para asegurar tu cupo · Pago seguro con
                          MercadoPago
                        </p>

                        {pagoEstado === "proximo" && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-3 text-sm text-ochre bg-ochre/10 border border-ochre/30 rounded-xl p-3 text-center"
                          >
                            El pago en línea se activa muy pronto. Tu cupo ya
                            quedó reservado — te contactamos para coordinar la
                            seña. 💛
                          </motion.p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
                {estado === "error" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm"
                  >
                    Hubo un error. Intenta de nuevo o escríbenos a
                    hola@serana.social
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={estado === "enviando" || !servicio}
                className="w-full bg-ochre text-ink py-4 rounded-full font-semibold text-lg hover:bg-ochre-light transition-colors disabled:opacity-50"
              >
                {estado === "enviando"
                  ? "Enviando…"
                  : servicio?.precio
                    ? `Separar cupo · ${formatCOP(servicio.precio * personas)}`
                    : "Solicitar cupo →"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
