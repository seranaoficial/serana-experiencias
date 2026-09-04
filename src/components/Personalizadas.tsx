"use client";

import { lineasPersonalizadas, herramientas, formatos } from "@/data/servicios";
import Reveal from "./Reveal";

export default function Personalizadas() {
  return (
    <section id="personalizadas" className="py-24 bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Modalidad 2 · Experiencias personalizadas
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            Diseñamos experiencias
            <br />
            <span className="italic text-ochre">para ti y tu equipo</span>
          </h2>
          <p className="mt-4 text-cream/70 max-w-2xl mx-auto">
            Cuidar el cuerpo, la mente y las emociones no es un lujo: es el
            camino. Cinco líneas, cuatro herramientas, infinitas posibilidades.
          </p>
        </Reveal>

        {/* 5 Líneas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {lineasPersonalizadas.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.1}>
              <div className="bg-forest-light/40 rounded-2xl p-6 h-full hover:bg-forest-light/60 transition-colors">
                <div className="text-3xl mb-4">{l.emoji}</div>
                <p className="text-ochre text-xs font-bold mb-1">{l.num}</p>
                <h3 className="font-serif text-xl font-bold mb-2">{l.nombre}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {l.descripcion}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Herramientas */}
        <Reveal className="mb-20">
          <h3 className="font-serif text-3xl font-bold text-center mb-10">
            Cómo lo hacemos
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {herramientas.map((h) => (
              <div
                key={h.nombre}
                className="bg-cream/5 rounded-2xl p-6 border border-cream/10"
              >
                <div className="text-3xl mb-3">{h.emoji}</div>
                <h4 className="font-semibold mb-3 text-ochre">{h.nombre}</h4>
                <ul className="space-y-2">
                  {h.items.map((item) => (
                    <li
                      key={item}
                      className="text-cream/70 text-sm flex items-start gap-2"
                    >
                      <span className="text-ochre mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Formatos */}
        <Reveal>
          <h3 className="font-serif text-3xl font-bold text-center mb-10">
            Formatos y duración
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formatos.map((f) => (
              <div
                key={f.tiempo}
                className="bg-ochre/10 rounded-2xl p-6 border border-ochre/20"
              >
                <div className="font-serif text-3xl font-bold text-ochre mb-3">
                  {f.tiempo}
                </div>
                <h4 className="font-semibold mb-2">{f.nombre}</h4>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {f.descripcion}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="text-center mt-16">
          <a
            href="#separar"
            className="inline-block bg-ochre text-ink px-8 py-4 rounded-full font-semibold text-lg hover:bg-ochre-light transition-colors"
          >
            Diseñemos la tuya →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
