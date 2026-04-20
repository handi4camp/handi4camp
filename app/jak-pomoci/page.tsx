"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
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

  if (!tinaData) return null;
  return <JakPomociContent tinaData={tinaData} />;
}

function DonationConfirmationButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ jmeno: "", adresa: "", rcico: "", dic: "", email: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/potvrzeni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Chyba při generování dokumentu");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "potvrzeni-o-daru.docx";
      a.click();
      URL.revokeObjectURL(url);
      setOpen(false);
    } catch {
      alert("Nepodařilo se vygenerovat dokument. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-forest text-warm-white font-semibold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors text-sm"
      >
        Požádat o potvrzení o daru
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="bg-warm-white rounded-2xl p-8 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-2xl font-bold mb-1">Potvrzení o daru</h3>
            <p className="text-dark/60 text-sm mb-6">Vyplňte údaje — stáhnete vyplněný dokument pro daňové účely.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Jméno a příjmení / Název firmy" name="jmeno" value={form.jmeno} onChange={handleChange} required />
              <Field label="Adresa / Sídlo" name="adresa" value={form.adresa} onChange={handleChange} required />
              <Field label="Rodné číslo / IČO" name="rcico" value={form.rcico} onChange={handleChange} required />
              <Field label="DIČ (pokud je přiděleno)" name="dic" value={form.dic} onChange={handleChange} />
              <Field label="Váš e-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-forest text-warm-white font-semibold py-2.5 rounded-lg hover:bg-forest/90 transition-colors text-sm disabled:opacity-60"
                >
                  {loading ? "Generuji…" : "Stáhnout potvrzení"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-lg border border-dark/20 text-dark/60 hover:border-dark/40 transition-colors text-sm">
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, name, value, onChange, type = "text", required }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-dark/60 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-dark/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest transition-colors bg-white"
      />
    </div>
  );
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

      <section id="darovani" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, 'donationHeading')}>{p.donationHeading}</h2>
          <p className="text-dark/70 mb-8" data-tina-field={tinaField(p, 'donationIntro')}>{p.donationIntro}</p>
          <DonationBox
            accountNumber={p.accountNumber ?? ""}
            noteText="Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb."
          >
            <DonationConfirmationButton />
          </DonationBox>

          <div className="mt-12 pt-12 border-t border-dark/10">
            <h2 className="font-serif text-3xl font-bold mb-3" data-tina-field={tinaField(p, 'financeHeading')}>{p.financeHeading}</h2>
            <h3 className="text-base font-semibold text-forest mb-6" data-tina-field={tinaField(p, 'financeSubheading')}>{p.financeSubheading}</h3>
            <p className="text-dark/70 leading-relaxed mb-4" data-tina-field={tinaField(p, 'financeBody1')}>{p.financeBody1}</p>
            <p className="text-dark/70 leading-relaxed" data-tina-field={tinaField(p, 'financeBody2')}>{p.financeBody2}</p>
          </div>
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

      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6" data-tina-field={tinaField(p, 'donorInfoHeading')}>{p.donorInfoHeading}</h2>
          <p className="text-dark/70 text-lg leading-relaxed" data-tina-field={tinaField(p, 'donorInfoBody')}>{p.donorInfoBody}</p>
        </div>
      </section>
    </>
  );
}
