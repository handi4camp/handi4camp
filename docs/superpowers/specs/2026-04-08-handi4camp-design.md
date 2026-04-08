# Handi4Camp — Design Spec

**Datum:** 2026-04-08  
**Projekt:** handi4camp.cz  
**Stack:** Next.js 15 (App Router) · TinaCMS 3.7.2 · Tailwind CSS 4 · TypeScript

---

## Kontext

Handi4Camp je letní tábor pro děti s dětskou mozkovou obrnou (DMO), pořádaný 20 let pod záštitou Rotary Clubu Valtice Břeclav. Organizuje ho Barbora Slátková. Tábora se každoročně účastní 12 dětí, asistují studenti medicíny a fyzioterapie. Roční náklady jsou ~300 000 Kč.

**Problém:** Nemají centrální online přítomnost. Sponzoři a dárci jsou získáváni osobně přes Rotary síť, bez stabilní platformy. Chybí transparentní komunikace, příběhy a jednoduchý způsob přispění.

**Cíl webu:** Konvertovat návštěvníky (primárně Rotary kluby a firmy, sekundárně jednotlivce) na sponzory a dárce. Sekundárně nabírat dobrovolníky.

**Obsah spravuje:** Bára sama (netechnická uživatelka) — CMS musí být co nejjednodušší.

---

## Vizuální identita

| | |
|---|---|
| **Paleta** | Zlatá žlutá `#F5C842` · Lesní zelená `#4A7C59` · Teplá bílá `#FFFBF0` · Tmavá `#1A1A1A` · Světlá zelená `#E8F5E9` |
| **Fonty** | Serif (Georgia nebo Playfair Display) pro nadpisy · Sans-serif (Inter nebo Geist) pro tělo textu |
| **Styl** | Letní, hřejivý, hravý ale důvěryhodný. Polaroidové rámečky pro fotky. Hodně bílého prostoru. |
| **Fotografie** | Profesionální letní fotky z kempu jsou hlavní vizuální zbraní — hero, galerie, polaroidy. Minimální video. |
| **Vyhýbáme se** | Modré (patří konkurenci handicap.cz) · submisivním frázím ("prosíme o příspěvek") · depresivním obrázkům |

---

## Tone of Voice

- **Ano:** „Vaše podpora umožňuje...", „Partnerství s tradicí", „Hmatatelný dopad", „Buďte součástí léta"
- **Ne:** „Prosíme o příspěvek", „Chudáci děti", „Dobrý den, chtěli bychom vás požádat..."
- **Charakter:** Prestižní · Empatický · Transparentní · Sebevědomý
- **Řeč:** Czech only. Žádné anglicismy, žádný slang. Jasné, konkrétní, bez „sémantických tapet".

---

## Struktura webu — 6 stránek

### Navigace
```
Logo | O kempu | Jak pomoci | Galerie & Aktuality | Partneři | Kontakt   [Přispět →]
```
Tlačítko „Přispět" je vždy viditelné v navigaci (zlaté, výrazné).

---

### 1. Domů (`/`)

**Hero sekce**
- Celostránková profesionální fotka z kempu (JS fade carousel, 3–4 fotek, `"use client"` komponenta)
- Barevný overlay (zelená `#4A7C59` s ~60% opacity)
- Nadpis (serif, velký): _„Léto bez hranic — již 20 let"_
- Podtitulek: _„Každoročně dáváme 12 dětem s DMO léto, jaké si zaslouží. A jejich rodičům 10 dní zaslouženého oddychu."_
- Dvě CTA tlačítka: **Přispět** (zlaté, primární) · **Stát se sponzorem** (outlined, bílé)
- Statistický pruh v dolní části hero: `20+ let tradice` · `12 dětí ročně` · `300 000 Kč/rok` · `100% transparentní`

**Příběh kempu** (sekce pod hero)
- 2–3 věty o historii a poslání
- Volitelně: citace rodiče dítěte z kempu (silný emoční prvek)
- CTA: „Přečíst celý příběh →" → `/o-kempu`

