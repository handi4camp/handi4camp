import Link from "next/link";
import { Heart, Building2, HandHelping } from "lucide-react";

const cards = [
  {
    icon: Heart,
    title: "Chci darovat",
    description:
      "Pošlete libovolnou částku převodem nebo QR kódem",
    href: "/jak-pomoci#darovani",
  },
  {
    icon: Building2,
    title: "Chci sponzorovat",
    description:
      "Firemní partnerství s logem, zmínkou a hmatatelným dopadem",
    href: "/jak-pomoci#sponzoring",
  },
  {
    icon: HandHelping,
    title: "Chci být dobrovolníkem",
    description:
      "Jedete s námi? Studenti medicíny a fyzioterapie jsou vítáni",
    href: "/jak-pomoci#dobrovolnictvi",
  },
];

export default function Rozcestnik() {
  return (
    <section className="py-16 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">
          Jak můžete pomoci?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-warm-white rounded-2xl p-8 flex flex-col gap-3 hover:shadow-lg transition-shadow group"
            >
              <card.icon className="w-10 h-10 text-gold" strokeWidth={1.5} />
              <h3 className="font-serif text-xl font-bold text-forest group-hover:text-dark transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-dark/70">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
