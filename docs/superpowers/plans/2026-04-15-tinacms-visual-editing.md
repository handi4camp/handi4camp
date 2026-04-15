# TinaCMS Visual Editing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all visible text on every page editable via TinaCMS visual editing, with live in-context preview.

**Architecture:** Five singleton TinaCMS collections (home, okempu, jakpomoci, kontakt, global) store page text in `content/pages/*.md`. All four pages become `"use client"` components that fetch their collection via `useEffect` and pipe data through `useTina` for live visual editing. Footer self-fetches the `global` collection independently so `app/layout.tsx` stays a Server Component.

**Tech Stack:** Next.js 16 (App Router), TinaCMS 3.7, React 19, pnpm

---

## File Map

| File | Change |
|---|---|
| `tina/config.ts` | Add 5 new singleton collections |
| `content/pages/home.md` | New — seed content |
| `content/pages/o-kempu.md` | New — seed content |
| `content/pages/jak-pomoci.md` | New — seed content |
| `content/pages/kontakt.md` | New — seed content |
| `content/pages/global.md` | New — seed content |
| `components/hero.tsx` | Accept text props instead of hardcoding |
| `components/stat-bar.tsx` | Accept `stats` prop |
| `components/rozcestnik.tsx` | Accept `heading`, `subheading`, `cards` props |
| `components/donation-box.tsx` | Accept account fields as props |
| `components/footer.tsx` | Convert to client component, self-fetch `global` |
| `app/page.tsx` | Convert to client, fetch `home` + `global` |
| `app/o-kempu/page.tsx` | Convert to client, fetch `okempu` |
| `app/jak-pomoci/page.tsx` | Convert to client, fetch `jakpomoci` |
| `app/kontakt/page.tsx` | Convert to client, fetch `kontakt` |

---

## Task 1: Add TinaCMS collections to config

**Files:**
- Modify: `tina/config.ts`

- [ ] **Step 1: Replace the schema section in `tina/config.ts`**

Replace the entire `schema: { collections: [...] }` section with the following. Keep all existing collections (post, gallery, sponsor, milestone) and add the 5 new ones at the end:

