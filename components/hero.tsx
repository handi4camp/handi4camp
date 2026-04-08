"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { src: "/images/handicamp-foto-03.webp", label: "Léto plné pohybu" },
  { src: "/images/handicamp-foto-11.webp", label: "Rehabilitace v přírodě" },
  { src: "/images/handicamp-foto-10.webp", label: "Společné chvíle" },
  { src: "/images/handicamp-foto-01.webp", label: "Tým asistentů" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-end md:justify-start overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark-green overlay */}
      <div className="absolute inset-0 bg-forest/60" />

      {/* Slide indicator dots */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Snímek ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-gold w-6" : "bg-warm-white/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-0 md:mt-[50vh] text-warm-white">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Léto bez hranic —<br />již 20 let
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-warm-white/90">
          Každoročně dáváme 12 dětem s DMO léto, jaké si zaslouží. A jejich
          rodičům 10 dní zaslouženého oddychu.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/jak-pomoci#darovani"
            className="bg-gold text-dark font-bold px-8 py-3 rounded-lg text-lg hover:bg-gold/90 transition-colors"
          >
            Přispět
          </Link>
          <Link
            href="/jak-pomoci#sponzoring"
            className="border-2 border-warm-white text-warm-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-warm-white/10 transition-colors"
          >
            Stát se sponzorem
          </Link>
        </div>
      </div>

    </section>
  );
}
