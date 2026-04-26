"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "@/tina/__generated__/client";
import type {
  PostQuery,
  PostQueryVariables,
  GalleryConnectionQuery,
  GalleryConnectionQueryVariables,
} from "@/tina/__generated__/types";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

// ── Gallery year ──────────────────────────────────────────────────────────────

type GalleryTinaData = {
  data: GalleryConnectionQuery;
  variables: GalleryConnectionQueryVariables;
  query: string;
};

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function GalleryYearView({ year, tinaData }: { year: number; tinaData: GalleryTinaData }) {
  const { data } = tinaData;

  const years = (data.galleryConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => n != null)
    .sort((a, b) => b.year - a.year);

  const activeGallery = years.find((y) => y.year === year) ?? years[0];
  const videoId = activeGallery?.youtubeUrl ? extractYoutubeId(activeGallery.youtubeUrl) : null;

  const photos: PolaroidPhoto[] = (activeGallery?.photos ?? [])
    .filter((s): s is string => s != null)
    .map((src, i) => ({
      src,
      alt: `Foto z HandiCampu ${year} - ${i + 1}`,
    }));

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
            {years.map((g) => (
              <Link
                key={g.year}
                href={`/galerie/${g.year}`}
                role="tab"
                aria-selected={g.year === year}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  g.year === year
                    ? "bg-forest text-warm-white"
                    : "bg-light-green text-dark hover:bg-forest/10"
                }`}
              >
                {g.year}
              </Link>
            ))}
          </div>

          {videoId && (
            <div className="mb-10 max-w-xl mx-auto">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`HandiCamp ${year} — video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          <PolaroidGallery photos={photos} layout="grid" />
        </div>
      </section>
    </>
  );
}

function GalleryYearFetcher({ year }: { year: number }) {
  const [tinaData, setTinaData] = useState<GalleryTinaData | null>(null);

  useEffect(() => {
    client.queries.galleryConnection({ first: 100 }).then(setTinaData);
  }, []);

  if (!tinaData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-dark/40 text-sm">
        Načítám…
      </div>
    );
  }

  return <GalleryYearView year={year} tinaData={tinaData} />;
}

// ── Blog post ─────────────────────────────────────────────────────────────────

type PostTinaData = {
  data: PostQuery;
  variables: PostQueryVariables;
  query: string;
};

function PostView({ tinaData }: { tinaData: PostTinaData }) {
  const { data } = tinaData;
  const post = data.post;

  return (
    <article className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/galerie"
          className="text-forest font-semibold hover:text-dark transition-colors text-sm mb-8 inline-block"
        >
          ← Zpět na aktuality
        </Link>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />
        )}

        <time className="text-xs text-dark/50 mb-3 block">
          {new Date(post.date).toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h1 className="font-serif text-4xl font-bold text-dark mb-8 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-dark/70 mb-8 leading-relaxed border-l-4 border-gold pl-4">
            {post.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none text-dark/80 leading-relaxed">
          <TinaMarkdown content={post.body} />
        </div>
      </div>
    </article>
  );
}

function PostFetcher({ slug }: { slug: string }) {
  const [tinaData, setTinaData] = useState<PostTinaData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    client.queries
      .post({ relativePath: `${slug}.md` })
      .then(setTinaData)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-dark/60">
        <p className="font-serif text-2xl">Článek nebyl nalezen.</p>
        <Link href="/galerie" className="text-forest font-semibold hover:text-dark transition-colors">
          ← Zpět na galerii
        </Link>
      </div>
    );
  }

  if (!tinaData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-dark/40 text-sm">
        Načítám…
      </div>
    );
  }

  return <PostView tinaData={tinaData} />;
}

// ── Router ────────────────────────────────────────────────────────────────────

export default function SlugPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? "");

  const year = /^\d{4}$/.test(slug) ? Number(slug) : null;

  if (year) {
    return <GalleryYearFetcher year={year} />;
  }

  return <PostFetcher slug={slug} />;
}
