# TinaCMS Visual Editing — Design Spec
**Date:** 2026-04-15  
**Status:** Approved

## Goal

Make all visible text on every page of handi4camp.cz editable via TinaCMS visual editing — so an editor can open `/admin`, navigate to a page, and edit text inline with live preview.

## Approach: Per-page singleton collections (Option A)

One TinaCMS collection per page, plus one global collection for shared components. Each collection has exactly one document. Visual editing is enabled via `ui.router` and the `useTina` hook.

## New Collections

| Collection | File | Router |
|---|---|---|
| `home` | `content/pages/home.md` | `/` |
| `okempu` | `content/pages/o-kempu.md` | `/o-kempu` |
| `jakpomoci` | `content/pages/jak-pomoci.md` | `/jak-pomoci` |
| `kontakt` | `content/pages/kontakt.md` | `/kontakt` |
| `global` | `content/pages/global.md` | *(no router — shared)* |

## Fields per Collection

### `home`
- `heroHeadline` (string)
- `heroSubtext` (string)
- `heroCta1Label`, `heroCta1Href` (string)
- `heroCta2Label`, `heroCta2Href` (string)
- `storyHeading` (string)
- `storyBody` (string, textarea)
- `storyQuote` (string, textarea)
- `storyQuoteAuthor` (string)
- `storyLinkLabel` (string)
- `photoStripHeading` (string)
- `rozcestnikHeading` (string)
- `rozcestnikSubheading` (string)
- `rozcestnikCards` (list of objects: `title`, `description` — hrefs stay hardcoded as nav structure)

### `okempu`
- `heroTitle`, `heroSubtitle` (string)
- `storyHeading` (string)
- `storyParagraph1`, `storyParagraph2`, `storyParagraph3` (string, textarea)
- `milestonesHeading` (string)
- `activitiesHeading` (string)
- `activities` (list of objects: `title`, `description`)
- `teamHeading` (string)
- `teamMembers` (list of objects: `name`, `description`)
- `trustItems` (list of strings)

### `jakpomoci`
- `heroTitle`, `heroSubtitle` (string)
- `donationHeading`, `donationIntro` (string)
- `donationTiers` (list: `amount`, `desc`, `featured` boolean)
- `transparencyHeading`, `transparencyIntro` (string)
- `accountNumber`, `transactionLinkLabel`, `transactionLinkHref` (string)
- `donationContractLabel` (string)
- `sponsoringHeading`, `sponsoringIntro` (string)
- `sponsoringBenefits` (list of strings)
- `volunteeringHeading`, `volunteeringIntro` (string)
- `volunteeringRequirements` (list of strings)

### `kontakt`
- `heroTitle`, `heroSubtitle` (string)
- `contactHeading` (string)
- `organizerName`, `email`, `facebookLabel`, `affiliationLabel`, `affiliationHref` (string)
- `formHeading` (string)
- `formNameLabel`, `formEmailLabel`, `formMessageLabel`, `formSubmitLabel` (string)

### `global`
- `stats` (list of objects: `value`, `label`)
- `footerTagline` (string)
- `footerContactName`, `footerEmail` (string)
- `footerFacebookLabel` (string)

## Architecture

### Footer strategy

`Footer` lives in `app/layout.tsx` which is a Server Component and cannot be made a client component (it wraps the entire app). Solution: `Footer` becomes its own self-contained `"use client"` component that fetches `global` data independently via `useEffect` + `useTina`. This keeps the layout unchanged.

### Which pages fetch which collections

| Page | Collections fetched |
|---|---|
| `app/page.tsx` | `home` + `global` (for StatBar) |
| `app/o-kempu/page.tsx` | `okempu` |
| `app/jak-pomoci/page.tsx` | `jakpomoci` |
| `app/kontakt/page.tsx` | `kontakt` |
| `components/footer.tsx` | `global` (self-fetched) |

### Pages → client components

All four pages (`app/page.tsx`, `app/o-kempu/page.tsx`, `app/jak-pomoci/page.tsx`, `app/kontakt/page.tsx`) become `"use client"` components. Each:

1. Fetches content via `useEffect` using the generated TinaCMS client
2. Passes `{ query, variables, data }` to `useTina` from `tinacms/dist/react`
3. Renders using `data` from `useTina` (this enables live updates in the CMS)

```tsx
"use client"
import { useState, useEffect } from 'react'
import { useTina } from 'tinacms/dist/react'
import { client } from '../tina/__generated__/client'

export default function HomePage() {
  const [tinaData, setTinaData] = useState<any>(null)

  useEffect(() => {
    client.queries.home({ relativePath: 'home.md' }).then(setTinaData)
  }, [])

  const { data } = useTina(tinaData ?? { query: '', variables: {}, data: {} })

  if (!tinaData) return null // or skeleton

  return <Hero {...mapHomeData(data.home)} />
}
```

### Components → accept text as props

| Component | Change |
|---|---|
| `Hero` | All text (headline, subtext, CTA labels/hrefs) become props |
| `StatBar` | Accepts `stats: { value: string; label: string }[]` |
| `Rozcestnik` | Accepts `heading`, `subheading`, `cards: { title, description, href }[]` |
| `DonationBox` | Accepts `accountNumber`, `variableSymbol`, `noteText` |
| `Footer` | Accepts `tagline`, `contactName`, `email`, `facebookLabel` |
| `PageHero` | Already accepts `title` and `subtitle` props — no change needed |

### What stays hardcoded
- Nav link labels and hrefs (navigation structure is code-level concern)
- Icon choices, CSS classes, page routes
- Form `name` attributes and HTML structure
- Gallery page (uses existing `post`/`gallery` collections — no change)

## Content seed files

Each `content/pages/*.md` file is pre-populated with the current hardcoded text so the site looks identical before and after the migration. The seed becomes the baseline the editor works from.

## File changes summary

1. `tina/config.ts` — add 5 new collections
2. `content/pages/home.md` — seed file
3. `content/pages/o-kempu.md` — seed file
4. `content/pages/jak-pomoci.md` — seed file
5. `content/pages/kontakt.md` — seed file
6. `content/pages/global.md` — seed file
7. `app/page.tsx` — convert to client, fetch home + global
8. `app/o-kempu/page.tsx` — convert to client, fetch okempu + global
9. `app/jak-pomoci/page.tsx` — convert to client, fetch jakpomoci
10. `app/kontakt/page.tsx` — convert to client, fetch kontakt
11. `components/hero.tsx` — accept text props
12. `components/stat-bar.tsx` — accept stats prop
13. `components/rozcestnik.tsx` — accept heading/cards props
14. `components/donation-box.tsx` — accept account fields props
15. `components/footer.tsx` — accept tagline/contact props
