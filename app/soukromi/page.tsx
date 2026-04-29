import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ConsentButtonsClient from "./consent-buttons";

export const metadata: Metadata = {
  title: "Zásady ochrany soukromí — Handi4Camp",
  description: "Informace o zpracování osobních údajů a používání cookies na webu Handi4Camp.",
};

export default function SoukromiPage() {
  return (
    <>
      <PageHero
        title="Zásady ochrany soukromí"
        subtitle="Jak zpracováváme vaše osobní údaje a co jsou cookies"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-dark">

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Správce osobních údajů</h2>
          <p className="text-dark/80">
            Správcem osobních údajů je <strong>Rotary Club Valtice Břeclav</strong>, provozovatel letního tábora Handi4Camp
            (dále jen „my"). Kontaktovat nás můžete na adrese{" "}
            <a href="mailto:info@handi4camp.cz" className="text-forest underline hover:text-gold transition-colors">
              info@handi4camp.cz
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Jaké údaje zpracováváme a proč</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Kontaktní formulář</h3>
              <p className="text-dark/80">
                Když nám napíšete přes kontaktní formulář, zpracováváme vaše jméno, e-mailovou adresu a text zprávy.
                Tyto údaje používáme výhradně k odpovědi na vaši zprávu. Právním základem je oprávněný zájem správce
                (čl. 6 odst. 1 písm. f GDPR) spočívající ve vyřízení vašeho dotazu. Údaje uchováváme po dobu nezbytnou
                k vyřízení vašeho dotazu, nejdéle 1 rok.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Darovací smlouva a potvrzení o daru</h3>
              <p className="text-dark/80">
                Při žádosti o darovací smlouvu nebo potvrzení o daru zpracováváme vaše jméno, adresu,
                rodné číslo nebo IČO (a případně DIČ), datum a výši daru a e-mailovou adresu.
                Tyto údaje jsou nezbytné pro vyhotovení požadovaného dokumentu. Právním základem je
                plnění smlouvy (čl. 6 odst. 1 písm. b GDPR). Údaje uchováváme po dobu vyžadovanou
                daňovými a účetními předpisy (zpravidla 10 let).
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Analytické cookies (PostHog)</h3>
              <p className="text-dark/80">
                S vaším souhlasem používáme nástroj PostHog k anonymní analýze návštěvnosti webu — sledujeme např.
                navštívené stránky a klikání, abychom mohli web zlepšovat. Data jsou uložena na serverech PostHog
                v EU. Žádné osobní údaje neprodáváme ani nesdílíme se třetími stranami za reklamními účely.
                Souhlas s analytickými cookies můžete kdykoli odvolat tlačítkem níže.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Cookies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-light-green text-dark">
                  <th className="text-left px-4 py-2 font-semibold">Kategorie</th>
                  <th className="text-left px-4 py-2 font-semibold">Název</th>
                  <th className="text-left px-4 py-2 font-semibold">Účel</th>
                  <th className="text-left px-4 py-2 font-semibold">Platnost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/10">
                <tr>
                  <td className="px-4 py-2 text-dark/80">Nezbytné</td>
                  <td className="px-4 py-2 font-mono text-xs">cookie-consent</td>
                  <td className="px-4 py-2 text-dark/80">Uložení vašeho rozhodnutí o cookies</td>
                  <td className="px-4 py-2 text-dark/80">Trvalé (localStorage)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-dark/80">Analytické</td>
                  <td className="px-4 py-2 font-mono text-xs">ph_*</td>
                  <td className="px-4 py-2 text-dark/80">Anonymní sledování návštěvnosti (PostHog)</td>
                  <td className="px-4 py-2 text-dark/80">1 rok</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Vaše práva</h2>
          <p className="text-dark/80">
            Máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz, právo vznést námitku proti
            zpracování a právo na přenositelnost dat. Se stížností se můžete obrátit na Úřad pro ochranu osobních
            údajů (<a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer" className="text-forest underline hover:text-gold transition-colors">uoou.gov.cz</a>).
          </p>
        </section>

        <section id="souhlas" className="space-y-3">
          <h2 className="text-xl font-semibold">Správa souhlasu s cookies</h2>
          <p className="text-dark/80 mb-4">
            Svůj souhlas s analytickými cookies můžete kdykoli změnit:
          </p>
          <ConsentButtonsClient />
        </section>

        <p className="text-xs text-dark/40">Naposledy aktualizováno: duben 2026</p>
      </div>
    </>
  );
}
