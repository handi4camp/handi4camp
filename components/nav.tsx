"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import logo from "../logo.png";

const links = [
  { href: "/jak-pomoci", label: "Jak pomoci" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    } else {
      triggerRef.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <header className="sticky top-0 z-50 bg-forest border-b-2 border-gold/40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" aria-label="Handi4Camp">
            <Image
              src={logo}
              alt="Handi4Camp"
              width={160}
              height={128}
              className="h-14 w-auto brightness-0 invert"
              priority
            />
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-warm-white/80 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link
              href="/jak-pomoci#darovani"
              className="hidden md:inline-flex bg-gold text-dark font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-gold/90 transition-colors shadow-sm"
            >
              Přispět →
            </Link>
            <button
              ref={triggerRef}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setIsOpen(true)}
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="block w-6 h-0.5 bg-warm-white" />
              <span className="block w-6 h-0.5 bg-warm-white" />
              <span className="block w-6 h-0.5 bg-warm-white" />
            </button>
          </div>
        </nav>
      </header>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-forest flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Hlavní menu"
          id="mobile-menu"
        >
          <button
            ref={closeButtonRef}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
            aria-label="Zavřít menu"
          >
            <span className="block absolute w-6 h-0.5 bg-warm-white rotate-45" />
            <span className="block absolute w-6 h-0.5 bg-warm-white -rotate-45" />
          </button>
          <div className="flex justify-center pt-16 pb-6">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src={logo}
                alt="Handi4Camp"
                width={160}
                height={128}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
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
          <div className="flex justify-center gap-6 pb-10">
            <a
              href="https://www.facebook.com/Handi4Camp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-warm-white/70 hover:text-warm-white transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/facebook.svg" alt="" className="w-6 h-6 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.instagram.com/handi_camp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-warm-white/70 hover:text-warm-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
