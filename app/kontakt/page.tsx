import type { Metadata } from 'next'
import KontaktClient from './_client'

export const metadata: Metadata = {
  title: 'Kontakt — Handi4Camp',
  description:
    'Kontaktujte organizátory letního tábora Handi4Camp pro děti s dětskou mozkovou obrnou. Napište nebo zavolejte.',
  openGraph: {
    title: 'Kontakt — Handi4Camp',
    description:
      'Kontaktujte organizátory letního tábora Handi4Camp pro děti s dětskou mozkovou obrnou. Napište nebo zavolejte.',
    url: 'https://handi4camp.cz/kontakt',
  },
}

export default function KontaktPage() {
  return <KontaktClient />
}
