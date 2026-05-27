import type { Metadata } from 'next'
import NapsaliClient from './_client'
import { client } from '@/tina/__generated__/client'

export const metadata: Metadata = {
  title: 'Napsali o nás — Handi4Camp',
  description: 'Co o Handi4Camp říkají média a partneři. Přehled článků a zmínek o letním táboře pro děti s dětskou mozkovou obrnou.',
  openGraph: {
    title: 'Napsali o nás — Handi4Camp',
    description: 'Co o Handi4Camp říkají média a partneři.',
    url: 'https://handi4camp.cz/napsali-o-nas',
  },
}

export default async function NapsaliPage() {
  const tinaData = await client.queries.napsali({ relativePath: 'napsali-o-nas.md' })
  return <NapsaliClient tinaData={tinaData} />
}