```ts
import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Aktuality",
        path: "content/posts",
        fields: [
          { type: "string", name: "title", label: "Nadpis", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Datum publikace", required: true },
          { type: "image", name: "coverImage", label: "Titulní fotka" },
          { type: "string", name: "excerpt", label: "Krátký popis", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Obsah", isBody: true },
        ],
        ui: { router: ({ document }) => `/galerie/${document._sys.filename}` },
      },
      {
        name: "gallery",
        label: "Galerie",
        path: "content/gallery",
        fields: [
          { type: "number", name: "year", label: "Rok ročníku", required: true },
          { type: "string", name: "description", label: "Popis ročníku" },
          { type: "image", name: "photos", label: "Fotky", list: true },
        ],
      },
      {
        name: "sponsor",
        label: "Sponzoři",
        path: "content/sponsors",
        fields: [
          { type: "string", name: "name", label: "Název", isTitle: true, required: true },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "website", label: "Web URL" },
          { type: "string", name: "tier", label: "Úroveň partnerství", options: ["gold", "silver", "partner"] },
          { type: "boolean", name: "active", label: "Zobrazit na webu" },
        ],
      },
      {
        name: "milestone",
        label: "Milníky",
        path: "content/milestones",
        fields: [
          { type: "number", name: "year", label: "Rok", required: true },
          { type: "string", name: "title", label: "Název milníku", required: true },
          { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
        ],
      },
      // ── Page singleton collections ──────────────────────────────────────
      {
        name: "home",
        label: "Úvodní stránka",
        path: "content/pages",
        match: { include: "home" },
        fields: [
          { type: "string", name: "heroHeadline", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtext", label: "Hero — Podnadpis", ui: { component: "textarea" } },
          { type: "string", name: "heroCta1Label", label: "Hero — CTA 1 text" },
          { type: "string", name: "heroCta1Href", label: "Hero — CTA 1 odkaz" },
          { type: "string", name: "heroCta2Label", label: "Hero — CTA 2 text" },
          { type: "string", name: "heroCta2Href", label: "Hero — CTA 2 odkaz" },
          { type: "string", name: "storyHeading", label: "Příběh — Nadpis" },
          { type: "string", name: "storyBody", label: "Příběh — Text", ui: { component: "textarea" } },
          { type: "string", name: "storyQuote", label: "Příběh — Citát", ui: { component: "textarea" } },
          { type: "string", name: "storyQuoteAuthor", label: "Příběh — Autor citátu" },
          { type: "string", name: "storyLinkLabel", label: "Příběh — Odkaz text" },
          { type: "string", name: "photoStripHeading", label: "Fotopás — Nadpis" },
          { type: "string", name: "rozcestnikHeading", label: "Rozcestník — Nadpis" },
          { type: "string", name: "rozcestnikSubheading", label: "Rozcestník — Podnadpis" },
          {
            type: "object",
            name: "rozcestnikCards",
            label: "Rozcestník — Karty",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Název" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
        ],
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "okempu",
        label: "O kempu",
        path: "content/pages",
        match: { include: "o-kempu" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "storyHeading", label: "Příběh — Nadpis" },
          { type: "string", name: "storyParagraph1", label: "Příběh — Odstavec 1", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph2", label: "Příběh — Odstavec 2", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph3", label: "Příběh — Odstavec 3", ui: { component: "textarea" } },
          { type: "string", name: "milestonesHeading", label: "Milníky — Nadpis" },
          { type: "string", name: "activitiesHeading", label: "Aktivity — Nadpis" },
          {
            type: "object",
            name: "activities",
            label: "Aktivity",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Název" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "teamHeading", label: "Tým — Nadpis" },
          {
            type: "object",
            name: "teamMembers",
            label: "Členové týmu",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Jméno" },
              { type: "string", name: "description", label: "Popis", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "trustItems", label: "Důvěra — položky", list: true },
        ],
        ui: {
          router: () => "/o-kempu",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "jakpomoci",
        label: "Jak pomoci",
        path: "content/pages",
        match: { include: "jak-pomoci" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "donationHeading", label: "Darování — Nadpis" },
          { type: "string", name: "donationIntro", label: "Darování — Úvod", ui: { component: "textarea" } },
          {
            type: "object",
            name: "donationTiers",
            label: "Darování — Úrovně",
            list: true,
            fields: [
              { type: "string", name: "amount", label: "Částka" },
              { type: "string", name: "desc", label: "Popis" },
              { type: "boolean", name: "featured", label: "Zvýraznit" },
            ],
          },
          { type: "string", name: "transparencyHeading", label: "Transparentnost — Nadpis" },
          { type: "string", name: "transparencyIntro", label: "Transparentnost — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "accountNumber", label: "Číslo účtu" },
          { type: "string", name: "transactionLinkLabel", label: "Výpis transakcí — text odkazu" },
          { type: "string", name: "transactionLinkHref", label: "Výpis transakcí — URL" },
          { type: "string", name: "donationContractLabel", label: "Darovací smlouva — text tlačítka" },
          { type: "string", name: "sponsoringHeading", label: "Sponzoring — Nadpis" },
          { type: "string", name: "sponsoringIntro", label: "Sponzoring — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "sponsoringBenefits", label: "Sponzoring — výhody", list: true },
          { type: "string", name: "volunteeringHeading", label: "Dobrovolnictví — Nadpis" },
          { type: "string", name: "volunteeringIntro", label: "Dobrovolnictví — Úvod", ui: { component: "textarea" } },
          { type: "string", name: "volunteeringRequirements", label: "Dobrovolnictví — požadavky", list: true },
        ],
        ui: {
          router: () => "/jak-pomoci",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "kontakt",
        label: "Kontakt",
        path: "content/pages",
        match: { include: "kontakt" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero — Nadpis" },
          { type: "string", name: "heroSubtitle", label: "Hero — Podnadpis" },
          { type: "string", name: "contactHeading", label: "Kontakt — Nadpis sekce" },
          { type: "string", name: "organizerName", label: "Organizátorka — Jméno" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "facebookLabel", label: "Facebook — text odkazu" },
          { type: "string", name: "affiliationLabel", label: "Záštita — název" },
          { type: "string", name: "affiliationHref", label: "Záštita — URL" },
          { type: "string", name: "formHeading", label: "Formulář — Nadpis" },
          { type: "string", name: "formNameLabel", label: "Formulář — štítek Jméno" },
          { type: "string", name: "formEmailLabel", label: "Formulář — štítek Email" },
          { type: "string", name: "formMessageLabel", label: "Formulář — štítek Zpráva" },
          { type: "string", name: "formSubmitLabel", label: "Formulář — text tlačítka" },
        ],
        ui: {
          router: () => "/kontakt",
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "global",
        label: "Globální — Footer & Statistiky",
        path: "content/pages",
        match: { include: "global" },
        fields: [
          {
            type: "object",
            name: "stats",
            label: "Statistiky",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Hodnota" },
              { type: "string", name: "label", label: "Popis" },
            ],
          },
          { type: "string", name: "footerTagline", label: "Footer — Popis kempu", ui: { component: "textarea" } },
          { type: "string", name: "footerContactName", label: "Footer — Kontakt jméno" },
          { type: "string", name: "footerEmail", label: "Footer — Email" },
          { type: "string", name: "footerFacebookLabel", label: "Footer — Facebook text" },
        ],
        ui: {
          allowedActions: { create: false, delete: false },
        },
      },
    ],
  },
});
```

