"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
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
  { src: "/images/handicamp-foto-07.webp", alt: "Výtvarná dílna", rotation: -2, videoSrc: "/reel.mp4" },
  { src: "/images/handicamp-foto-25.webp", alt: "Večerní program", rotation: 2 },
  { src: "/images/handicamp-foto-06.webp", alt: "Malování na kempu", rotation: -1 },
  { src: "/images/handicamp-foto-17.webp", alt: "Odpoledne venku", rotation: 1 },
  { src: "/images/handicamp-foto-13.webp", alt: "Radost na táboře", rotation: -2 },
  { src: "/images/handicamp-foto-19.webp", alt: "Společná chvíle", rotation: 3 },
  { src: "/images/handicamp-foto-08.webp", alt: "Chvíle radosti", rotation: -1 },
  { src: "/images/handicamp-foto-14.webp", alt: "Plavání při západu slunce", rotation: 2 },
  { src: "/images/handicamp-foto-16.webp", alt: "Pohyb a smích", rotation: -3 },
  { src: "/images/handicamp-foto-20.webp", alt: "Přátelství na kempu", rotation: 1 },
  { src: "/images/handicamp-foto-28.webp", alt: "Letní program", rotation: -2 },
  { src: "/images/handicamp-foto-24.webp", alt: "Tým pohromadě", rotation: 2 },
  { src: "/images/handicamp-foto-15.webp", alt: "Kreativní dílna", rotation: -1 },
  { src: "/images/handicamp-foto-12.webp", alt: "Venkovní aktivity", rotation: 3 },
  { src: "/images/handicamp-foto-18.webp", alt: "Vzpomínka na kamp", rotation: -2 },
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
    Promise.all([
      client.queries.home({ relativePath: "home.md" }),
      client.queries.global({ relativePath: "global.md" }),
    ]).then(([home, global]) => {
      setHomeData(home);
      setGlobalData(global);
    });
  }, []);

  if (!homeData || !globalData) return null;
  return <HomePageContent homeData={homeData} globalData={globalData} />;
}

function HomePageContent({ homeData, globalData }: { homeData: HomeQuery; globalData: GlobalQuery }) {
  const { data: hData } = useTina(homeData);
  const { data: gData } = useTina(globalData);

  const h = hData.home;
  const g = gData.global;

  type Stat = NonNullable<NonNullable<typeof g.stats>[number]>;
  type Card = NonNullable<NonNullable<typeof h.rozcestnikCards>[number]>;
  type Activity = NonNullable<NonNullable<typeof h.campActivities>[number]>;

  const mappedStats = (g.stats ?? [])
    .filter((s): s is Stat => s !== null)
    .map((s) => ({ value: s.value ?? "", label: s.label ?? "", _tina: tinaField(s) }));

  const mappedCards = (h.rozcestnikCards ?? [])
    .filter((c): c is Card => c !== null)
    .map((c) => ({
      title: c.title ?? "",
      description: c.description ?? "",
      _tina: tinaField(c),
      _tinaTitle: tinaField(c, 'title'),
      _tinaDesc: tinaField(c, 'description'),
    }));

  const mappedActivities = (h.campActivities ?? [])
    .filter((a): a is Activity => a !== null)
    .map((a) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      _tinaTitle: tinaField(a, "title"),
      _tinaDesc: tinaField(a, "description"),
    }));

  return (
    <>
      <Hero
        headline={h.heroHeadline ?? ""}
        subtext={h.heroSubtext ?? ""}
        cta1Label={h.heroCta1Label ?? ""}
        cta1Href={h.heroCta1Href ?? "/jak-pomoci#darovani"}
        cta2Label={h.heroCta2Label ?? ""}
        cta2Href={h.heroCta2Href ?? "/jak-pomoci"}
        tinaFields={{
          headline: tinaField(h, 'heroHeadline'),
          subtext: tinaField(h, 'heroSubtext'),
          cta1Label: tinaField(h, 'heroCta1Label'),
          cta2Label: tinaField(h, 'heroCta2Label'),
        }}
      />

      {mappedActivities.length > 0 && (
        <section className="py-16 bg-warm-white" id="o-kempu">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6" data-tina-field={tinaField(h, 'campHeading')}>
                  {h.campHeading}
                </h2>
                <p className="text-dark/70 text-lg leading-relaxed mb-10" data-tina-field={tinaField(h, 'campBody')}>
                  {h.campBody}
                </p>
                <h3 className="font-serif text-xl font-semibold mb-6 text-forest" data-tina-field={tinaField(h, 'campActivitiesHeading')}>
                  {h.campActivitiesHeading}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mappedActivities.map((activity) => (
                    <div key={activity.title} className="bg-light-green rounded-2xl p-5">
                      <h3 className="font-serif text-lg font-bold mb-1 text-forest" data-tina-field={activity._tinaTitle}>{activity.title}</h3>
                      <p className="text-dark/70 text-sm leading-relaxed" data-tina-field={activity._tinaDesc}>{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <StatBar stats={mappedStats} />

      <section className="pt-12 pb-8 bg-warm-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 text-center">
          <h2 className="font-serif text-2xl font-bold" data-tina-field={tinaField(h, 'photoStripHeading')}>{h.photoStripHeading}</h2>
        </div>
        <PolaroidGallery photos={photos} />
        <div className="text-center pb-4">
          <Link
            href="/galerie"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Prohlédnout celou galerii
          </Link>
        </div>
      </section>

      {h.quoteText && (
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <blockquote className="text-dark/60 text-lg leading-relaxed italic mb-3" data-tina-field={tinaField(h, 'quoteText')}>
            „{h.quoteText}"
          </blockquote>
          <p className="text-dark/40 text-sm" data-tina-field={tinaField(h, 'quoteAuthor')}>— {h.quoteAuthor}</p>
        </div>
      )}

      <Rozcestnik
        heading={h.rozcestnikHeading ?? ""}
        subheading={h.rozcestnikSubheading ?? ""}
        cards={mappedCards}
        sponsors={sponsors}
        tinaFields={{
          heading: tinaField(h, 'rozcestnikHeading'),
          subheading: tinaField(h, 'rozcestnikSubheading'),
        }}
      />
    </>
  );
}
