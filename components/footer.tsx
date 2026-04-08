import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-3">Handi4Camp</h3>
            <p className="text-sm text-warm-white/80">
              Letní tábor pro děti s DMO pod záštitou Rotary Club Valtice
              Břeclav.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigace</h4>
            <ul className="space-y-2 text-sm text-warm-white/80">
              <li>
                <Link
                  href="/o-kempu"
                  className="hover:text-gold transition-colors"
                >
                  O kempu
                </Link>
              </li>
              <li>
                <Link
                  href="/jak-pomoci"
                  className="hover:text-gold transition-colors"
                >
                  Jak pomoci
                </Link>
              </li>
              <li>
                <Link
                  href="/galerie"
                  className="hover:text-gold transition-colors"
                >
                  Galerie & Aktuality
                </Link>
              </li>
              <li>
                <Link
                  href="/partneri"
                  className="hover:text-gold transition-colors"
                >
                  Partneři
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="hover:text-gold transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-sm text-warm-white/80">Barbora Slátková</p>
            <a
              href="mailto:info@handi4camp.cz"
              className="text-sm text-warm-white/80 hover:text-gold transition-colors"
            >
              info@handi4camp.cz
            </a>
            <div className="mt-4">
              <Link
                href="/jak-pomoci#darovani"
                className="inline-block bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
              >
                Přispět →
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-warm-white/20 text-center text-xs text-warm-white/60">
          © {new Date().getFullYear()} Handi4Camp · Rotary Club Valtice Břeclav
        </div>
      </div>
    </footer>
  );
}