- [ ] **Step 2: Regenerate TinaCMS types**

Run the dev server briefly so TinaCMS regenerates `tina/__generated__/client.ts` and `tina/__generated__/types.ts` with the new queries:

```bash
pnpm dev
```

Wait until you see `TinaCMS - Server started` in the terminal (about 10–15 seconds), then **Ctrl+C** to stop. The generated files now include `client.queries.home`, `client.queries.global`, etc.

- [ ] **Step 3: Commit**

```bash
git add tina/config.ts tina/__generated__/
git commit -m "feat: add tinacms page singleton collections"
```

---

## Task 2: Create seed content files

**Files:**
- Create: `content/pages/home.md`
- Create: `content/pages/o-kempu.md`
- Create: `content/pages/jak-pomoci.md`
- Create: `content/pages/kontakt.md`
- Create: `content/pages/global.md`

- [ ] **Step 1: Create `content/pages/home.md`**

```markdown
---
heroHeadline: 'Léto bez hranic — již 20 let'
heroSubtext: 'Každoročně dáváme 12 dětem s DMO léto, jaké si zaslouží. A jejich rodičům 10 dní zaslouženého oddychu.'
heroCta1Label: 'Přispět'
heroCta1Href: '/jak-pomoci#darovani'
heroCta2Label: 'Stát se sponzorem'
heroCta2Href: '/jak-pomoci#sponzoring'
storyHeading: 'Dvacet let léta, které mění životy'
storyBody: 'Handi4Camp vznikl před 20 lety jako iniciativa Barbory Slátkové a Rotary Clubu Valtice Břeclav. Každé léto spojujeme 12 dětí s dětskou mozkovou obrnou s budoucími lékaři a fyzioterapeuty, kteří jim věnují týden péče, pohybu a radosti.'
storyQuote: 'Díky kempu syn poprvé v životě zažil, co znamená být součástí party.'
storyQuoteAuthor: 'maminka účastníka'
storyLinkLabel: 'Přečíst celý příběh →'
photoStripHeading: 'Chvíle, které zůstanou'
rozcestnikHeading: 'Jak chcete pomoci?'
rozcestnikSubheading: 'Každá forma pomoci mění životy dětí s DMO.'
rozcestnikCards:
  - title: 'Chci darovat'
    description: 'Pošlete libovolnou částku převodem nebo QR kódem'
  - title: 'Chci sponzorovat'
    description: 'Firemní partnerství s logem, zmínkou a hmatatelným dopadem'
  - title: 'Chci být dobrovolníkem'
    description: 'Jedete s námi? Studenti medicíny a fyzioterapie jsou vítáni'
---
```

- [ ] **Step 2: Create `content/pages/o-kempu.md`**

