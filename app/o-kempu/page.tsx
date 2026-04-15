"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";
import MilestoneTimeline from "@/components/milestone-timeline";
import type { MilestoneEntry } from "@/components/milestone-timeline";
import { Check } from "lucide-react";

type OkempuQuery = Awaited<ReturnType<typeof client.queries.okempu>>;

const milestones: MilestoneEntry[] = [
  { year: 2004, title: "Vznik kempu", description: "První ročník s 6 dětmi a nadšeným týmem asistentů." },
  { year: 2010, title: "Rozšíření na 12 dětí", description: "Zájem rodin přesáhl původní kapacitu." },
  { year: 2015, title: "Spolupráce s medicínou", description: "Studenti LFMU se stávají pravidelnými asistenty." },
  { year: 2020, title: "Online komunikace", description: "Spuštění sociálních sítí kempu." },
  { year: 2024, title: "20. výročí", description: "Jubilejní ročník s rekordní účastí." },
];

export default function OKempuPage() {
  const [tinaData, setTinaData] = useState<OkempuQuery | null>(null);

  useEffect(() => {
    client.queries.okempu({ relativePath: "o-kempu.md" }).then(setTinaData);
  }, []);

  const { data } = useTina(
    tinaData ?? { query: "", variables: {}, data: null as any }
  );

  if (!tinaData) return null;

  const p = data.okempu;

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        imageSrc="/images/handicamp-foto-02.webp"
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6">{p.storyHeading}</h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">{p.storyParagraph1}</p>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">{p.storyParagraph2}</p>
          <p className="text-dark/70 text-lg leading-relaxed">{p.storyParagraph3}</p>
        </div>
      </section>

      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-10">{p.milestonesHeading}</h2>
          <MilestoneTimeline milestones={milestones} />
        </div>
      </section>

      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-10 text-center">{p.activitiesHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(p.activities ?? []).map((a: any) => (
              <div key={a.title} className="bg-light-green rounded-2xl p-8">
                <h3 className="font-serif text-xl font-bold text-forest mb-3">{a.title}</h3>
                <p className="text-dark/70 text-sm">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-forest text-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">{p.teamHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(p.teamMembers ?? []).map((m: any) => (
              <div key={m.name}>
                <h3 className="font-bold text-gold mb-1">{m.name}</h3>
                <p className="text-warm-white/80 text-sm">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8">
          {(p.trustItems ?? []).map((trust: string) => (
            <div key={trust} className="flex items-center gap-2 text-sm font-semibold text-forest">
              <Check className="w-4 h-4 text-gold shrink-0" strokeWidth={2.5} /> {trust}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
