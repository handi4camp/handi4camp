import Link from "next/link";
import Hero from "@/components/hero";
import PricingAnchors from "@/components/pricing-anchors";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import SponsorLogos from "@/components/sponsor-logos";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";
import type { SponsorEntry } from "@/components/sponsor-logos";

const photos: PolaroidPhoto[] = [
  { src: "/images/Handicamp_socky_2025-61.jpg", alt: "Výtvarná dílna", rotation: -2 },
  { src: "/images/Handicamp_socky_2025-49.jpg", alt: "Malování na kempu", rotation: 1 },
  { src: "/images/Handicamp_socky_2025-66.jpg", alt: "Chvíle radosti", rotation: -1 },
  { src: "/images/IMG_0491.jpg", alt: "Plavání při západu slunce", rotation: 2 },
  { src: "/images/IMG_0869.jpg", alt: "Přátelství na kempu", rotation: -3 },
];

const sponsors: SponsorEntry[] = [
  { name: "Rotary Club Valtice Břeclav", website: "https://rotary.cz" },
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

      <PricingAnchors />
      <Rozcestnik />

      {/* Foto pás */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="font-serif text-2xl font-bold">
            Chvíle, které zůstanou
          </h2>
        </div>
        <PolaroidGallery photos={photos} />
        <div className="text-center mt-6">
          <Link
            href="/galerie"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Prohlédnout celou galerii →
          </Link>
        </div>
      </section>

      <SponsorLogos sponsors={sponsors} />
    </>
  );
}