```markdown
---
heroTitle: 'O kempu'
heroSubtitle: 'Dvacet let tradice, důvěry a léta bez hranic pro děti s DMO.'
storyHeading: 'Jak to celé začalo'
storyParagraph1: 'Handi4Camp vznikl v roce 2004 díky iniciativě Barbory Slátkové a Rotary Clubu Valtice Břeclav. Myšlenka byla jednoduchá: dát dětem s dětskou mozkovou obrnou týden prázdnin, jaký si zaslouží — plný pohybu, přátelství a profesionální péče.'
storyParagraph2: 'Za dvacet let prošlo kempem přes 200 dětí. Každý ročník se účastní 12 dětí ve věku 6–16 let. Asistují jim studenti lékařství a fyzioterapie — budoucí zdravotníci, kteří získávají neocenitelnou zkušenost s prací v terénu.'
storyParagraph3: 'Rodinám přinášíme také zasloužený oddych. Těch 10 dní mimo domov je pro mnohé rodiče první skutečnou dovolenou za několik let.'
milestonesHeading: 'Naše milníky'
activitiesHeading: 'Co se na kempu děje'
activities:
  - title: 'Rehabilitace'
    description: 'Každodenní fyzioterapeutické cvičení přizpůsobené každému dítěti individuálně.'
  - title: 'Sport a hry'
    description: 'Plavání, boccia, příroda — aktivity navržené pro radost i pohyb.'
  - title: 'Výlety'
    description: 'Okolí Valtice, příroda Pálava — každý den nové dobrodružství.'
teamHeading: 'Kdo za kempem stojí'
teamMembers:
  - name: 'Barbora Slátková'
    description: 'Organizátorka a hlavní koordinátorka. Srdce projektu od prvního ročníku.'
  - name: 'Rotary Club Valtice Břeclav'
    description: 'Záštita a klíčový partner kempu. Síť kontaktů, zázemí a finanční podpora.'
trustItems:
  - 'Pod záštitou Rotary Club Valtice Břeclav'
  - 'Transparentní účet'
  - '20+ ročníků za sebou'
---
```

- [ ] **Step 3: Create `content/pages/jak-pomoci.md`**

```markdown
---
heroTitle: 'Jak pomoci'
heroSubtitle: 'Vaše podpora umožňuje dětem prožít léto, na které nikdy nezapomenou.'
donationHeading: 'Darování'
donationIntro: 'Každá částka má konkrétní dopad. Přispějte bankovním převodem nebo přes QR kód.'
donationTiers:
  - amount: '500 Kč'
    desc: 'stravu asistenta na jeden den'
    featured: false
  - amount: '5 000 Kč'
    desc: 'rehabilitační pomůcky pro celý ročník'
    featured: true
  - amount: '20 000 Kč'
    desc: 'generální partnerství pro konkrétní dítě'
    featured: false
transparencyHeading: 'Transparentní financování'
transparencyIntro: 'Veškeré příjmy a výdaje kempu jsou veřejně dohledatelné.'
accountNumber: 'XXXX-XXXXXX/XXXX'
transactionLinkLabel: 'Odkaz na transparentní účet →'
transactionLinkHref: '#'
donationContractLabel: 'Stáhnout darovací smlouvu (PDF)'
sponsoringHeading: 'Firemní sponzoring'
sponsoringIntro: 'Partnerství s tradicí. Vaše firma se stane součástí příběhu kempu s hmatatelným a měřitelným dopadem.'
sponsoringBenefits:
  - 'Logo na webu kempu'
  - 'Logo na tričkách účastníků'
  - 'Zmínka v příspěvcích na sociálních sítích'
  - 'Certifikát partnerství'
volunteeringHeading: 'Dobrovolnictví'
volunteeringIntro: 'Hledáme studenty medicíny, fyzioterapie nebo pedagogiky, kteří chtějí udělat léto jinak — smysluplně a s přidanou hodnotou pro studium.'
volunteeringRequirements:
  - '10 dní intenzivní práce s dětmi s DMO'
  - 'Dohled zkušených fyzioterapeutů'
  - 'Praxe uznatelná v rámci studia'
  - 'Strava a ubytování zajištěno'
---
```

- [ ] **Step 4: Create `content/pages/kontakt.md`**

```markdown
---
heroTitle: 'Kontakt'
heroSubtitle: 'Máte otázku? Rádi vám odpovíme.'
contactHeading: 'Spojte se s námi'
organizerName: 'Barbora Slátková'
email: 'info@handi4camp.cz'
facebookLabel: 'Handi4Camp'
affiliationLabel: 'Rotary Club Valtice Břeclav'
affiliationHref: 'https://rotary.cz'
formHeading: 'Napište nám'
formNameLabel: 'Jméno'
formEmailLabel: 'Email'
formMessageLabel: 'Zpráva'
formSubmitLabel: 'Odeslat zprávu →'
---
```

- [ ] **Step 5: Create `content/pages/global.md`**

