import Link from "next/link";

const links = [
  { href: "/o-kempu", label: "O kempu" },
  { href: "/jak-pomoci", label: "Jak pomoci" },
  { href: "/galerie", label: "Galerie & Aktuality" },
  { href: "/partneri", label: "Partneři" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Nav() {
  return (
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
        <Link
          href="/jak-pomoci#darovani"
          className="bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
        >
          Přispět →
        </Link>
      </nav>
    </header>
  );
}
