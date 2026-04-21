"use client";
import { useState, useEffect } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";
import DonationBox from "@/components/donation-box";
import ContactForm from "@/components/contact-form";
import {
  Globe, Tag, Share2, Award,
  Calendar, UserCheck, BookOpen, Home,
  Banknote, Mail, FileCheck,
} from "lucide-react";

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

const sponsoringBenefitIcons = [Globe, Tag, Share2, Award];
const volunteeringRequirementIcons = [Calendar, UserCheck, BookOpen, Home];

function JakPomociContent({ tinaData }: { tinaData: JakpomociQuery }) {
  const { data } = useTina(tinaData);
  const p = data.jakpomoci;

  const sponsoringBenefits = (p.sponsoringBenefits ?? []).filter((x: string | null): x is string => x !== null);
  const volunteeringRequirements = (p.volunteeringRequirements ?? []).filter((x: string | null): x is string => x !== null);

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        tinaFields={{ title: tinaField(p, "heroTitle"), subtitle: tinaField(p, "heroSubtitle") }}
      />

      {/* Darování */}
      <section id="darovani" className="py-20 bg-warm-white scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "donationHeading")}>
                {p.donationHeading}
              </h2>
              <p className="text-dark/70 mb-6" data-tina-field={tinaField(p, "donationIntro")}>
                {p.donationIntro}
              </p>
              <p className="text-sm text-forest font-medium">
                Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb. — po přijetí vám vystavíme potvrzení.
              </p>
            </div>
            <div>
              <DonationBox
                heading={p.bankTransferHeading ?? "Bankovní převod"}
                accountNumber={p.accountNumber ?? ""}
                variableSymbol={p.variableSymbol ?? "2024"}
                transferMessage={p.transferMessage ?? "Handi4Camp – dar"}
                qrCodeImage={p.qrCodeImage ?? undefined}
                tinaFields={{
                  heading: tinaField(p, "bankTransferHeading"),
                  accountNumber: tinaField(p, "accountNumber"),
                  variableSymbol: tinaField(p, "variableSymbol"),
                  transferMessage: tinaField(p, "transferMessage"),
                }}
                noteText="Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb."
              >
                <DonationConfirmationButton />
              </DonationBox>
            </div>
          </div>

          {/* Na co jdou prostředky */}
          <div className="mt-16 pt-16 border-t border-dark/10">
            <h2 className="font-serif text-3xl font-bold mb-3" data-tina-field={tinaField(p, "financeHeading")}>
              {p.financeHeading}
            </h2>
            <p className="text-base font-semibold text-forest mb-6" data-tina-field={tinaField(p, "financeSubheading")}>
              {p.financeSubheading}
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-none">
                <span className="inline-block bg-forest text-warm-white font-bold text-lg px-5 py-3 rounded-xl">
                  900–1 200 Kč / osobu / den
                </span>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-dark/70 leading-relaxed" data-tina-field={tinaField(p, "financeBody1")}>{p.financeBody1}</p>
                <p className="text-dark/70 leading-relaxed" data-tina-field={tinaField(p, "financeBody2")}>{p.financeBody2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Firemní sponzoring */}
      <section id="sponzoring" className="py-20 bg-light-green scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-forest mb-3">Pro firmy</p>
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "sponsoringHeading")}>
            {p.sponsoringHeading}
          </h2>
          <p className="text-dark/70 mb-4" data-tina-field={tinaField(p, "sponsoringIntro")}>
            {p.sponsoringIntro}
          </p>
          <p className="text-dark/80 italic mb-10 text-base">
            "Stáváte se součástí příběhu, na který děti vzpomínají celý život."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10" data-tina-field={tinaField(p, "sponsoringBenefits")}>
            {sponsoringBenefits.map((benefit, i) => {
              const Icon = sponsoringBenefitIcons[i] ?? Award;
              return (
                <div key={benefit} className="bg-warm-white rounded-2xl p-6 flex gap-4 items-start">
                  <div className="flex-none w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-forest" strokeWidth={1.75} />
                  </div>
                  <p className="font-semibold text-dark text-sm leading-snug pt-1">{benefit}</p>
                </div>
              );
            })}
          </div>

          <div>
            <ContactForm
              type="sponzor"
              buttonLabel="Mám zájem o sponzoring →"
              buttonClassName="inline-block bg-forest text-warm-white font-bold px-8 py-3.5 rounded-lg hover:bg-forest/90 transition-colors"
            />
            <p className="text-xs text-dark/50 mt-2 ml-1">Odpovídáme do 2 pracovních dnů.</p>
          </div>
        </div>
      </section>

      {/* Dobrovolnictví */}
      <section id="dobrovolnictvi" className="py-20 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-forest mb-3">Pro studenty</p>
          <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "volunteeringHeading")}>
            {p.volunteeringHeading}
          </h2>
          <p className="text-dark/70 mb-10" data-tina-field={tinaField(p, "volunteeringIntro")}>
            {p.volunteeringIntro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10" data-tina-field={tinaField(p, "volunteeringRequirements")}>
            {volunteeringRequirements.map((req, i) => {
              const Icon = volunteeringRequirementIcons[i] ?? Calendar;
              return (
                <div key={req} className="bg-light-green rounded-2xl p-6 flex gap-4 items-start">
                  <div className="flex-none w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-forest" strokeWidth={1.75} />
                  </div>
                  <p className="font-semibold text-dark text-sm leading-snug pt-1">{req}</p>
                </div>
              );
            })}
          </div>

          <p className="text-dark/60 italic text-sm mb-6">
            "Byl to nejlepší způsob, jak strávit prázdniny smysluplně." — absolventka kurzu fyzioterapie
          </p>

          <div>
            <ContactForm
              type="dobrovolnik"
              buttonLabel="Mám zájem →"
              buttonClassName="inline-block bg-gold text-dark font-bold px-8 py-3.5 rounded-lg hover:bg-gold/90 transition-colors"
            />
            <p className="text-xs text-dark/50 mt-2 ml-1">Napište nám, rádi zodpovíme otázky.</p>
          </div>
        </div>
      </section>

      {/* Jak se stát dárcem */}
      <section className="py-20 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-12" data-tina-field={tinaField(p, "donorInfoHeading")}>
            {p.donorInfoHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { Icon: Banknote, step: "1", label: "Přispějte", desc: "Bankovním převodem, věcným darem nebo domluvou." },
              { Icon: Mail, step: "2", label: "Napište nám", desc: "Dejte nám vědět a my vám vystavíme potvrzení." },
              { Icon: FileCheck, step: "3", label: "Dostanete potvrzení", desc: "Doklad pro daňové odpočty do několika dní." },
            ].map(({ Icon, step, label, desc }) => (
              <div key={step} className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-forest text-warm-white text-sm font-bold flex items-center justify-center flex-none">
                    {step}
                  </span>
                  <Icon className="w-5 h-5 text-forest" strokeWidth={1.75} />
                </div>
                <p className="font-bold text-dark">{label}</p>
                <p className="text-dark/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-forest hover:text-forest/80 transition-colors list-none flex items-center gap-2">
              <span className="inline-block transition-transform group-open:rotate-90">›</span>
              Více informací
            </summary>
            <p className="mt-4 text-dark/70 text-base leading-relaxed" data-tina-field={tinaField(p, "donorInfoBody")}>
              {p.donorInfoBody}
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
