# Jak pomoci — Page Redesign Spec

**Date:** 2026-04-20  
**Goal:** Make the page feel professional and purpose-built, not template-like. Improve conversion by making each way to help feel distinct and emotionally compelling.

---

## Context

The existing page has four sections — Darování, Firemní sponzoring, Dobrovolnictví, Jak se stát dárcem — that all share the same visual pattern: heading + intro paragraph + bullet card + CTA button. The alternating white/green backgrounds are the only visual differentiation. The donation card with QR code is the only element that already feels custom-built; everything else feels generic.

No impact strip is added here — it already exists on the homepage.

---

## Section 1 — Darování

### Layout
Two-column layout on desktop (≥768px), stacked on mobile:
- **Left column**: Section heading, intro paragraph, short anchor text on tax deductibility (1–2 sentences).
- **Right column**: Existing `DonationBox` component with QR code and `DonationConfirmationButton`.

### "Na co jdou prostředky" sub-section
Sits directly below the two-column block with no horizontal rule. Contains:
- A highlighted pill/badge showing the cost range: **"900–1 200 Kč / osobu / den"**
- The two explanatory paragraphs alongside or below the pill — same content, but the pill makes the number scannable before reading the prose.

---

## Section 2 — Firemní sponzoring

### Structure
- Small-caps label above heading: **"Pro firmy"** in forest green.
- Heading: unchanged ("Firemní sponzoring").
- Short pull-quote between intro and benefits: *"Stáváte se součástí příběhu, na který děti vzpomínají celý život."*
- Benefits replace the bullet list with a **2×2 icon grid** (single column on mobile). Each cell: icon + bold short label + 1-line description. Icons from lucide-react.
- CTA email button: full-width on mobile, with micro-text below: *"Odpovídáme do 2 pracovních dnů."*

### Benefit grid items (from existing data)
1. Logo na webu kempu
2. Logo na tričkách účastníků
3. Zmínka na sociálních sítích
4. Certifikát partnerství

---

## Section 3 — Dobrovolnictví

### Structure
- Small-caps label above heading: **"Pro studenty"** in forest green.
- Heading: unchanged ("Dobrovolnictví").
- Existing intro paragraph: unchanged.
- Requirements replace the bullet list with a **2×2 grid of small cards**. Each card: icon + bold short label + 1-line detail.
- Testimonial snippet in italics above CTA (placeholder text if no real quote available): *"Byl to nejlepší způsob, jak strávit prázdniny smysluplně."*
- CTA "Mám zájem →" button: keeps gold styling, adds micro-text: *"Napište nám, rádi zodpovíme otázky."*

### Requirement grid items (from existing data)
1. 10 dní intenzivní práce s dětmi s DMO
2. Dohled zkušených fyzioterapeutů
3. Praxe uznatelná v rámci studia
4. Strava a ubytování zajištěno

---

## Section 4 — Jak se stát dárcem

### Structure
Replaces the single dense paragraph with a **3-step horizontal stepper** on desktop, vertical on mobile:

1. **Přispějte** — Bankovním převodem, věcným darem nebo domluvou.
2. **Napište nám** — Dejte nám vědět a my vám vystavíme potvrzení.
3. **Dostanete potvrzení** — Doklad pro daňové odpočty do několika dní.

Each step: icon (lucide-react) + bold label + 1 short sentence.

The full existing explanatory text (pharmacies, printers, social media mentions, etc.) moves into a **"Více informací"** disclosure toggle (`<details>/<summary>`) below the stepper. Content preserved, just hidden by default.

Section keeps light-green background. Container gets generous padding (py-20) and a max-width of max-w-3xl.

---

## Design System Constraints

- Colors: `forest`, `light-green`, `warm-white`, `gold`, `dark` — no new colors introduced.
- Typography: serif for headings, system sans for body — no changes.
- Icons: lucide-react (already a dependency).
- All content remains CMS-editable via TinaCMS where it currently is; new static strings (labels, pull-quote, testimonial placeholder, stepper text) can be hardcoded initially.
- No new dependencies required.

---

## Out of Scope

- Changing the `DonationBox` or `DonationConfirmationButton` components.
- Adding real photos (placeholder approach only if needed).
- Changes to navigation or footer.
- TinaCMS schema changes for the new static strings (can be a follow-up).
