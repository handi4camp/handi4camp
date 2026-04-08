# Image Optimization & Renaming Design

**Date:** 2026-04-08  
**Status:** Approved

## Goal

Replace all heavy JPEG images in `public/images/` with SEO-friendly named WebP files. Update all code references to match.

## Scope

- **In scope:** `public/images/*.jpg`, `public/images/*.heif` — conversion + rename
- **Out of scope:** `public/images/partners/` (logos stay as PNG/SVG), `public/*.svg` (icons untouched)

## Naming Scheme

All gallery/content images renamed to:

```
handicamp-foto-NN.webp
```

Where `NN` is a zero-padded number (01, 02, …) assigned in filesystem order. The `handicamp-foto-` prefix is present on every image URL, signalling site relevance to search crawlers.

## Image Files

| # | Current filename | New filename |
|---|---|---|
| 01 | Handicamp_socky_2025-106.jpg | handicamp-foto-01.webp |
| 02 | Handicamp_socky_2025-117.jpg | handicamp-foto-02.webp |
| 03 | Handicamp_socky_2025-128.jpg | handicamp-foto-03.webp |
| 04 | Handicamp_socky_2025-173.jpg | handicamp-foto-04.webp |
| 05 | Handicamp_socky_2025-175.jpg | handicamp-foto-05.webp |
| 06 | Handicamp_socky_2025-49.jpg | handicamp-foto-06.webp |
| 07 | Handicamp_socky_2025-61.jpg | handicamp-foto-07.webp |
| 08 | Handicamp_socky_2025-66.jpg | handicamp-foto-08.webp |
| 09 | Handicamp_socky_2025-78.jpg | handicamp-foto-09.webp |
| 10 | Handicamp_socky_2025-80.jpg | handicamp-foto-10.webp |
| 11 | Handicamp_socky_2025-88.jpg | handicamp-foto-11.webp |
| 12 | IMG_0394.jpg | handicamp-foto-12.webp |
| 13 | IMG_0411.jpg | handicamp-foto-13.webp |
| 14 | IMG_0491.jpg | handicamp-foto-14.webp |
| 15 | IMG_0518.jpg | handicamp-foto-15.webp |
| 16 | IMG_0574.jpg | handicamp-foto-16.webp |
| 17 | IMG_0617.jpg | handicamp-foto-17.webp |
| 18 | IMG_0621.jpg | handicamp-foto-18.webp |
| 19 | IMG_0773.jpg | handicamp-foto-19.webp |
| 20 | IMG_0869.jpg | handicamp-foto-20.webp |
| 21 | IMG_0992.jpg | handicamp-foto-21.webp |
| 22 | IMG_1082.HEIC.heif | deleted (not referenced in code) |
| 23 | IMG_1521.jpg | handicamp-foto-22.webp |
| 24 | IMG_1523.jpg | handicamp-foto-23.webp |
| 25 | IMG_1559.jpg | handicamp-foto-24.webp |
| 26 | IMG_1852.jpg | handicamp-foto-25.webp |
| 27 | IMG_1939.jpg | handicamp-foto-26.webp |
| 28 | IMG_4366.jpg | handicamp-foto-27.webp |
| 29 | IMG_4504.jpg | handicamp-foto-28.webp |

## Conversion Settings

- **Format:** WebP
- **Quality:** 82 (good sharpness, ~70–85% smaller than original JPEG)
- **Tool:** `sharp` (dev dependency)
- **Originals:** Deleted after conversion

## Script

A one-time script at `scripts/optimize-images.mjs`:
1. Reads all `.jpg` / `.heif` from `public/images/` (skips `partners/`)
2. Converts each to WebP at quality 82, writes `handicamp-foto-NN.webp`
3. Deletes the original
4. Outputs a mapping table for use in the code update step

Script is deleted after use (no permanent dev dependency clutter).

## Code Updates

Files containing image paths that need updating:

- `app/page.tsx` — `photos` array (lines ~9–23)
- `components/hero.tsx` — `slides` array (lines ~6–9)
- `app/partneri/page.tsx` — partner logos (untouched, different paths)
- `app/o-kempu/page.tsx` — `imageSrc` prop (line ~58)
- `app/galerie/page.tsx` — gallery arrays (lines ~26–37, 69)

All `/images/IMG_*.jpg` and `/images/Handicamp_socky_*.jpg` paths replaced with `/images/handicamp-foto-NN.webp` per the mapping table above.
