# Handi4Camp Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete handi4camp.cz website — 6 pages, 10+ components, TinaCMS schema — from the Next.js 16 + Tailwind 4 + TinaCMS 3.7 boilerplate.

**Architecture:** Server Components by default; only Hero (carousel) and Galerie (tab state) are `"use client"`. Pages use hardcoded Czech content matching the spec; TinaCMS CMS is wired for editorial use at `/admin`. All components live in `components/`, pages in `app/`.

**Tech Stack:** Next.js 16.2 (App Router) · React 19 · TinaCMS 3.7.2 · Tailwind CSS 4 · TypeScript 5 · pnpm

---

> **⚠️ Before writing any Next.js code:** Read `node_modules/next/dist/docs/` for breaking-change guidance (AGENTS.md requirement). Heed any deprecation notices you find there.

---

## File Map

```
tina/config.ts                         MODIFY — add gallery, sponsor, milestone collections; update post
content/posts/hello-world.md           MODIFY — add date, excerpt fields to match new schema
content/gallery/2024.md                CREATE — sample gallery year
content/sponsors/rotary-valtice.md     CREATE — sample sponsor
content/milestones/2004.md             CREATE — sample milestone
content/milestones/2024.md             CREATE — sample milestone

app/globals.css                        MODIFY — design tokens (colors, fonts)
app/layout.tsx                         MODIFY — fonts, metadata, Nav, Footer
app/page.tsx                           MODIFY — homepage assembly
app/o-kempu/page.tsx                   CREATE
app/jak-pomoci/page.tsx                CREATE
app/galerie/page.tsx                   CREATE ("use client" for year tabs)
app/partneri/page.tsx                  CREATE
app/kontakt/page.tsx                   CREATE

components/nav.tsx                     CREATE
components/footer.tsx                  CREATE
components/hero.tsx                    CREATE ("use client" — fade carousel)
components/stat-bar.tsx                CREATE
components/pricing-anchors.tsx         CREATE
components/rozcestnik.tsx              CREATE
components/polaroid-gallery.tsx        CREATE
components/sponsor-logos.tsx           CREATE
components/page-hero.tsx               CREATE
components/donation-box.tsx            CREATE
components/news-card.tsx               CREATE
components/milestone-timeline.tsx      CREATE

pages/demo/blog/[filename].tsx         DELETE
```

---

## Task 1: TinaCMS Schema + Sample Content

**Files:**
- Modify: `tina/config.ts`
- Modify: `content/posts/hello-world.md`
- Create: `content/gallery/2024.md`
- Create: `content/sponsors/rotary-valtice.md`
- Create: `content/milestones/2004.md`
- Create: `content/milestones/2024.md`

- [ ] **Step 1: Update tina/config.ts with all four collections**