```markdown
---
stats:
  - value: '20+'
    label: 'let tradice'
  - value: '12'
    label: 'dětí ročně'
  - value: '300 000 Kč'
    label: 'roční náklady'
  - value: '100%'
    label: 'transparentní'
footerTagline: 'Letní tábor pro děti s DMO pod záštitou Rotary Club Valtice Břeclav.'
footerContactName: 'Barbora Slátková'
footerEmail: 'info@handi4camp.cz'
footerFacebookLabel: 'Handi4Camp na Facebooku'
---
```

- [ ] **Step 6: Commit**

```bash
git add content/pages/
git commit -m "feat: add seed content files for tinacms page collections"
```

---

## Task 3: Refactor Hero component to accept text props

**Files:**
- Modify: `components/hero.tsx`

The Hero currently has the heading, subtext, and CTA labels/hrefs hardcoded. Make them props. Slides (images) stay hardcoded.

- [ ] **Step 1: Replace `components/hero.tsx`**

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { src: "/images/handicamp-foto-03.webp", label: "Léto plné pohybu" },
  { src: "/images/handicamp-foto-11.webp", label: "Rehabilitace v přírodě" },
  { src: "/images/handicamp-foto-10.webp", label: "Společné chvíle" },
  { src: "/images/handicamp-foto-01.webp", label: "Tým asistentů" },
];

type HeroProps = {
  headline: string;
  subtext: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
};

