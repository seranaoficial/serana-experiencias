// Fuente de verdad de la oferta de SERANA Experiencias.
// Basado en Broschureexperiencias.docx (04/sep/2026).

export type Servicio = {
  id: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  precio: number | null; // COP por persona (null = cotizar)
  precioPareja: number | null;
  precioLabel: string;
  grupoMin: string;
  duracion: string;
  lugar: string;
  incluye: string[];
  destacado?: boolean;
  imagen: string;
  emoji: string;
};

// MODALIDAD 1 · Tours/Experiencias Predeterminados
export const tours: Servicio[] = [
  {
    id: "cerro-tusa",
    nombre: "Conecta con la Pirámide Natural",
    tagline: "Cerro Tusa",
    descripcion:
      "Inmersión de un día para otro en la naturaleza para conectar contigo mismo y con los demás. Trekking, meditación, paisajes increíbles, experiencias sensoriales, fogata, yoga y breathwork. Busca el equilibrio, calibrar tu energía y retornar a tu tranquilidad.",
    precio: 880000,
    precioPareja: 1560000,
    precioLabel: "$880.000 / cupo",
    grupoMin: "Mínimo 15 personas",
    duracion: "1 día / 1 noche",
    lugar: "Cerro Tusa, Antioquia",
    incluye: [
      "Guía + seguro",
      "Foto con dron",
      "Fiambre Serana y snacks saludables",
      "Parqueo + transporte (ida y vuelta, base montaña)",
      "Estadía Villa Venecia + desayuno día siguiente",
      "DJ · Sonoterapia",
      "Experiencia sensorial nocturna",
      "Cena y fogata",
      "Souvenir / recordatorio",
      "Facilitador clase experiencial + coordinador logístico",
    ],
    destacado: true,
    imagen: "/images/cerro-tusa.jpg",
    emoji: "⛰️",
  },
  {
    id: "reset-frio",
    nombre: "Reset en Frío",
    tagline: "Inmersión en hielo",
    descripcion:
      "Espacio de bienestar y conexión con herramientas de respiración, presencia, gestión emocional y resiliencia. Fortalece la tranquilidad, la confianza y la disposición positiva para la vida personal y laboral.",
    precio: null,
    precioPareja: null,
    precioLabel: "Cotizar",
    grupoMin: "Mínimo 15 · hasta 30 personas",
    duracion: "2 a 3 horas",
    lugar: "Poblado · Copacabana, Antioquia",
    incluye: [
      "Diseño y facilitación completa del espacio",
      "Facilitador principal + cofacilitador de apoyo",
      "Dos tinas para inmersión en hielo",
      "Charla teórico-práctica (mente, creencias, emociones)",
      "Meditación de la confianza (guiada)",
      "Respiración consciente previa a la inmersión",
      "Inmersión en hielo guiada y acompañada (1–5 min)",
      "Círculo de palabra e integración grupal",
      "Protocolos de seguridad + consentimiento informado",
    ],
    imagen: "/images/reset-frio.jpg",
    emoji: "🧊",
  },
  {
    id: "umbral",
    nombre: "Umbral",
    tagline: "Paso de un estado a otro",
    descripcion:
      "Arte, alimentación saludable, naturaleza, música, silencio y creación colectiva en una jornada para detenerse, cambiar de ritmo y relacionarse de manera más sensible con uno mismo, los demás y el entorno. No necesitas saber pintar.",
    precio: 380000,
    precioPareja: 650000,
    precioLabel: "$380.000 / persona",
    grupoMin: "Grupo íntimo de 20 a 30 personas",
    duracion: "1 día",
    lugar: "Santuario, Antioquia",
    incluye: [
      "Círculo de bienvenida",
      "Recorrido de arte y silencio",
      "Experiencia creativa guiada",
      "Pausa Serana",
      "La mesa Serana (alimentación consciente)",
      "Cadáver exquisito expandido",
      "Atardecer, música y libertad",
      "La palabra alrededor del fuego",
      "La obra encendida",
    ],
    imagen: "/images/umbral.jpg",
    emoji: "🎨",
  },
];

