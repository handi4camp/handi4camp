# Napsali o nás — Design Spec

**Date:** 2026-04-28
**Status:** Approved

## Overview

New page "Napsali o nás" (/napsali-o-nas) listing press mentions and articles written about Handi4Camp. Items are managed in TinaCMS. The page is added to the navbar and footer.

## URL

`/napsali-o-nas`

## Page Structure

1. `PageHero` — editable heading and subheading
2. Card grid — 2 columns on desktop, 1 on mobile
3. Each card shows: date (top left), bold title, short description, "Číst" button opening link in a new tab

## TinaCMS Collection

**Name:** `napsali`  
**Type:** Singleton  
**File:** `content/pages/napsali-o-nas.md`  
**Path match:** `content/pages`, match `napsali-o-nas`

Fields:
- `heroTitle` — string
- `heroSubtitle` — string
- `mentions` — list of objects:
  - `title` — string (required)
  - `description` — string (textarea)
  - `date` — string (e.g. "květen 2024")
  - `url` — string (external link)

`allowedActions: { create: false, delete: false }` (singleton)  
`ui.router: () => "/napsali-o-nas"`

## Files Changed

| File | Change |
|------|--------|
| `tina/config.ts` | Add `napsali` collection |
| `content/pages/napsali-o-nas.md` | New content file with initial mentions |
| `app/napsali-o-nas/page.tsx` | New server component with metadata |
| `app/napsali-o-nas/_client.tsx` | New client component with TinaCMS data fetch + card grid UI |
| `components/nav.tsx` | Add link `{ href: "/napsali-o-nas", label: "Napsali o nás" }` |
| `components/footer.tsx` | Add same link to "Navigace" list |

## Initial Content (mentions)

Seed data from user-provided links:

1. **Rotary Good News 4/2025** — https://www.rotary2240.org/files/good-news/19/rgn_4_2025_flowie.pdf
2. **Rotary Good News 3/2024** — https://www.rotary2240.org/files/good-news/b1/rgn-3_2024_flowie.pdf
3. **Handicamp 2023** — https://rye2240.org (link to RYE 2240)
4. **Rotary Good News 4/2023** — https://www.rotary2240.org/files/good-news/e6/rgn_4_2023_flowie.pdf
5. **Rotary Good News 5/2022** — https://www.rotary2240.org/files/good-news/94/rgn_5_22_ii.pdf
6. **Rotary Good News 5/2018** — https://www.rotary2240.org/files/good-news/e7/rgn_2018_5.pdf
7. **Rotary Good News 5/2017** — https://www.rotary2240.org/files/good-news/e8/rgn_2017_5.pdf

## Styling

Follows existing project conventions (Tailwind, `bg-warm-white`, `text-forest`, `font-serif`, `bg-gold` for CTA button). Card style consistent with existing components.