export default function Hero({ headline, subtext, cta1Label, cta1Href, cta2Label, cta2Href }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-end md:justify-start overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-forest/60" />

      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Snímek ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-gold w-6" : "bg-warm-white/50"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-0 md:mt-[50vh] text-warm-white">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 leading-tight">
          {headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-warm-white/90">
          {subtext}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href={cta1Href}
            className="bg-gold text-dark font-bold px-8 py-3 rounded-lg text-lg hover:bg-gold/90 transition-colors"
          >
            {cta1Label}
          </Link>
          <Link
            href={cta2Href}
            className="border-2 border-warm-white text-warm-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-warm-white/10 transition-colors"
          >
            {cta2Label}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero.tsx
git commit -m "refactor: hero accepts text props"
```

---

## Task 4: Refactor StatBar component to accept stats prop

**Files:**
- Modify: `components/stat-bar.tsx`

- [ ] **Step 1: Replace `components/stat-bar.tsx`**

```tsx
type Stat = { value: string; label: string };

export default function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="bg-warm-white border-y border-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-8 px-6 text-center border-r border-dark/10 last:border-r-0"
          >
            <div className="font-serif text-3xl font-bold text-forest">
              {stat.value}
            </div>
            <div className="text-xs text-dark/50 mt-1 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/stat-bar.tsx
git commit -m "refactor: stat-bar accepts stats prop"
```

---

## Task 5: Refactor Rozcestnik component to accept heading/cards props

**Files:**
- Modify: `components/rozcestnik.tsx`

The three card hrefs stay hardcoded because they are navigation structure. The icons stay hardcoded and match cards by index position.

- [ ] **Step 1: Replace `components/rozcestnik.tsx`**

```tsx
import Link from "next/link";
import { Heart, Building2, HandHelping, ArrowRight } from "lucide-react";

type Sponsor = {
  name: string;
  logo?: string;
  website?: string;
};

type Card = {
  title: string;
  description: string;
};

const cardHrefs = [
  "/jak-pomoci#darovani",
  "/jak-pomoci#sponzoring",
  "/jak-pomoci#dobrovolnictvi",
];
const cardIcons = [Heart, Building2, HandHelping];

type RozcestnikProps = {
  heading: string;
  subheading: string;
  cards: Card[];
  sponsors: Sponsor[];
};

export default function Rozcestnik({ heading, subheading, cards, sponsors }: RozcestnikProps) {
  return (
    <section className="py-20 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-3">{heading}</h2>
          <p className="text-dark/60 text-lg">{subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => {
            const Icon = cardIcons[i] ?? Heart;
            const href = cardHrefs[i] ?? "/jak-pomoci";
            return (
              <Link
                key={href}
                href={href}
                className="group relative bg-light-green rounded-2xl p-8 flex flex-col gap-4 hover:bg-forest transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-warm-white/60 group-hover:bg-warm-white/20 flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-7 h-7 text-forest group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-forest group-hover:text-warm-white mb-2 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-dark/60 group-hover:text-warm-white/70 transition-colors duration-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-forest group-hover:text-gold transition-colors duration-300">
                  Zjistit více <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mb-16">
          <Link
            href="/jak-pomoci"
            className="inline-block bg-forest text-warm-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-forest/90 transition-colors"
          >
            Přidejte se →
          </Link>
        </div>

        <div className="border-t border-dark/10 pt-12">
          <p className="text-center text-xs font-semibold tracking-widest text-dark/40 uppercase mb-8">
            Děkujeme našim partnerům
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={sponsor.name}
              >
                {sponsor.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                ) : (
                  <span className="text-dark/40 hover:text-dark font-bold text-sm transition-colors">{sponsor.name}</span>
                )}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/rozcestnik.tsx
git commit -m "refactor: rozcestnik accepts heading/cards props"
```

---

## Task 6: Refactor DonationBox component to accept account props

**Files:**
- Modify: `components/donation-box.tsx`

- [ ] **Step 1: Replace `components/donation-box.tsx`**

```tsx
type DonationBoxProps = {
  accountNumber: string;
  variableSymbol?: string;
  noteText?: string;
};

export default function DonationBox({ accountNumber, variableSymbol = "2024", noteText }: DonationBoxProps) {
  return (
    <div className="bg-light-green rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold text-forest mb-4">
          Bankovní převod
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Číslo účtu:</dt>
            <dd className="font-mono font-bold">{accountNumber}</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Variabilní symbol:</dt>
            <dd className="font-mono font-bold">{variableSymbol}</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Zpráva pro příjemce:</dt>
            <dd>Handi4Camp – dar</dd>
          </div>
        </dl>
        {noteText && (
          <p className="mt-4 text-xs text-dark/50">{noteText}</p>
        )}
      </div>
      <div className="flex-none text-center">
        <div className="bg-white p-4 rounded-xl inline-block shadow">
          <div className="w-32 h-32 bg-light-green/60 flex items-center justify-center text-xs text-forest/50 rounded">
            QR kód
          </div>
        </div>
        <p className="text-xs text-dark/60 mt-2">Naskenujte pro platbu</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/donation-box.tsx
git commit -m "refactor: donation-box accepts account props"
```

---

## Task 7: Convert Footer to self-fetching client component

**Files:**
- Modify: `components/footer.tsx`

Footer lives in `app/layout.tsx` (Server Component) so it can't receive props from pages. Instead it fetches `global` data itself. `app/layout.tsx` is not modified.

- [ ] **Step 1: Replace `components/footer.tsx`**

```tsx
"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import Link from "next/link";

type GlobalQuery = Awaited<ReturnType<typeof client.queries.global>>;

export default function Footer() {
  const [tinaData, setTinaData] = useState<GlobalQuery | null>(null);

  useEffect(() => {
    client.queries.global({ relativePath: "global.md" }).then(setTinaData);
  }, []);

  const { data } = useTina(
    tinaData ?? { query: "", variables: {}, data: null as any }
  );

  if (!tinaData) return null;

  const g = data.global;

  return (
    <footer className="bg-forest text-warm-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-3">Handi4Camp</h3>
            <p className="text-sm text-warm-white/80">{g.footerTagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigace</h4>
            <ul className="space-y-2 text-sm text-warm-white/80">
              <li><Link href="/o-kempu" className="hover:text-gold transition-colors">O kempu</Link></li>
              <li><Link href="/jak-pomoci" className="hover:text-gold transition-colors">Jak pomoci</Link></li>
              <li><Link href="/galerie" className="hover:text-gold transition-colors">Galerie & Aktuality</Link></li>
              <li><Link href="/partneri" className="hover:text-gold transition-colors">Partneři</Link></li>
              <li><Link href="/kontakt" className="hover:text-gold transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-sm text-warm-white/80">{g.footerContactName}</p>
            <a
              href={`mailto:${g.footerEmail}`}
              className="text-sm text-warm-white/80 hover:text-gold transition-colors"
            >
              {g.footerEmail}
            </a>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/jak-pomoci#darovani"
                className="inline-block bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
              >
                Přispět →
              </Link>
              <a
                href="https://www.facebook.com/Handi4Camp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-warm-white/70 hover:text-warm-white transition-colors text-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/facebook.svg" alt="" className="w-4 h-4 brightness-0 invert" />
                {g.footerFacebookLabel}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-warm-white/20 text-center text-xs text-warm-white/60">
          © {new Date().getFullYear()} Handi4Camp · Rotary Club Valtice Břeclav
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: footer self-fetches global content from tinacms"
```

---

## Task 8: Update home page to fetch from TinaCMS

**Files:**
- Modify: `app/page.tsx`

Home page fetches both `home` (page content) and `global` (stats) collections. Both are needed for visual editing so both go through `useTina`.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import Link from "next/link";
import Hero from "@/components/hero";
import StatBar from "@/components/stat-bar";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type HomeQuery = Awaited<ReturnType<typeof client.queries.home>>;
type GlobalQuery = Awaited<ReturnType<typeof client.queries.global>>;

const photos: PolaroidPhoto[] = [
  { src: "/images/handicamp-foto-07.webp", alt: "Výtvarná dílna", rotation: -2 },
  { src: "/images/handicamp-foto-13.webp", alt: "Radost na táboře", rotation: 1 },
  { src: "/images/handicamp-foto-06.webp", alt: "Malování na kempu", rotation: -1 },
  { src: "/images/handicamp-foto-19.webp", alt: "Společná chvíle", rotation: 2 },
  { src: "/images/handicamp-foto-08.webp", alt: "Chvíle radosti", rotation: -3 },
  { src: "/images/handicamp-foto-17.webp", alt: "Odpoledne venku", rotation: 1 },
  { src: "/images/handicamp-foto-14.webp", alt: "Plavání při západu slunce", rotation: -2 },
  { src: "/images/handicamp-foto-16.webp", alt: "Pohyb a smích", rotation: 3 },
  { src: "/images/handicamp-foto-20.webp", alt: "Přátelství na kempu", rotation: -1 },
  { src: "/images/handicamp-foto-28.webp", alt: "Letní program", rotation: 2 },
  { src: "/images/handicamp-foto-24.webp", alt: "Tým pohromadě", rotation: -2 },
  { src: "/images/handicamp-foto-15.webp", alt: "Kreativní dílna", rotation: 1 },
  { src: "/images/handicamp-foto-12.webp", alt: "Venkovní aktivity", rotation: -3 },
  { src: "/images/handicamp-foto-25.webp", alt: "Večerní program", rotation: 2 },
  { src: "/images/handicamp-foto-18.webp", alt: "Vzpomínka na kamp", rotation: -1 },
];

const sponsors = [
  { name: "Rotary Club Valtice Břeclav", logo: "/images/partners/valtice.png", website: "https://rotary.cz" },
  { name: "Skupina ČEZ", logo: "/images/partners/cez.png", website: "https://cez.cz" },
  { name: "Sportisimo", logo: "/images/partners/sportisimo.svg", website: "https://sportisimo.cz" },
];

export default function Home() {
  const [homeData, setHomeData] = useState<HomeQuery | null>(null);
  const [globalData, setGlobalData] = useState<GlobalQuery | null>(null);

  useEffect(() => {
    client.queries.home({ relativePath: "home.md" }).then(setHomeData);
    client.queries.global({ relativePath: "global.md" }).then(setGlobalData);
  }, []);

  const { data: hData } = useTina(
    homeData ?? { query: "", variables: {}, data: null as any }
  );
  const { data: gData } = useTina(
    globalData ?? { query: "", variables: {}, data: null as any }
  );

  if (!homeData || !globalData) return null;

  const h = hData.home;
  const g = gData.global;

  return (
    <>
      <Hero
        headline={h.heroHeadline ?? ""}
        subtext={h.heroSubtext ?? ""}
        cta1Label={h.heroCta1Label ?? ""}
        cta1Href={h.heroCta1Href ?? "/jak-pomoci#darovani"}
        cta2Label={h.heroCta2Label ?? ""}
        cta2Href={h.heroCta2Href ?? "/jak-pomoci#sponzoring"}
      />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">{h.storyHeading}</h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">{h.storyBody}</p>
          <blockquote className="border-l-4 border-gold pl-4 text-left italic text-dark/70 my-6 mx-auto max-w-xl">
            „{h.storyQuote}" — {h.storyQuoteAuthor}
          </blockquote>
          <Link
            href="/o-kempu"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            {h.storyLinkLabel}
          </Link>
        </div>
      </section>

      <StatBar stats={(g.stats ?? []).map((s: any) => ({ value: s.value ?? "", label: s.label ?? "" }))} />

      <section className="pt-12 pb-8 bg-warm-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 text-center">
          <h2 className="font-serif text-2xl font-bold">{h.photoStripHeading}</h2>
        </div>
        <PolaroidGallery photos={photos} />
        <div className="text-center pb-4">
          <Link
            href="/galerie"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Prohlédnout celou galerii →
          </Link>
        </div>
      </section>

      <Rozcestnik
        heading={h.rozcestnikHeading ?? ""}
        subheading={h.rozcestnikSubheading ?? ""}
        cards={(h.rozcestnikCards ?? []).map((c: any) => ({ title: c.title ?? "", description: c.description ?? "" }))}
        sponsors={sponsors}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Start the dev server: `pnpm dev`

Open `http://localhost:3000`. The home page should look identical to before. No text should be missing or broken.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: home page fetches content from tinacms"
```

---

## Task 9: Update o-kempu page to fetch from TinaCMS

**Files:**
- Modify: `app/o-kempu/page.tsx`

- [ ] **Step 1: Replace `app/o-kempu/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/o-kempu`. The page should look identical to before.

- [ ] **Step 3: Commit**

```bash
git add app/o-kempu/page.tsx
git commit -m "feat: o-kempu page fetches content from tinacms"
```

---

## Task 10: Update jak-pomoci page to fetch from TinaCMS

**Files:**
- Modify: `app/jak-pomoci/page.tsx`

- [ ] **Step 1: Replace `app/jak-pomoci/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/jak-pomoci`. Page should look identical to before.

- [ ] **Step 3: Commit**

```bash
git add app/jak-pomoci/page.tsx
git commit -m "feat: jak-pomoci page fetches content from tinacms"
```

---

## Task 11: Update kontakt page to fetch from TinaCMS

**Files:**
- Modify: `app/kontakt/page.tsx`

- [ ] **Step 1: Replace `app/kontakt/page.tsx`**

```tsx
"use client";
import { useState, useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import PageHero from "@/components/page-hero";

type KontaktQuery = Awaited<ReturnType<typeof client.queries.kontakt>>;

export default function KontaktPage() {
  const [tinaData, setTinaData] = useState<KontaktQuery | null>(null);

  useEffect(() => {
    client.queries.kontakt({ relativePath: "kontakt.md" }).then(setTinaData);
  }, []);

  const { data } = useTina(
    tinaData ?? { query: "", variables: {}, data: null as any }
  );

  if (!tinaData) return null;

  const p = data.kontakt;

  return (
    <>
      <PageHero title={p.heroTitle ?? ""} subtitle={p.heroSubtitle ?? ""} />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">{p.contactHeading}</h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Organizátorka</dt>
                  <dd className="text-dark font-medium">{p.organizerName}</dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Email</dt>
                  <dd>
                    <a href={`mailto:${p.email}`} className="text-forest hover:text-dark transition-colors">
                      {p.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Facebook</dt>
                  <dd>
                    <a
                      href="https://www.facebook.com/Handi4Camp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-forest hover:text-dark transition-colors"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/facebook.svg" alt="" className="w-4 h-4" />
                      {p.facebookLabel}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">Záštita</dt>
                  <dd>
                    <a
                      href={p.affiliationHref ?? "https://rotary.cz"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest hover:text-dark transition-colors"
                    >
                      {p.affiliationLabel}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">{p.formHeading}</h2>
              <form
                action={`mailto:${p.email}`}
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1">
                    {p.formNameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1">
                    {p.formEmailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1">
                    {p.formMessageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-dark/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-forest resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-forest text-warm-white font-bold py-3 rounded-lg hover:bg-forest/90 transition-colors"
                >
                  {p.formSubmitLabel}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000/kontakt`. Page should look identical to before.

- [ ] **Step 3: Verify visual editing**

Open `http://localhost:4001/index.html` (TinaCMS admin). Navigate to "Úvodní stránka" → open the document → click "Visual Editor". The page should load in an iframe with the TinaCMS sidebar showing the editable fields. Typing in a field should update the page text live.

Repeat for O kempu, Jak pomoci, Kontakt, and Globální nastavení.

- [ ] **Step 4: Commit**

```bash
git add app/kontakt/page.tsx
git commit -m "feat: kontakt page fetches content from tinacms"
```
