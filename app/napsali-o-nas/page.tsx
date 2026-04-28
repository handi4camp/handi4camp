import type { Metadata } from 'next'
import NapsaliClient from './_client'

export const metadata: Metadata = {
  title: 'Napsali o nás — Handi4Camp',
  description: 'Co o Handi4Camp říkají média a partneři. Přehled článků a zmínek o letním táboře pro děti s dětskou mozkovou obrnou.',
  openGraph: {
    title: 'Napsali o nás — Handi4Camp',
    description: 'Co o Handi4Camp říkají média a partneři.',
    url: 'https://handi4camp.cz/napsali-o-nas',
  },
}

export default function NapsaliPage() {
  return <NapsaliClient />
}
