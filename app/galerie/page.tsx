"use client";
import { useState, useEffect } from "react";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import NewsCard from "@/components/news-card";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";
import { client } from "@/tina/__generated__/client";

type GalleryYear = {
  year: number;
  photos: PolaroidPhoto[];
};

type Post = {
  title: string;
  date: string;
  excerpt?: string | null;
  coverImage?: string | null;
  slug: string;
};

const galleryYears: GalleryYear[] = [
  {
    year: 2024,
    photos: [
      { src: "/images/Handicamp_socky_2025-173.jpg", alt: "Společná fotografie 2024", rotation: -2 },
      { src: "/images/Handicamp_socky_2025-78.jpg", alt: "Odpoledne u kempu", rotation: 1 },
      { src: "/images/IMG_0992.jpg", alt: "Výlet do pivovaru", rotation: -1 },
      { src: "/images/IMG_1939.jpg", alt: "Večer maskotů", rotation: 2 },
      { src: "/images/IMG_4366.jpg", alt: "Výtvarná dílna", rotation: -3 },
    ],
  },
  {
    year: 2023,
    photos: [
      { src: "/images/IMG_1521.jpg", alt: "Pohoda u vody", rotation: 1 },
      { src: "/images/IMG_1523.jpg", alt: "Letní nálada", rotation: -2 },
    ],
  },
];

export default function GaleriePage() {
  const [activeYear, setActiveYear] = useState(galleryYears[0].year);
  const activeGallery = galleryYears.find((g) => g.year === activeYear)!;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    client.queries.postConnection().then((res) => {
      const edges = res.data.postConnection.edges ?? [];
      setPosts(
        edges
          .filter((e) => e?.node)
          .map((e) => ({
            title: e!.node!.title,
            date: e!.node!.date,
            excerpt: e!.node!.excerpt,
            coverImage: e!.node!.coverImage,
            slug: e!.node!._sys.filename,
          }))
      );
    });
  }, []);

  return (
    <>
      <PageHero
        title="Galerie & Aktuality"
        subtitle="Vzpomínky, příběhy a okamžiky z každého ročníku."
        imageSrc="/images/Handicamp_socky_2025-175.jpg"
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
            {posts.map((post) => (
              <NewsCard
                key={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt ?? undefined}
                coverImage={post.coverImage ?? undefined}
                href={`/galerie/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
