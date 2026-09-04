"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/cerro-tusa.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-aerial.mp4" type="video/mp4" />
      </video>

      {/* Overlay de gradiente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-ochre tracking-[0.3em] uppercase text-sm font-medium mb-6"
        >
          Experiencias Serana
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
        >
          El bienestar
          <br />
          <span className="italic text-ochre">se vive,</span>
          <br />
          no se explica.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg sm:text-xl text-cream/80 max-w-2xl mx-auto"
        >
          Diseñamos experiencias de alto impacto para personas y equipos que
          entienden que cuidar el cuerpo, la mente y las emociones no es un
          lujo: es el camino.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#tours"
            className="bg-ochre text-ink px-8 py-4 rounded-full font-semibold text-lg hover:bg-ochre-light transition-colors"
          >
            Descubre las experiencias →
          </a>
          <a
            href="#quiz"
            className="border-2 border-cream/40 text-cream px-8 py-4 rounded-full font-semibold text-lg hover:border-ochre hover:text-ochre transition-colors"
          >
            Encuentra la tuya
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-ochre"
        />
      </motion.div>
    </section>
  );
}
