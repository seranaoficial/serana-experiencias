"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { tours, formatCOP } from "@/data/servicios";
import Reveal from "./Reveal";

export default function Tours() {
  return (
    <section id="tours" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Modalidad 1 · Tours predeterminados
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
            Experiencias que te llevan
            <br />
            <span className="italic text-ochre">a un destino y un objetivo</span>
          </h2>
          <p className="mt-4 text-ink/70 max-w-2xl mx-auto">
            Tres inmersiones diseñadas para vivir una transformación. Elige la
            tuya y separa tu cupo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {tours.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.15}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${
                  t.destacado ? "ring-2 ring-ochre" : ""
                }`}
              >
                {t.destacado && (
                  <span className="absolute top-4 right-4 z-10 bg-ochre text-ink text-xs font-bold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                )}

                {/* Imagen */}
                <div className="relative h-56 bg-forest overflow-hidden">
                  {t.imagen && t.id !== "umbral" ? (
                    <Image
                      src={t.imagen}
                      alt={t.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {t.emoji}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-cream">
                    <p className="text-xs uppercase tracking-widest opacity-80">
                      {t.tagline}
                    </p>
                    <h3 className="font-serif text-2xl font-bold">{t.nombre}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-ink/60 mb-3">
                    <span>⏱ {t.duracion}</span>
                    <span>·</span>
                    <span>📍 {t.lugar}</span>
                  </div>
                  <p className="text-ink/70 text-sm leading-relaxed mb-4">
                    {t.descripcion}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-ink/50 uppercase tracking-wide">
                        {t.precioPareja ? "Desde" : "Precio"}
                      </p>
                      <p className="font-serif text-2xl font-bold text-forest">
                        {t.precioLabel}
                      </p>
                      {t.precioPareja && (
                        <p className="text-xs text-ink/50">
                          Pareja: {formatCOP(t.precioPareja)}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-ochre font-medium mb-4">
                    {t.grupoMin}
                  </p>

                  <a
                    href="#separar"
                    className="block w-full text-center bg-forest text-cream py-3 rounded-full font-semibold hover:bg-forest-light transition-colors"
                  >
                    Separar cupo →
                  </a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