// MODALIDAD 2 · Experiencias Personalizadas
export const lineasPersonalizadas = [
  {
    id: "corporativa",
    num: "L01",
    nombre: "Corporativa",
    descripcion:
      "Para equipos que quieren reconectar, alinearse y volver a confiar. Day retreats, team building con propósito, wellness days.",
    emoji: "🏢",
  },
  {
    id: "privada",
    num: "L02",
    nombre: "Privada",
    descripcion:
      "Para ti y quienes importan. Cumpleaños, aniversarios, rituales de pareja, despedidas, momentos que merecen pausa.",
    emoji: "💛",
  },
  {
    id: "hoteles",
    num: "L03",
    nombre: "Hoteles",
    descripcion:
      "Programas de bienestar para huéspedes y aliados de hospitalidad. Yoga al amanecer, ice bath, menús conscientes.",
    emoji: "🏨",
  },
  {
    id: "naturaleza",
    num: "L04",
    nombre: "Naturaleza",
    descripcion:
      "Retiros en Oriente Antioqueño. Senderos, baños de río, fogatas, silencio. Reconecta con lo esencial.",
    emoji: "🌿",
  },
  {
    id: "alto-impacto",
    num: "L05",
    nombre: "Alto impacto",
    descripcion:
      "Fire walking, ice bath, sonoterapia, breathwork. Prácticas que rompen el piloto automático y despiertan.",
    emoji: "🔥",
  },
];

export const herramientas = [
  {
    nombre: "Movimiento consciente",
    items: [
      "Yoga al amanecer",
      "Yoga terapéutico",
      "Movilidad y respiración",
      "Caminatas meditativas",
      "Estiramientos guiados",
    ],
    emoji: "🧘",
  },
  {
    nombre: "Alto impacto",
    items: [
      "Ice bath / inmersión en frío",
      "Fire walking",
      "Breathwork avanzado",
      "Sauna + contraste",
    ],
    emoji: "🔥",
  },
  {
    nombre: "Mente y sonido",
    items: [
      "Sonoterapia con cuencos",
      "Meditación guiada",
      "Journaling",
      "Coaching individual y grupal",
    ],
    emoji: "🎵",
  },
  {
    nombre: "Gastronomía consciente",
    items: [
      "Catering plant-based",
      "Desayunos rituales",
      "Cenas de fuego",
      "Catación de jugos funcionales",
    ],
    emoji: "🍽️",
  },
];

export const formatos = [
  {
    tiempo: "1–2h",
    nombre: "Sesión express",
    descripcion:
      "Una práctica puntual: yoga, ice bath, breathwork. Ideal para pausas o previas a reuniones clave.",
  },
  {
    tiempo: "½ día",
    nombre: "Inmersión matinal o vespertina",
    descripcion:
      "2 a 3 herramientas + desayuno o cena consciente. Para grupos pequeños o individuales.",
  },
  {
    tiempo: "1 día",
    nombre: "Day retreat",
    descripcion:
      "Programa completo de 6 a 8 horas. Salida de ciudad, naturaleza, gastronomía, prácticas. Lo más pedido para equipos.",
  },
  {
    tiempo: "2+ días",
    nombre: "Retiro completo",
    descripcion:
      "Estadía, todas las comidas, programa a medida. Para transformaciones profundas o hitos de vida.",
  },
];

// MODALIDAD 3 · Membresía
export const membresia = {
  nombre: "Membresía · Plan de Transformación de 90 días",
  precio: 2980000,
  precioLabel: "$2.980.000",
  descripcion:
    "Un plan de transformación para cambiar tu vida: transformar mente, cuerpo y espíritu, mejorar hábitos, obtener resultados medibles y sentirte mejor contigo mismo, con tu entorno y con la vida.",
  incluye: [
    "Acompañamiento y diagnóstico con nutricionista, deportólogo o fisioterapeuta",
    "Acompañamiento con Coach o Psicólogo",
    "Acceso a eventos del mes de gran formato",
    "Charlas y talleres online",
    "Descuentos especiales de miembro con aliados",
    "Acceso a networking de alto nivel",
    "Una Ancheta Serana",
    "Asistente IA que te acompaña en el proceso",
    "Un ecosistema que te ofrece bienestar",
  ],
  emoji: "🌱",
};

export const ejemplos = [
  {
    nombre: "Reset Corporativo",
    descripcion:
      "Equipo de 12 personas, día completo en Oriente: yoga, ice bath, fogata y coaching sobre descanso y enfoque.",
    emoji: "🏢",
  },
  {
    nombre: "Ritual de Pareja",
    descripcion:
      "Aniversario: breathwork, cena consciente, sonoterapia privada. Reconectar desde el cuerpo.",
    emoji: "💛",
  },
  {
    nombre: "Hielo y Fuego",
    descripcion:
      "Sesión express para amigos: ice bath + fire walking. El cuerpo puede más de lo que la mente cree.",
    emoji: "🔥",
  },
];

export const formatCOP = (n: number) =>
  "$" + n.toLocaleString("es-CO").replace(/,/g, ".");
