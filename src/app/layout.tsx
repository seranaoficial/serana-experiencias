import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serana Experiencias — El bienestar se vive, no se explica",
  description:
    "Diseñamos experiencias de bienestar transformadoras: tours predeterminados (Cerro Tusa, Reset en Frío, Umbral), experiencias personalizadas y membresía de transformación de 90 días. Medellín y Oriente Antioqueño.",
  keywords: [
    "Serana",
    "experiencias de bienestar",
    "Cerro Tusa",
    "ice bath",
    "retiros",
    "Medellín",
    "Oriente Antioqueño",
    "yoga",
    "sonoterapia",
  ],
  openGraph: {
    title: "Serana Experiencias — El bienestar se vive, no se explica",
    description:
      "Tours, experiencias personalizadas y membresía de transformación. Separa tu cupo.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
