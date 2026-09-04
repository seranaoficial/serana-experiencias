"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#tours", label: "Tours" },
  { href: "#personalizadas", label: "Personalizadas" },
  { href: "#membresia", label: "Membresía" },
  { href: "#quiz", label: "Quiz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-forest/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-cream tracking-tight">
            Serana
          </span>
          <span className="text-ochre font-light text-sm hidden sm:inline">
            Experiencias
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-cream/80 hover:text-ochre transition-colors text-sm font-medium tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#separar"
              className="bg-ochre text-ink px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-ochre-light transition-colors"
            >
              Separar cupo
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-cream text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-forest/95 backdrop-blur-md px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-cream/90 hover:text-ochre transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#separar"
                onClick={() => setOpen(false)}
                className="bg-ochre text-ink px-5 py-2.5 rounded-full font-semibold inline-block"
              >
                Separar cupo
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
