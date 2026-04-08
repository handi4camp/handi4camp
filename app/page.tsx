import Link from "next/link";
import Hero from "@/components/hero";
import StatBar from "@/components/stat-bar";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

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
  return (
    <>
      <Hero />

      {/* Příběh kempu */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Dvacet let léta, které mění životy
          </h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">
            Handi4Camp vznikl před 20 lety jako iniciativa Barbory Slátkové a
            Rotary Clubu Valtice Břeclav. Každé léto spojujeme 12 dětí s
            dětskou mozkovou obrnou s budoucími lékaři a fyzioterapeuty, kteří
            jim věnují týden péče, pohybu a radosti.
          </p>
          <blockquote className="border-l-4 border-gold pl-4 text-left italic text-dark/70 my-6 mx-auto max-w-xl">
            „Díky kempu syn poprvé v životě zažil, co znamená být součástí
            party." — maminka účastníka
          </blockquote>
          <Link
            href="/o-kempu"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Přečíst celý příběh →
          </Link>
        </div>
      </section>

      <StatBar />

      {/* Foto pás */}
      <section className="pt-12 pb-8 bg-warm-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 text-center">
          <h2 className="font-serif text-2xl font-bold">
            Chvíle, které zůstanou
          </h2>
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

      <Rozcestnik sponsors={sponsors} />
    </>
  );
}