Replace the entire file content:

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
          {
            type: "string",
            name: "title",
            label: "Nadpis",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Datum publikace",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Titulní fotka",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Krátký popis",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Obsah",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/galerie`,
        },
      },
      {
        name: "gallery",
        label: "Galerie",
        path: "content/gallery",
        fields: [
          {
            type: "number",
            name: "year",
            label: "Rok ročníku",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Popis ročníku",
          },
          {
            type: "image",
            name: "photos",
            label: "Fotky",
            list: true,
          },
        ],
      },
      {
        name: "sponsor",
        label: "Sponzoři",
        path: "content/sponsors",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Název",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
          },
          {
            type: "string",
            name: "website",
            label: "Web URL",
          },
          {
            type: "string",
            name: "tier",
            label: "Úroveň partnerství",
            options: ["gold", "silver", "partner"],
          },
          {
            type: "boolean",
            name: "active",
            label: "Zobrazit na webu",
          },
        ],
      },
      {
        name: "milestone",
        label: "Milníky",
        path: "content/milestones",
        fields: [
          {
            type: "number",
            name: "year",
            label: "Rok",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Název milníku",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Popis",
            ui: { component: "textarea" },
          },
        ],
      },
    ],
  },
});
```

- [ ] **Step 2: Create content directories and sample files**

Create `content/gallery/2024.md`:
```markdown
---
year: 2024
description: Jubilejní dvacátý ročník kempu
---
```

Create `content/sponsors/rotary-valtice.md`:
```markdown
---
name: Rotary Club Valtice Břeclav
website: https://rotary.cz
tier: gold
active: true
---
```

Create `content/milestones/2004.md`:
```markdown
---
year: 2004
title: Vznik kempu
description: První ročník Handi4Camp s 6 dětmi a nadšeným týmem asistentů.
---
```

Create `content/milestones/2024.md`:
```markdown
---
year: 2024
title: 20. výročí kempu
description: Jubilejní ročník s rekordní účastí a silnou mediální odezvou.
---
```

Update `content/posts/hello-world.md` to match the new schema (adds required `date` and optional `excerpt`):
```markdown
---
title: "Handi4Camp — otevíráme nový web"
date: 2024-04-08T00:00:00.000Z
excerpt: "Vítejte na novém webu Handi4Camp. Najdete zde vše o našem letním táboře pro děti s DMO."
---

## Vítejte na Handi4Camp!

Jsme rádi, že jste tu. Náš nový web je místem, kde najdete vše o letním táboře pro děti s dětskou mozkovou obrnou.
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add tina/config.ts content/
git commit -m "feat: TinaCMS schema — gallery, sponsor, milestone collections"
```

---

## Task 2: Design System — Tokens + Fonts

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/globals.css with design tokens**

```css
@import "tailwindcss";

@theme inline {
  --color-gold: #F5C842;
  --color-forest: #4A7C59;
  --color-warm-white: #FFFBF0;
  --color-dark: #1A1A1A;
  --color-light-green: #E8F5E9;
  --font-serif: var(--font-playfair);
  --font-sans: var(--font-inter);
}

body {
  background: #FFFBF0;
  color: #1A1A1A;
}
```

This gives Tailwind v4 utilities: `bg-gold`, `text-forest`, `bg-warm-white`, `text-dark`, `bg-light-green`, `font-serif`, `font-sans`.

- [ ] **Step 2: Update app/layout.tsx — fonts and placeholder Nav/Footer**

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Handi4Camp — Léto bez hranic",
  description:
    "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-warm-white text-dark">
        {children}
      </body>
    </html>
  );
}
```

Note: Nav and Footer will be added in Task 3 once those components exist.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: design tokens and fonts (Inter + Playfair Display)"
```

---

## Task 3: Nav + Footer Components

**Files:**
- Create: `components/nav.tsx`
- Create: `components/footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create components/nav.tsx**

```tsx
import Link from "next/link";

