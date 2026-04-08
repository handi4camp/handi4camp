import Link from "next/link";

const tiers = [
  {
    amount: "500 Kč",
    description: "Přispějete na stravu asistenta na jeden den",
    featured: false,
  },
  {
    amount: "5 000 Kč",
    description:
      "Sponzorujete rehabilitační pomůcky pro jeden ročník",
    featured: true,
    badge: "Nejčastější volba partnerů",
  },
  {
    amount: "20 000 Kč",
    description:
      "Generální partnerství kempu pro konkrétní dítě",
    featured: false,
  },
];

export default function PricingAnchors() {
  return (
    <section className="py-16 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">
          Jak velký dopad chcete mít?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`rounded-2xl p-8 flex flex-col gap-4 ${
                tier.featured
                  ? "bg-forest text-warm-white shadow-xl md:-mt-4 md:mb-4"
                  : "bg-light-green text-dark"
              }`}
            >
              {tier.badge && (
                <span className="text-xs font-bold bg-gold text-dark px-3 py-1 rounded-full self-start">
                  ⭐ {tier.badge}
                </span>
              )}
              <div
                className={`font-serif text-4xl font-bold ${
                  tier.featured ? "text-gold" : "text-forest"
                }`}
              >
                {tier.amount}
              </div>
              <p
                className={`text-sm flex-1 ${
                  tier.featured ? "text-warm-white/90" : "text-dark/70"
                }`}
              >
                {tier.description}
              </p>
              <Link
                href="/jak-pomoci#darovani"
                className={`text-sm font-semibold text-center py-2 px-4 rounded-lg transition-colors ${
                  tier.featured
                    ? "bg-gold text-dark hover:bg-gold/90"
                    : "bg-forest text-warm-white hover:bg-forest/90"
                }`}
              >
                Přispět touto částkou →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
