# Mobile Burger Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-screen overlay mobile menu to `components/nav.tsx`, triggered by a hamburger button visible only below the `md` breakpoint.

**Architecture:** Convert `nav.tsx` to a client component, add `isOpen` state, render a `fixed inset-0` overlay conditionally. No new files — everything lives in the existing nav component.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS v4

---

## File Map

| File | Change |
|------|--------|
| `components/nav.tsx` | Full rewrite — add `"use client"`, `useState`, `useEffect`, hamburger button, overlay |

---

### Task 1: Convert nav to a client component and add state

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Add `"use client"` directive and imports**

Replace the top of `components/nav.tsx` with:

```tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
```

- [ ] **Step 2: Add `isOpen` state and scroll-lock effect inside the component**

Inside the `Nav` function body, before the `return`, add:

```tsx
const [isOpen, setIsOpen] = useState(false)

useEffect(() => {
  document.body.style.overflow = isOpen ? "hidden" : ""
  return () => {
    document.body.style.overflow = ""
  }
}, [isOpen])
```

- [ ] **Step 3: Verify the dev server still compiles**

Run: `pnpm dev`
Expected: no TypeScript or compilation errors in the terminal.

- [ ] **Step 4: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: convert nav to client component with isOpen state"
```

---

### Task 2: Add hamburger button to the header bar

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Replace the existing `<Link href="/jak-pomoci#darovani">` CTA in the header with a fragment containing both the button and the CTA**

The current nav JSX ends with:
```tsx
        <Link
          href="/jak-pomoci#darovani"
          className="bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
        >
          Přispět →
        </Link>
```

Replace it with:
```tsx
        <div className="flex items-center gap-3">
          <Link
            href="/jak-pomoci#darovani"
            className="hidden md:inline-flex bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
          >
            Přispět →
          </Link>
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsOpen(true)}
            aria-label="Otevřít menu"
          >
            <span className="block w-6 h-0.5 bg-dark" />
            <span className="block w-6 h-0.5 bg-dark" />
            <span className="block w-6 h-0.5 bg-dark" />
          </button>
        </div>
```

- [ ] **Step 2: Verify in browser at mobile width**

Open `http://localhost:3000` and resize to < 768px.
Expected: three-line hamburger icon visible; "Přispět" button hidden. At ≥ 768px, "Přispět" visible; hamburger hidden.

- [ ] **Step 3: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: add hamburger button, hide desktop CTA on mobile"
```

---

### Task 3: Add full-screen overlay

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Add overlay JSX after the closing `</header>` tag**

The component currently returns only `<header>...</header>`. Wrap everything in a fragment and add the overlay:

```tsx
  return (
    <>
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
          <div className="flex items-center gap-3">
            <Link
              href="/jak-pomoci#darovani"
              className="hidden md:inline-flex bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
            >
              Přispět →
            </Link>
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setIsOpen(true)}
              aria-label="Otevřít menu"
            >
              <span className="block w-6 h-0.5 bg-dark" />
              <span className="block w-6 h-0.5 bg-dark" />
              <span className="block w-6 h-0.5 bg-dark" />
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-forest flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
            aria-label="Zavřít menu"
          >
            <span className="block absolute w-6 h-0.5 bg-warm-white rotate-45" />
            <span className="block absolute w-6 h-0.5 bg-warm-white -rotate-45" />
          </button>
          <ul className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-serif text-2xl text-warm-white hover:text-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/jak-pomoci#darovani"
            className="bg-gold text-dark font-semibold px-6 py-3 rounded-lg text-base hover:bg-gold/90 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Přispět →
          </Link>
        </div>
      )}
    </>
  )
```

- [ ] **Step 2: Verify in browser at mobile width**

Open `http://localhost:3000` at < 768px.
Expected:
- Tapping hamburger opens a full-screen forest-green overlay.
- All nav links visible in large serif text.
- "Přispět" button at the bottom.
- Tapping ✕ or any link closes the overlay.
- Body does not scroll while overlay is open.

- [ ] **Step 3: Verify desktop is unaffected**

Resize to ≥ 768px.
Expected: overlay not visible; desktop nav unchanged.

- [ ] **Step 4: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: add full-screen mobile menu overlay"
```
