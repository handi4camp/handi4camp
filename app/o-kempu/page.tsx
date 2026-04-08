import PageHero from "@/components/page-hero";
import MilestoneTimeline from "@/components/milestone-timeline";
import type { MilestoneEntry } from "@/components/milestone-timeline";

const milestones: MilestoneEntry[] = [
  {
    year: 2004,
    title: "Vznik kempu",
    description: "První ročník s 6 dětmi a nadšeným týmem asistentů.",
  },
  {
    year: 2010,
    title: "Rozšíření na 12 dětí",
    description: "Zájem rodin přesáhl původní kapacitu.",
  },
  {
    year: 2015,
    title: "Spolupráce s medicínou",
    description: "Studenti LFMU se stávají pravidelnými asistenty.",
  },
  {
    year: 2020,
    title: "Online komunikace",
    description: "Spuštění sociálních sítí kempu.",
  },
  {
    year: 2024,
    title: "20. výročí",
    description: "Jubilejní ročník s rekordní účastí.",
  },
];

const activities = [
  {
    title: "Rehabilitace",
    description:
      "Každodenní fyzioterapeutické cvičení přizpůsobené každému dítěti individuálně.",
  },
  {
    title: "Sport a hry",
    description:
      "Plavání, boccia, příroda — aktivity navržené pro radost i pohyb.",
  },
  {
    title: "Výlety",
    description:
      "Okolí Valtice, příroda Pálava — každý den nové dobrodružství.",
  },
];

export default function OKempuPage() {
  return (
    <>
      <PageHero
        title="O kempu"
        subtitle="Dvacet let tradice, důvěry a léta bez hranic pro děti s DMO."
      />

      {/* Příběh */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Jak to celé začalo
          </h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">
            Handi4Camp vznikl v roce 2004 díky iniciativě Barbory Slátkové a
            Rotary Clubu Valtice Břeclav. Myšlenka byla jednoduchá: dát dětem s
            dětskou mozkovou obrnou týden prázdnin, jaký si zaslouží — plný
            pohybu, přátelství a profesionální péče.
          </p>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">
            Za dvacet let prošlo kempem přes 200 dětí. Každý ročník se účastní
            12 dětí ve věku 6–16 let. Asistují jim studenti lékařství a
            fyzioterapie — budoucí zdravotníci, kteří získávají neocenitelnou
            zkušenost s prací v terénu.
          </p>
          <p className="text-dark/70 text-lg leading-relaxed">
            Rodinám přinášíme také zasloužený oddych. Těch 10 dní mimo domov je
            pro mnohé rodiče první skutečnou dovolenou za několik let.
          </p>
        </div>
      </section>

      {/* Milníky */}
      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-10">Naše milníky</h2>
          <MilestoneTimeline milestones={milestones} />
        </div>
      </section>

      {/* Aktivity */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-10 text-center">
            Co se na kempu děje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((a) => (
              <div key={a.title} className="bg-light-green rounded-2xl p-8">
                <h3 className="font-serif text-xl font-bold text-forest mb-3">
                  {a.title}
                </h3>
                <p className="text-dark/70 text-sm">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tým */}
      <section className="py-16 bg-forest text-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">
            Kdo za kempem stojí
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gold mb-1">Barbora Slátková</h3>
              <p className="text-warm-white/80 text-sm">
                Organizátorka a hlavní koordinátorka. Srdce projektu od prvního
                ročníku.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gold mb-1">
                Rotary Club Valtice Břeclav
              </h3>
              <p className="text-warm-white/80 text-sm">
                Záštita a klíčový partner kempu. Síť kontaktů, zázemí a
                finanční podpora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust boxy */}
      <section className="py-10 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
          {[
            "Pod záštitou Rotary Club Valtice Břeclav",
            "Transparentní účet",
            "20+ ročníků za sebou",
          ].map((trust) => (
            <div
              key={trust}
              className="flex items-center gap-2 text-sm font-semibold text-forest"
            >
              <span className="text-gold text-lg">✓</span> {trust}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
