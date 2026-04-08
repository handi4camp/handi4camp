import PageHero from "@/components/page-hero";
import SponsorLogos from "@/components/sponsor-logos";
import Link from "next/link";
import type { SponsorEntry } from "@/components/sponsor-logos";

const sponsors: SponsorEntry[] = [
  { name: "Rotary Club Valtice Břeclav", website: "https://rotary.cz" },
];

export default function PartneriPage() {
  return (
    <>
      <PageHero
        title="Partneři & Transparentnost"
        subtitle="Díky partnerům může kamp každý rok znovu rozjet motory."
      />

      <SponsorLogos sponsors={sponsors} />

      {/* Transparentní účet */}
      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Transparentní financování
          </h2>
          <p className="text-dark/70 mb-6">
            Veškeré příjmy a výdaje kempu jsou veřejně dohledatelné. Věříme v
            otevřenost bez kompromisů.
          </p>
          <div className="bg-warm-white rounded-2xl p-8 mb-6">
            <dl className="space-y-3 text-sm">
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">
                  Transparentní účet:
                </dt>
                <dd className="font-mono font-bold">XXXX-XXXXXX/XXXX</dd>
              </div>
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">
                  Výpis transakcí:
                </dt>
                <dd>
                  <a
                    href="#"
                    className="text-forest underline hover:text-dark transition-colors"
                  >
                    Odkaz na transparentní účet →
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <p className="text-sm text-dark/60 mb-4">
            Vzor darovací smlouvy ke stažení:
          </p>
          <a
            href="/documents/darovaci-smlouva.pdf"
            className="inline-block bg-forest text-warm-white font-semibold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors text-sm"
          >
            Stáhnout darovací smlouvu (PDF)
          </a>
        </div>
      </section>

      {/* Co se podařilo */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">
            Co se podařilo
          </h2>
          <div className="space-y-6">
            <div className="bg-light-green rounded-xl p-6">
              <h3 className="font-bold text-forest mb-2">
                Ročník 2024 — 20. výročí
              </h3>
              <p className="text-sm text-dark/70">
                Jubilejní ročník proběhl v plné síle. Zúčastnilo se 12 dětí, 8
                studentů-asistentů. Celkové náklady: 298 000 Kč. Vybráno od
                sponzorů a dárců: 312 000 Kč.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-warm-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Staňte se partnerem
          </h2>
          <p className="text-warm-white/80 mb-8">
            Vaše firma může být součástí tradice, která mění životy.
          </p>
          <Link
            href="/jak-pomoci#sponzoring"
            className="inline-block bg-gold text-dark font-bold px-8 py-3 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Jak sponzorovat →
          </Link>
        </div>
      </section>
    </>
  );
}
