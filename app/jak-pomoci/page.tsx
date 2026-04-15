"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";
import DonationBox from "@/components/donation-box";
import { Check } from "lucide-react";

type JakpomociQuery = Awaited<ReturnType<typeof client.queries.jakpomoci>>;

export default function JakPomociPage() {
  const [tinaData, setTinaData] = useState<JakpomociQuery | null>(null);

  useEffect(() => {
    client.queries.jakpomoci({ relativePath: "jak-pomoci.md" }).then(setTinaData);
  }, []);

  const { data } = useTina(
    tinaData ?? { query: "", variables: {}, data: null as any }
  );

  if (!tinaData) return null;

  const p = data.jakpomoci;

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
      />

      <section id="darovani" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">{p.donationHeading}</h2>
          <p className="text-dark/70 mb-8">{p.donationIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {(p.donationTiers ?? []).map((tier: any) => (
              <div
                key={tier.amount}
                className={`rounded-xl p-6 ${
                  tier.featured ? "bg-forest text-warm-white" : "bg-light-green"
                }`}
              >
                <div className={`font-serif text-3xl font-bold mb-2 ${tier.featured ? "text-gold" : "text-forest"}`}>
                  {tier.amount}
                </div>
                <p className={`text-sm ${tier.featured ? "text-warm-white/80" : "text-dark/70"}`}>
                  Pokryje {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <DonationBox
            accountNumber={p.accountNumber ?? ""}
            noteText="Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb."
          />

          <div className="mt-10 border-t border-light-green pt-10">
            <h3 className="font-bold text-lg mb-4">{p.transparencyHeading}</h3>
            <p className="text-dark/70 text-sm mb-6">{p.transparencyIntro}</p>
            <dl className="space-y-3 text-sm mb-6">
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">Transparentní účet:</dt>
                <dd className="font-mono font-bold">{p.accountNumber}</dd>
              </div>
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">Výpis transakcí:</dt>
                <dd>
                  <a href={p.transactionLinkHref ?? "#"} className="text-forest underline hover:text-dark transition-colors">
                    {p.transactionLinkLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href="/documents/darovaci-smlouva.pdf"
              className="inline-block bg-forest text-warm-white font-semibold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors text-sm"
            >
              {p.donationContractLabel}
            </a>
          </div>
        </div>
      </section>

      <section id="sponzoring" className="py-16 bg-light-green scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">{p.sponsoringHeading}</h2>
          <p className="text-dark/70 mb-6">{p.sponsoringIntro}</p>
          <div className="bg-warm-white rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co sponzor získá:</h3>
            <ul className="space-y-2 text-sm text-dark/70">
              {(p.sponsoringBenefits ?? []).map((benefit: string) => (
                <li key={benefit} className="flex gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> {benefit}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="mailto:info@handi4camp.cz?subject=Zájem o sponzoring Handi4Camp"
            className="inline-block bg-forest text-warm-white font-bold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors mb-12"
          >
            Napsat email →
          </a>
        </div>
      </section>

      <section id="dobrovolnictvi" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">{p.volunteeringHeading}</h2>
          <p className="text-dark/70 mb-6">{p.volunteeringIntro}</p>
          <div className="bg-light-green rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co obnáší být asistentem:</h3>
            <ul className="space-y-2 text-sm text-dark/70">
              {(p.volunteeringRequirements ?? []).map((req: string) => (
                <li key={req} className="flex gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" strokeWidth={2.5} /> {req}
                </li>
              ))}
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
