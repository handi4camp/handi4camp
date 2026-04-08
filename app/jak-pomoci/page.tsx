import PageHero from "@/components/page-hero";
import DonationBox from "@/components/donation-box";
import { Check } from "lucide-react";

const donationTiers = [
  { amount: "500 Kč", desc: "stravu asistenta na jeden den" },
  {
    amount: "5 000 Kč",
    desc: "rehabilitační pomůcky pro celý ročník",
    featured: true,
  },
  {
    amount: "20 000 Kč",
    desc: "generální partnerství pro konkrétní dítě",
  },
];

export default function JakPomociPage() {
  return (
    <>
      <PageHero
        title="Jak pomoci"
        subtitle="Vaše podpora umožňuje dětem prožít léto, na které nikdy nezapomenou."
      />

      {/* Darování */}
      <section id="darovani" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">Darování</h2>
          <p className="text-dark/70 mb-8">
            Každá částka má konkrétní dopad. Přispějte bankovním převodem nebo
            přes QR kód.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {donationTiers.map((tier) => (
              <div
                key={tier.amount}
                className={`rounded-xl p-6 ${
                  tier.featured ? "bg-forest text-warm-white" : "bg-light-green"
                }`}
              >
                <div
                  className={`font-serif text-3xl font-bold mb-2 ${
                    tier.featured ? "text-gold" : "text-forest"
                  }`}
                >
                  {tier.amount}
                </div>
                <p
                  className={`text-sm ${
                    tier.featured ? "text-warm-white/80" : "text-dark/70"
                  }`}
                >
                  Pokryje {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <DonationBox />
        </div>
      </section>

      {/* Sponzoring */}
      <section id="sponzoring" className="py-16 bg-light-green scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Firemní sponzoring
          </h2>
          <p className="text-dark/70 mb-6">
            Partnerství s tradicí. Vaše firma se stane součástí příběhu kempu s
            hmatatelným a měřitelným dopadem.
          </p>
          <div className="bg-warm-white rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co sponzor získá:</h3>
            <ul className="space-y-2 text-sm text-dark/70">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Logo na webu
                kempu
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Logo na tričkách
                účastníků
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Zmínka v
                příspěvcích na sociálních sítích
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Certifikát
                partnerství
              </li>
            </ul>
          </div>
          <p className="text-sm text-dark/70 mb-4">
            Pro domluvu partnerství kontaktujte Barboru Slátkovou přímo:
          </p>
          <a
            href="mailto:info@handi4camp.cz?subject=Zájem o sponzoring Handi4Camp"
            className="inline-block bg-forest text-warm-white font-bold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors"
          >
            Napsat email →
          </a>
        </div>
      </section>

      {/* Dobrovolnictví */}
      <section
        id="dobrovolnictvi"
        className="py-16 bg-warm-white scroll-mt-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Dobrovolnictví
          </h2>
          <p className="text-dark/70 mb-6">
            Hledáme studenty medicíny, fyzioterapie nebo pedagogiky, kteří
            chtějí udělat léto jinak — smysluplně a s přidanou hodnotou pro
            studium.
          </p>
          <div className="bg-light-green rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">
              Co obnáší být asistentem:
            </h3>
            <ul className="space-y-2 text-sm text-dark/70">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> 10 dní intenzivní
                práce s dětmi s DMO
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Dohled zkušených
                fyzioterapeutů
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Praxe uznatelná
                v rámci studia
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> Strava a
                ubytování zajištěno
              </li>
            </ul>
          </div>
          <a
            href="mailto:info@handi4camp.cz?subject=Zájem o dobrovolnictví Handi4Camp"
            className="inline-block bg-gold text-dark font-bold px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Mám zájem →
          </a>
        </div>
      </section>
    </>
  );
}
