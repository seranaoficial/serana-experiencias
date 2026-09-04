"use client";

import { membresia, formatCOP } from "@/data/servicios";
import Reveal from "./Reveal";

export default function Membresia() {
  return (
    <section id="membresia" className="py-24 bg-ochre/10">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Modalidad 3 · Membresía
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
            {membresia.nombre}
          </h2>
          <p className="mt-4 text-ink/70 max-w-2xl mx-auto">
            {membresia.descripcion}
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
            {/* Panel precio */}
            <div className="bg-forest text-cream p-10 flex flex-col justify-center">
              <div className="text-6xl mb-6">{membresia.emoji}</div>
              <p className="text-ochre uppercase tracking-widest text-sm mb-2">
                Inversión
              </p>
              <p className="font-serif text-5xl font-bold mb-2">
                {membresia.precioLabel}
              </p>
              <p className="text-cream/60 text-sm mb-8">
                Plan de transformación de 90 días
              </p>
              <a
                href="#separar"
                className="bg-ochre text-ink px-8 py-4 rounded-full font-semibold text-center hover:bg-ochre-light transition-colors"
              >
                Quiero transformarme →
              </a>
            </div>

            {/* Panel incluye */}
            <div className="p-10">
              <h3 className="font-serif text-2xl font-bold text-forest mb-6">
                Todo lo que incluye
              </h3>
              <ul className="space-y-3">
                {membresia.incluye.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink/80"
                  >
                    <span className="text-ochre font-bold mt-0.5">✓</span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
