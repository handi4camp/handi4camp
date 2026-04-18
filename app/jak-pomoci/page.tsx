"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";
import DonationBox from "@/components/donation-box";
import { Check } from "lucide-react";

type JakpomociQuery = Awaited<ReturnType<typeof client.queries.jakpomoci>>;
type DonationTier = NonNullable<NonNullable<JakpomociQuery["data"]["jakpomoci"]["donationTiers"]>[number]>;

export default function JakPomociPage() {
  const [tinaData, setTinaData] = useState<JakpomociQuery | null>(null);

  useEffect(() => {
    client.queries.jakpomoci({ relativePath: "jak-pomoci.md" }).then(setTinaData);
  }, []);

  if (!tinaData) return null;
  return <JakPomociContent tinaData={tinaData} />;
}

function JakPomociContent({ tinaData }: { tinaData: JakpomociQuery }) {
  const { data } = useTina(tinaData);
  const p = data.jakpomoci;

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        tinaFields={{ title: tinaField(p, 'heroTitle'), subtitle: tinaField(p, 'heroSubtitle') }}
      />

      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6" data-tina-field={tinaField(p, 'donorInfoHeading')}>{p.donorInfoHeading}</h2>
          <p className="text-dark/70 text-lg leading-relaxed" data-tina-field={tinaField(p, 'donorInfoBody')}>{p.donorInfoBody}</p>
        </div>
      </section>

      <section id="darovani" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, 'donationHeading')}>{p.donationHeading}</h2>
          <p className="text-dark/70 mb-8" data-tina-field={tinaField(p, 'donationIntro')}>{p.donationIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {(p.donationTiers ?? [])
              .filter((t): t is DonationTier => t !== null)
              .map((tier) => (
                <div
                  key={tier.amount ?? ""}
                  className={`rounded-xl p-6 ${
                    tier.featured ? "bg-forest text-warm-white" : "bg-light-green"
                  }`}
                  data-tina-field={tinaField(tier)}
                >
                  <div className={`font-serif text-3xl font-bold mb-2 ${tier.featured ? "text-gold" : "text-forest"}`} data-tina-field={tinaField(tier, 'amount')}>
                    {tier.amount}
                  </div>
                  <p className={`text-sm ${tier.featured ? "text-warm-white/80" : "text-dark/70"}`} data-tina-field={tinaField(tier, 'desc')}>
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
            <h3 className="font-bold text-lg mb-4" data-tina-field={tinaField(p, 'transparencyHeading')}>{p.transparencyHeading}</h3>
            <p className="text-dark/70 text-sm mb-6" data-tina-field={tinaField(p, 'transparencyIntro')}>{p.transparencyIntro}</p>
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
              data-tina-field={tinaField(p, 'donationContractLabel')}
            >
              {p.donationContractLabel}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6" data-tina-field={tinaField(p, 'financeHeading')}>{p.financeHeading}</h2>
          <h3 className="font-bold text-xl mb-4 text-forest" data-tina-field={tinaField(p, 'financeSubheading')}>{p.financeSubheading}</h3>
          <p className="text-dark/70 text-lg leading-relaxed mb-4" data-tina-field={tinaField(p, 'financeBody1')}>{p.financeBody1}</p>
          <p className="text-dark/70 text-lg leading-relaxed" data-tina-field={tinaField(p, 'financeBody2')}>{p.financeBody2}</p>
        </div>
      </section>

      <section id="sponzoring" className="py-16 bg-light-green scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, 'sponsoringHeading')}>{p.sponsoringHeading}</h2>
          <p className="text-dark/70 mb-6" data-tina-field={tinaField(p, 'sponsoringIntro')}>{p.sponsoringIntro}</p>
          <div className="bg-warm-white rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co sponzor získá:</h3>
            <ul className="space-y-2 text-sm text-dark/70" data-tina-field={tinaField(p, 'sponsoringBenefits')}>
              {(p.sponsoringBenefits ?? [])
                .filter((x: string | null): x is string => x !== null)
                .map((benefit) => (
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
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, 'volunteeringHeading')}>{p.volunteeringHeading}</h2>
          <p className="text-dark/70 mb-6" data-tina-field={tinaField(p, 'volunteeringIntro')}>{p.volunteeringIntro}</p>
          <div className="bg-light-green rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co obnáší být asistentem:</h3>
            <ul className="space-y-2 text-sm text-dark/70" data-tina-field={tinaField(p, 'volunteeringRequirements')}>
              {(p.volunteeringRequirements ?? [])
                .filter((x: string | null): x is string => x !== null)
                .map((req) => (
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
