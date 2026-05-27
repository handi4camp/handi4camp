import type { Metadata } from 'next'
import KontaktClient from './_client'
import { client } from '@/tina/__generated__/client'

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

export default async function KontaktPage() {
  const tinaData = await client.queries.kontakt({ relativePath: 'kontakt.md' })
  return <KontaktClient tinaData={tinaData} />
}
