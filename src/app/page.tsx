import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tours from "@/components/Tours";
import Personalizadas from "@/components/Personalizadas";
import Membresia from "@/components/Membresia";
import Quiz from "@/components/Quiz";
import Ejemplos from "@/components/Ejemplos";
import SepararCupo from "@/components/SepararCupo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Tours />
        <Personalizadas />
        <Membresia />
        <Quiz />
        <Ejemplos />
        <SepararCupo />
      </main>
      <Footer />
    </>
  );
}
