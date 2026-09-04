"use client";

import { ejemplos } from "@/data/servicios";
import Reveal from "./Reveal";

export default function Ejemplos() {
  return (
    <section id="ejemplos" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-4">
            Ejemplos reales
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
            Así se ve
            <br />
            <span className="italic text-ochre">una experiencia Serana</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {ejemplos.map((e, i) => (
            <Reveal key={e.nombre} delay={i * 0.15}>
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow h-full">
                <div className="text-5xl mb-4">{e.emoji}</div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-3">
                  {e.nombre}
                </h3>
                <p className="text-ink/70 leading-relaxed">{e.descripcion}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
