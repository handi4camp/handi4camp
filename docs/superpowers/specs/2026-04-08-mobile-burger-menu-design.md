# Mobile Burger Menu — Design Spec

**Date:** 2026-04-08  
**Status:** Approved

## Overview

Add a mobile burger menu to `components/nav.tsx`. On screens smaller than `md` (768px), the desktop nav links are hidden; a hamburger button opens a full-screen overlay with all navigation links and the "Přispět" CTA.

## Component Changes

**File:** `components/nav.tsx`

- Add `"use client"` directive at the top.
- Add `useState<boolean>(false)` (`isOpen`) to track overlay state.
- Add `useEffect` to toggle `document.body.style.overflow` (`hidden` when open, `""` when closed) for scroll lock.

## Header Bar

- Logo: unchanged, left-aligned.
- Hamburger button: `md:hidden`, right side of the header. Renders two states:
  - Closed: three horizontal lines (☰), drawn with three `<span>` divs.
  - Open: close icon (✕), drawn with two crossed `<span>` divs.
- "Přispět" button: hidden on mobile (`hidden md:inline-flex` or similar), shown in overlay instead.

## Full-Screen Overlay

- `fixed inset-0 z-50 bg-forest text-warm-white`
- `flex flex-col items-center justify-center gap-8`
- Rendered conditionally on `isOpen`.
- Contains:
  - All nav links in large text (e.g. `text-2xl font-serif`), each closes the menu on click.
  - "Přispět" button (gold, same style as header), closes menu on click.
- Close (✕) button positioned top-right matching the hamburger button position.

## Behaviour

- Clicking the hamburger sets `isOpen = true`.
- Clicking ✕ or any link sets `isOpen = false`.
- `useEffect` locks body scroll when `isOpen === true` and unlocks on close or unmount.

## Out of Scope

- Animations/transitions.
- Any changes to desktop nav layout.
