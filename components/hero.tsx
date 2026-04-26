"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";

const slides = [
  { src: "/images/handicamp-foto-03.webp", label: "Léto plné pohybu" },
  { src: "/images/handicamp-foto-11.webp", label: "Rehabilitace v přírodě" },
  { src: "/images/handicamp-foto-10.webp", label: "Společné chvíle" },
  { src: "/images/handicamp-foto-01.webp", label: "Tým asistentů" },
];

type HeroProps = {
  headline: string;
  subtext: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
  tinaFields?: { headline?: string; subtext?: string; cta1Label?: string; cta2Label?: string };
};

export default function Hero({ headline, subtext, cta1Label, cta1Href, cta2Label, cta2Href, tinaFields }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden">
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

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/80 via-dark/50 to-transparent pointer-events-none" />


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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 text-warm-white">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]" data-tina-field={tinaFields?.headline}>
          {headline}
        </h1>
        <p className="text-base md:text-lg mb-8 max-w-2xl text-warm-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.8)]" data-tina-field={tinaFields?.subtext}>
          {subtext}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={cta1Href}
            className="bg-gold text-dark font-bold px-8 py-3 rounded-lg text-lg hover:bg-gold/90 transition-colors"
            data-tina-field={tinaFields?.cta1Label}
            onClick={() => posthog.capture("hero_cta_clicked", { cta: "primary", label: cta1Label, href: cta1Href })}
          >
            {cta1Label}
          </Link>
          <Link
            href={cta2Href}
            className="border-2 border-warm-white text-warm-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-warm-white/10 transition-colors"
            data-tina-field={tinaFields?.cta2Label}
            onClick={() => posthog.capture("hero_cta_clicked", { cta: "secondary", label: cta2Label, href: cta2Href })}
          >
            {cta2Label}
          </Link>
        </div>
      </div>
    </section>
  );
}
