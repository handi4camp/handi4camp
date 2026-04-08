# Image Optimization & Renaming Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all `public/images/*.jpg` files to WebP, rename them with SEO-friendly slugs, and update all code references.

**Architecture:** A one-time Node.js script using `sharp` converts and renames all images in-place. After the script runs, all hardcoded image paths in `.tsx` files are updated to match the new names. The script is deleted after use.

**Tech Stack:** Node.js ESM script, `sharp` (dev dependency), Next.js / TypeScript

---

## File Map

| File | Action |
|---|---|
| `scripts/optimize-images.mjs` | Create (deleted after use) |
| `public/images/*.jpg` | Converted to WebP, originals deleted |
| `public/images/IMG_1082.HEIC.heif` | Deleted (not referenced in code) |
| `app/page.tsx` | Update 15 image paths |
| `components/hero.tsx` | Update 4 image paths |
| `app/o-kempu/page.tsx` | Update 1 image path |
| `app/galerie/page.tsx` | Update 8 image paths |

## Old → New Mapping

| Old path | New path |
|---|---|
| `/images/Handicamp_socky_2025-106.jpg` | `/images/handicamp-foto-01.webp` |
| `/images/Handicamp_socky_2025-117.jpg` | `/images/handicamp-foto-02.webp` |
| `/images/Handicamp_socky_2025-128.jpg` | `/images/handicamp-foto-03.webp` |
| `/images/Handicamp_socky_2025-173.jpg` | `/images/handicamp-foto-04.webp` |
| `/images/Handicamp_socky_2025-175.jpg` | `/images/handicamp-foto-05.webp` |
| `/images/Handicamp_socky_2025-49.jpg` | `/images/handicamp-foto-06.webp` |
| `/images/Handicamp_socky_2025-61.jpg` | `/images/handicamp-foto-07.webp` |
| `/images/Handicamp_socky_2025-66.jpg` | `/images/handicamp-foto-08.webp` |
| `/images/Handicamp_socky_2025-78.jpg` | `/images/handicamp-foto-09.webp` |
| `/images/Handicamp_socky_2025-80.jpg` | `/images/handicamp-foto-10.webp` |
| `/images/Handicamp_socky_2025-88.jpg` | `/images/handicamp-foto-11.webp` |
| `/images/IMG_0394.jpg` | `/images/handicamp-foto-12.webp` |
| `/images/IMG_0411.jpg` | `/images/handicamp-foto-13.webp` |
| `/images/IMG_0491.jpg` | `/images/handicamp-foto-14.webp` |
| `/images/IMG_0518.jpg` | `/images/handicamp-foto-15.webp` |
| `/images/IMG_0574.jpg` | `/images/handicamp-foto-16.webp` |
| `/images/IMG_0617.jpg` | `/images/handicamp-foto-17.webp` |
| `/images/IMG_0621.jpg` | `/images/handicamp-foto-18.webp` |
| `/images/IMG_0773.jpg` | `/images/handicamp-foto-19.webp` |
| `/images/IMG_0869.jpg` | `/images/handicamp-foto-20.webp` |
| `/images/IMG_0992.jpg` | `/images/handicamp-foto-21.webp` |
| `/images/IMG_1521.jpg` | `/images/handicamp-foto-22.webp` |
| `/images/IMG_1523.jpg` | `/images/handicamp-foto-23.webp` |
| `/images/IMG_1559.jpg` | `/images/handicamp-foto-24.webp` |
| `/images/IMG_1852.jpg` | `/images/handicamp-foto-25.webp` |
| `/images/IMG_1939.jpg` | `/images/handicamp-foto-26.webp` |
| `/images/IMG_4366.jpg` | `/images/handicamp-foto-27.webp` |
| `/images/IMG_4504.jpg` | `/images/handicamp-foto-28.webp` |

---

## Task 1: Install sharp

**Files:**
- Modify: `package.json` (devDependencies)

- [ ] **Step 1: Install sharp as a dev dependency**

```bash
pnpm add -D sharp
```

Expected output: `devDependencies` in `package.json` now includes `"sharp": "^0.33.x"`.

- [ ] **Step 2: Verify sharp is importable**

```bash
node -e "import('sharp').then(m => console.log('sharp ok:', m.default.versions))"
```