**Cenové kotvy** (kotvení — psychologie sponzora)
- 3 dárcovské úrovně vedle sebe:
  - `500 Kč` — _Přispějete na stravu asistenta na jeden den_
  - `5 000 Kč` ⭐ **Nejčastější volba partnerů** — _Sponzorujete rehabilitační pomůcky pro jeden ročník_
  - `20 000 Kč` — _Generální partnerství kempu pro konkrétní dítě_
- Střední možnost vizuálně zvýrazněna (zelené pozadí, badge)
- CTA pod každou: „Přispět touto částkou →" → `/jak-pomoci#darovani`

**Rozcestník „Jak můžete pomoci"**
- 3 karty vedle sebe:
  - 💛 **Chci darovat** — _Pošlete libovolnou částku převodem nebo QR kódem_
  - 🏢 **Chci sponzorovat** — _Firemní partnerství s logem, zmínkou a hmatatelným dopadem_
  - 🙋 **Chci být dobrovolníkem** — _Jedete s námi? Studenti medicíny a fyzioterapie jsou vítáni_

**Foto pás** (preview galerie)
- Horizontální scrollovatelný pás polaroidových fotek (5–6 fotek)
- CTA: „Prohlédnout celou galerii →" → `/galerie`

**Loga sponzorů**
- Jednoduchá lišta s logy sponzorů (šedivá / barevná na hover)
- Podtitulek: „Děkujeme našim partnerům"

---

### 2. O kempu (`/o-kempu`)

- **Hero:** menší, textový — nadpis + podtitulek + ilustrační fotka
- **Příběh:** Delší text o historii, vzniku, hodnotách. Kdo stojí za kempem (Bára, Rotary Club).
- **Milníky — timeline:** Vizuální osa let s klíčovými okamžiky (CMS-spravovatelné)
- **Co se na kempu děje:** 2–3 karty s aktivitami (rehabilitace, sport, výlety, terapie)
- **Tým:** Fotky + jména klíčových lidí (Bára + Rotary Club)
- **Trust boxy:** „Pod záštitou Rotary Club Valtice Břeclav" · „Transparentní účet" · „20+ ročníků za sebou"

---

### 3. Jak pomoci (`/jak-pomoci`)

Tři sekce oddělené kotvami (`#darovani`, `#sponzoring`, `#dobrovolnictvi`):

**Darování**
- Cenové kotvy (stejné jako na homepage)
- Číslo transparentního účtu + variabilní symbol
- QR kód pro platbu (statický obrázek)
- Věta o daňové uznatelnosti daru

**Sponzoring**
- Co dostane sponzor: logo na webu · logo na tričku · zmínka v příspěvku na soc. sítích · certifikát partnerství
- Kontaktní formulář nebo email na Báru pro domluvu
- Příklady předchozích sponzorů (loga)

**Dobrovolnictví**
- Co obnáší být dobrovolníkem
- Vhodné pro studenty medicíny/fyzioterapie (praxe)
- Kontakt / přihláška (jednoduchý mailto link nebo formulář)

---

### 4. Galerie & Aktuality (`/galerie`)

**Galerie po ročnících**
- Výběr ročníku (tabs nebo dropdown): 2024 · 2023 · 2022 ...
- Fotky v polaroidovém stylu — bílý rámeček, mírné natočení, stín
- Lightbox při kliknutí

**Aktuality / Blog**
- Karty článků (foto + nadpis + datum + úryvek)
- Primárně pro potřeby Rotary magazínu (RGN)
- CMS: Bára píše a publikuje sama

---

### 5. Partneři & Transparentnost (`/partneri`)

- **Sponzoři:** Loga všech sponzorů s odkazem na jejich web (CMS-spravovatelné)
- **Transparentní účet:** Odkaz na transparentní účet + číslo účtu + QR
- **Dokumenty pro dárce:** Odkaz na vzor darovací smlouvy (PDF)
- **Výroční zprávy / přehled:** Stručně co se v daném roce podařilo — spravováno jako TinaCMS `post` s tagem `vyrocni-zprava`

