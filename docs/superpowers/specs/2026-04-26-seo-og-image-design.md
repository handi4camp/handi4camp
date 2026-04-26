# SEO & Open Graph Image — Design Spec

**Date:** 2026-04-26

## Goal

When someone shares a link to handi4camp.cz (on WhatsApp, Facebook, LinkedIn, iMessage, etc.), they see a rich preview with a beautiful camp photo, the site title, and description — instead of a plain text link.

## Scope

Site-wide static OG image. No per-page images. No dynamic generation.

## Implementation

### 1. Convert OG image

Run a one-time Node.js script using the already-installed `sharp` package:

- Input: `public/images/handicamp-foto-03.webp`
- Output: `public/og-image.jpg`
- Dimensions: 1200×630 px (standard OG size)
- Format: JPEG (universal crawler compatibility)

The script is disposable — run once, commit the output, delete the script.

### 2. Update `app/layout.tsx` metadata

Add to the existing `metadata` export:

```ts
metadataBase: new URL("https://handi4camp.cz"),

openGraph: {
  title: "Handi4Camp — Léto bez hranic",
  description: "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
  url: "https://handi4camp.cz",
  siteName: "Handi4Camp",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Účastníci a vedoucí tábora Handi4Camp u rybníka za zlatého světla",
    },
  ],
  locale: "cs_CZ",
  type: "website",
},

twitter: {
  card: "summary_large_image",
  title: "Handi4Camp — Léto bez hranic",
  description: "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
  images: ["/og-image.jpg"],
},

icons: {
  icon: [
    { url: "/favicon.png", type: "image/png" },
    { url: "/favicon.svg", type: "image/svg+xml" },
  ],
},
```

`metadataBase` makes Next.js resolve `/og-image.jpg` to the full absolute URL automatically — no need to hardcode the domain in every image path.

## Files Changed

| File | Change |
|------|--------|
| `public/og-image.jpg` | New file — converted from handicamp-foto-03.webp |
| `app/layout.tsx` | Add metadataBase, openGraph, twitter blocks; update icons |

## What Does NOT Change

- No new routes or API endpoints
- No per-page metadata overrides
- No new dependencies

## Verification

After deploying, validate with:
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
- https://www.opengraph.xyz/