Expected: prints `sharp ok:` followed by version info. No errors.

---

## Task 2: Write the conversion script

**Files:**
- Create: `scripts/optimize-images.mjs`

- [ ] **Step 1: Create the script**

```js
// scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const INPUT_DIR = 'public/images'
const QUALITY = 82

const MAPPING = [
  ['Handicamp_socky_2025-106.jpg', 'handicamp-foto-01.webp'],
  ['Handicamp_socky_2025-117.jpg', 'handicamp-foto-02.webp'],
  ['Handicamp_socky_2025-128.jpg', 'handicamp-foto-03.webp'],
  ['Handicamp_socky_2025-173.jpg', 'handicamp-foto-04.webp'],
  ['Handicamp_socky_2025-175.jpg', 'handicamp-foto-05.webp'],
  ['Handicamp_socky_2025-49.jpg',  'handicamp-foto-06.webp'],
  ['Handicamp_socky_2025-61.jpg',  'handicamp-foto-07.webp'],
  ['Handicamp_socky_2025-66.jpg',  'handicamp-foto-08.webp'],
  ['Handicamp_socky_2025-78.jpg',  'handicamp-foto-09.webp'],
  ['Handicamp_socky_2025-80.jpg',  'handicamp-foto-10.webp'],
  ['Handicamp_socky_2025-88.jpg',  'handicamp-foto-11.webp'],
  ['IMG_0394.jpg',                 'handicamp-foto-12.webp'],
  ['IMG_0411.jpg',                 'handicamp-foto-13.webp'],
  ['IMG_0491.jpg',                 'handicamp-foto-14.webp'],
  ['IMG_0518.jpg',                 'handicamp-foto-15.webp'],
  ['IMG_0574.jpg',                 'handicamp-foto-16.webp'],
  ['IMG_0617.jpg',                 'handicamp-foto-17.webp'],
  ['IMG_0621.jpg',                 'handicamp-foto-18.webp'],
  ['IMG_0773.jpg',                 'handicamp-foto-19.webp'],
  ['IMG_0869.jpg',                 'handicamp-foto-20.webp'],
  ['IMG_0992.jpg',                 'handicamp-foto-21.webp'],
  ['IMG_1521.jpg',                 'handicamp-foto-22.webp'],
  ['IMG_1523.jpg',                 'handicamp-foto-23.webp'],
  ['IMG_1559.jpg',                 'handicamp-foto-24.webp'],
  ['IMG_1852.jpg',                 'handicamp-foto-25.webp'],
  ['IMG_1939.jpg',                 'handicamp-foto-26.webp'],
  ['IMG_4366.jpg',                 'handicamp-foto-27.webp'],
  ['IMG_4504.jpg',                 'handicamp-foto-28.webp'],
]

// Delete the unreferenced HEIC file
const heifPath = join(INPUT_DIR, 'IMG_1082.HEIC.heif')
try {
  await unlink(heifPath)
  console.log(`Deleted ${heifPath}`)
} catch {
  console.log(`Skipped (not found): ${heifPath}`)
}

for (const [oldName, newName] of MAPPING) {
  const inputPath = join(INPUT_DIR, oldName)
  const outputPath = join(INPUT_DIR, newName)

  await sharp(inputPath)
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  await unlink(inputPath)

  const { size } = await import('fs').then(fs =>
    fs.promises.stat(outputPath)
  )
  console.log(`${oldName} → ${newName} (${(size / 1024).toFixed(0)} KB)`)
}

console.log('\nDone.')
```

---

## Task 3: Run the script

**Files:**
- Modify: `public/images/` (files converted in-place)

- [ ] **Step 1: Run the script**

```bash
node scripts/optimize-images.mjs
```

Expected: 28 lines like `Handicamp_socky_2025-106.jpg → handicamp-foto-01.webp (NNN KB)`, then `Done.`

- [ ] **Step 2: Verify WebP files exist and originals are gone**

```bash
ls public/images/*.webp | wc -l
```

Expected: `28`

```bash
ls public/images/*.jpg 2>&1
```

Expected: `ls: cannot access 'public/images/*.jpg': No such file or directory` (or macOS equivalent: `ls: public/images/*.jpg: No such file or directory`)

