"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import Link from "next/link";
import Hero from "@/components/hero";
import StatBar from "@/components/stat-bar";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type HomeQuery = Awaited<ReturnType<typeof client.queries.home>>;
type GlobalQuery = Awaited<ReturnType<typeof client.queries.global>>;

const photos: PolaroidPhoto[] = [
  { src: "/images/handicamp-foto-07.webp", alt: "Výtvarná dílna", rotation: -2 },
  { src: "/images/handicamp-foto-13.webp", alt: "Radost na táboře", rotation: 1 },
  { src: "/images/handicamp-foto-06.webp", alt: "Malování na kempu", rotation: -1 },
  { src: "/images/handicamp-foto-19.webp", alt: "Společná chvíle", rotation: 2 },
  { src: "/images/handicamp-foto-08.webp", alt: "Chvíle radosti", rotation: -3 },
  { src: "/images/handicamp-foto-17.webp", alt: "Odpoledne venku", rotation: 1 },
  { src: "/images/handicamp-foto-14.webp", alt: "Plavání při západu slunce", rotation: -2 },
  { src: "/images/handicamp-foto-16.webp", alt: "Pohyb a smích", rotation: 3 },
  { src: "/images/handicamp-foto-20.webp", alt: "Přátelství na kempu", rotation: -1 },
  { src: "/images/handicamp-foto-28.webp", alt: "Letní program", rotation: 2 },
  { src: "/images/handicamp-foto-24.webp", alt: "Tým pohromadě", rotation: -2 },
  { src: "/images/handicamp-foto-15.webp", alt: "Kreativní dílna", rotation: 1 },
  { src: "/images/handicamp-foto-12.webp", alt: "Venkovní aktivity", rotation: -3 },
  { src: "/images/handicamp-foto-25.webp", alt: "Večerní program", rotation: 2 },
  { src: "/images/handicamp-foto-18.webp", alt: "Vzpomínka na kamp", rotation: -1 },
];

const sponsors = [
  { name: "Rotary Club Valtice Břeclav", logo: "/images/partners/valtice.png", website: "https://rotary.cz" },
  { name: "Skupina ČEZ", logo: "/images/partners/cez.png", website: "https://cez.cz" },
  { name: "Sportisimo", logo: "/images/partners/sportisimo.svg", website: "https://sportisimo.cz" },
];

export default function Home() {
  const [homeData, setHomeData] = useState<HomeQuery | null>(null);
  const [globalData, setGlobalData] = useState<GlobalQuery | null>(null);

  useEffect(() => {
    client.queries.home({ relativePath: "home.md" }).then(setHomeData);
    client.queries.global({ relativePath: "global.md" }).then(setGlobalData);
  }, []);

  const { data: hData } = useTina(
    homeData ?? { query: "", variables: {}, data: null as any }
  );
  const { data: gData } = useTina(
    globalData ?? { query: "", variables: {}, data: null as any }
  );

  if (!homeData || !globalData) return null;

  const h = hData.home;
  const g = gData.global;

  return (
    <>
      <Hero
        headline={h.heroHeadline ?? ""}
        subtext={h.heroSubtext ?? ""}
        cta1Label={h.heroCta1Label ?? ""}
        cta1Href={h.heroCta1Href ?? "/jak-pomoci#darovani"}
        cta2Label={h.heroCta2Label ?? ""}
        cta2Href={h.heroCta2Href ?? "/jak-pomoci#sponzoring"}
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">{h.storyHeading}</h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">{h.storyBody}</p>
          <blockquote className="border-l-4 border-gold pl-4 text-left italic text-dark/70 my-6 mx-auto max-w-xl">
            „{h.storyQuote}" — {h.storyQuoteAuthor}
          </blockquote>
          <Link
            href="/o-kempu"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            {h.storyLinkLabel}
          </Link>
        </div>
      </section>

      <StatBar stats={(g.stats ?? []).map((s: any) => ({ value: s.value ?? "", label: s.label ?? "" }))} />

      <section className="pt-12 pb-8 bg-warm-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 text-center">
          <h2 className="font-serif text-2xl font-bold">{h.photoStripHeading}</h2>
        </div>
        <PolaroidGallery photos={photos} />
        <div className="text-center pb-4">
          <Link
            href="/galerie"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Prohlédnout celou galerii →
          </Link>
        </div>
      </section>

      <Rozcestnik
        heading={h.rozcestnikHeading ?? ""}
        subheading={h.rozcestnikSubheading ?? ""}
        cards={(h.rozcestnikCards ?? []).map((c: any) => ({ title: c.title ?? "", description: c.description ?? "" }))}
        sponsors={sponsors}
      />
    </>
  );
}
