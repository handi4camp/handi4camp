"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/o-kempu", label: "O kempu" },
  { href: "/jak-pomoci", label: "Jak pomoci" },
  { href: "/galerie", label: "Galerie & Aktuality" },
  { href: "/partneri", label: "Partneři" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

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
  );
}