- [ ] **Step 3: Spot-check file sizes**

```bash
ls -lh public/images/*.webp | awk '{print $5, $9}' | head -5
```

Expected: sizes significantly smaller than the originals (which were 1–4 MB). WebP files should be well under 1 MB each.

---

## Task 4: Update image paths in `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace all 15 image paths**

In `app/page.tsx`, replace the `photos` array src values:

```ts
const photos = [
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
]
```

- [ ] **Step 2: Verify no old paths remain**

```bash
grep -n "IMG_\|Handicamp_socky" app/page.tsx
```

Expected: no output.

---

## Task 5: Update image paths in `components/hero.tsx`

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Replace the 4 slide src values**

In `components/hero.tsx`, replace the `slides` array:

```ts
const slides = [
  { src: "/images/handicamp-foto-03.webp", label: "Léto plné pohybu" },
  { src: "/images/handicamp-foto-11.webp", label: "Rehabilitace v přírodě" },
  { src: "/images/handicamp-foto-10.webp", label: "Společné chvíle" },
  { src: "/images/handicamp-foto-01.webp", label: "Tým asistentů" },
]
```

- [ ] **Step 2: Verify no old paths remain**

```bash
grep -n "IMG_\|Handicamp_socky" components/hero.tsx
```

Expected: no output.

---

## Task 6: Update image path in `app/o-kempu/page.tsx`

**Files:**
- Modify: `app/o-kempu/page.tsx`

- [ ] **Step 1: Replace the imageSrc prop**

Find the line:
```tsx
imageSrc="/images/Handicamp_socky_2025-117.jpg"
```

Replace with:
```tsx
imageSrc="/images/handicamp-foto-02.webp"
```

- [ ] **Step 2: Verify no old paths remain**

```bash
grep -n "IMG_\|Handicamp_socky" app/o-kempu/page.tsx
```

Expected: no output.

---

## Task 7: Update image paths in `app/galerie/page.tsx`

**Files:**
- Modify: `app/galerie/page.tsx`

- [ ] **Step 1: Replace all 8 image paths**

In `app/galerie/page.tsx`, update every gallery array entry that references an old image:

| Old | New |
|---|---|
| `/images/Handicamp_socky_2025-173.jpg` | `/images/handicamp-foto-04.webp` |
| `/images/Handicamp_socky_2025-78.jpg` | `/images/handicamp-foto-09.webp` |
| `/images/IMG_0992.jpg` | `/images/handicamp-foto-21.webp` |
| `/images/IMG_1939.jpg` | `/images/handicamp-foto-26.webp` |
| `/images/IMG_4366.jpg` | `/images/handicamp-foto-27.webp` |
| `/images/IMG_1521.jpg` | `/images/handicamp-foto-22.webp` |
| `/images/IMG_1523.jpg` | `/images/handicamp-foto-23.webp` |
| `/images/Handicamp_socky_2025-175.jpg` | `/images/handicamp-foto-05.webp` |

- [ ] **Step 2: Verify no old paths remain**

```bash
grep -n "IMG_\|Handicamp_socky" app/galerie/page.tsx
```

Expected: no output.

---

## Task 8: Final verification and cleanup

**Files:**
- Delete: `scripts/optimize-images.mjs`

- [ ] **Step 1: Confirm no old image paths remain anywhere in the codebase**

```bash
grep -rn "IMG_\|Handicamp_socky" app/ components/
```

Expected: no output.

- [ ] **Step 2: Confirm all webp references resolve to real files**

```bash
grep -roh '/images/handicamp-foto-[0-9]*.webp' app/ components/ | sort -u | while read path; do
  file="public$path"
  [ -f "$file" ] && echo "OK: $file" || echo "MISSING: $file"
done
```

Expected: all lines print `OK:`.

- [ ] **Step 3: Delete the script**

```bash
rm scripts/optimize-images.mjs
```

- [ ] **Step 4: Commit everything**

```bash
git add public/images/ app/page.tsx components/hero.tsx app/o-kempu/page.tsx app/galerie/page.tsx scripts/
git status
```

Review the staged files, then:

```bash
git commit -m "feat: convert images to WebP with SEO-friendly filenames"
```
