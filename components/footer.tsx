"use client";
import { useState, useEffect } from "react";
import { tinaField } from "tinacms/dist/react";
import { client } from "@/tina/__generated__/client";
import Link from "next/link";
import Image from "next/image";
import logo from "../logo.png";

type GlobalQuery = Awaited<ReturnType<typeof client.queries.global>>;

export default function Footer() {
  const [tinaData, setTinaData] = useState<GlobalQuery | null>(null);

  useEffect(() => {
    client.queries.global({ relativePath: "global.md" }).then(setTinaData);
  }, []);

  if (!tinaData) return null;
  return <FooterContent tinaData={tinaData} />;
}

function FooterContent({ tinaData }: { tinaData: GlobalQuery }) {
  const { data } = tinaData;
  const g = data.global;

  return (
    <footer className="bg-forest text-warm-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image src={logo} alt="Handi4Camp" height={80} className="h-20 w-auto mb-3 brightness-0 invert" />
            <p className="text-sm text-warm-white/80 mb-5" data-tina-field={tinaField(g, 'footerTagline')}>{g.footerTagline}</p>
            <Link
              href="/jak-pomoci#darovani"
              className="inline-block bg-gold text-dark font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gold/90 transition-colors"
            >
              Podpořit kemp
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigace</h4>
            <ul className="space-y-2 text-sm text-warm-white/80">
              <li><Link href="/" className="hover:text-gold transition-colors">Úvod</Link></li>
              <li><Link href="/jak-pomoci" className="hover:text-gold transition-colors">Jak pomoci</Link></li>
              <li><Link href="/galerie" className="hover:text-gold transition-colors">Galerie</Link></li>
              <li><Link href="/napsali-o-nas" className="hover:text-gold transition-colors">Napsali o nás</Link></li>
              <li><Link href="/kontakt" className="hover:text-gold transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-sm text-warm-white/80" data-tina-field={tinaField(g, 'footerContactName')}>{g.footerContactName}</p>
            <a
              href={`mailto:${g.footerEmail ?? ""}`}
              className="text-sm text-warm-white/80 hover:text-gold transition-colors"
              data-tina-field={tinaField(g, 'footerEmail')}
            >
              {g.footerEmail}
            </a>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={g.footerFacebookHref ?? "https://www.facebook.com/Handi4Camp"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-warm-white/70 hover:text-warm-white transition-colors text-sm"
                data-tina-field={tinaField(g, 'footerFacebookLabel')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/facebook.svg" alt="" className="w-4 h-4 brightness-0 invert" />
                {g.footerFacebookLabel}
              </a>
              {g.footerInstagramHref && (
                <a
                  href={g.footerInstagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-warm-white/70 hover:text-warm-white transition-colors text-sm"
                  data-tina-field={tinaField(g, 'footerInstagramLabel')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  {g.footerInstagramLabel}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-warm-white/20 text-center text-xs text-warm-white/60 flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>© {new Date().getFullYear()} Handi4Camp · Rotary Club Valtice Břeclav</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/soukromi" className="hover:text-gold transition-colors">Zásady ochrany soukromí</Link>
          <span className="hidden sm:inline">·</span>
          <Link href="/soukromi#souhlas" className="hover:text-gold transition-colors">Nastavení cookies</Link>
        </div>
      </div>
    </footer>
  );
}
