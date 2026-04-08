import Link from "next/link";
import Hero from "@/components/hero";
import StatBar from "@/components/stat-bar";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import SponsorLogos from "@/components/sponsor-logos";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";
import type { SponsorEntry } from "@/components/sponsor-logos";

const photos: PolaroidPhoto[] = [
  { src: "/images/Handicamp_socky_2025-61.jpg", alt: "Výtvarná dílna", rotation: -2 },
  { src: "/images/IMG_0411.jpg", alt: "Radost na táboře", rotation: 1 },
  { src: "/images/Handicamp_socky_2025-49.jpg", alt: "Malování na kempu", rotation: -1 },
  { src: "/images/IMG_0773.jpg", alt: "Společná chvíle", rotation: 2 },
  { src: "/images/Handicamp_socky_2025-66.jpg", alt: "Chvíle radosti", rotation: -3 },
  { src: "/images/IMG_0617.jpg", alt: "Odpoledne venku", rotation: 1 },
  { src: "/images/IMG_0491.jpg", alt: "Plavání při západu slunce", rotation: -2 },
  { src: "/images/IMG_0574.jpg", alt: "Pohyb a smích", rotation: 3 },
  { src: "/images/IMG_0869.jpg", alt: "Přátelství na kempu", rotation: -1 },
  { src: "/images/IMG_4504.jpg", alt: "Letní program", rotation: 2 },
  { src: "/images/IMG_1559.jpg", alt: "Tým pohromadě", rotation: -2 },
  { src: "/images/IMG_0518.jpg", alt: "Kreativní dílna", rotation: 1 },
  { src: "/images/IMG_0394.jpg", alt: "Venkovní aktivity", rotation: -3 },
  { src: "/images/IMG_1852.jpg", alt: "Večerní program", rotation: 2 },
  { src: "/images/IMG_0621.jpg", alt: "Vzpomínka na kamp", rotation: -1 },
];

const sponsors: SponsorEntry[] = [
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
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

      <Rozcestnik />

      {/* CTA */}
      <section className="bg-forest py-20 text-center text-warm-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Chcete pomoci?
          </h2>
          <p className="text-warm-white/80 text-lg mb-10">
            Každá koruna, každý partner a každý dobrovolník se počítá.
          </p>
          <Link
            href="/jak-pomoci"
            className="inline-block bg-gold text-dark font-bold px-10 py-4 rounded-lg text-xl hover:bg-gold/90 transition-colors"
          >
            Chci pomoci
          </Link>
        </div>
      </section>

      <SponsorLogos sponsors={sponsors} />
    </>
  );
}
