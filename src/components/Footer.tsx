export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-2xl font-bold">Serana</p>
            <p className="text-cream/60 text-sm mt-1">
              Alimentación y experiencias conscientes · Medellín · Oriente
              Antioqueño
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-cream/70">
            <a href="https://serana.food" className="hover:text-ochre transition-colors">
              Tienda
            </a>
            <a
              href="https://instagram.com/serana.food"
              className="hover:text-ochre transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:hola@serana.social"
              className="hover:text-ochre transition-colors"
            >
              hola@serana.social
            </a>
          </div>
        </div>
        <p className="text-center text-cream/40 text-xs mt-8">
          © 2026 Serana · Diseñado y construido con intención
        </p>
      </div>
    </footer>
  );
}
