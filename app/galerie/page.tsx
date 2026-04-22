"use client";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type GalleryYear = {
  year: number;
  youtubeUrls?: string[];
  photos: PolaroidPhoto[];
};

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

const galleryYears: GalleryYear[] = [
  {
    year: 2025,
    youtubeUrls: [],
    photos: Array.from({ length: 28 }, (_, i) => ({
      src: `/images/handicamp-foto-${String(i + 1).padStart(2, "0")}.webp`,
      alt: `Foto z HandiCampu 2025 - ${i + 1}`,
      rotation: i % 2 === 0 ? -2 : 2,
    })),
  },
  {
    year: 2024,
    youtubeUrls: ["https://youtu.be/xRRjuz_516k"],
    photos: [],
  },
  {
    year: 2023,
    youtubeUrls: ["https://youtu.be/Xgv49IgqDtM"],
    photos: [],
  },
  {
    year: 2022,
    youtubeUrls: ["https://youtu.be/x0ryHIQOvf8"],
    photos: [],
  },
  {
    year: 2020,
    youtubeUrls: ["https://youtu.be/artBNdC6ocI"],
    photos: [],
  },
  {
    year: 2019,
    youtubeUrls: ["https://youtu.be/wKns8TIMNYk"],
    photos: [],
  },
];

export default function GaleriePage() {
  const [activeYear, setActiveYear] = useState(galleryYears[0].year);
  const activeGallery = galleryYears.find((g) => g.year === activeYear)!;
  const videoIds = (activeGallery.youtubeUrls ?? []).map(extractYoutubeId).filter(Boolean) as string[];

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

          {videoIds.length > 0 && (
            <div className={`mb-10 grid gap-6 ${videoIds.length > 1 ? "grid-cols-1 md:grid-cols-2 max-w-3xl" : "grid-cols-1 max-w-xl"} mx-auto`}>
              {videoIds.map((id) => (
                <div key={id} className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`HandiCamp ${activeGallery.year} — video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          <PolaroidGallery photos={activeGallery.photos} layout="grid" />
        </div>
      </section>
    </>
  );
}
