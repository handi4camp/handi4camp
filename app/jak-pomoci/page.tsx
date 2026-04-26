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
} from "lucide-react";
import posthog from "posthog-js";

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
  const [form, setForm] = useState({
    jmeno: "",
    adresa: "",
    rcico: "",
    dic: "",
    datum: "",
    dar: "",
    ucel: "",
    email: "",
  });

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
      posthog.capture("donation_confirmation_downloaded");
      setOpen(false);
    } catch (err) {
      posthog.captureException(err);
      alert("Nepodařilo se vygenerovat dokument. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          posthog.capture("donation_confirmation_form_opened");
        }}
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
              <Field label="Datum přijetí daru" name="datum" value={form.datum} onChange={handleChange} placeholder="např. 26.04.2026" required />
              <Field label="Výše daru" name="dar" value={form.dar} onChange={handleChange} placeholder="např. 5 000" suffix="Kč" required />
              <Field label="Účel daru" name="ucel" value={form.ucel} onChange={handleChange} placeholder="např. Podpora Handi4Camp" required />
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

function Field({ label, name, value, onChange, type = "text", required, placeholder, suffix }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean; placeholder?: string; suffix?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-dark/60 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full border border-dark/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest transition-colors bg-white ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-dark/50">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

const sponsoringBenefitIcons = [Globe, Tag, Share2, Award];
const volunteeringRequirementIcons = [Calendar, UserCheck, BookOpen, Home];

const TAB_CONFIG: Record<string, { label: string; desc: string }> = {
  darovani: { label: 'Darování', desc: 'Finanční nebo věcný dar' },
  sponzoring: { label: 'Firemní sponzoring', desc: 'Pro firmy a organizace' },
  dobrovolnictvi: { label: 'Dobrovolnictví', desc: 'Zapojte se osobně' }
};

type TabKey = 'darovani' | 'sponzoring' | 'dobrovolnictvi';

function FeatureGrid({ 
  items, 
  icons, 
  cardBgClass, 
  tinaFieldData 
}: { 
  items: string[], 
  icons: React.ElementType[], 
  cardBgClass: string, 
  tinaFieldData?: string 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10" data-tina-field={tinaFieldData}>
      {items.map((item, i) => {
        const Icon = icons[i] ?? Award;
        return (
          <div key={item} className={`${cardBgClass} rounded-2xl p-6 flex gap-4 items-start`}>
            <div className="flex-none w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-forest" strokeWidth={1.75} />
            </div>
            <p className="font-semibold text-dark text-sm leading-snug pt-1">{item}</p>
          </div>
        );
      })}
    </div>
  );
}

function JakPomociContent({ tinaData }: { tinaData: JakpomociQuery }) {
  const { data } = useTina(tinaData);
  const p = data.jakpomoci;

  const [activeTab, setActiveTab] = useState<TabKey>('darovani');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabKey;
      if (TAB_CONFIG[hash]) {
        setActiveTab(hash);
      }
    };
    
    // Check initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setTabAndHash = (tab: TabKey) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
    posthog.capture("jak_pomoci_tab_selected", { tab, label: TAB_CONFIG[tab].label });
    
    // Na mobilních zařízeních plynule odscrollovat k sekci
    setTimeout(() => {
      if (window.innerWidth < 768) { // md breakpoint
        const element = document.getElementById(tab);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80; // offset pro lepší zobrazení
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 100);
  };

  const sponsoringBenefits = (p.sponsoringBenefits ?? []).filter((x: string | null): x is string => x !== null);
  const volunteeringRequirements = (p.volunteeringRequirements ?? []).filter((x: string | null): x is string => x !== null);

  return (
    <>
      <PageHero
        title={p.heroTitle ?? ""}
        subtitle={p.heroSubtitle ?? ""}
        tinaFields={{ title: tinaField(p, "heroTitle"), subtitle: tinaField(p, "heroSubtitle") }}
      />

      <div className="bg-warm-white pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-dark mb-3">Jak se chcete zapojit?</h2>
            <p className="text-dark/70 text-lg">Vyberte prosím jednu z možností níže:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {(Object.keys(TAB_CONFIG) as TabKey[]).map((tab) => {
              const config = TAB_CONFIG[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setTabAndHash(tab)}
                  className={`p-4 sm:p-6 rounded-2xl transition-all border-2 flex flex-row sm:flex-col items-center sm:text-center text-left group gap-4 sm:gap-0 ${
                    isActive
                      ? 'border-forest bg-forest/5 shadow-md'
                      : 'border-dark/10 bg-white hover:border-forest/40 hover:shadow-sm'
                  }`}
                >
                  <div className="flex-1 sm:order-first">
                    <span className={`block font-bold text-lg sm:text-xl mb-1 sm:mb-2 ${isActive ? 'text-forest' : 'text-dark group-hover:text-forest'}`}>
                      {config.label}
                    </span>
                    <span className="block text-sm text-dark/60 sm:mb-6">
                      {config.desc}
                    </span>
                  </div>
                  
                  {/* Ukazatel výběru (styl radio buttonu pro lepší srozumitelnost) */}
                  <div className={`shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-colors sm:mt-auto sm:order-last ${
                    isActive ? 'border-forest bg-forest' : 'border-dark/20 bg-white group-hover:border-forest/40'
                  }`}>
                    {isActive && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Darování */}
      {activeTab === 'darovani' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section id="darovani" className="py-20 bg-warm-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-forest mb-3">Pro dárce</p>
                  <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "donationHeading")}>
                    {p.donationHeading}
                  </h2>
                  <p className="text-dark/70 mb-6 text-lg" data-tina-field={tinaField(p, "donationIntro")}>
                    {p.donationIntro}
                  </p>
                  
                  <div className="space-y-4 text-dark/80 text-base leading-relaxed mb-8">
                    <p data-tina-field={tinaField(p, "financeBody1")}>{p.financeBody1}</p>
                    <p data-tina-field={tinaField(p, "financeBody2")}>{p.financeBody2}</p>
                  </div>

                  <p className="text-sm text-forest font-medium italic">
                    Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb. — po přijetí vám vystavíme potvrzení.
                  </p>
                </div>
                <div>
                  <DonationBox
                    heading={p.bankTransferHeading ?? "klub-Handicamp"}
                    accountNumber={p.accountNumber ?? "131-3696260217/0100"}
                    iban={p.iban ?? "CZ60 0100 0001 3136 9626 0217"}
                    swift={p.swift ?? "KOMBCZPPXXX"}
                    qrCodeImage={p.qrCodeImage ?? "/qr.jpg"}
                    tinaFields={{
                      heading: tinaField(p, "bankTransferHeading"),
                      accountNumber: tinaField(p, "accountNumber"),
                      iban: tinaField(p, "iban"),
                      swift: tinaField(p, "swift"),
                      qrCodeImage: tinaField(p, "qrCodeImage"),
                      fundraiser: tinaField(p, "fundraiser"),
                    }}
                    fundraiser={{
                      enabled: p.fundraiser?.enabled,
                      title: p.fundraiser?.title,
                      description: p.fundraiser?.description,
                      goal: p.fundraiser?.goal,
                      current: p.fundraiser?.current,
                      deadline: p.fundraiser?.deadline,
                      tinaFields: {
                        title: p.fundraiser ? tinaField(p.fundraiser, "title") : undefined,
                        description: p.fundraiser ? tinaField(p.fundraiser, "description") : undefined,
                        goal: p.fundraiser ? tinaField(p.fundraiser, "goal") : undefined,
                        current: p.fundraiser ? tinaField(p.fundraiser, "current") : undefined,
                        deadline: p.fundraiser ? tinaField(p.fundraiser, "deadline") : undefined,
                      },
                    }}
                    noteText="Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb."
                  >
                    <DonationConfirmationButton />
                  </DonationBox>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Firemní sponzoring */}
      {activeTab === 'sponzoring' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section id="sponzoring" className="py-20 bg-warm-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold tracking-widest uppercase text-forest mb-3">Pro firmy</p>
              <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "sponsoringHeading")}>
                {p.sponsoringHeading}
              </h2>
              <p className="text-dark/70 mb-10" data-tina-field={tinaField(p, "sponsoringIntro")}>
                {p.sponsoringIntro}
              </p>

              <FeatureGrid 
                items={sponsoringBenefits}
                icons={sponsoringBenefitIcons}
                cardBgClass="bg-light-green"
                tinaFieldData={tinaField(p, "sponsoringBenefits")}
              />

              <p className="text-dark/60 italic text-sm mb-6">
                &quot;Stáváte se součástí příběhu, na který děti vzpomínají celý život.&quot;
              </p>

              <div>
                <ContactForm
                  type="sponzor"
                  buttonLabel="Mám zájem o sponzoring"
                  buttonClassName="inline-block bg-forest text-warm-white font-bold px-8 py-3.5 rounded-lg hover:bg-forest/90 transition-colors"
                />
                <p className="text-xs text-dark/50 mt-2 ml-1">Odpovídáme do 2 pracovních dnů.</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Dobrovolnictví */}
      {activeTab === 'dobrovolnictvi' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section id="dobrovolnictvi" className="py-20 bg-warm-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold tracking-widest uppercase text-forest mb-3">Pro studenty</p>
              <h2 className="font-serif text-3xl font-bold mb-4" data-tina-field={tinaField(p, "volunteeringHeading")}>
                {p.volunteeringHeading}
              </h2>
              <p className="text-dark/70 mb-10" data-tina-field={tinaField(p, "volunteeringIntro")}>
                {p.volunteeringIntro}
              </p>

              <FeatureGrid 
                items={volunteeringRequirements}
                icons={volunteeringRequirementIcons}
                cardBgClass="bg-light-green"
                tinaFieldData={tinaField(p, "volunteeringRequirements")}
              />

              <p className="text-dark/60 italic text-sm mb-6">
                &quot;Byl to nejlepší způsob, jak strávit prázdniny smysluplně.&quot; — absolventka kurzu fyzioterapie
              </p>

              <div>
                <ContactForm
                  type="dobrovolnik"
                  buttonLabel="Mám zájem"
                  buttonClassName="inline-block bg-gold text-dark font-bold px-8 py-3.5 rounded-lg hover:bg-gold/90 transition-colors"
                />
                <p className="text-xs text-dark/50 mt-2 ml-1">Napište nám, rádi zodpovíme otázky.</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
