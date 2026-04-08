import Link from "next/link";
import { Heart, Building2, HandHelping, ArrowRight } from "lucide-react";

type Sponsor = {
  name: string;
  logo?: string;
  website?: string;
};

const cards = [
  {
    icon: Heart,
    title: "Chci darovat",
    description: "Pošlete libovolnou částku převodem nebo QR kódem",
    href: "/jak-pomoci#darovani",
  },
  {
    icon: Building2,
    title: "Chci sponzorovat",
    description: "Firemní partnerství s logem, zmínkou a hmatatelným dopadem",
    href: "/jak-pomoci#sponzoring",
  },
  {
    icon: HandHelping,
    title: "Chci být dobrovolníkem",
    description: "Jedete s námi? Studenti medicíny a fyzioterapie jsou vítáni",
    href: "/jak-pomoci#dobrovolnictvi",
  },
];

export default function Rozcestnik({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-3">Jak chcete pomoci?</h2>
          <p className="text-dark/60 text-lg">Každá forma pomoci mění životy dětí s DMO.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative bg-light-green rounded-2xl p-8 flex flex-col gap-4 hover:bg-forest transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-warm-white/60 group-hover:bg-warm-white/20 flex items-center justify-center transition-colors duration-300">
                <card.icon className="w-7 h-7 text-forest group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-forest group-hover:text-warm-white mb-2 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-dark/60 group-hover:text-warm-white/70 transition-colors duration-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-forest group-hover:text-gold transition-colors duration-300">
                Zjistit více <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <Link
            href="/jak-pomoci"
            className="inline-block bg-forest text-warm-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-forest/90 transition-colors"
          >
            Přidejte se →
          </Link>
        </div>

        {/* Partners */}
        <div className="border-t border-dark/10 pt-12">
          <p className="text-center text-xs font-semibold tracking-widest text-dark/40 uppercase mb-8">
            Děkujeme našim partnerům
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
              >
                {sponsor.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                ) : (
                  <span className="text-dark/40 hover:text-dark font-bold text-sm transition-colors">{sponsor.name}</span>
                )}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
