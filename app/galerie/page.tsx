"use client";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type GalleryYear = {
  year: number;
  photos: PolaroidPhoto[];
};

const galleryYears: GalleryYear[] = [
  {
    year: 2024,
    photos: Array.from({ length: 28 }, (_, i) => ({
      src: `/images/handicamp-foto-${String(i + 1).padStart(2, "0")}.webp`,
      alt: `Foto z HandiCampu 2024 - ${i + 1}`,
      rotation: i % 2 === 0 ? -2 : 2,
    })),
  },
];

export default function GaleriePage() {
  const [activeYear, setActiveYear] = useState(galleryYears[0].year);
  const activeGallery = galleryYears.find((g) => g.year === activeYear)!;

  return (
    <>
      <PageHero
        title="Galerie"
        subtitle="Vzpomínky, příběhy a okamžiky z každého ročníku."
        imageSrc="/images/handicamp-foto-05.webp"
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-8 flex-wrap" role="tablist">
            {galleryYears.map((g) => (
              <button
                key={g.year}
                role="tab"
                aria-selected={g.year === activeYear}
                onClick={() => setActiveYear(g.year)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  g.year === activeYear
                    ? "bg-forest text-warm-white"
                    : "bg-light-green text-dark hover:bg-forest/10"
                }`}
              >
                {g.year}
              </button>
            ))}
          </div>
          <PolaroidGallery photos={activeGallery.photos} layout="grid" />
        </div>
      </section>
    </>
  );
}