---

### 6. Kontakt (`/kontakt`)

- Jméno: Barbora Slátková
- Email + telefon
- Rotary Club Valtice Břeclav (s odkazem)
- Jednoduchý kontaktní formulář (jméno, email, zpráva) → mailto fallback
- Mapa / adresa areálu kempu (pokud relevantní)

---

## TinaCMS Collections

### `post` — Aktuality
| Pole | Typ | Poznámka |
|------|-----|----------|
| `title` | string (isTitle) | Nadpis článku |
| `date` | datetime | Datum publikace |
| `coverImage` | image | Titulní fotka |
| `excerpt` | string | Krátký popis (pro kartu) |
| `body` | rich-text (isBody) | Obsah článku |

### `gallery` — Ročníky galerie
| Pole | Typ | Poznámka |
|------|-----|----------|
| `year` | number (isTitle) | Rok ročníku (2024, 2023...) |
| `description` | string | Popis ročníku (volitelně) |
| `photos` | image[] (list) | Pole fotek |

### `sponsor` — Sponzoři
| Pole | Typ | Poznámka |
|------|-----|----------|
| `name` | string (isTitle) | Název sponzora |
| `logo` | image | Logo |
| `website` | string | URL webu |
| `tier` | string (enum) | `gold` / `silver` / `partner` |
| `active` | boolean | Zobrazit na webu? |

### `milestone` — Milníky
| Pole | Typ | Poznámka |
|------|-----|----------|
| `year` | number (isTitle) | Rok |
| `title` | string | Název milníku |
| `description` | string | Popis |

---

## Klíčové komponenty

| Komponenta | Popis |
|---|---|
| `Hero` | Full-bleed foto s overlay, nadpisem, CTA, stats pruhem |
| `StatBar` | Lišta se 4 statistikami (20+ let, 12 dětí, 300k, 100%) |
| `PricingAnchors` | 3 cenové kotvy s zvýrazněnou střední možností |
| `Rozcestnik` | 3 karty: darovat / sponzorovat / dobrovolník |
| `PolaroidGallery` | Fotky v polaroidovém stylu, horizontální scroll nebo grid |
| `SponsorLogos` | Lišta log sponzorů |
| `MilestoneTimeline` | Vizuální osa milníků |
| `DonationBox` | Číslo účtu + QR kód |
| `NewsCard` | Karta článku/aktuality |
| `PageHero` | Menší hero pro vnitřní stránky (foto + text) |

---

## Routing (App Router)

```
app/
  page.tsx                  → /
  o-kempu/page.tsx          → /o-kempu
  jak-pomoci/page.tsx       → /jak-pomoci
  galerie/page.tsx          → /galerie
  partneri/page.tsx         → /partneri
  kontakt/page.tsx          → /kontakt
  layout.tsx                → shared layout (nav + footer)
```

Stávající `pages/demo/blog/` bude odstraněno. TinaCMS `post` collection přesunuta do `content/posts/`, ostatní collections do `content/gallery/`, `content/sponsors/`, `content/milestones/`.

---

## Co NENÍ v rozsahu

- Platební brána (jen QR + bankovní převod)
- Registrační formulář pro děti
- Uživatelské účty / login pro dárce
- Anglická mutace
- Newsletter systém (pouze Rotary newsletter existuje externě)
- Darujme.cz nebo jiná platební platforma

---

## Ověření (jak poznat, že to funguje)

1. `npm run dev` spustí lokální TinaCMS + Next.js bez chyb
2. Na `/admin` lze přidat nový příspěvek, galerii, sponzora, milník
3. Homepage se zobrazí s hero fotkou, statistikami a cenovými kotvami
4. Na `/jak-pomoci` jsou viditelné 3 sekce s bankovním spojením a QR
5. Galerie zobrazuje fotky v polaroidovém stylu s výběrem ročníku
6. Web je responzivní na mobilu (primárně pro 50+ desktopoví uživatelé, ale mobil nutný)
7. Žádná modrá barva nikde na webu