const links = [
  { href: "/o-kempu", label: "O kempu" },
  { href: "/jak-pomoci", label: "Jak pomoci" },
  { href: "/galerie", label: "Galerie & Aktuality" },
  { href: "/partneri", label: "Partneři" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-light-green">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl font-bold text-forest">
          Handi4Camp
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-dark hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/jak-pomoci#darovani"
          className="bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
        >
          Přispět →
        </Link>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Create components/footer.tsx**

```tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-3">Handi4Camp</h3>
            <p className="text-sm text-warm-white/80">
              Letní tábor pro děti s DMO pod záštitou Rotary Club Valtice
              Břeclav.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigace</h4>
            <ul className="space-y-2 text-sm text-warm-white/80">
              <li>
                <Link
                  href="/o-kempu"
                  className="hover:text-gold transition-colors"
                >
                  O kempu
                </Link>
              </li>
              <li>
                <Link
                  href="/jak-pomoci"
                  className="hover:text-gold transition-colors"
                >
                  Jak pomoci
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="hover:text-gold transition-colors"
                >
                  Galerie & Aktuality
                </Link>
              </li>
              <li>
                <Link
                  href="/partneri"
                  className="hover:text-gold transition-colors"
                >
                  Partneři
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="hover:text-gold transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-sm text-warm-white/80">Barbora Slátková</p>
            <a
              href="mailto:info@handi4camp.cz"
              className="text-sm text-warm-white/80 hover:text-gold transition-colors"
            >
              info@handi4camp.cz
            </a>
            <div className="mt-4">
              <Link
                href="/jak-pomoci#darovani"
                className="inline-block bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
              >
                Přispět →
              </Link>
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

- [ ] **Step 3: Update app/layout.tsx to include Nav and Footer**

Replace the body content in `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Handi4Camp — Léto bez hranic",
  description:
    "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-warm-white text-dark">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/nav.tsx components/footer.tsx app/layout.tsx
git commit -m "feat: Nav and Footer components with layout wiring"
```

---

## Task 4: StatBar Component

**Files:**
- Create: `components/stat-bar.tsx`

- [ ] **Step 1: Create components/stat-bar.tsx**

```tsx
const stats = [
  { value: "20+", label: "let tradice" },
  { value: "12", label: "dětí ročně" },
  { value: "300 000 Kč", label: "roční náklady" },
  { value: "100%", label: "transparentní" },
];

export default function StatBar() {
  return (
    <div className="bg-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-4 px-6 text-center text-warm-white border-r border-warm-white/10 last:border-r-0"
          >
            <div className="font-serif text-2xl font-bold text-gold">
              {stat.value}
            </div>
            <div className="text-xs text-warm-white/70 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/stat-bar.tsx
git commit -m "feat: StatBar component"
```

---

## Task 5: Hero Carousel Component

**Files:**
- Create: `components/hero.tsx`

This is the only component on this page with `"use client"` — needed for the fade carousel interval.

- [ ] **Step 1: Create components/hero.tsx**

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StatBar from "@/components/stat-bar";

// Placeholder slides — replace bg-* with next/image once photos arrive
const slides = [
  { label: "Léto plné pohybu" },
  { label: "Rehabilitace v přírodě" },
  { label: "Tým asistentů" },
  { label: "Společné chvíle" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex flex-col justify-end overflow-hidden">
      {/* Placeholder slides (swap for real images later) */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 bg-forest transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark-green overlay */}
      <div className="absolute inset-0 bg-forest/60" />

      {/* Slide indicator dots */}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0 text-warm-white">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Léto bez hranic —<br />již 20 let
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-warm-white/90">
          Každoročně dáváme 12 dětem s DMO léto, jaké si zaslouží. A jejich
          rodičům 10 dní zaslouženého oddychu.
        </p>
        <div className="flex flex-wrap gap-4 pb-12">
          <Link
            href="/jak-pomoci#darovani"
            className="bg-gold text-dark font-bold px-8 py-3 rounded-lg text-lg hover:bg-gold/90 transition-colors"
          >
            Přispět
          </Link>
          <Link
            href="/jak-pomoci#sponzoring"
            className="border-2 border-warm-white text-warm-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-warm-white/10 transition-colors"
          >
            Stát se sponzorem
          </Link>
        </div>
      </div>

      {/* Stat strip pinned to bottom of hero */}
      <div className="relative z-10">
        <StatBar />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: Hero carousel component with StatBar"
```

---

## Task 6: PricingAnchors Component

**Files:**
- Create: `components/pricing-anchors.tsx`

- [ ] **Step 1: Create components/pricing-anchors.tsx**

```tsx
import Link from "next/link";

const tiers = [
  {
    amount: "500 Kč",
    description: "Přispějete na stravu asistenta na jeden den",
    featured: false,
  },
  {
    amount: "5 000 Kč",
    description:
      "Sponzorujete rehabilitační pomůcky pro jeden ročník",
    featured: true,
    badge: "Nejčastější volba partnerů",
  },
  {
    amount: "20 000 Kč",
    description:
      "Generální partnerství kempu pro konkrétní dítě",
    featured: false,
  },
];

export default function PricingAnchors() {
  return (
    <section className="py-16 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">
          Jak velký dopad chcete mít?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.amount}
              className={`rounded-2xl p-8 flex flex-col gap-4 ${
                tier.featured
                  ? "bg-forest text-warm-white shadow-xl md:-mt-4 md:mb-4"
                  : "bg-light-green text-dark"
              }`}
            >
              {tier.badge && (
                <span className="text-xs font-bold bg-gold text-dark px-3 py-1 rounded-full self-start">
                  ⭐ {tier.badge}
                </span>
              )}
              <div
                className={`font-serif text-4xl font-bold ${
                  tier.featured ? "text-gold" : "text-forest"
                }`}
              >
                {tier.amount}
              </div>
              <p
                className={`text-sm flex-1 ${
                  tier.featured ? "text-warm-white/90" : "text-dark/70"
                }`}
              >
                {tier.description}
              </p>
              <Link
                href="/jak-pomoci#darovani"
                className={`text-sm font-semibold text-center py-2 px-4 rounded-lg transition-colors ${
                  tier.featured
                    ? "bg-gold text-dark hover:bg-gold/90"
                    : "bg-forest text-warm-white hover:bg-forest/90"
                }`}
              >
                Přispět touto částkou →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/pricing-anchors.tsx
git commit -m "feat: PricingAnchors component"
```

---

## Task 7: Rozcestnik Component

**Files:**
- Create: `components/rozcestnik.tsx`

- [ ] **Step 1: Create components/rozcestnik.tsx**

```tsx
import Link from "next/link";

const cards = [
  {
    emoji: "💛",
    title: "Chci darovat",
    description:
      "Pošlete libovolnou částku převodem nebo QR kódem",
    href: "/jak-pomoci#darovani",
  },
  {
    emoji: "🏢",
    title: "Chci sponzorovat",
    description:
      "Firemní partnerství s logem, zmínkou a hmatatelným dopadem",
    href: "/jak-pomoci#sponzoring",
  },
  {
    emoji: "🙋",
    title: "Chci být dobrovolníkem",
    description:
      "Jedete s námi? Studenti medicíny a fyzioterapie jsou vítáni",
    href: "/jak-pomoci#dobrovolnictvi",
  },
];

export default function Rozcestnik() {
  return (
    <section className="py-16 bg-light-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">
          Jak můžete pomoci?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-warm-white rounded-2xl p-8 flex flex-col gap-3 hover:shadow-lg transition-shadow group"
            >
              <span className="text-4xl">{card.emoji}</span>
              <h3 className="font-serif text-xl font-bold text-forest group-hover:text-dark transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-dark/70">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/rozcestnik.tsx
git commit -m "feat: Rozcestnik component"
```

---

## Task 8: PolaroidGallery + SponsorLogos

**Files:**
- Create: `components/polaroid-gallery.tsx`
- Create: `components/sponsor-logos.tsx`

- [ ] **Step 1: Create components/polaroid-gallery.tsx**

```tsx
export type PolaroidPhoto = {
  src: string;
  alt: string;
  rotation?: number;
};

export default function PolaroidGallery({
  photos,
}: {
  photos: PolaroidPhoto[];
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-8 snap-x snap-mandatory">
      {photos.map((photo, i) => {
        const deg = photo.rotation ?? (i % 2 === 0 ? -2 : 2);
        return (
          <div
            key={i}
            className="flex-none snap-center"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="bg-white p-3 pb-10 shadow-lg w-44 sm:w-52">
              <div className="aspect-[4/3] w-full overflow-hidden bg-light-green">
                {photo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-forest/40 text-xs p-2 text-center">
                    {photo.alt}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create components/sponsor-logos.tsx**

```tsx
export type SponsorEntry = {
  name: string;
  logo?: string;
  website?: string;
};

export default function SponsorLogos({
  sponsors,
}: {
  sponsors: SponsorEntry[];
}) {
  return (
    <section className="py-12 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-dark/40 hover:text-dark transition-colors"
            >
              {sponsor.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-10 grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-bold text-sm">{sponsor.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/polaroid-gallery.tsx components/sponsor-logos.tsx
git commit -m "feat: PolaroidGallery and SponsorLogos components"
```

---

## Task 9: Shared Page Components (PageHero, DonationBox, NewsCard, MilestoneTimeline)

**Files:**
- Create: `components/page-hero.tsx`
- Create: `components/donation-box.tsx`
- Create: `components/news-card.tsx`
- Create: `components/milestone-timeline.tsx`

- [ ] **Step 1: Create components/page-hero.tsx**

```tsx
type PageHeroProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
};

export default function PageHero({ title, subtitle, imageSrc }: PageHeroProps) {
  return (
    <section className="relative py-20 bg-forest text-warm-white overflow-hidden">
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-warm-white/80 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/donation-box.tsx**

```tsx
export default function DonationBox() {
  return (
    <div className="bg-light-green rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold text-forest mb-4">
          Bankovní převod
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Číslo účtu:</dt>
            <dd className="font-mono font-bold">XXXX-XXXXXX/XXXX</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">Variabilní symbol:</dt>
            <dd className="font-mono font-bold">2024</dd>
          </div>
          <div className="flex gap-2 flex-wrap">
            <dt className="text-dark/60 w-40 flex-none">
              Zpráva pro příjemce:
            </dt>
            <dd>Handi4Camp – dar</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-dark/50">
          Dar je daňově uznatelný dle § 15 odst. 1 zákona č. 586/1992 Sb.
        </p>
      </div>
      <div className="flex-none text-center">
        <div className="bg-white p-4 rounded-xl inline-block shadow">
          {/* Replace this placeholder with a real QR code image */}
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

- [ ] **Step 3: Create components/news-card.tsx**

```tsx
import Link from "next/link";

type NewsCardProps = {
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  href: string;
};

export default function NewsCard({
  title,
  date,
  excerpt,
  coverImage,
  href,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-warm-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-light-green overflow-hidden">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-forest/30 text-sm font-serif">
            Handi4Camp
          </div>
        )}
      </div>
      <div className="p-6">
        <time className="text-xs text-dark/50 mb-2 block">
          {new Date(date).toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="font-serif text-lg font-bold text-dark group-hover:text-forest transition-colors mb-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-dark/70 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create components/milestone-timeline.tsx**

```tsx
export type MilestoneEntry = {
  year: number;
  title: string;
  description?: string;
};

export default function MilestoneTimeline({
  milestones,
}: {
  milestones: MilestoneEntry[];
}) {
  const sorted = [...milestones].sort((a, b) => a.year - b.year);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 bg-forest/20"
        aria-hidden="true"
      />
      <ol className="space-y-8">
        {sorted.map((m) => (
          <li key={m.year} className="relative flex gap-6 pl-0">
            <div className="flex-none w-8 h-8 rounded-full bg-gold flex items-center justify-center text-xs font-bold text-dark shadow-sm z-10 ring-2 ring-warm-white">
              &#x27;{String(m.year).slice(2)}
            </div>
            <div className="flex-1 pb-2 pt-1">
              <p className="font-bold text-forest">
                {m.year} — {m.title}
              </p>
              {m.description && (
                <p className="text-sm text-dark/70 mt-1">{m.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/page-hero.tsx components/donation-box.tsx components/news-card.tsx components/milestone-timeline.tsx
git commit -m "feat: PageHero, DonationBox, NewsCard, MilestoneTimeline components"
```

---

## Task 10: Homepage Assembly

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with full homepage**

```tsx
import Link from "next/link";
import Hero from "@/components/hero";
import PricingAnchors from "@/components/pricing-anchors";
import Rozcestnik from "@/components/rozcestnik";
import PolaroidGallery from "@/components/polaroid-gallery";
import SponsorLogos from "@/components/sponsor-logos";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";
import type { SponsorEntry } from "@/components/sponsor-logos";

const photos: PolaroidPhoto[] = [
  { src: "", alt: "Děti na kempu 2024", rotation: -2 },
  { src: "", alt: "Rehabilitace v přírodě", rotation: 1 },
  { src: "", alt: "Výlet na Pálavu", rotation: -1 },
  { src: "", alt: "Společná večeře", rotation: 2 },
  { src: "", alt: "Tým asistentů", rotation: -3 },
];

const sponsors: SponsorEntry[] = [
  { name: "Rotary Club Valtice Břeclav", website: "https://rotary.cz" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Příběh kempu */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Dvacet let léta, které mění životy
          </h2>
          <p className="text-dark/70 text-lg leading-relaxed mb-4">
            Handi4Camp vznikl před 20 lety jako iniciativa Barbory Slátkové a
            Rotary Clubu Valtice Břeclav. Každé léto spojujeme 12 dětí s
            dětskou mozkovou obrnou s budoucími lékaři a fyzioterapeuty, kteří
            jim věnují týden péče, pohybu a radosti.
          </p>
          <blockquote className="border-l-4 border-gold pl-4 text-left italic text-dark/70 my-6 mx-auto max-w-xl">
            „Díky kempu syn poprvé v životě zažil, co znamená být součástí
            party." — maminka účastníka
          </blockquote>
          <Link
            href="/o-kempu"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Přečíst celý příběh →
          </Link>
        </div>
      </section>

      <PricingAnchors />
      <Rozcestnik />

      {/* Foto pás */}
      <section className="py-12 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="font-serif text-2xl font-bold">
            Chvíle, které zůstanou
          </h2>
        </div>
        <PolaroidGallery photos={photos} />
        <div className="text-center mt-6">
          <Link
            href="/galerie"
            className="text-forest font-semibold hover:text-dark transition-colors"
          >
            Prohlédnout celou galerii →
          </Link>
        </div>
      </section>

      <SponsorLogos sponsors={sponsors} />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Smoke test — start dev server and verify homepage loads**

```bash
npm run dev
```

Open http://localhost:3000. Verify:
- Hero with golden text "Léto bez hranic — již 20 let" is visible
- StatBar strip below hero shows 4 stats
- PricingAnchors with 3 tiers, middle one highlighted green
- Rozcestnik with 3 cards
- Polaroid photo strip (placeholders)
- Nav and Footer visible
- No blue color anywhere on the page

Stop server with Ctrl+C when done.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: homepage assembly"
```

---

## Task 11: /o-kempu Page

**Files:**
- Create: `app/o-kempu/page.tsx`

- [ ] **Step 1: Create app/o-kempu/page.tsx**

```tsx
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/o-kempu/page.tsx
git commit -m "feat: /o-kempu page"
```

---

## Task 12: /jak-pomoci Page

**Files:**
- Create: `app/jak-pomoci/page.tsx`

- [ ] **Step 1: Create app/jak-pomoci/page.tsx**

```tsx
import PageHero from "@/components/page-hero";
import DonationBox from "@/components/donation-box";

const donationTiers = [
  { amount: "500 Kč", desc: "stravu asistenta na jeden den" },
  {
    amount: "5 000 Kč",
    desc: "rehabilitační pomůcky pro celý ročník",
    featured: true,
  },
  {
    amount: "20 000 Kč",
    desc: "generální partnerství pro konkrétní dítě",
  },
];

export default function JakPomociPage() {
  return (
    <>
      <PageHero
        title="Jak pomoci"
        subtitle="Vaše podpora umožňuje dětem prožít léto, na které nikdy nezapomenou."
      />

      {/* Darování */}
      <section id="darovani" className="py-16 bg-warm-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">Darování</h2>
          <p className="text-dark/70 mb-8">
            Každá částka má konkrétní dopad. Přispějte bankovním převodem nebo
            přes QR kód.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {donationTiers.map((tier) => (
              <div
                key={tier.amount}
                className={`rounded-xl p-6 ${
                  tier.featured ? "bg-forest text-warm-white" : "bg-light-green"
                }`}
              >
                <div
                  className={`font-serif text-3xl font-bold mb-2 ${
                    tier.featured ? "text-gold" : "text-forest"
                  }`}
                >
                  {tier.amount}
                </div>
                <p
                  className={`text-sm ${
                    tier.featured ? "text-warm-white/80" : "text-dark/70"
                  }`}
                >
                  Pokryje {tier.desc}
                </p>
              </div>
            ))}
          </div>
          <DonationBox />
        </div>
      </section>

      {/* Sponzoring */}
      <section id="sponzoring" className="py-16 bg-light-green scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Firemní sponzoring
          </h2>
          <p className="text-dark/70 mb-6">
            Partnerství s tradicí. Vaše firma se stane součástí příběhu kempu s
            hmatatelným a měřitelným dopadem.
          </p>
          <div className="bg-warm-white rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">Co sponzor získá:</h3>
            <ul className="space-y-2 text-sm text-dark/70">
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Logo na webu
                kempu
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Logo na tričkách
                účastníků
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Zmínka v
                příspěvcích na sociálních sítích
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Certifikát
                partnerství
              </li>
            </ul>
          </div>
          <p className="text-sm text-dark/70 mb-4">
            Pro domluvu partnerství kontaktujte Barboru Slátkovou přímo:
          </p>
          <a
            href="mailto:info@handi4camp.cz?subject=Zájem o sponzoring Handi4Camp"
            className="inline-block bg-forest text-warm-white font-bold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors"
          >
            Napsat email →
          </a>
        </div>
      </section>

      {/* Dobrovolnictví */}
      <section
        id="dobrovolnictvi"
        className="py-16 bg-warm-white scroll-mt-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Dobrovolnictví
          </h2>
          <p className="text-dark/70 mb-6">
            Hledáme studenty medicíny, fyzioterapie nebo pedagogiky, kteří
            chtějí udělat léto jinak — smysluplně a s přidanou hodnotou pro
            studium.
          </p>
          <div className="bg-light-green rounded-2xl p-8 mb-8">
            <h3 className="font-bold text-forest mb-4">
              Co obnáší být asistentem:
            </h3>
            <ul className="space-y-2 text-sm text-dark/70">
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> 10 dní intenzivní
                práce s dětmi s DMO
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Dohled zkušených
                fyzioterapeutů
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Praxe uznatelná
                v rámci studia
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">✓</span> Strava a
                ubytování zajištěno
              </li>
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/jak-pomoci/page.tsx
git commit -m "feat: /jak-pomoci page with donation, sponsoring, volunteering sections"
```

---

## Task 13: /galerie Page

**Files:**
- Create: `app/galerie/page.tsx`

This page uses `"use client"` for the year-selection tabs.

- [ ] **Step 1: Create app/galerie/page.tsx**

```tsx
"use client";
import { useState } from "react";
import PageHero from "@/components/page-hero";
import PolaroidGallery from "@/components/polaroid-gallery";
import NewsCard from "@/components/news-card";
import type { PolaroidPhoto } from "@/components/polaroid-gallery";

type GalleryYear = {
  year: number;
  photos: PolaroidPhoto[];
};

const galleryYears: GalleryYear[] = [
  {
    year: 2024,
    photos: [
      { src: "", alt: "Zahajovací ceremonie 2024", rotation: -2 },
      { src: "", alt: "Plavání 2024", rotation: 1 },
      { src: "", alt: "Rehabilitace na louce", rotation: -1 },
      { src: "", alt: "Výlet na Pálavu", rotation: 2 },
      { src: "", alt: "Večerní posezení", rotation: -3 },
    ],
  },
  {
    year: 2023,
    photos: [
      { src: "", alt: "Kempové hry 2023", rotation: 1 },
      { src: "", alt: "Fyzioterapie 2023", rotation: -2 },
      { src: "", alt: "Výlet do lesa", rotation: 2 },
    ],
  },
];

const samplePosts = [
  {
    title: "Ročník 2024: Jubilejní dvacítka za námi",
    date: "2024-08-20T00:00:00.000Z",
    excerpt:
      "Dvacátý ročník Handi4Camp se vydařil nad očekávání. Dvanáct úsměvů, desítky nezapomenutelných momentů a skvělý tým asistentů.",
    href: "/galerie",
  },
];

export default function GaleriePage() {
  const [activeYear, setActiveYear] = useState(galleryYears[0].year);
  const activeGallery = galleryYears.find((g) => g.year === activeYear)!;

  return (
    <>
      <PageHero
        title="Galerie & Aktuality"
        subtitle="Vzpomínky, příběhy a okamžiky z každého ročníku."
      />

      {/* Galerie */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-6">Galerie</h2>
          {/* Year tabs */}
          <div className="flex gap-2 mb-8 flex-wrap" role="tablist">
            {galleryYears.map((g) => (
              <button
                key={g.year}
                role="tab"
                aria-selected={g.year === activeYear}
                onClick={() => setActiveYear(g.year)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  g.year === activeYear
                    ? "bg-forest text-warm-white"
                    : "bg-light-green text-dark hover:bg-forest/10"
                }`}
              >
                {g.year}
              </button>
            ))}
          </div>
          <PolaroidGallery photos={activeGallery.photos} />
        </div>
      </section>

      {/* Aktuality */}
      <section className="py-16 bg-light-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">Aktuality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePosts.map((post) => (
              <NewsCard key={post.title} {...post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/galerie/page.tsx
git commit -m "feat: /galerie page with year tabs and news cards"
```

---

## Task 14: /partneri Page

**Files:**
- Create: `app/partneri/page.tsx`

- [ ] **Step 1: Create app/partneri/page.tsx**

```tsx
import PageHero from "@/components/page-hero";
import SponsorLogos from "@/components/sponsor-logos";
import Link from "next/link";
import type { SponsorEntry } from "@/components/sponsor-logos";

const sponsors: SponsorEntry[] = [
  { name: "Rotary Club Valtice Břeclav", website: "https://rotary.cz" },
];

export default function PartneriPage() {
  return (
    <>
      <PageHero
        title="Partneři & Transparentnost"
        subtitle="Díky partnerům může kamp každý rok znovu rozjet motory."
      />

      <SponsorLogos sponsors={sponsors} />

      {/* Transparentní účet */}
      <section className="py-16 bg-light-green">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Transparentní financování
          </h2>
          <p className="text-dark/70 mb-6">
            Veškeré příjmy a výdaje kempu jsou veřejně dohledatelné. Věříme v
            otevřenost bez kompromisů.
          </p>
          <div className="bg-warm-white rounded-2xl p-8 mb-6">
            <dl className="space-y-3 text-sm">
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">
                  Transparentní účet:
                </dt>
                <dd className="font-mono font-bold">XXXX-XXXXXX/XXXX</dd>
              </div>
              <div className="flex gap-2 flex-wrap">
                <dt className="text-dark/60 w-40 flex-none">
                  Výpis transakcí:
                </dt>
                <dd>
                  <a
                    href="#"
                    className="text-forest underline hover:text-dark transition-colors"
                  >
                    Odkaz na transparentní účet →
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <p className="text-sm text-dark/60 mb-4">
            Vzor darovací smlouvy ke stažení:
          </p>
          <a
            href="/documents/darovaci-smlouva.pdf"
            className="inline-block bg-forest text-warm-white font-semibold px-6 py-3 rounded-lg hover:bg-forest/90 transition-colors text-sm"
          >
            Stáhnout darovací smlouvu (PDF)
          </a>
        </div>
      </section>

      {/* Co se podařilo */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold mb-8">
            Co se podařilo
          </h2>
          <div className="space-y-6">
            <div className="bg-light-green rounded-xl p-6">
              <h3 className="font-bold text-forest mb-2">
                Ročník 2024 — 20. výročí
              </h3>
              <p className="text-sm text-dark/70">
                Jubilejní ročník proběhl v plné síle. Zúčastnilo se 12 dětí, 8
                studentů-asistentů. Celkové náklady: 298 000 Kč. Vybráno od
                sponzorů a dárců: 312 000 Kč.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-warm-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Staňte se partnerem
          </h2>
          <p className="text-warm-white/80 mb-8">
            Vaše firma může být součástí tradice, která mění životy.
          </p>
          <Link
            href="/jak-pomoci#sponzoring"
            className="inline-block bg-gold text-dark font-bold px-8 py-3 rounded-lg hover:bg-gold/90 transition-colors"
          >
            Jak sponzorovat →
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/partneri/page.tsx
git commit -m "feat: /partneri page"
```

---

## Task 15: /kontakt Page

**Files:**
- Create: `app/kontakt/page.tsx`

- [ ] **Step 1: Create app/kontakt/page.tsx**

```tsx
import PageHero from "@/components/page-hero";

export default function KontaktPage() {
  return (
    <>
      <PageHero title="Kontakt" subtitle="Máte otázku? Rádi vám odpovíme." />

      <section className="py-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Kontaktní info */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Spojte se s námi
              </h2>
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Organizátorka
                  </dt>
                  <dd className="text-dark font-medium">Barbora Slátková</dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Email
                  </dt>
                  <dd>
                    <a
                      href="mailto:info@handi4camp.cz"
                      className="text-forest hover:text-dark transition-colors"
                    >
                      info@handi4camp.cz
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-dark/50 font-semibold text-xs uppercase tracking-widest mb-1">
                    Záštita
                  </dt>
                  <dd>
                    <a
                      href="https://rotary.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest hover:text-dark transition-colors"
                    >
                      Rotary Club Valtice Břeclav
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Formulář — mailto fallback */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">
                Napište nám
              </h2>
              <form
                action="mailto:info@handi4camp.cz"
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Jméno
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
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Email
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
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-dark/60 uppercase tracking-widest mb-1"
                  >
                    Zpráva
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
                  Odeslat zprávu →
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/kontakt/page.tsx
git commit -m "feat: /kontakt page with mailto form"
```

---

## Task 16: Cleanup Demo Pages

**Files:**
- Delete: `pages/demo/blog/[filename].tsx`
- Delete directory: `pages/demo/blog/`
- Delete directory: `pages/demo/`
- Delete directory: `pages/` (if now empty)

- [ ] **Step 1: Delete the demo pages directory**

```bash
rm -rf pages/
```

This removes `pages/demo/blog/[filename].tsx` and all parent directories. The App Router (`app/`) is unaffected.

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Final smoke test**

```bash
npm run dev
```

Verify all 6 routes work without errors:
- http://localhost:3000 — homepage
- http://localhost:3000/o-kempu — about page
- http://localhost:3000/jak-pomoci — how to help (check `#darovani`, `#sponzoring`, `#dobrovolnictvi` anchors)
- http://localhost:3000/galerie — gallery with year tabs
- http://localhost:3000/partneri — partners
- http://localhost:3000/kontakt — contact form
- http://localhost:3000/admin — TinaCMS admin (CMS collections visible)

Verify spec checklist:
- [ ] No blue color anywhere on any page
- [ ] "Přispět →" CTA always visible in nav
- [ ] StatBar shows 4 stats below hero
- [ ] PricingAnchors middle option visually highlighted
- [ ] Galerie year tabs switch photo sets
- [ ] Responsive on mobile viewport (375px wide)

Stop server with Ctrl+C.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: remove legacy demo pages, complete handi4camp website"
```
