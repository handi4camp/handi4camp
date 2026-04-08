"use client";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import NewsCard from "@/components/news-card";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type GalleryYear = {
  year: number;
  photos: PolaroidPhoto[];
};

const galleryYears: GalleryYear[] = [
  {
    year: 2024,
    photos: [
      { src: "", alt: "Zahajovací ceremonie 2024", rotation: -2 },
      { src: "", alt: "Plavání 2024", rotation: 1 },
      { src: "", alt: "Rehabilitace na louce", rotation: -1 },
      { src: "", alt: "Výlet na Pálavu", rotation: 2 },
      { src: "", alt: "Večerní posezení", rotation: -3 },
    ],
  },
  {
    year: 2023,
    photos: [
      { src: "", alt: "Kempové hry 2023", rotation: 1 },
      { src: "", alt: "Fyzioterapie 2023", rotation: -2 },
      { src: "", alt: "Výlet do lesa", rotation: 2 },
    ],
  },
];

const samplePosts = [
  {
    title: "Ročník 2024: Jubilejní dvacítka za námi",
    date: "2024-08-20T00:00:00.000Z",
    excerpt:
      "Dvacátý ročník Handi4Camp se vydařil nad očekávání. Dvanáct úsměvů, desítky nezapomenutelných momentů a skvělý tým asistentů.",
    href: "/galerie",
  },
];

export default function GaleriePage() {
  const [activeYear, setActiveYear] = useState(galleryYears[0].year);
  const activeGallery = galleryYears.find((g) => g.year === activeYear)!;

  return (
    <>
      <PageHero
        title="Galerie & Aktuality"
        subtitle="Vzpomínky, příběhy a okamžiky z každého ročníku."
      />

      {/* Galerie */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6">Galerie</h2>
          {/* Year tabs */}
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
          <PolaroidGallery photos={activeGallery.photos} />
        </div>
      </section>

      {/* Aktuality */}
      <section className="py-16 bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">Aktuality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePosts.map((post) => (
              <NewsCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
